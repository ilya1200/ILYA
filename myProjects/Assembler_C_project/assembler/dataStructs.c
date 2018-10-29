/*
 * dataSructures.c
 *
 *  Created on: Jul 28, 2015
 *      Author: Ilya Livshits
 *
 *  Description:
 *  	This file managing the structures that are used in the program.
 */



#include "libraries.h"
#include "consts.h"
#include "symbolTable.h"
#include "dataStructs.h"
#include "output.h"
#include "input.h"


Instruction insts[INTS_NUM]=
{/*Holds all instructions,they opcode and types.*/
	{"mov",0,FIRST,{1,1,1,1},{0,1,0,1}},
	{"cmp",1,FIRST,{1,1,1,1},{1,1,1,1}},
	{"add",2,FIRST,{1,1,1,1},{0,1,0,1}},
	{"sub",3,FIRST,{1,1,1,1},{0,1,0,1}},
	{"not",4,SECOND,{0,0,0,0},{0,1,0,1}},
	{"clr",5,SECOND,{0,0,0,0},{0,1,0,1}},
	{"lea",6,FIRST,{0,1,0,0},{0,1,0,1}},
	{"inc",7,SECOND,{0,0,0,0},{0,1,0,1}},
	{"dec",8,SECOND,{0,0,0,0},{0,1,0,1}},
	{"jmp",9,SECOND,{0,0,0,0},{0,1,1,1}},
	{"bne",10,SECOND,{0,0,0,0},{0,1,1,1}},
	{"red",11,SECOND,{0,0,0,0},{0,1,1,1}},
	{"prn",12,SECOND,{0,0,0,0},{1,1,1,1}},
	{"jsr",13,SECOND,{0,0,0,0},{0,1,0,0}},
	{"rts",14,THIRD,{0,0,0,0},{0,0,0,0}},
	{"stop",15,THIRD,{0,0,0,0},{0,0,0,0}}
};

Directive directives[DIRECTIVES_NUM]=
{/*Holds all directives.*/
	{".data",DATA},
	{".string",STRING},
	{".entry",ENTRY},
	{".extern",EXTERN}
};

Reg regs[REGS_NUM]=
{/*Holds all registers*/
		{"r0",0},
		{"r1",1},
		{"r2",2},
		{"r3",3},
		{"r4",4},
		{"r5",5},
		{"r6",6},
		{"r7",7}
};

static Extern_node_ptr extern_head;/*Points to the head of the list*/
static Extern_node_ptr extern_tail;/*Points to the last node in the list*/

static Entry_node_ptr entry_head;/*Points to the head of the list*/
static Entry_node_ptr entry_tail;/*Points to the last node in the list*/

/*This function adds a new external label to the list.
 * input:
 * 	cmd-points to the command that contains the extern declaration.
 * output:
 * 	returns 1 if succeed,0 otherwise.
 * */
int add_extern_node(Command *cmd)
{
	Extern_node_ptr p=(Extern_node_ptr)malloc(sizeof(Extern_node));
	if(p==NULL)
	{
		allocation_error();
		return 0;
	}

	p->data.cmd=cmd;
	p->data.extern_addresses_head=NULL;
	p->data.extern_addresses_head=NULL;

	if(extern_head==NULL)
	{/*The list is empty.*/
		extern_tail=NULL;
		extern_head=p;
		extern_tail=extern_head;
		extern_tail->next=NULL;
	}
	else
	{/*Non-empty list.*/
		extern_tail->next=p;
		extern_tail=extern_tail->next;
		extern_tail->next=NULL;
	}
	return 1;
}


/*This function adds a new entry label to the list.
 * input:
 * 	cmd-points to the command that contains the entry declaration.
 * output:
 * 	returns 1 if succeed,0 otherwise.
 * */
int add_entry_node(Command *cmd)
{
	Entry_node_ptr p=(Entry_node_ptr)malloc(sizeof(Entry_node));

	if(p==NULL)
	{
		allocation_error();
		return 0;
	}

	p->data.cmd=cmd;
	p->data.label=find_symbol(cmd->statement->directive_wrapper->string);

	if(p->data.label==NULL)/*The label wasn't found*/
	{
		fprintf(stderr,"The label %s wasn't found",cmd->statement->directive_wrapper->string);
		free(p);
		return 0;
	}

	if(entry_head==NULL)
	{/*The list is empty.*/
		entry_tail=NULL;
		entry_head=p;
		entry_tail=entry_head;
		entry_tail->next=NULL;
	}
	else
	{/*Non-empty list.*/
		entry_tail->next=p;
		entry_tail=entry_tail->next;
		entry_tail->next=NULL;
	}
	return 1;
}

