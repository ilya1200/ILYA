/*
 * input.c
 *
 *  Created on: Jul 29, 2015
 *      Author: Ilya Livshits
 *
 *  Description:
 *  	This file managing the parsing of the input.
 */


#include "libraries.h"
#include "consts.h"
#include "dataStructs.h"
#include "input.h"
#include "symbolTable.h"
#include "output.h"


/*This struct holds a pointer to a string and a pointer to the next node.*/
typedef struct sn *string_ptr;
typedef struct sn
{
	char *data;
	string_ptr next;
}string_node;

/*This function allocates memory and returns a pointer to a statement,or NULL if failed.*/
Statement *allocate_statement();

/*This function create a new string node, and returns a pointer to it, or NULL if failed*/
string_ptr allocate_string_node();

/*This function validate the param and trim it from white chars,
 * returns a string that contains the valid param.
 * */
char *validate_and_trim_parameter(char *param);

/*This function returns 1 if s is a number(have only digits, '-' is optional) and 0 otherwise.*/
int is_number(char *s);

/* function checks if s can be an instruction,if it is
 * returns 1 or 2 how many times have to be repeated, and 0 otherwise*/
int check_inst(char s[]);


/*This function decodes a directive params, returns 1 if succeeded,0 otherwise*/
int decode_directive_params(Command *cmd,string_ptr *head,string_ptr tail,int list_length);


/*This function decodes an instruction params, returns 1 if succeeded,0 otherwise*/
int decode_instruction_params(Command *cmd,string_ptr *head,string_ptr tail,int list_length,cmd_node_ptr last_node);

/*This function returns the address method that s contains or (-1) in case of error*/
Address_method find_address_method(char *s);

/*This function returns the number of nodes in the list that head points to.*/
int param_list_length(string_ptr head);

/*This function deletes all nodes (*head) points to.*/
void free_params(string_ptr *head);

/* This function checks that string holds a valid string.
 * returns pointer to string without '\"' at the beginning and on the end,
 * or NULL if the string is invalid
 * */
char *validate_string(char *string);

/*This function checks that the last command has
 * at least one operand.
 * returns 1 if it is,and 0 if it isnt.
 * */
int check_last_inst(cmd_node_ptr last_node);



/*This function collects and processes the input,returns a pointer to list of commands,or NULL if error.*/
cmd_node_ptr process_input(int *proccess_error)
{
	char line[MAXLINE]; /*holds the current line*/
	cmd_node_ptr head=NULL;/*points to the first node*/
	cmd_node_ptr tail=NULL;/*points to the last node*/
	line_number=0;

	while(get_line(line,MAXLINE)>0)/*while there are more lines*/
	{
		line_number++;
		/*create a new node for the processed line*/
		if(head==NULL)
		{
			head=(cmd_node_ptr)malloc(sizeof(Command_node));
			if(head==NULL)
			{
				allocation_error();
				return NULL;
			}
			tail=head;
			tail->next=NULL;
			tail->prev=NULL;
		}
		else
		{
			tail->next=(cmd_node_ptr)malloc(sizeof(Command_node));
			if(tail->next==NULL)
			{
				allocation_error();
				return NULL;
			}
			tail->next->prev=tail;
			tail=tail->next;
			tail->next=NULL;

		}
		/*process the line and store it in the new node,tail points to*/
		tail->data=tokenize(line,tail->prev);
		*proccess_error = (*proccess_error || tail->data == NULL);
	}
	return head;
}

/*This function delete all commands nodes from the list head points to*/
void free_input(cmd_node_ptr *head)
{
	cmd_node_ptr p;

	if(head==NULL)
		return;
	for(p=(*head);(*head);p=(*head))
	{
		if(p->data!=NULL)
		{
			if(p->data->label!=NULL)
			{
				free(p->data->label->label_name);
				free(p->data->label);
			}
			switch(p->data->statement_type)
			{
				case INSTRUCTION:
					switch(p->data->statement->instruction_wrapper->instruction->group)
					{
						case FIRST:
							free(p->data->statement->instruction_wrapper->source_operand);
							free(p->data->statement->instruction_wrapper->destination_operand);
						break;

						case SECOND:
							free(p->data->statement->instruction_wrapper->destination_operand);
						break;

						case THIRD:
						break;
					}
					free(p->data->statement->instruction_wrapper);
				break;

				case DIRECTIVE:
					switch(p->data->statement->directive_wrapper->directive->directive_type)
					{
						case DATA:
							free(p->data->statement->directive_wrapper->data);
						break;

						case STRING:
							free(p->data->statement->directive_wrapper->string);
						break;

						default:
							free(p->data->statement->directive_wrapper->string);
						break;
					}
					free(p->data->statement->directive_wrapper);
				break;

				default:

				break;

			}
			free(p->data->statement);
			free(p->data);
		}
		(*head)=p->next;
		free(p);
	}
}



