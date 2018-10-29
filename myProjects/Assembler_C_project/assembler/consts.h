/*
 * consts.h
 *
 *  Created on: Jul 29, 2015
 *      Author: Ilya Livshits
 */

#ifndef CONSTS_H_
#define CONSTS_H_

#define FILE_NAME_MAXSIZE 101
#define MAXLINE	 1001
#define MAXLABEL 30
#define MAXINST  80
#define INPUT_FILE_END ".as"

#define ADDRESS_METHODES_NUM 4
#define INTS_NUM 16
#define DIRECTIVES_NUM 4
#define REGS_NUM 8
#define CODE_SEG_SIZE 1000
#define DATA_SEG_SIZE 1000
#define CODE_INIT_ADDRESS 100
#define DATA_INIT_ADDRESS 0


typedef enum  {FIRST=2,SECOND=1,THIRD=0} Inst_group;
typedef enum  {DATA,STRING,ENTRY,EXTERN} Directive_type;
typedef enum  {EMPTY,COMMENT,INSTRUCTION,DIRECTIVE} Statement_type;
typedef enum  {INSTANT,DIRECT,PREVIOUS,REGISTER} Address_method;
typedef enum  {ABSOLUTE,EXTERNAL,RELOCATABLE} ARE;

#endif /* CONSTS_H_ */
