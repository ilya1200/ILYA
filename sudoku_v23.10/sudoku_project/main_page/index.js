{
    document.addEventListener('DOMContentLoaded', () => { debugger;
        const guestBtn=document.getElementById("guestBtn");
        const loginBtn=document.getElementById("loginBtn");
    
        guestBtn.addEventListener('click',()=>{
            const userServerAddress="../Global_Util/Servers/userServer.js";
            import {userServer} from userServerAddress;
            userServer.loginAsGuestRequest();
        });
    
        loginBtn.addEventListener('click',()=>{
            const loginHref='../login_screen/login.html';
            window.location.href=loginHref;
        });
            
    });
}