/*This function brakes a line into tokens
 *and return a pointer to the head of the tokenized list .
 *params:
 *	line-an array that holds the line to be parsed.
 *	lasr_node - points to the previous command.
 *output:
 *	returns a pointer to a parsed command.
 **/
Command *tokenize(char line[],cmd_node_ptr last_node)
{

	extern Instruction insts[INTS_NUM];
	extern Directive directives[DIRECTIVES_NUM];

	Command *cmd=(Command*)calloc(1,sizeof(Command)); /*points to a place that stores the current command*/
	char *word;/*points to the current word this function works with*/
	int symbol;/*Holds 1 if there is a label in the command,0 otherwise*/
	int repeat;/*if the command is an instruction,holds how many times it should be repeated*/
	int direc_index; /*Holds the directive index in directives array*/
	int inst_index;/*Holds the instruction index in directives array*/
	string_ptr head=NULL;/*Points to the head of string node in list*/
	string_ptr tail=NULL;/*Points to the last of string node in list*/
	string_ptr cur;/*Points to the current of string node in list*/
	int list_length=0;/*Holds the number of nodes in the string node list*/
	int error_flag=0;

	if( (word=strtok(line," \t\n"))==NULL )/*Empty line*/
	{
		cmd->statement_type=EMPTY;
		return cmd;
	}
	else if(*word==';')/*comment line*/
	{
		cmd->statement_type=COMMENT;
		return cmd;
	}

	/*This part reads a words and tests if it is a label*/
	if((symbol=is_symbol_definition(word))==(-1) || symbol==1)
	{/*Symbol definition was found*/
		if(symbol==1)
		{
			cmd->label=(Label *)calloc(1,sizeof(Label));
			if(cmd->label==NULL)
			{
				allocation_error();
				return NULL;
			}

			cmd->label->label_name=(char*)calloc(1,strlen(word)+1);
			cmd->label->label_address=-1;
			if(cmd->label->label_name==NULL)
			{
				allocation_error();
				return NULL;
			}
			strcpy(cmd->label->label_name,word);
		}
		else/*The symbol definition is illegal.*/
			return NULL;
	}

	if(symbol==1)/*if there was a label*/
	{
		if( (word=strtok(NULL," \t\n"))==NULL )
		{/*Label of an empty line*/
			error_msg("An empty line can't have a label");
			return NULL;
		}
	}

	/*This part detects if the word is a directive or an instruction,and fill the correspondent fields in the command*/
	if((direc_index=is_directive(word))>=0)
	{
		cmd->statement_type=DIRECTIVE;
		cmd->statement = allocate_statement();
		if(cmd->statement==NULL)
			return NULL;
		cmd->statement->directive_wrapper=(Directive_wrapper*)malloc(sizeof(Directive_wrapper));
		if(cmd->statement->directive_wrapper==NULL)
		{/*Label of an empty line*/
			allocation_error();
			return NULL;
		}
		cmd->statement->directive_wrapper->directive=&(directives[direc_index]);
	}
	else if( (repeat=check_inst(word)) &&(inst_index=is_inst(word))>=0)
	{
		cmd->statement_type=INSTRUCTION;
		cmd->statement = allocate_statement();
		if(cmd->statement==NULL)
			return NULL;
		cmd->statement->instruction_wrapper =(Instruction_wrapper*)malloc(sizeof(Instruction_wrapper));
		if(cmd->statement->instruction_wrapper==NULL)
		{/*Label of an empty line*/
			allocation_error();
			return NULL;
		}
		cmd->statement->instruction_wrapper->instruction=&(insts[inst_index]);
		cmd->statement->instruction_wrapper->repeat=repeat;
	}
	else/*It is not a directive and not an instruction*/
	{
		error_msg("Unknown word");
		return NULL;
	}


	/*This part collect the parameters as strings into a linked list that head points to.*/
	while((word = strtok(NULL,","))!= NULL)
	{
		char *param =validate_and_trim_parameter(word);
		if(param==NULL)/*invalid param was entered*/
			return NULL;
		/*add the the param to the list*/
		if(tail!=NULL)
		{
			tail->next=allocate_string_node();
			if(tail->next==NULL)
			{
				allocation_error();
				return NULL;
			}
			tail=tail->next;
			tail->data=param;
			tail->next=NULL;
		}
		else
		{
			head = allocate_string_node();
			if(head==NULL)
			{
				allocation_error();
				return NULL;
			}
			tail=head;
			tail->data=param;
			tail->next=NULL;
		}
		list_length++;
	}


	cur=head;
	if(list_length==1)
	{
		/* if the statement is "stop  " (with spaces), then the list_length will be equal to 0,*/
		/* and the single parameter will be empty string.*/
		if(strcmp(cur->data,"")==0)
		{
			head=NULL;
			tail=NULL;
			free(cur->data);
			free(cur);
			list_length=0;
		}
	}
	if(list_length>=2)
	{

		for(;cur!=NULL;cur=cur->next)
		{
			if(strcmp(cur->data,"")==0)
			{
				error_flag=1;
				break;
			}
		}
		if(error_flag==1)
		{
			free_params(&head);
			error_msg("One of the operands was empty");
			return NULL;
		}
	}

	/*This part decodes the params that were collected*/
	if(cmd->statement_type==DIRECTIVE)
	{
		if((decode_directive_params(cmd,&head,tail,list_length)==0) )
		{
			free_params(&head);
			return NULL;
		}
	}
	else/*cmd->statement_type==INSTRUCTION*/
	{
		if((decode_instruction_params(cmd,&head,tail,list_length,last_node)==0))
		{
			free_params(&head);
			return NULL;
		}
	}

	if(symbol==1)/*Add the label to the symbol table*/
	{
		if(add_new_symbol(cmd->label,cmd)==0)/*if failed to add then new symbol*/
		{
			free_params(&head);
			return NULL;
		}
	}

	free_params(&head);
	return cmd;
}





