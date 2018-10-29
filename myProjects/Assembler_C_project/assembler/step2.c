/*
 * step2.c
 *
 *  Created on: Jul 21, 2015
 *      Author: Ilya Livshits
 *
 *  Description:
 *  	This file handles the second step processes:
 *  	-Translate the instructions into its binary and write them into the code segment.
 *  	-Fill the extern and entry tables with addresses.
 *  	-Make the alignment of code and data segment,and update the addresses.
 */

#include "libraries.h"
#include "consts.h"
#include "assembler.h"
#include "dataStructs.h"
#include "input.h"
#include "symbolTable.h"
#include "output.h"


void set_instruction_word(Asm_word *word,Command *cmd);
int set_additional_word(Asm_word *word,Command *cmd,Code_seg *cs,int source_destination,int total_ic);
int set_source_word(Asm_word *word,Command *cmd,Code_seg *cs,int total_ic);
int set_destination_word(Asm_word *word,Command *cmd,Code_seg *cs,int total_ic);



extern Reg regs[REGS_NUM];

/* This function set the first word of instruction.
 * input:
 *	word-points to the word in the code segment that has to be set.
 *	cmd-points to the current command that contains the instruction.
 * */
void set_instruction_word(Asm_word *word,Command *cmd)
{
	if(cmd->statement_type!=INSTRUCTION)
		return;/*This function handles only instructions*/

	(*word)=(*word)|ABSOLUTE;
	(*word)=(*word)|(cmd->statement->instruction_wrapper->destination_method <<2);
	(*word)=(*word)|(cmd->statement->instruction_wrapper->source_method<<4);
	(*word)= (*word)|((cmd->statement->instruction_wrapper->instruction->opcode)<<6);
	(*word)= (*word)|((cmd->statement->instruction_wrapper->instruction->group) <<10);
}


/*This function set the source operand word of instruction.
 *
 * input:
 *		word-points to the word in the code segment that has to be set.
 *		cmd-points to the current command that contains the instruction.
 *		cs-points to the code segment.
 *		total_ic-keeps the length of the program.
 * output:
 *	returns 1 if succeed and 0 otherwise.
 * */
int set_source_word(Asm_word *word,Command *cmd,Code_seg *cs,int total_ic)
{
	int are;/*keeps the value to be assigned into ARE part of the word*/
	int address;/*keeps the address of a label might be used*/
	int number;/*keeps the number to be assigned if instant address method is used*/
	Extern_node_ptr p;
	Label_node_ptr q;
	int reg_index;

	switch(cmd->statement->instruction_wrapper->source_method)
	{
		default:
			fprintf(stderr,"ERROR:Bug in program.\n");
		break;
		case INSTANT:
			are=ABSOLUTE;
			number=atoi(cmd->statement->instruction_wrapper->source_operand+1);
			(*word)=(*word)|(are);
			(*word)=(*word)|(number<<2);
		break;

		case DIRECT:
			if( (p=find_extern_node(cmd->statement->instruction_wrapper->source_operand))!=NULL )
			{/*Look for the label in the extern list*/
				are=EXTERNAL;
				/*if found- add to it's occurrence into the list*/
				if(add_extern_address_to_list(p,cs->IC+CODE_INIT_ADDRESS)==1)
				{
					address=0;
				}
				else
				{
					return 0;
				}
			}
			else if( (q=find_symbol(cmd->statement->instruction_wrapper->source_operand))!=NULL )
			{/*Look for the label in the symbol table*/

				switch(q->cmd->statement_type)
				{
					case DIRECTIVE:
						are=RELOCATABLE;
						address=q->data->label_address;
					break;

					case INSTRUCTION:
						are=ABSOLUTE;
						address=q->data->label_address;
					break;

					default:
						error_msg_label("Unnecessary label", q->data->label_name);
						return 0;
					break;
				}
			}
			else
			{/*The label couldn't be found*/
				error_msg_label("Undefined label",cmd->statement->instruction_wrapper->source_operand);
				return 0;
			}
			(*word)=(*word)|(are);
			(*word)=(*word)|(address<<2);

		break;

		case REGISTER:
			are=ABSOLUTE;
			(*word)=(*word)|(are);
			reg_index=is_reg(cmd->statement->instruction_wrapper->source_operand);
			(*word)=(*word)|(regs[reg_index].reg_num<<7);/*set the register name into source section in the word*/
		break;
	}

	return 1;
}


/*This function set the destination operand word of instruction.
 *
 * input:
 *		word-points to the word in the code segment that has to be set.
 *		cmd-points to the current command that contains the instruction.
 *		cs-points to the code segment.
 *		total_ic-keeps the length of the program.
 * output:
 *	returns 1 if succeed and 0 otherwise.
 * */
