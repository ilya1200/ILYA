/*
 * assembler.c
 *
 *  Created on: Jul 21, 2015
 *      Author: Ilya Livshits
 *
 *   Description:
 *   	This file contain the main function which only role is to open
 *   	the input files from the command line and pass them to the other
 *   	functions,and close the files when they aren't needed anymore.
 */
#include "libraries.h"
#include "consts.h"
#include "assembler.h"
#include "input.h"
#include "dataStructs.h"
#include "symbolTable.h"
#include "output.h"



/*	This function handles the assembler work and translate an assembly code
 * 	into its binary.
 * 	input:
 * 		argv- have to contain names of the files that have to be translated.
 * 	output:
 *	 returns 0 if succeed ,1 in case of error.
 * */
int main(int argc,char *argv[])
{
	Code_seg cs;/*Holds pointer to the code segment and the IC.*/
	Data_seg ds;/*Holds pointer to the data segment and the DC.*/
	cmd_node_ptr commands_head;
	int i;
	int proccess_error=0;/*a flag that indicates about an error(when 1) in processing the input*/

	if(argc==1)/*No files were entered.*/
	{
		fprintf(stderr,"ERROR:Please enter files to assemble. \n");
		return 1;
	}
	else
	{
		for(i=1;argv[i];i++)
		{
			input_file=argv[i];
			input_filename=(char *)calloc(1,FILE_NAME_MAXSIZE);
			strcpy(input_filename,argv[i]);
			strcat(input_filename,INPUT_FILE_END);/*add ending to the filename.*/

			if(input_filename==NULL)
			{
				fprintf(stderr,"ERROR:Can't allocate memory:%s.\n",input_filename);
				free(input_filename);
				continue;
			}

			if((fp=fopen(input_filename,"r"))==NULL)
			{
				file_open_error(input_filename);/*Failed to open a file*/
				continue;
			}
			else
			{
				commands_head=process_input(&proccess_error);/*makes commands_head points to the first command in the list after processing the input*/
				if(commands_head!=NULL && proccess_error==0)
				{
					if( (step1(commands_head,&cs,&ds)==1) )/*if succeed*/
					{
						if(((step2(commands_head,&cs,&ds)==1)))	/*if succeed*/
						{
							output(&cs,&ds);
						}
					}
				}
				fclose(fp);
			}
			free_input(&commands_head);
			commands_head=NULL;

			free_symbol_tabel();
			free_extern_table();
			free_entry_table();
			free(input_filename);
		}
	}
	return 0;
}