/*This function decodes a directive params, returns 1 if succeeded,0 otherwise*/
int decode_directive_params(Command *cmd,string_ptr *head,string_ptr tail,int list_length)
{
	string_ptr p;
	int i;

	if((cmd->statement->directive_wrapper->directive->directive_type)==DATA)
	{
		if(list_length==0)/*if the list is empty-no params*/
		{
			error_msg(".data directive without params");
			return 0;
		}

		for(p=(*head);p;p=p->next)/*Check all .data params are numbers*/
			if(!is_number(p->data))
			{
				error_msg(".data directive params should be numbers");
				return 0;
			}
		/*Extract the numbers into an array of ints and store in the correspondent place in the command */
		cmd->statement->directive_wrapper->data_length=list_length;
		cmd->statement->directive_wrapper->data=(int*)malloc(sizeof(int)*list_length);
		if((cmd->statement->directive_wrapper->data)==NULL)
		{
			allocation_error();
			return 0;
		}
		for(i=0,p=(*head);p;p=p->next,i++)
			(cmd->statement->directive_wrapper->data)[i]= atoi(p->data);

		return 1;
	}
	else if((cmd->statement->directive_wrapper->directive->directive_type)==STRING)
	{
		if(list_length==0)
		{
			error_msg(".string directive without params");
			return 0;
		}
		if(list_length>1)
		{
			error_msg("String directive can't have more than one param");
			return 0;
		}
		cmd->statement->directive_wrapper->string = validate_string((*head)->data);/*Validate the string, and return the extracted from double \" string */
		if((cmd->statement->directive_wrapper->string)==NULL)
			return 0;
		return 1;
	}
	else/*It is .extern or .entry*/
	{
		if(list_length!=1)
		{
			error_msg(".extern and .entry should  have only one parameter");
			return 0;
		}
		cmd->statement->directive_wrapper->string =(char*)malloc(strlen((*head)->data)+1);
		strcpy(cmd->statement->directive_wrapper->string,(*head)->data);

		return 1;
	}
}


