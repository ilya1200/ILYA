/*
 * output.c
 *
 *  Created on: Jul 29, 2015
 *      Author: Ilya Livshits
 *
 *  Description:
 *  	This file responsible for the output
 * 	  	of the program.
 */

#include "libraries.h"
#include "consts.h"
#include "input.h"
#include "dataStructs.h"
#include "symbolTable.h"
#include "output.h"

int convert_internal(int decimal_number,int multiplier);


/*This function prints an error message
 * related to a label.
 * input:
 * 	description-contains details about the error.
 * 	label-holds the name of the label caused error.
 * */
void error_msg_label(char *description, char *label)
{
	fprintf(stderr,"ERROR: Filename:%s.\tLine:%d.\tDescription:%s.\nLabel:%s.",input_filename,line_number, description, label);
}

/*This function prompts the error messages.
 *description-contains details about the error.
 * */
void  error_msg(char *description)
{
	fprintf(stderr,"ERROR: Filename:%s.\tLine:%d.\tDescription:%s.\n",input_filename,line_number,description);
}

/*Prints a message that memory allocation failed.*/
void allocation_error()
{
	fprintf(stderr,"ERROR:Can't allocate memory.\n");
}

/*This function prints an error about a failure to open a file.
 * input-
 * 	fn-holds the name of the file that couldn't be opened.
 * */
void file_open_error(char *fn)
{
	fprintf(stderr,"Can't open the file: %s.\n",fn);
}

/*This function doing the conversion for convert_decimal_to_four function.
 * input:
 * 	decimal_number-decimal_number-the number to be converted.
 * 	multiplier -used for the conversion.
 * output:
 * 	returns a number equivalent to decimal_number in base 4.
 * */
int convert_internal(int decimal_number,int multiplier)
{
	if(decimal_number==0)
		return decimal_number;
	return (decimal_number%4)*multiplier+convert_internal(decimal_number/4,multiplier*10);
}

/*This function converts a decimal number into base 4.
 * input:
 * 		decimal_number-the number to be converted.
 * 	output:
 * 		returns a number equivalent to decimal_number in base 4.
 * */
int convert_decimal_to_four(int decimal_number)
{
	int mask = 4095;
	decimal_number = decimal_number & mask;
	return convert_internal(decimal_number,1);
}

/*This function converts an Asm_word into int in base four.
 * input:
 * 	word-hold the word to be converted.
 * output:
 * 	returns an int in base 4 that equivalent to word.
 * */
int convert_asm_word_to_four(Asm_word word)
{
	int result=convert_decimal_to_four(word);
	return result;
}

/*This function converts an index of code segment into an address.
 * input:
 * 	index - an index in code segment.
 * output:
 * 	an int that represents an address
 * */
int get_code_segment_address(int index)
{
	return index+CODE_INIT_ADDRESS;
}

/*This function converts an index of data segment into an address.
 * input:
 * 	index - an index in data segment.
 * output:
 * 	an int that represents an address
 * */
int get_data_segment_address(int index)
{
	return index+DATA_INIT_ADDRESS;
}

/*This function handles the output of the program.
 * input:
 * 	cs-points to the code segment.
 * 	ds-points to the data segment.
 * */
void output(Code_seg *cs,Data_seg *ds)
{
	obj_output(cs,ds);
	print_entry_table();/*if entry labels were found,print their names and addresses.*/
	print_extern_table();/*if extern labels were found,print their names and appearances.*/
}

/*This function prints the binary version of the input file into file_name.obj
 * input:
 *		cs-points to the code segment.
 *		ds-points to the data segment.
 * */
void obj_output(Code_seg *cs,Data_seg *ds)
{
	int i;
	int code_end;
	FILE *obj_fp =create_and_open_file(".obj");


	if(obj_fp==NULL)
		return;

	/*print header*/
	fprintf(obj_fp,"\t%d\t%d\n",convert_decimal_to_four(cs->IC),convert_decimal_to_four(ds->DC));

	/*print instructions and their addresses*/
	for(i=0;i<(*cs).IC;i++)
	{
		fprintf(obj_fp,"%d\t%.6d\n",convert_decimal_to_four(get_code_segment_address(i)),convert_asm_word_to_four((cs->code)[i]));
	}

	code_end=get_code_segment_address(cs->IC);
	/*print data and their addresses*/
	for(i=0;i<(*ds).DC;i++)
	{
		fprintf(obj_fp,"%d\t%.6d\n",convert_decimal_to_four(code_end+get_data_segment_address(i)),convert_asm_word_to_four((ds->data)[i]));
	}

	fclose(obj_fp);
}



/*This function creates and opens a new file for writing.
 *The file will be input_filename.extension.
 *input_filename(defined in consts.h),extension  specified in parameters.
 *
 *input:
 *	extension - points to a string to be added to the file name.
 *output:
 *	return a pointer to the file if succeed to open,and NULL in case of error.
 * */
FILE  *create_and_open_file(char *extension)
{
	char *ent_file=(char*)calloc(1,strlen(input_file)+strlen(extension)+1);
	FILE *ent_fp;

	if(ent_file==NULL)
	{
		allocation_error();
		return NULL;
	}
	strcpy(ent_file,input_file);
	strcat(ent_file,extension);/*add the extension*/

	ent_fp=fopen(ent_file,"w");

	if(ent_fp==NULL)
	{
		file_open_error(ent_file);
		free(ent_file);
		return NULL;
	}

	free(ent_file);
	return ent_fp;
}