int set_destination_word(Asm_word *word,Command *cmd,Code_seg *cs,int total_ic)
{
	int are;/*keeps the value to be assigned into ARE part of the word*/
	int address;/*keeps the address of a label might be used*/
	int number;/*keeps the number to be assigned if instant address method is used*/
	Extern_node_ptr p;
	Label_node_ptr q;
	int reg_index;

	switch(cmd->statement->instruction_wrapper->destination_method)
	{
		default:
			fprintf(stderr,"ERROR:Bug in program.\n");
		break;
		case INSTANT:
			are=ABSOLUTE;
			number=atoi(cmd->statement->instruction_wrapper->destination_operand+1);
			(*word)=(*word)|(are);
			(*word)=(*word)|(number<<2);
		break;

		case DIRECT:
			if( (p=find_extern_node(cmd->statement->instruction_wrapper->destination_operand))!=NULL )
			{/*Look for the label in the extern list*/
				are=EXTERNAL;
				/*if found- add to it's occurrence into the list*/
				if(add_extern_address_to_list(p,cs->IC+CODE_INIT_ADDRESS)==1)
				{
					address=0;
				}
				else
				{
					return 0;
				}
			}
			else if( (q=find_symbol(cmd->statement->instruction_wrapper->destination_operand))!=NULL )
			{/*Look for the label in the symbol table*/
				switch(q->cmd->statement_type)
				{
					case DIRECTIVE:
						are=RELOCATABLE;
						address=q->data->label_address;
					break;

					case INSTRUCTION:
						are=ABSOLUTE;
						address=q->data->label_address;
					break;

					default:
						error_msg_label("Unnecessary label", q->data->label_name);
						return 0;
					break;
				}
			}
			else
			{/*The label couldn't be found*/
				error_msg_label("Undefined label",cmd->statement->instruction_wrapper->destination_operand);
				return 0;
			}

			(*word)=(*word)|(are);
			(*word)=(*word)|(address<<2);
		break;


		case REGISTER:
			are=ABSOLUTE;
			(*word)=(*word)|(are);
			reg_index=is_reg(cmd->statement->instruction_wrapper->destination_operand);
			(*word)=(*word)|(regs[reg_index].reg_num<<2);/*set the register name into destination section in the word*/
		break;
	}
	return 1;
}


/*This function sets the additional word of instruction
 *depending on if is a source or destination word.
 *		word-points to the word in the code segment that has to be set.
 *		cmd-points to the current command that contains the instruction.
 *		cs-points to the code segment.
 *		source_destination-contains 1 if it is a source word and 0 if it is a destination word.
 *		total_ic-keeps the length of the program.
 * output:
 *	returns 1 if succeed and 0 otherwise.
 * */
int set_additional_word(Asm_word *word,Command *cmd,Code_seg *cs,int source_destination,int total_ic)
{
	if(cmd->statement_type!=INSTRUCTION)
	{
		return 0;
	}

	switch(cmd->statement->instruction_wrapper->instruction->group)
	{
		case FIRST:
			if(source_destination)
			{
				return set_source_word(word,cmd,cs,total_ic);
			}
			else
			{
				return set_destination_word(word,cmd,cs,total_ic);
			}
		break;

		case SECOND:
			return set_destination_word(word,cmd,cs,total_ic);
		break;

		case THIRD:
		break;
	}

	return 1;
}



/*	This function handles the second step.
 * 	input:
 * 		commands_head- points to the first command in the list.
 * 		cs-points to the code segment.
 * 		ds-points to the data segment.
 * 	output:
 * 		returns 1 if succeed,and 0 otherwise.
 * */
int step2(cmd_node_ptr commands_head,Code_seg *cs,Data_seg *ds)
{
	extern int line_number;
	cmd_node_ptr p;
	int total_ic=cs->IC;/*keeps the length of the binary counted by step1.*/
	line_number=0;

	align_directive_labels(total_ic+CODE_INIT_ADDRESS);

	cs->IC=0;
	for(p=commands_head;p!=NULL;p=p->next)
	{
		line_number++;
		if((p->data->statement_type==EMPTY) || (p->data->statement_type==COMMENT))
			continue;



		if(p->data->statement_type==DIRECTIVE)/*Handled in step 1 */
		{
			continue;
		}
		else/* (p->data->statement_type==INSTRUCTION)*/
		{
			int repeat=p->data->statement->instruction_wrapper->repeat;
			cs->code[(cs->IC)]=0;
			do{
				if(cs->IC < CODE_SEG_SIZE)
				{
					set_instruction_word(&(cs->code[(cs->IC)]),p->data);/*set the first word of instruction.*/
					(cs->IC)++;
					/*set the additional words if needed*/
					switch(p->data->statement->instruction_wrapper->instruction->group)
					{
						case FIRST:
							if(set_additional_word(&(cs->code[(cs->IC)]),p->data,cs,1,total_ic)==0)
							{
								return 0;
							}
							(cs->IC)++;
							if(p->data->statement->instruction_wrapper->destination_method==REGISTER)
							{/*if both operands are registers they share one word*/
								if(p->data->statement->instruction_wrapper->source_method == REGISTER)
									(cs->IC)--;
							}
							if(set_additional_word(&(cs->code[(cs->IC)]),p->data,cs,0,total_ic)==0)
							{
								return 0;
							}
							(cs->IC)++;
						break;

						case SECOND:
							if(set_additional_word(&(cs->code[(cs->IC)]),p->data,cs,0,total_ic)==0)
							{
								return 0;
							}
							(cs->IC)++;
						break;

						case THIRD:
						break;
					}
				}
				(repeat)--;
			}while(repeat>0);
		}
	}
	return 1;
}
