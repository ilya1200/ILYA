{
     /*
    The function asks for a number from the user,
    and writes whether its positive or negative.
  */
    function isPositive(){
    var number=parseInt(getInput("input_1"));
    
    if(isNaN(number)){
        writeToOutput("output_1","Error: Please enter a number.");
        return;
    }

    if(number>0){
        writeToOutput("output_1","The number is Positive.");
    }else if(number<0){
        writeToOutput("output_1","The number is Negative.");
    }else{
        writeToOutput("output_1","The number is 0.");
    }
  }

    /*
    The function asks for a number from the user,
    and writes whether its Even or Odd.
  */
  function isEven(){
    var number=parseInt(getInput("input_1"));

    if(isNaN(number)){
        writeToOutput("output_1","Error: Please enter a number.");
        return;
    }

    if(number%2===0){
        writeToOutput("output_1","The number is Even.");
    }else{
        writeToOutput("output_1","The number is Odd.");
    }
  }


    /*
    The function asks for a letter from the user,
    and writes whether its Capital.
  */
  function isCapital(){
    var char=getInput("input_2");
    
    if(char.length===0 || !isAlpha(char)){
        writeToOutput("output_2","Error: Please enter a letter");
    }else if(char.length>1){
        writeToOutput("output_2","Error: Too much");
    }else if(char===char.toUpperCase()){
        writeToOutput("output_2","Capital");
    }else{
        writeToOutput("output_2","Low case");
    }
    
  }

    /*
        The function asks for two Strings from the user,
        and determines the longest and the shorten string,
        writes the result.
    */
    function longestString(){
        var str1=getInput("input_3");
        var str2=getInput("input_4");
        var shortStr=""; 

        if(str1.length>str2.length){
            if(str2.length>0){
                shortStr=str1.substring(0,str2.length);
            }else{
                shortStr=str1;
            }
            
            writeToOutput("output_3","The Longest."+" Short String: "+shortStr);
            writeToOutput("output_4","");
        }else if(str2.length>str1.length){
            if(str1.length>0){
                shortStr=str2.substring(0,str1.length);
            }else{
                shortStr=str2;
            }

            shortStr=str2.substring(0,str1.length);
            writeToOutput("output_3","");
            writeToOutput("output_4","The Longest."+"Short String: "+shortStr);
        }else{
            writeToOutput("output_3","Length is equal");
            writeToOutput("output_4","Length is equal");
        }
    }


    /*
        Returns true if char is a character,and false otherwise.
    */
    function isAlpha(char){
        return char.toUpperCase() !== char.toLowerCase() ;
    }

    /*
        Returns true if string polindrome.
    */
    function isPolindrome(){
        var str=getInput("input_5");
        var isPol=false;
        var strLength=4;

        if(str.length===strLength){
            isPol=recIsPolindrome(str.substring(0,str.length));
            if(isPol){
                writeToOutput("output_5","Polindrome");
            }else{
                writeToOutput("output_5","Not Polindrome");
            }
        }else{
            writeToOutput("output_5","Input string length must be "+strLength);
        }

    }


    /*
        Returns true if string polindrome.
    */
    function recIsPolindrome(str){
        var leftChar;
        var rightChar;
        var isPol=false;

       
        if(str.length<2){
            return true;
        }

        leftChar=str.charAt(0);
        rightChar=str.charAt(str.length-1);
        isPol=(leftChar===rightChar)&&( recIsPolindrome(str.substring(1,str.length-1)) );
        return isPol;
    }

    /*
    The function writes the specified content into the output Id of which is supplied.
    @param outputtId - Direction to write content into.
    @param content- The string to be written to the output.
  */
  function writeToOutput(outputId,content){
    document.getElementById(outputId).innerHTML=content;

  }

  /*
    The function reads the user input from the specified place.
    @param userInputId - specifies the input to read from.
    @return A string that represents the user input.
  */
  function getInput(userInputId){
    var input=document.getElementById(userInputId).value;
    return input;
  }

};