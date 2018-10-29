/*
 * symbolTabel.h
 *
 *  Created on: Jul 31, 2015
 *      Author: student
 */

#ifndef SYMBOLTABEL_H_
#define SYMBOLTABEL_H_

#include "dataStructs.h"



/*This function adds a new symbol to the end of the list.
 * input:
 * 	label- points to the node to be added to the list.
 * 	cmd-points to the command label belong to.
 * output:
 * 	returns 1 if succeed else returns 0.
 * */
int add_new_symbol(Label *label,Command *cmd);


/* This function determine if a word is a symbol definition.
 * input:
 * 	word - contains the word to be checked.
 * output:
 * 	returns 1 if it is a good definition,
 * 			0 if it is illegal definition,
 * 			(-1) if it isn't a symbol definition at all.
 *  */
Label_node_ptr find_symbol(char *label_name);


/* This function determine if a word is a symbol definition.
 * if it is a good definition return 1, if it is illegal definition ,return -1
 * if it isn't a symbol definition at all return 0.
 * params:
 * word - contains the word to be checked.
 *  */
int is_symbol_definition(char *word);

/*
 * This function delete the table head is holding,and sets head and last to NULL.
 * */
void free_symbol_tabel();

/*This function align labels that are attached to directives.
 * input:
 * 	offset-the value of alignment.
 * */
void align_directive_labels(int offset);


#endif /* SYMBOLTABEL_H_ */
