{
    document.addEventListener('DOMContentLoaded', () => {
        const signUpBtn=document.getElementById('signUpBtn');
        const connectBtn=document.getElementById('connectBtn');
     
    
        signUpBtn.addEventListener('click',()=>{
            const signUpHref='../signUp_screen/signUp.html';
            window.location.href=signUpHref;
        });
    
    
        connectBtn.addEventListener('click',()=>{
            
            const loginUser={//Object represents the user to be loged in.
                name: '',
                password: '',
        
                setUser : function(userName,userPassword){
                    this.name=userName;
                    this.password=userPassword;
                },
        
                resetUser : function(){
                    this.name='';
                    this.password='';
                }
            };
    
            const loginName=document.getElementById("userName");
            const loginPassword=document.getElementById("userPassword");
    
            // Gather login data
            loginUser.resetUser();
            loginUser.setUser(loginName.value,loginPassword.value);
    
            // Ask the user-server for permission to connect
            try{
                /* BUG BUG BUT : userServer unknown */
                userServer.loginRequest(loginUser);

                //Connect -TEST -SHOULD BE DELETED WHEN userServer work
                const connectHref='../gameSetUp_screen/gameSetUp.html';
                window.location.href=connectHref;
               
            }catch(error){
                const rejectMessage=error;
                alert(rejectMessage);
    
                // Reset loginUser and the form
                loginUser.resetUser();
                loginName.value='';
                loginPassword.value='';
            }
            
        });
    


        
    });
 
}

