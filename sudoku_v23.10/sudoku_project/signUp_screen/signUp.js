{
    document.addEventListener('DOMContentLoaded', () => {

        //Pointers to form elements
        const form= document.getElementById("form");
        const firstName=document.getElementById("firstName");
        const lastName=document.getElementById("lastName");
        const userName=document.getElementById("userName");
        const userPassword=document.getElementById("userPassword");
        const repeatPassword=document.getElementById("repeatPassword");
        const createBtn=document.getElementById("createBtn");

        //Object representing the form.
        const signUpForm={
            /*
                @param primaryInputId - The target input.

                @param secondaryInputId - An Optional input for validation primaryInputId if depends on secondaryInputId.If unnessecary set to undefined.

                @param ruleFunc- A function that valid the primaryInputId, uses the  secondaryInputId if not undefined.

                @param validFunc- A function tells what to do if primaryInputId is found valid.

                @param inValidFunc- A function tells what to do if primaryInputId is found invalid.
                
                @return true if form is valid, false otherwise.
            */
            validate: function(primaryInputId,secondaryInputId,ruleFunc,validFunc,inValidFunc){
                const parentLi=primaryInputId.parentNode;
                const small=parentLi.querySelector('small');

                try{
                    if(typeof secondaryInputId !== "undefined"){
                        ruleFunc(primaryInputId,secondaryInputId);
                    }else{
                        ruleFunc(primaryInputId);
                    }
                    validFunc(small);
                    return true;
                }catch(e){
                    inValidFunc(small,e);
                    return false;
                }
            }
        }


        createBtn.addEventListener('click',()=>{

            const signUpUser={//Object that represents the user to be signed up
                firstName: '',
                lastName: '',
                userName: '',
                userPassword: '',
    
                set: function(firstName,lastName,userName,userPassword){
                    this.firstName=firstName;
                    this.lastName=lastName;
                    this.userName=userName;
                    this.userPassword=userPassword;
                }
            };
    
            try{
    
                signUpUser.set(firstName,lastName,userName,userPassword);
                // Registrate user to  User-Server

                /*BUG BUG BUG  userServer undefined*/
                userServer.signUpRequest(signUpUser);
               
                /*TEST- should be deleted when userServer is working*/
                const hrefConnection= '../login_screen/login.html';
                window.location.href=hrefConnection;
            }catch(error){// registration Failed
                alert(error);
            }
    
        });

        form.addEventListener('input',(e)=>{
            
            if(e.target.tagName!=='INPUT'){
                return;
            }


            const validFirstName=signUpForm.validate(firstName,undefined,firstNameRule,correct,wrong);
            const validLastName=signUpForm.validate(lastName,undefined,lastNameRule,correct,wrong);
            const validUserName=signUpForm.validate(userName,undefined,userNameRule,correct,wrong);
            const validUserPassword=signUpForm.validate(userPassword,undefined,userPasswordRule,correct,wrong);
            const validRepeatPassword=signUpForm.validate(repeatPassword,userPassword,repeatPasswordRule,correct,wrong);

            const validForm =(validFirstName && validLastName && validUserName && validUserPassword && validRepeatPassword);

            //Enable the create button if the form is valid,block otherwise.
    
            if(validForm){
                createBtn.disabled=false;
            }else{//The form is invalid-Block the signUp button
                createBtn.disabled=true;
            }
            
        });


        /*Helper Functions*/
        function correct(element){
            const correct="&#9745;";
            const clas="valid";
    
            element.className=clas;
            element.innerHTML=correct;
        }
    
        function wrong(element,errorMessage){
            const wrong =`&#9746; ${errorMessage}. `;
            const clas="inValid";
    
            element.className=clas;
            element.innerHTML=wrong;
        }

        function isAlphaChar(char){
            return char.toUpperCase()!==char.toLowerCase();
        }

        function isNumericChar(char){
            return (char>='0' && char<='9');
        }
        
        function firstNameRule(firstName){
            firstName=firstName.value;
            if(firstName.length<1){
                throw "Please enter your name";
            }

            let i=0;
            while(i<firstName.length){
                const char= firstName.charAt(i);
                if(!(isAlphaChar(char))){
                    throw  "A name must conatin letters only";
                }
                i++;
            }

        }

        function lastNameRule(lastName){   
            lastName=lastName.value;      
            if(lastName.length<1){
                throw "Please enter your last name";
            }

            let i=0;
            while(i<lastName.length){
                const char= lastName.charAt(i);
                if(!(isAlphaChar(char))){
                    throw  "A last name must conatin letters only";
                }
                i++;
            }
        }

        function userNameRule(userName){
            const minLength=8;
            const maxLength=12;
            userName=userName.value; 
            
            if(userName.length>=minLength && userName.length<=maxLength ){
                let i=0;
                while(i< userName.length){
                    const char= userName.charAt(i);
                    if(!(isAlphaChar(char)||isNumericChar(char))){
                        throw `userName should contain letters and digits only`;
                    }
                    i++;
                }
            }else{
                throw `userName length allowed ${minLength} to ${maxLength} chars`;
            }
        }

        
        function userPasswordRule(userPassword){
            const minLength=8;
            const maxLength=12;
            userPassword=userPassword.value; 
            if(userPassword.length>=minLength && userPassword.length<=maxLength ){
                let i=0;
                while(i< userPassword.length){
                    const char= userPassword.charAt(i);
                    if(!(isAlphaChar(char)||isNumericChar(char))){
                        throw `Password should contain letters and digits only`;
                    }
                    i++;
                }
            }else{
                throw `Password length allowed ${minLength} to ${maxLength} chars`;
            }
        }

        function repeatPasswordRule(repeatPassword,userPassword){
            repeatPassword=repeatPassword.value; 
            userPassword=userPassword.value; 

            if(repeatPassword.length===0){
                throw "Please repeat the password";
            }

            if(repeatPassword.length!==userPassword.length){
                throw "Must be the same length as the password";
            }

            let i=0;
            while(i<repeatPassword.length){
                const rChar=repeatPassword.charAt(i);
                const pChar=userPassword.charAt(i);

                if(rChar!==pChar){
                    throw `Must be identical to the password`;
                }
                i++;
            }
        }


        
    });
}