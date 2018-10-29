/*
 * symbolTabel.c
 *
 *  Created on: Jul 29, 2015
 *      Author: Ilya Livshits
 *
 *   Description:This file managing the symbol table.
 */


#include "libraries.h"
#include "consts.h"
#include "dataStructs.h"
#include "symbolTable.h"
#include "output.h"


static Label_node_ptr head;/*Points to the head of the list*/
static Label_node_ptr tail;/*Points to the head of the last node in the list*/

/*This function adds a new symbol to the end of the list.
 * input:
 * 	label- points to the node to be added to the list.
 * 	cmd-points to the command label belong to.
 * output:
 * 	returns 1 if succeed else returns 0.
 * */
int add_new_symbol(Label *label,Command *cmd)
{

	Label_node_ptr p=(Label_node_ptr)malloc(sizeof(Label_node));
	if(p==NULL)
	{
		allocation_error();
		return 0;
	}

	(p->data)=label;
	(p->cmd)=cmd;
	(p->next)=NULL;

	if(head==NULL)
	{/*The list is empty.*/
		tail=NULL;
		head=p;
		tail=head;
		tail->next=NULL;
	}
	else
	{/*Non-empty list.*/
		tail->next=p;
		tail=tail->next;
		tail->next=NULL;
	}
	return 1;
}


/*This function looking for a symbol in the table.
 *input:
 *	label_name- the name of a label to look for.
 *output:
 *	if the symbol was found return a pointer to the node in which it is stored,NULL otherwise.
 * */
Label_node_ptr find_symbol(char *label_name)
{
	Label_node_ptr p;

	for(p=head;p!=NULL;p=p->next)
		if(strcmp((p->data)->label_name,label_name )==0)
			return p;
	return NULL;
}

/*
 * This function delete the table head is holding,and sets head and last to NULL.
 * */
void free_symbol_tabel()
{
	Label_node_ptr p;
	for(p=head;head!=NULL;p=head)
	{
		head=p->next;
		free(p);
	}
	tail=NULL;
}

/* This function determine if a word is a symbol definition.
 * input:
 * 	word - contains the word to be checked.
 * output:
 * 	returns 1 if it is a good definition,
 * 			0 if it is illegal definition,
 * 			(-1) if it isn't a symbol definition at all.
 *  */
int is_symbol_definition(char *word)
{
	char *p,*q;
	int word_length=strlen(word);
	char *symbol=(char *)calloc(1,word_length+1);
	int error_indicator=1;/*A sign for a legal(when 0) or illegal(when 1) symbol definition*/

	if(symbol==NULL)
	{
		allocation_error();
		return (-1);
	}
	strcpy(symbol,word);
	p=symbol;
	if((q=strchr(symbol,':'))!=NULL)/*Make sure there is ':' */
	{
		if(word_length<=MAXLABEL+1)
		{
			if(isalpha(*p))/*Make sure the first char is a letter*/
			{
				for(p++;isalnum((*p));p++)/*Check that all other chars are letters or numbers */
					;
				if((*p)==':')/*Check that ':' is on the end*/
				{
					(*p)='\0';
					if( is_inst(symbol)>=0 )
						error_msg("An operation name can't serve for label definition");
					else if(is_reg(symbol)>=0)
						error_msg("A register name can't serve for label definition");
					else if (find_symbol(symbol)!=NULL)/*if not defined -> error_indicator=0;*/
						error_msg("The label is already defined");
					else/*It is a symbol definition*/
					{
						error_indicator=0;/*the definition is legal*/
						p=strchr(word,':');/*delete ':'*/
						(*p)='\0';
					}
				}
				else
					error_msg("Label definition should contain letters and numbers only,and ':' on the end");
			}
			else
				error_msg("Label definition should begin with a letter.");
		}
		else
			error_msg("The label definition is too long.");
	}
	else/*It is not a symbol definition*/
	{
		free(symbol);
		return 0;
	}

	free(symbol);
	if(error_indicator)/*if the definition is illegal return -1 */
		return (-1);
	else/*the symbol is good*/
		return 1;
}


/*This function align labels that are attached to directives.
 * input:
 * 	offset-the value of alignment.
 * */
void align_directive_labels(int offset)
{
	Label_node_ptr p;
	for(p=head;p!=NULL;p=p->next)
	{
		if(p->cmd->statement_type==DIRECTIVE)
		{
			p->data->label_address=p->data->label_address+offset;
		}
	}
}