/*This function decodes an instruction params, returns 1 if succeeded,0 otherwise*/
int decode_instruction_params(Command *cmd,string_ptr *head,string_ptr tail,int list_length,cmd_node_ptr last_node)
{
	if(list_length>2)
	{
		error_msg("Too many params");
		return 0;
	}
	switch(cmd->statement->instruction_wrapper->instruction->group)
	{
		case FIRST:/*two operands*/
		/*make sure there are two operands as needed*/
		if((*head)==NULL )
		{
			error_msg("Source operand is missing.");
			return 0;
		}
		else if((*head)->next==NULL)
		{
			error_msg("Destination operand is missing");
			return 0;
		}

		/*find the address method and fill each operand */
		/*Source operand*/
		cmd->statement->instruction_wrapper->source_method=find_address_method((*head)->data);
		if((cmd->statement->instruction_wrapper->instruction->source_methodes)[cmd->statement->instruction_wrapper->source_method]==0)
		{/*validate the source operand address method*/
			error_msg("Wrong address method for source operand");
			return 0;
		}

		if(cmd->statement->instruction_wrapper->source_method==PREVIOUS)
		{/*Substitute the source operand with the first operand from the last command*/
			if(check_last_inst(last_node)==1)/*Check that last instruction has at least one operand*/
			{
				Address_method method=last_node->data->statement->instruction_wrapper->source_method;
				char *operand = last_node->data->statement->instruction_wrapper->source_operand;

				if (operand == NULL)/*If no source operand in previous command,take the destination operand*/
				{
					operand = last_node->data->statement->instruction_wrapper->destination_operand;
					method=last_node->data->statement->instruction_wrapper->destination_method;
				}

				cmd->statement->instruction_wrapper->source_operand=(char *)calloc(1,strlen(operand)+1);
				if((cmd->statement->instruction_wrapper->source_operand)==NULL)
				{
					allocation_error();
					return 0;
				}

				strcpy(cmd->statement->instruction_wrapper->source_operand, operand);
				cmd->statement->instruction_wrapper->source_method=method;
			}
			else
			{
				error_msg("Incorrect use of $$ address method");
				free(cmd->statement->instruction_wrapper->source_operand);
				return 0;
			}
		}
		else
		{
			cmd->statement->instruction_wrapper->source_operand=(char *)calloc(1,strlen((*head)->data)+1);
			if((cmd->statement->instruction_wrapper->source_operand)==NULL)
			{
				allocation_error();
				return 0;
			}
			strcpy(cmd->statement->instruction_wrapper->source_operand, (*head)->data);
		}

		/*Destination operand*/
		cmd->statement->instruction_wrapper->destination_method=find_address_method((*head)->next->data);
		if((cmd->statement->instruction_wrapper->instruction->destination_methodes)[cmd->statement->instruction_wrapper->destination_method]==0)
		{/*validate the destination operand address method*/
			error_msg("Wrong address method for destination operand");
			return 0;
		}


		cmd->statement->instruction_wrapper->destination_operand=(char *)calloc(1,strlen((*head)->data)+1);
		if((cmd->statement->instruction_wrapper->destination_operand)==NULL)
		{
			allocation_error();
			free(cmd->statement->instruction_wrapper->source_operand);
			return 0;
		}

		if(cmd->statement->instruction_wrapper->destination_method==PREVIOUS)
		{
			if(check_last_inst(last_node)==1)/*Check that last instruction has an operand*/
			{
				Address_method method=last_node->data->statement->instruction_wrapper->source_method;
				char *operand = last_node->data->statement->instruction_wrapper->source_operand;

				if (operand == NULL)/*If no source operand in previous command,take the destination operand*/
				{
					operand = last_node->data->statement->instruction_wrapper->destination_operand;
					method=last_node->data->statement->instruction_wrapper->destination_method;
				}

				cmd->statement->instruction_wrapper->destination_operand=(char *)calloc(1,strlen(operand)+1);
				if((cmd->statement->instruction_wrapper->destination_operand)==NULL)
				{
					allocation_error();
					return 0;
				}

				strcpy(cmd->statement->instruction_wrapper->destination_operand, operand);
				cmd->statement->instruction_wrapper->destination_method=method;
			}
			else
			{
				error_msg("Incorrect use of $$ address method");
				free(cmd->statement->instruction_wrapper->source_operand);
				free(cmd->statement->instruction_wrapper->destination_operand);
				return 0;
			}
		}
		else
			strcpy(cmd->statement->instruction_wrapper->destination_operand,(*head)->next->data );
		break;

		case SECOND:/*one operand*/
		if((*head)==NULL )
		{
			error_msg("Destination operand is missing.");
			return 0;
		}
		else if((*head)!=tail)
		{
			error_msg("Too many params");
			return 0;
		}
		/*find the address method and fill the destination operand*/
		cmd->statement->instruction_wrapper->destination_method=find_address_method((*head)->data);
		if((cmd->statement->instruction_wrapper->instruction->destination_methodes)[cmd->statement->instruction_wrapper->destination_method]==0)
		{/*validate the destination operand address method*/
			error_msg("Wrong address method for destination operand");
			return 0;
		}

		cmd->statement->instruction_wrapper->destination_operand=(char *)calloc(1,strlen((*head)->data)+1);
		if((cmd->statement->instruction_wrapper->destination_operand)==NULL)
		{
			allocation_error();
			return 0;
		}
		if(cmd->statement->instruction_wrapper->destination_method==PREVIOUS)
		{
			if(check_last_inst(last_node)==1)/*Check that last instruction has an operand*/
			{
				Address_method method=last_node->data->statement->instruction_wrapper->source_method;
				char *operand = last_node->data->statement->instruction_wrapper->source_operand;

				if (operand == NULL)/*If no source operand in previous command,take the destination operand*/
				{
					operand = last_node->data->statement->instruction_wrapper->destination_operand;
					method=last_node->data->statement->instruction_wrapper->destination_method;
				}

				cmd->statement->instruction_wrapper->destination_operand=(char *)calloc(1,strlen(operand)+1);
				if((cmd->statement->instruction_wrapper->destination_operand)==NULL)
				{
					allocation_error();
					return 0;
				}

				strcpy(cmd->statement->instruction_wrapper->destination_operand, operand);
				cmd->statement->instruction_wrapper->destination_method=method;
			}
			else
			{
				error_msg("Incorrect use of $$ address method");
				free(cmd->statement->instruction_wrapper->destination_operand);
				return 0;
			}
		}
		else
		{
			cmd->statement->instruction_wrapper->source_operand=NULL;
			strcpy(cmd->statement->instruction_wrapper->destination_operand,(*head)->data );
		}
		break;

		case THIRD:/*No operands*/
		if(list_length>0)
		{
			error_msg("Too many params");
			return 0;
		}
		break;
	}
	return 1;
}

