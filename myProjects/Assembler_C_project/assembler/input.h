/*
 * input.h
 *
 *  Created on: Jul 29, 2015
 *      Author: student
 */

#ifndef INPUT_H_
#define INPUT_H_

#include "dataStructs.h"

FILE *fp; /*Holds the current input file the program working with*/
char *input_file;/*holds the file name without extension*/
char *input_filename;/*Holds the name of the current file*/
int line_number;/*Holds the current line number in the current file*/


/*This function collects and processes the input,returns a pointer to list of commands,or NULL if error.*/
cmd_node_ptr process_input();

/* This function delete all commands nodes from the list head points to
 * params:
 * 	head-points to the first command node.
 * */
void free_input(cmd_node_ptr *head);


/*This function brakes a line into tokens
 *and return a pointer to the head of the tokenized list .
 *params:
 *	line-an array that holds the line.
 **/
Command *tokenize(char line[],cmd_node_ptr last_node);



/* This function reads a line from fp into line and
 * returns the length of the line or 0 if EOF encountered.
 * params:
 * 	line- an array to write the line into.
 *	maxline-holds the size of line.
 * */
int get_line(char line[],int maxLine);

#endif /* INPUT_H_ */