/*This function prints the content of all entry nodes in the list.
 * */
void print_entry_table()
{
	Entry_node_ptr p;
	FILE *ent_fp;


	if(entry_head!=NULL)
	{
		ent_fp = create_and_open_file(".ent");
		if(ent_fp==NULL)
			return;



		for(p=entry_head;p!=NULL;p=p->next)
		{
			fprintf(ent_fp,"%s\t%d\n",p->data.label->data->label_name,convert_decimal_to_four(p->data.label->data->label_address));
		}

		fclose(ent_fp);
	}
}


/*This function prints the content of all extern nodes in the list.
 * */
void print_extern_table()
{
	Extern_node_ptr p;
	FILE *ext_fp;

	if(extern_head!=NULL)
	{
		ext_fp = create_and_open_file(".ext");
		if(ext_fp==NULL)
			return;


		for(p=extern_head;p!=NULL;p=p->next)
		{
			int_node_ptr int_p;

			for(int_p=p->data.extern_addresses_head;int_p!=NULL;int_p=int_p->next)
				fprintf(ext_fp,"%s\t%d\n",p->data.cmd->statement->directive_wrapper->string,convert_decimal_to_four(int_p->data));
		}

		fclose(ext_fp);
	}
}


/*This function free the extern table and it's content*/
void free_extern_table()
{
	Extern_node_ptr p;
	for(p=extern_head;extern_head!=NULL;p=extern_head)
	{
		free_extern_address_list(p->data.extern_addresses_head);
		p->data.extern_addresses_head=NULL;
		p->data.extern_addresses_tail=NULL;
		extern_head=p->next;
		free(p);
	}
	extern_tail=NULL;
}

/*This function free the addresses on an external label specified in params.
 *input:
 *	head-points to the head of addresses.
 * */
void free_extern_address_list(int_node_ptr head)
{
	int_node_ptr int_p;

	for(int_p = head; head!= NULL; int_p=head)
	{
		head=int_p->next;
		free(int_p);
	}
}

/*This function free the entry table
 * */
void free_entry_table()
{
	Entry_node_ptr p;
	for(p=entry_head;entry_head!=NULL;p=entry_head)
	{
		entry_head=p->next;
		free(p);
	}
	entry_tail=NULL;
}

/*This function adds a new address of an external node to the list.
 * input:
 *	node_to_update-points to the external node to which address list to add a new node.
 *	address-the address to be added.
 * output:
 *	returns 1 if succeed and 0 otherwise.
 * */
int add_extern_address_to_list(Extern_node_ptr node_to_update,int address)
{
	int_node_ptr p;

	if(node_to_update==NULL)
		return 0;

	p=(int_node_ptr)malloc(sizeof(int_node));

	if(p==NULL)
	{
		allocation_error();
		return 0;
	}
	p->data=address;

	if((node_to_update->data.extern_addresses_head)==NULL)
	{
		node_to_update->data.extern_addresses_head=p;
		node_to_update->data.extern_addresses_tail=node_to_update->data.extern_addresses_head;
		node_to_update->data.extern_addresses_tail->next=NULL;
	}
	else
	{
		node_to_update->data.extern_addresses_tail->next=p;
		node_to_update->data.extern_addresses_tail=node_to_update->data.extern_addresses_tail->next;
		node_to_update->data.extern_addresses_tail->next=NULL;
	}

	return 1;
}

/*This function looking for an external node in the list.
 * input:
 *	label_name-the name of the label to look for.
 * output:
 *	returns a pointer to the extern node that contains the label,NULL if not found.
 * */
Extern_node_ptr find_extern_node(char *label_name)
{
	Extern_node_ptr p;

	for(p=extern_head;p!=NULL;p=p->next)
	{
		if(strcmp(label_name,p->data.cmd->statement->directive_wrapper->string)==0)
			return p;
	}
	return NULL;
}

/*This function returns an index if s is one of the registers,and (-1) otherwise.*/
int is_reg(char *s)
{
	int i,length=REGS_NUM;
	for(i=0;i<length;i++)
		if(strcmp(regs[i].reg_name,s)==0)
			return i;
	return -1;
}

/*This function returns an index if s is one of the directives,and (-1) otherwise.*/
int is_directive(char *s)
{
	int i,length=DIRECTIVES_NUM;
	for(i=0;i<length;i++)
		if(strcmp(directives[i].directive_name,s)==0)
			return i;
	return -1;
}

/*This function returns an index if s is one of the operations,and (-1) otherwise.*/
int is_inst(char *s)
{
	int i,length=INTS_NUM;
	for(i=0;i<length;i++)
		if(strcmp(insts[i].op_name,s)==0)
			return i;
	return -1;
}





