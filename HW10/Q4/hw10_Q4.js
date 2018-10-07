const die1=document.querySelectorAll('.die')[0];
const die2=document.querySelectorAll('.die')[1];

const dieSides=[
    `<img src="images/1c.png" alt="1">`,
    `<img src="images/2c.jpg" alt="2">`,
    `<img src="images/3c.gif" alt="3">`,
    `<img src="images/4c.gif" alt="4">`,
    `<img src="images/5c.png" alt="5">`,
    `<img src="images/6c.png" alt="6">`
];


function dieRoll(){
    return Math.floor( Math.random()*6 )+1;
}

function diceRoll(){
    die1.textContent=dieRoll();
    die2.textContent=dieRoll();
}

function diceRoll2(){
    const roll1=dieRoll()-1;
    const roll2=dieRoll()-1;
    die1.innerHTML=dieSides[roll1];
    die2.innerHTML=dieSides[roll2];
}


function myFunction() {
    setInterval(diceRoll2, 1500);
}

myFunction();