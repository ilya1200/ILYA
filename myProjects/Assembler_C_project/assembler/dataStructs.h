/*
 * dataStructs.h
 *
 *  Created on: Jul 29, 2015
 *      Author: Ilya Livshits
 */


#ifndef DATASTRUCTS_H_
#define DATASTRUCTS_H_

#include "consts.h"



/**
 * This struct represents an instruction like:mov,sub and etc.
 */
typedef struct
{
	char *op_name;
	int opcode;
	Inst_group group;
	int source_methodes[ADDRESS_METHODES_NUM];/*Keeps which methods can be used for source operand in the instruction*/
	int destination_methodes[ADDRESS_METHODES_NUM];/*Keeps which methods can be used for destination operand in the instruction*/
}Instruction;


/**
 * This struct represents an guidance like:.data,.string and etc.
 */
typedef struct
{
	char *directive_name;
	Directive_type directive_type;
}Directive;

/**
 * This struct represents a register.
 */
typedef struct
{
	char *reg_name;
	int reg_num;
}Reg;


/**
 * This struct represents a word of 12 bits.
 */
typedef unsigned short Asm_word;


/**
 * A variable of this type is a place to hold the code part.
 */
typedef struct
{
	Asm_word code[CODE_SEG_SIZE];
	int IC; /*Instruction counter*/
}Code_seg;

/**
 * A variable of this type is a place to hold the data part.
 */
typedef struct
{
	Asm_word data[DATA_SEG_SIZE];
	int DC;/*data counter*/
}Data_seg;


/*
 * This struct holds an instruction and it's properties.
 * */
typedef struct {
    Instruction *instruction;
    char *source_operand;
    Address_method source_method;
    char *destination_operand;
    Address_method destination_method;
    int repeat;/* - how many times to repeat the instruction - 2 for mov2 for example*/
} Instruction_wrapper;

/*
 * This struct holds a directive and it's properties.
 * */
typedef struct {
    Directive *directive;
    int *data;
    int data_length;
    char *string;
} Directive_wrapper;

/*
 * This struct represents a statement.
 * */
typedef union{
    Instruction_wrapper *instruction_wrapper;
    Directive_wrapper *directive_wrapper;
} Statement;


/**
 * This struct represents a label.
 */
typedef struct
{
	char *label_name;
	int  label_address;
}Label;


/*
 * This struct represents a command.
 * */
typedef struct {
    Label *label;
    Statement_type statement_type;
    Statement *statement;
} Command;

typedef struct cmd_n *cmd_node_ptr;
typedef struct cmd_n
{
	Command *data;
	cmd_node_ptr next;
	cmd_node_ptr prev;
}Command_node;


/*
 * This struct represents a lable node
 * */
typedef struct lebn *Label_node_ptr;
typedef struct lebn
{
	Label *data;
	Command *cmd;
	Label_node_ptr next;
}Label_node;


/*This struct is used to keep entry labels*/
typedef struct
{
	Command *cmd;       	/*command that defines the entry - i.e. .entry LOOP*/
	Label_node_ptr label;  /* the actual label  - i.e. LOOP: mov r1, r2*/
}Entry;

/*This struct is used by extern labels to keep addresses in which they appears*/
typedef struct i_n *int_node_ptr;
typedef struct i_n
{
	int data;
	int_node_ptr next;
}int_node;

/*This struct used to keep extern labels and their properties*/
typedef struct
{
	Command *cmd;       	/* command that defines the extern - i.e. .extern W*/
	int_node_ptr extern_addresses_head;   /* all the calculated addresses in which the label appears*/
	int_node_ptr extern_addresses_tail;
}Extern;

typedef struct En *Extern_node_ptr;
typedef struct En
{
	Extern data;
	Extern_node_ptr next;
}Extern_node;

typedef struct Ent *Entry_node_ptr;
typedef struct Ent
{
	Entry data;
	Entry_node_ptr next;
}Entry_node;



/*This function adds a new external label to the list.
 * input:
 * 	cmd-points to the command that contains the extern declaration.
 * output:
 * 	returns 1 if succeed,0 otherwise.
 * */
int add_extern_node(Command *cmd);

/*This function prints the content of all extern nodes in the list.
 * */
void print_extern_table();

/*This function free the extern table and it's content*/
void free_extern_table();

/*This function adds a new address of an external node to the list.
 * input:
 *	node_to_update-points to the external node to which address list to add a new node.
 *	address-the address to be added.
 * output:
 *	returns 1 if succeed and 0 otherwise.
 * */
int add_extern_address_to_list(Extern_node_ptr node_to_update,int address);


/*This function looking for an external node in the list.
 * input:
 *	label_name-the name of the label to look for.
 * output:
 *	returns a pointer to the extern node that contains the label,NULL if not found.
 * */
Extern_node_ptr find_extern_node(char *label_name);

void free_extern_address_list(int_node_ptr head);


/*This function adds a new entry label to the list.
 * input:
 * 	cmd-points to the command that contains the entry declaration.
 * output:
 * 	returns 1 if succeed,0 otherwise.
 * */
int add_entry_node(Command *cmd);

/*
 * This function prints the content of all entry nodes in the list.
 * */
void print_entry_table();

/*
 * This function free the entry table
 * */
void free_entry_table();




/*This function returns an index if s is one of the registers,and (-1) otherwise.*/
int is_reg(char *s);

/*This function returns an index if s is one of the directives,and (-1) otherwise.*/
int is_directive(char *s);

/*This function returns an index if s is one of the instructions,and (-1) otherwise.*/
int is_inst(char *s);


#endif /* DATASTRUCTS_H_ */
