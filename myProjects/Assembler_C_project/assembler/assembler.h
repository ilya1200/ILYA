/*
 * assembler.h
 *
 *  Created on: Jul 29, 2015
 *      Author: Ilya Livshits
 */


#ifndef ASSEMBLER_H_
#define ASSEMBLER_H_

#include "dataStructs.h"

/*	This function handles the first step as described earlier.
 * 	input:
 * 		commands_head -points to the head of the list that keeps the processed commands.
 *		cs- points to the code segment.
 *		ds-points to the head of the data segment.
 *	output:
 *		returns 1 if succeed,and 0 in case of error.
 * */
int step1(cmd_node_ptr commands_head,Code_seg *cs,Data_seg *ds);


/*	This function handles the second step.
 * 	input:
 * 		commands_head- points to the first command in the list.
 * 		cs-points to the code segment.
 * 		ds-points to the data segment.
 * 	output:
 * 		returns 1 if succeed,and 0 otherwise.
 * */
int step2(cmd_node_ptr commands_head,Code_seg *cs,Data_seg *ds);

#endif /* ASSEMBLER_H_ */
