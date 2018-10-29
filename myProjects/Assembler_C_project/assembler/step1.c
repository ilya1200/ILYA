/*
 * step1.c
 *
 *  Created on: Jul 21, 2015
 *      Author: Ilya Livshits
 *
 *	Description:
 *		This file handles the first step and it's processes:
 *		-Counting the length of the program.
 *		-Collect and assign labels with their addresses.
 *		-Store directive parameters in the data segment.
 *		-Collect the external and entry symbols.
 */


#include "libraries.h"
#include "consts.h"
#include "assembler.h"
#include "dataStructs.h"
#include "input.h"
#include "symbolTable.h"



/*	This function handles the first step as described earlier.
 * 	input:
 * 		commands_head -points to the head of the list that keeps the processed commands.
 *		cs- points to the code segment.
 *		ds-points to the head of the data segment.
 *	output:
 *		returns 1 if succeed,and 0 in case of error.
 * */
int step1(cmd_node_ptr commands_head,Code_seg *cs,Data_seg *ds)
{
	cmd_node_ptr p;/*Used to travel through commands list*/
	int symbol_flag;
	int i;



	cs->IC=0;
	ds->DC=0;


	for(p=commands_head;p!=NULL;p=p->next)
	{
		if((p->data->statement_type==EMPTY) || (p->data->statement_type==COMMENT))
			continue;

		symbol_flag=0;

		if(p->data->label !=NULL)
		{/*if a label was found before the statement*/
			symbol_flag=1;
		}

		if(p->data->statement_type==DIRECTIVE)
		{
			if(p->data->statement->directive_wrapper->directive->directive_type==DATA)
			{
				if(symbol_flag==1)
				{/*Update label address*/
					(p->data->label->label_address)=(ds->DC);
				}
				for(i=0;i<(p->data->statement->directive_wrapper->data_length);i++)
				{/*Store the values in the data segment*/
					if((ds->DC)<DATA_SEG_SIZE)
					{
						(ds->data)[(ds->DC)]= (p->data->statement->directive_wrapper->data)[i] ;
						(ds->DC)++;
					}
					else
					{
						fprintf(stderr,"ERROR:The program is to large.\n");
						return 0;
					}
				}
			}
			else if(p->data->statement->directive_wrapper->directive->directive_type==STRING)
			{
				if(symbol_flag==1)
				{/*Update label address*/
					(p->data->label->label_address)=(ds->DC);
				}
				for(i=0;(p->data->statement->directive_wrapper->string)[i]!='\0';i++)
				{/*Store the values in the data segment*/
					if((ds->DC)<DATA_SEG_SIZE)
					{
						(ds->data)[(ds->DC)]=(p->data->statement->directive_wrapper->string)[i] ;
						(ds->DC)++;
					}
					else
					{
						fprintf(stderr,"ERROR:The program is to large.\n");
						return 0;
					}
				}
				if((ds->DC)<DATA_SEG_SIZE)
				{
					(ds->data)[(ds->DC)]='\0';
					(ds->DC)++;
				}
				else
				{
					fprintf(stderr,"ERROR:The program is to large.\n");
					return 0;
				}

			}
			else if((p->data->statement->directive_wrapper->directive->directive_type)==EXTERN)
			{/*Add the label to the extern list*/
				if(add_extern_node(p->data)==0)
					return 0;/*if the addition failed*/
			}
			else/*ENTRY*/
			{/*Add the label to the entry list*/
				if(add_entry_node(p->data)==0)
					return 0;/*if the addition failed*/
			}
		}
		else/* (p->data->statement_type==INSTRUCTION)*/
		{
			int repeat=p->data->statement->instruction_wrapper->repeat;
			if(symbol_flag==1)
			{/*Update the address of the label that comes before an instruction*/
				p->data->label->label_address = cs->IC+CODE_INIT_ADDRESS;
			}

			do
			{
				if(cs->IC < CODE_SEG_SIZE)
				{/*Count the number of words needed for the binary*/
					(cs->IC)++;
					switch(p->data->statement->instruction_wrapper->instruction->group)
					{
						case FIRST:
							(cs->IC)++;
							if(p->data->statement->instruction_wrapper->destination_method==REGISTER)
							{/*if both operands are registers they share one word*/
								if(p->data->statement->instruction_wrapper->source_method == REGISTER)
									(cs->IC)--;
							}
							(cs->IC)++;
						break;

						case SECOND:
							(cs->IC)++;
						break;

						case THIRD:
						break;
					}
				}
				else
				{
					fprintf(stderr,"ERROR:The program is to large.\n");
					return 0;
				}
				(repeat)--;
			}while(repeat>0);
		}
	}
	return 1;
}




