/*
 * output.h
 *
 *  Created on: Jul 29, 2015
 *      Author: Ilya Livshits
 */

#ifndef OUTPUT_H_
#define OUTPUT_H_

/*This function prints an error message
 * related to a label.
 * input:
 * 	description-contains details about the error.
 * 	label-holds the name of the label caused error.
 * */
void error_msg_label(char *description, char *label);


/*This function prompts the error messages.
 *description-contains details about the error.
 * */
void error_msg(char *description);

/*Prints a message that memory allocation failed.*/
void allocation_error();

/*This function prints an error about a failure to open a file.
 * input-
 * 	fn-holds the name of the file that couldn't be opened.
 * */
void file_open_error(char *fn);

/*This function creates and opens a new file for writing.
 *The file will be input_filename.extension.
 *input_filename(defined in consts.h),extension  specified in parameters.
 *
 *input:
 *	extension - points to a string to be added to the file name.
 *output:
 *	return a pointer to the file if succeed to open,and NULL in case of error.
 * */
FILE  *create_and_open_file(char *extension);

/*This function converts a decimal number into base 4.
 * input:
 * 		decimal_number-the number to be converted.
 * 	output:
 * 		returns a number equivalent to decimal_number in base 4.
 * */
int convert_decimal_to_four(int decimal_number);

/*This function converts an index of code segment into an address.
 * input:
 * 	index - an index in code segment.
 * output:
 * 	an int that represents an address
 * */
int get_code_segment_address(int index);

/*This function converts an index of data segment into an address.
 * input:
 * 	index - an index in data segment.
 * output:
 * 	an int that represents an address
 * */
int get_data_segment_address(int index);

/*This function handles the output of the program.
 * input:
 * 	cs-points to the code segment.
 * 	ds-points to the data segment.
 * */
void output(Code_seg *cs,Data_seg *ds);

/*This function prints the binary version of the input file into file_name.obj
 * input:
 *		cs-points to the code segment.
 *		ds-points to the data segment.
 * */
void obj_output(Code_seg *cs,Data_seg *ds);

#endif /* OUTPUT_H_ */
