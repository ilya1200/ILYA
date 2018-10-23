/*Imitate users server*/
{
    document.addEventListener('DOMContentLoaded', () => {
    
        const guestUser={
            userName:"Guest",
            allowedToPlay: ["Easy"]
        };
    
        const user={
            firstName: null,
            lastName:  null,
            userName:  null,
            password:  null,
            allowedToPlay: ["Easy","Medium","Hard"],
    
            /*Methodes*/
            updateUser: function(firstName,lastName,userName,password){
                this.firstName=firstName;
                this.lastName=lastName;
                this.userName=userName;
                this.password=password;
            },
        };
    
    
        const userServer={
            loginRequest: function(loginUser){
                if(loginUser===null || user.name===null || user.userName!==loginUser.userName){
                    throw "No such user";
                }else if(user.password!==loginUser.password){
                    throw "Wrong password";
                }else{
                    //gameServer.connect(user);
                    const gameSetUpHref='../gameSetUp_screen/gameSetUp.html';
                    window.location.href=gameSetUpHref;
                }
    
            },
    
            loginAsGuestRequest:function(){
                //gameServer.connect(guestUser);
                const gameSetUpHref='../gameSetUp_screen/gameSetUp.html';
                window.location.href=gameSetUpHref;
            },
    
            signUpRequest:function(signUpUser){
                if(this.signUpRequest===null){
                    throw "null user is not allowed";
                }
    
                if(user===null || user.userName!==signUpUser.userName){
                    user.updateUser(signUpUser.firstName,signUpUser.lastName,
                        signUpUser.userName,signUpUser.password);
                    const loginHref='../login_screen/login.html';
                    window.location.href=loginHref;
                }else{
                    throw "There is already a user with a same userName";
                }
            }
    
        };
        
            
    });
}