/*This function checks that the last command has
 * at least one operand.
 * returns 1 if it is,and 0 if it isn't.
 * */
int check_last_inst(cmd_node_ptr last_node)
{
	if(last_node==NULL || last_node->data->statement_type!=INSTRUCTION || last_node->data->statement->instruction_wrapper->instruction->group==THIRD)
		return 0;
	else
		return 1;
}

/*This function allocates memory and returns a pointer to a statement,or NULL if failed.*/
Statement *allocate_statement()
{
	Statement *statement = (Statement*)malloc(sizeof(Statement));
	if(statement==NULL)
		allocation_error();
	return statement;
}


/*This function create a new string node, and returns a pointer to it, or NULL if failed*/
string_ptr allocate_string_node()
{
	string_ptr ptr = (string_ptr)malloc(sizeof(string_node));
	if(ptr==NULL)
		allocation_error();
	return ptr;
}

/*This function validate the param and trim it from white chars,
 * returns a string that contains the valid param.
 * */
char *validate_and_trim_parameter(char *param)
{
	int first=-1,last=-1;/*first will be placed on the first valid char, last on the last valid char*/
	int cnt=0;/*used as index to move along param*/
	char *string;
	int length;


	while(param[cnt]!='\0')
	{
		if(param[cnt]==' ' || param[cnt]=='\t'|| param[cnt]=='\n')/*skip the white chars at the beginning*/
		{
			cnt++;
			continue;
		}

		if(first==(-1))
			first=cnt;/*place first on the first valid char*/
		last=cnt;/*advance last while cnt is an index of a valid char*/
		cnt++;
	}

	if(first==(-1) && last==(-1) )
	{/*It is an empty string*/
		string=(char*)calloc(1,sizeof(char));
		if(string==NULL)
		{
			allocation_error();
			return NULL;
		}
		return string;
	}
	for(cnt=first;cnt<=last;cnt++)
	{/*check that all chars between first and last are valid chars*/
		if(param[cnt]==' ' || param[cnt]=='\t'|| param[cnt]=='\n')
		{
			error_msg("Invalid operand");
			return NULL;
		}
	}

	length=last-first+2;
	string=(char*)calloc(1,length);
	if(string==NULL)
	{
		allocation_error();
		return NULL;
	}
	strncpy(string,param+first,length-1);
	return string;
}

