COM0 = gcc -c -ansi -Wall -pedantic -ggdb
COM1 = gcc -g -ansi -Wall -pedantic -ggdb

assembler:assembler.o step1.o step2.o dataStructs.o symbolTable.o input.o output.o
	$(COM1) assembler.o step1.o step2.o dataStructs.o symbolTable.o input.o output.o -o assembler
	
assembler.o:assembler.c assembler.h libraries.h consts.h output.h dataStructs.h input.h symbolTable.h
	$(COM0) assembler.c -o assembler.o
step1.o:step1.c consts.h libraries.h assembler.h dataStructs.h input.h symbolTable.h
	$(COM0) step1.c -o step1.o
step2.o:step2.c 
	$(COM0) step2.c -o step2.o
dataStructs.o:dataStructs.c dataStructs.h libraries.h consts.h output.h input.h symbolTable.h
	$(COM0) dataStructs.c -o dataStructs.o
input.o:input.c input.h libraries.h consts.h dataStructs.h symbolTable.h output.h
	$(COM0) input.c -o input.o
output.o:output.c output.h libraries.h input.h consts.h
	$(COM0) output.c -o output.o
symbolTable.o:symbolTable.c symbolTable.h libraries.h consts.h dataStructs.h output.h
	$(COM0) symbolTable.c -o symbolTable.o
clean: 
	rm *.o
	rm *~
	rm assembler