/*This function checks if s can be an instruction,if it is
 * returns 1 or 2 how many times have to be repeated, and 0 otherwise*/
int check_inst(char s[])
{
	int i;
	int repeat;

	if(!isalpha(s[0]))/*check the first char is a letter*/
		return 0;
	for(i=1;s[i]!='\0' && isalnum(s[i]);i++)/*check all other chars are letters or numbers*/
		;
	if(s[i]=='\0')
	{
		if(s[i-1]=='1' || s[i-1]=='2')/*check that s end with 1 or 2*/
		{
			repeat= s[i-1]-'0';
			s[i-1]='\0';
			return repeat;
		}
	}
	return 0;/*s contains not only letters and numbers and can't be an instruction*/
}

/*This function returns the address method that s contains or (-1) in case of error*/
Address_method find_address_method(char *s)
{
	int i;
	if(s==NULL)
		return (-1);

	if((*s)=='#' )
	{
		if(is_number((s+1)))
			return INSTANT;
		else
		{
			error_msg("Instant addressing format is: #NUMBER ");
			return (-1);
		}
	}
	else if(strcmp(s,"$$")==0)
		return PREVIOUS;
	else if(is_reg(s)>=0)
		return REGISTER;
	else if(isalpha(s[0]) && strlen(s)<=MAXLABEL)
	{
		for(i=0;s[i]!='\0' && isalnum(s[i]);i++)
			;
		if((s[i]=='\0'))
			return DIRECT;
		else
		{
			error_msg("A label can contain only letters and numbers");
			return (-1);
		}
	}
	else
	{
		error_msg("Can't recognize an operand");
		return (-1);
	}

}

/* This function returns the number of nodes in the list that head points to.
 * head points to the head of params list to be measured.
 * */
int param_list_length(string_ptr head)
{
	int length;
	string_ptr p;

	for(length=0,p=head;p;p=p->next,length++)
		;
	return length;
}

/* This function checks that string holds a valid string.
 * returns pointer to string without '\"' at the beginning and on the end,
 * or NULL if the string is invalid
 * params:
 * string points to the string to be checked.
 * */
char *validate_string(char *string)
{
	int length=strlen(string);
	int i;
	char *new_string;

	if(length<2)
	{
		error_msg("Incomplete string");
		return NULL;
	}
	if(string[0]!='\"')
	{
		error_msg("A string should start with \" ");
		return NULL;
	}
	if(string[length-1]!='\"')
	{
		error_msg("A string should end with \" ");
		return NULL;
	}
	for(i=1;i<length-1;i++)
	{
		if(string[i]=='\"')
		{
			error_msg("Invalid string");
			return NULL;
		}
	}
	/*extract the string*/
	new_string=(char *)calloc(1,length - 2 + 1);
	strncpy(new_string,string+1,length-2);
	return new_string;
}

/*This function returns 1 if s is a number(have only digits, '-' is optional) and 0 otherwise.
 * params:
 * s-points to the string to be checked.
 * */
int is_number(char *s)
{
	if(s==NULL)
		return 0;
	if((*s)=='-')
		s++;
	while((*s)!='\0' && isdigit(*s) )
		s++;
	return ((*s)=='\0')?1:0;
}


/* This function deletes all nodes (*head) points to.
 * params:
 * head-points to the head of the list to be deleted.
 * */
void free_params(string_ptr *head)
{
	string_ptr p;

	if(head==NULL)
		return;
	for(p=(*head);(*head);p=(*head))
	{
		if((p)->data !=NULL)
			free((p)->data);
		(*head)=p->next;
		free(p);
	}
}



/* This function reads a line from fp into line and
 * returns the length of the line or 0 if EOF encountered.
 * params:
 * line- an array to write the line into.
 * maxline-holds the size of line.
 * */
int get_line(char line[],int maxLine)
{
	if(fgets(line,maxLine,fp)==NULL)
		return 0;
	else
		return strlen(line);
}
