{
    document.addEventListener('DOMContentLoaded', () => {
        const body=document.querySelector('body');
        
        /*
            ******************** 
            pageManager
            ******************** 
        */ 
        const pageManager={
            main:         
            `<div id="main">
            <div class="container">
            <div class="jumbotron">
                <header>
                    <h1 class="display-1">Sudoku Game</h1>
                </header>
                    
            
                <div id="buttons">
                    <button id="guestBtn" class="btn btn-secondary" type="button">Guest</button>
                    <button id="loginBtn" class="btn btn-primary" type="button">Login</button>
                </div>
            </div>
            </div>
            </div>`,

            login:                 
            `<div id="login">
            <div class="container">     
            <div class="jumbotron">
                <header>
                    <h1>Log in</h1>
                </header>
                <form action="login.html" method="POST">
                    <fieldset>
                        <legend><span></span></legend>
                        <div class="form-group">
                            <label class="col-form-label" for="userName">User:</label>
                            <input id="userName" class="form-control" name="user_name" type="text" placeholder="Enter User Name">
        
                            <label for="userPassword">Password:</label>
                            <input id="userPassword" class="form-control" name="user_password" type="password" placeholder="Password">
        
                            <a href="mailto:email@gmail.com?subject=Your%20password">Forgot the password</a>
                        </div>
        
                        <div id="row2">
                                <button type="button" class="btn btn-primary" id="signUpBtn">Sign-Up</button>
                                <button type="button" class="btn btn-primary" id="connectBtn">Connect</button>
                        </div>
                    </fieldset>
        
                </form>
                </div>
                </div>
            </div>`,

            signUp: 
            `<div id="signUp">
            <div class="container">     
                 <div class="jumbotron">
                 
                <header>
                    <h1>Sign Up</h1>
                </header>
                <div class="jumbotron" id = "fillForm">
                <form id="form" action="signUp" method="POST">
                  
                    <fieldset>
                        <legend></legend>
            
                        <fieldset>
                            <legend class="text-muted"><span class="numbers"></span> Basic Info</legend>
                            
                            <div class="form-group">
                            <ul class="row1">
                                <li>
                                
                                    <label for="firstName">First Name:</label>
                                    <input id="firstName" class="form-control" name="user_firstName" type="text" placeholder="Enter Your First Name">
                                    <small></small>
                                </li>     
                                <li>
                                    <label for="lastName">Last Name:</label>
                                    <input id="lastName" class="form-control" name="user_lastName" type="text" placeholder="Enter Your Last Name">
                                    <small></small>
                                </li>
        
                            </ul>
                            </div>
                        </fieldset>
        
                        
                        <fieldset>
                            <legend class="text-muted"><span class="numbers" ></span> Profile</legend>
                            <div class="form-group row" >
                            <ul class="row2">
                                <li>
                                    <label for="userName">User Name:</label> 
                                    <input id="userName" class="form-control" name="userName" type="text" placeholder="Enter Your User Name">
                                    <small></small>
                                </li>
                                <li>
                                    <label for="userPassword">Password:</label>
                                    <input id="userPassword" class="form-control" name="userPassword" type="password" placeholder="Enter Your Password">
                                    <small></small>
                                </li>
        
                                <li>
                                    <label for="repeatPassword">Repeat Password:</label>
                                    <input id="repeatPassword" class="form-control" name="repeatPassword" type="password" placeholder="Repeat Your Password">
                                    <small></small>
                                </li>
                                
                            </ul>  
                            </div> 
                        </fieldset> 
                        
                        <div class="row3">
                            <button type="button" class="btn btn-primary btn-lg" id="createBtn" disabled>Create</button>
                        </div>
        
                        <footer>
                                <small>*The form must be valid &amp; complete to sign up</small> 
                        </footer>
                    </fieldset>
                  
                </form>
                </div>
                </div>   
             </div>`,

            gameSetUp:`<!DOCTYPE html>
            <html>
                <head>
                    <title>Game Set-Up</title>
                </head>
                <body>
                    <div id="gameSetUp">
                    <div class="container">     
                    <div class="jumbotron">
                        <header >
                           <h3 >Welcome <span id="gameUserName"></span></h3> 
                        </header>
                    
                        <div>
                        
                            <h2 class="display-3" > Create a game</h2>
                            <div id="card" class="card border-dark mb-3" style="max-width: 20rem;">
                            <form action="gameSetUp.html" method="POST">
                                <fieldset>
                                    <legend> <h4 class="card-title">Choose a level</h4></legend>
                                    <ul id="levelSelect">
                                        <li>                            
                                            <input class="level easy" id="easy" name="game_lvl" type="radio" value="Easy" checked>
                                            <label>Easy</label>
                                        </li>
            
                                        <li>
                                            <input class="level medium" id="medium" name="game_lvl" type="radio" value="Medium">
                                            <label>Medium</label>
                                        </li>
            
                                        <li>
                                            <input class="level hard" id="hard" name="game_lvl" type="radio" value="Hard">
                                            <label>Hard</label>
                                        </li>
                                    </ul>
            </div>
            
                                    <button id="startBtn" class="btn btn-primary btn-lg" type="button">Start</button>
                                    
                                </fieldset>
                            </form>
            
                        </div>
                        </div>
                        </div>
            
                    </div><!--gameSetUp-->
            
            
            
                    <script src="temp.js"></script>
                </body>
            </html>`,
            game:
            `<div class="container"> 


            <div class="jumbotron">
                <header>
                    <h1 class="display-1">Sudoku Game</h1>
                </header>
                
                
                <div id="tables" class="jumbotron">
                    

                    <table>
                        <tr>
                            <td>
                                <table id="t1">
                                    <tr> <td> <input type="text" class="form-control" id="a1"> </td> <td> <input type="text" class="form-control" id="a2"> </td>  <td> <input type="text" class="form-control" id="a3"> </td>  </tr>
                                    <tr> <td> <input type="text" class="form-control" id="b1"> </td> <td> <input type="text" class="form-control" id="b2"> </td>  <td> <input type="text" class="form-control" id="b3"> </td>  </tr>
                                    <tr> <td> <input type="text" class="form-control" id="c1"> </td> <td> <input type="text" class="form-control" id="c2"> </td>  <td> <input type="text" class="form-control" id="c3"> </td>  </tr>
                                </table>
                            </td>
                            <td>
                                <table id="t2">
                                    <tr> <td> <input type="text" class="form-control" id="a4"> </td> <td> <input type="text" class="form-control" id="a5"> </td>  <td> <input type="text" class="form-control" id="a6"> </td>  </tr>
                                    <tr> <td> <input type="text" class="form-control" id="b4"> </td> <td> <input type="text" class="form-control" id="b5"> </td>  <td> <input type="text" class="form-control" id="b6"> </td>  </tr>
                                    <tr> <td> <input type="text" class="form-control" id="c4"> </td> <td> <input type="text" class="form-control" id="c5"> </td>  <td> <input type="text" class="form-control" id="c6"> </td>  </tr>
                                </table>
                                </td>
                                <td>
                                <table id="t3">
                                    <tr> <td> <input type="text" class="form-control" id="a7"> </td> <td> <input type="text" class="form-control" id="a8"> </td>  <td> <input type="text" class="form-control" id="a9"> </td>  </tr>
                                    <tr> <td> <input type="text" class="form-control" id="b7"> </td> <td> <input type="text" class="form-control" id="b8"> </td>  <td> <input type="text" class="form-control" id="b9"> </td>  </tr>
                                    <tr> <td> <input type="text" class="form-control" id="c7"> </td> <td> <input type="text" class="form-control" id="c8"> </td>  <td> <input type="text" class="form-control" id="c9"> </td>  </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                                <td>
                                    <table id="t4">
                                            <tr> <td> <input type="text" class="form-control" id="d1"> </td> <td> <input type="text" class="form-control" id="d2"> </td>  <td> <input type="text" class="form-control" id="d3"> </td>  </tr>
                                            <tr> <td> <input type="text" class="form-control" id="e1"> </td> <td> <input type="text" class="form-control" id="e2"> </td>  <td> <input type="text" class="form-control" id="e3"> </td>  </tr>
                                            <tr> <td> <input type="text" class="form-control" id="f1"> </td> <td> <input type="text" class="form-control" id="f2"> </td>  <td> <input type="text" class="form-control" id="f3"> </td>  </tr>
                                    </table>
                                </td>
                                <td>
                                    <table id="t5">
                                            <tr> <td> <input type="text" class="form-control" id="d4"> </td> <td> <input type="text" class="form-control" id="d5"> </td>  <td> <input type="text" class="form-control" id="d6"> </td>  </tr>
                                            <tr> <td> <input type="text" class="form-control" id="e4"> </td> <td> <input type="text" class="form-control" id="e5"> </td>  <td> <input type="text" class="form-control" id="e6"> </td>  </tr>
                                            <tr> <td> <input type="text" class="form-control" id="f4"> </td> <td> <input type="text" class="form-control" id="f5"> </td>  <td> <input type="text" class="form-control" id="f6"> </td>  </tr>
                                    </table>
                                    </td>
                                    <td>
                                    <table id="t6">
                                            <tr> <td> <input type="text" class="form-control" id="d7"> </td> <td> <input type="text" class="form-control" id="d8"> </td>  <td> <input type="text" class="form-control" id="d9"> </td>  </tr>
                                            <tr> <td> <input type="text" class="form-control" id="e7"> </td> <td> <input type="text" class="form-control" id="e8"> </td>  <td> <input type="text" class="form-control" id="e9"> </td>  </tr>
                                            <tr> <td> <input type="text" class="form-control" id="f7"> </td> <td> <input type="text" class="form-control" id="f8"> </td>  <td> <input type="text" class="form-control" id="f9"> </td>  </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                    <td>
                                        <table id="t7"> 
                                            <tr> <td> <input type="text" class="form-control" id="g1"> </td> <td> <input type="text" class="form-control" id="g2"> </td>  <td> <input type="text" class="form-control" id="g3"> </td>  </tr>
                                            <tr> <td> <input type="text" class="form-control" id="h1"> </td> <td> <input type="text" class="form-control" id="h2"> </td>  <td> <input type="text" class="form-control" id="h3"> </td>  </tr>
                                            <tr> <td> <input type="text" class="form-control" id="i1"> </td> <td> <input type="text" class="form-control" id="i2"> </td>  <td> <input type="text" class="form-control" id="i3"> </td>  </tr>
                                        </table>
                                    </td>
                                    <td>
                                        <table id="t8">
                                                <tr> <td> <input type="text" class="form-control" id="g4"> </td> <td> <input type="text" class="form-control" id="g5"> </td>  <td> <input type="text" class="form-control" id="g6"> </td>  </tr>
                                                <tr> <td> <input type="text" class="form-control" id="h4"> </td> <td> <input type="text" class="form-control" id="h5"> </td>  <td> <input type="text" class="form-control" id="h6"> </td>  </tr>
                                                <tr> <td> <input type="text" class="form-control" id="i4"> </td> <td> <input type="text" class="form-control" id="i5"> </td>  <td> <input type="text" class="form-control" id="i6"> </td>  </tr>
                                        </table>
                                        </td>
                                        <td>
                                        <table id="t9">
                                            <tr> <td> <input type="text" class="form-control" id="g7"> </td> <td> <input type="text" class="form-control" id="g8"> </td>  <td> <input type="text" class="form-control" id="g9"> </td>  </tr>
                                            <tr> <td> <input type="text" class="form-control" id="h7"> </td> <td> <input type="text" class="form-control" id="h8"> </td>  <td> <input type="text" class="form-control" id="h9"> </td>  </tr>
                                            <tr> <td> <input type="text" class="form-control" id="i7"> </td> <td> <input type="text" class="form-control" id="i8"> </td>  <td> <input type="text" class="form-control" id="i9"> </td>  </tr>
                                        </table>
                                    </td>
                                </tr>








                    </table>


                </div>
                
                <button id="completeBtn" type="button" class="btn btn-primary btn-lg btn-block"> Complete </button>

            </div>

        </div>`,
            gameOver:         `<div class="container"> 
            <div class="jumbotron">
                <header>
                    <h1 class="display-1">Game Over</h1>
                    <h2 id="gameResult" class="display-4"></h2>
                </header>
                
                <div id="buttons">
                   <button  type="button" id="tryAgain" class="btn btn-success" >Try Again </button>  </a>  <br> <br>
                   <button type="button" id="exitGame" class="btn btn-outline-danger">Exit Game</button></a>
                </div>
                
            </div>
        </div>`,
            goToPage: function(page,pageFunc){
                body.innerHTML=``;
                body.innerHTML= this[page];
                pageFunc();
            }

        };



        /*
            ******************** 
            userServer
            ******************** 
        */ 

        const guestUser={
            userName:"Guest",
            allowedToPlay: ["Easy"]
        };

        const user={
            firstName: "",
            lastName:  "",
            userName:  "",
            password:  "",
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
 
                if(loginUser===null || user.name===null || loginUser.name.length<1 || (user.userName!==(loginUser.name))){
                    throw "No such user";
                }else if((user.password!==(loginUser.password))){
                    throw "Wrong password";
                }else{
                    gameServer.connect(user);
                }

            },

            loginAsGuestRequest:function(){
                gameServer.connect(guestUser);
            },

            signUpRequest:function(signUpUser){
                if(this.signUpRequest===null){
                    throw "null user is not allowed";
                }

                if(user===null || (user.userName!==signUpUser.userName) ){
                    user.updateUser(signUpUser.firstName,signUpUser.lastName,
                        signUpUser.userName,signUpUser.userPassword);
                    pageManager.goToPage("login",login);
                }else{
                    throw "There is already a user with a same userName";
                }
            }

        };

        /*
            ******************** 
            gameGenerator
            ******************** 
        */ 
        const gameGenerator={


            SolveSudoku: function(grid){
                

                function FindUnassignedLocation(grid) 
                { 
                    for (r = 0; r< grid.length; r++) {
                        for (c = 0; c< grid[r].length; c++) {
                            if (grid[r][c] === 0) {
                                row=r;
                                col=c;
                                return true; 
                            }
                        }
                    }
                    return false; 
                } 
                
                /* Returns a boolean which indicates whether it will be legal to assign 
                   num to the given row,col location. */
                function isSafe(grid,row,col,num) 
                { 
                    /* Returns a boolean which indicates whether an assigned entry 
                   in the specified row matches the given number. */
                   function UsedInRow(grid,row,num) 
                   { 
                       for (let col = 0; col < grid.length; col++) 
                           if (grid[row][col] === num) 
                               return true; 
                       return false; 
                   } 
                   
                   /* Returns a boolean which indicates whether an assigned entry 
                   in the specified column matches the given number. */
                   function UsedInCol(grid,col,num) 
                   { 
                       for (let row = 0; row < grid.length; row++) 
                           if (grid[row][col] === num) 
                               return true; 
                       return false; 
                   } 
                   
                   /* Returns a boolean which indicates whether an assigned entry 
                   within the specified 3x3 box matches the given number. */
                   function UsedInBox(grid,boxStartRow,boxStartCol,num) 
                   { 
                       for (let row = 0; row < 3; row++) 
                           for (let col = 0; col < 3; col++) 
                               if (grid[row+boxStartRow][col+boxStartCol] === num) 
                                   return true; 
                       return false; 
                   } 
                
                
                
                    /* Check if 'num' is not already placed in current row, 
                        current column and current 3x3 box */
                    return !UsedInRow(grid, row, num) && 
                            !UsedInCol(grid, col, num) && 
                            !UsedInBox(grid, row - row%3 , col - col%3, num); 
                }
            
            
                let row;
                let col;
            
                //If there is no nassigned location,we are done
                if(!FindUnassignedLocation(grid)){
                    return true; //success!
                }
            
                for(let num=1;num<=9;num++){
                    //assigning the number keep sudoku rules
                    if(isSafe(grid,row,col,num)){
                        grid[row][col]=num;
                        //Assigning the number in the cell led to a win
                        if(gameGenerator.SolveSudoku(grid)){
                            return true;
                        }else{//The assignment led to a loose.Try again.
                            grid[row][col]=0;
                        }
                    }
                }
                return false;

            },//!SolveSudolu()

            generate: function(){
                
                do {
                    gameServer.sudokuBoard= gameServer.createBoard();
                    let isRandomSudoKuBoard=false;
    
                    const randRow= gameGenerator.randomNumber(0,8);
                    const randCol=gameGenerator.randomNumber(0,8);
                    const randomSudokuNumber=gameGenerator.randomSudokuNumber();

                    if(randomSudokuNumber%2===0){
                        gameServer.sudokuBoard[randRow][randCol]=randomSudokuNumber;
                    }else{
                        gameServer.sudokuBoard[randCol][randRow]=randomSudokuNumber;
                    }
                                      
                    isRandomSudoKuBoard=gameGenerator.SolveSudoku(gameServer.sudokuBoard);    
                    if(isRandomSudoKuBoard){
                        return;
                    }else{
                        gameServer.sudokuBoard[randRow][randCol]=0;
                    }
                } while (true)

                
            },//!generate()

            //Returns a random whole number in range [lower,upper]
            randomNumber:function(lower,upper){
                return Math.floor( Math.random()*(upper-(lower)+1) )+(lower);
            },

            //Returns a random natural number in range [1,9]
            randomSudokuNumber: function(){
                return gameGenerator.randomNumber(1,9);
            },

            /*
                Adapt the a ready gameServer.sudokuBoard,
                holding a valid solution, 
                for the requiered level.
                @param level -Specifies the game level.
                @return- A reference to a valid sudoku board,
                conatining blank cells.
            */
            setGameLevel:function(level){
                const filteredBoard=gameServer.createBoard();

                for(let i=0;i<filteredBoard.length;i++){//Copy sudokuBoard into board
                    for(let j=0;j<filteredBoard[i].length;j++){
                        filteredBoard[i][j]=gameServer.sudokuBoard[i][j];
                    }
                }

                /* 
                    cellsToFilterOut - Represents the number of cells 
                    to be set to blank(represented with 0)
                    depending on the level.
                */
                let cellsToFilterOut;

                switch(level){
                    default:
                    case "Easy": cellsToFilterOut=40
                    break;

                    case "Medium": cellsToFilterOut=55
                    break;

                    case "Hard": cellsToFilterOut=64
                    break;
                }


                /* 
                    Set cellsToFilterOut random cells to blank
                */    
                while(cellsToFilterOut>0){
                    const randRow= gameGenerator.randomNumber(0,8);
                    const randCol=gameGenerator.randomNumber(0,8);

                    if(filteredBoard[randRow][randCol]!==0){
                        filteredBoard[randRow][randCol]=0;
                        cellsToFilterOut--;
                    }
                    
                }
                return filteredBoard;
            }
        };//!gameGenerator

        /*
            ******************** 
            gameServer
            ******************** 
        */ 
        const gameServer={
            gameUser: null,
            gameStatus: false,  // true-Win , false-Lose
            sudokuBoard: null,
            playBoard:null,

            /* 
                Creates an empty sudoku board,
                for the specified user,
                and switch to gameSetUp.
            */
            serverReset:function(){
                this.gameUser=null;
                this.gameStatus=false;
                this.sudokuBoard=null;
                this.playBoard=null;
            },

            connect: function(user){
                gameServer.serverReset();
                this.gameUser=user;

                pageManager.goToPage("gameSetUp",gameSetUp);//Direct the user to set a game preference
            },

            /* 
                Set sudokuBoard attribute to
                Creates an empty sudoku board.
            */
            createBoard: function(){
                const dimention=9;
                const board=[];
                const value=0;

                for(let i=0;i<dimention;i++){
                    const row=[];
                    for(let j=0;j<dimention;j++){
                        row.push(value);
                    }
                    board.push(row);
                }
                return board;
            },


            resetGame: function(){
                this.gameStatus=false;
                this.sudokuBoard=gameServer.createBoard();
                this.playBoard=null;
            },


            
            /* 
                Set the sudokuBoard for valid solution.
                @param level - Represents a valid game level 
                for the currently connected user.
            */
            startGame:function(level){
                gameServer.resetGame();

                //Set the sudokuBoard to hold a random valid solution.
                gameGenerator.generate();
                //playBoard holds a filter solution adapted to the requiered game level.
                this.playBoard=gameGenerator.setGameLevel(level);
                pageManager.goToPage("game",game);
            },

            finishGame:function(playBoard){
                const dimention=this.sudokuBoard;

                this.gameStatus=false;
                //Return true-if WIN, false- otherwise.
                this.gameStatus=gameServer.validateSudoku(playBoard);
                
                pageManager.goToPage("gameOver",gameOver);
                
            },

            /*
                Validates a sudoku board.
                @param- playBoard represents a sudoku board to be checked.
                @return - true if valid,false otherwise
            */
            validateSudoku:function(playBoard){
                let _rows, _cols, _grid;

                // return true if sudoku is valid
                const isValid = function(){
                    return (validate(_rows) && validate(_cols) && validate(_grid));
                };
            
                // validate rows 
                const validate = function(data){
            
                    for (let row = 0; row < 9; row++) {
            
                        data[row].sort();
                        
                        for (let col = 0; col < 9; col++) {
            
                            const value = data[row][col];
                            const next_value = data[row][col + 1];
            
                            // check if value exists and is a valid number
                            if (!(value && value > 0 && value < 10)){
                                return false;
                            }
            
                            // check if numbers are unique
                            if (col !== 8 && value === next_value){
                                return false;
                            }
            
                        }
                    }
                    return true;
                };
            
                // reorganize data into three structures
                const reorganizeData = function(data){
                    _rows = data;
                    _cols = [];
                    _grid = [];
            
                    // Prefilling the structures with empty array objects
                    for (let i = 0; i < 9; i++) {
                        _cols.push([]);
                        _grid.push([]);
                    }
                    
                    for (let row = 0; row < 9; row++) {
            
                        for (let col = 0; col < 9; col++) {
            
                            // Save each column in a new row
                            _cols[col][row] = data[row][col];
            
                            // Calculate grid identifiers
                            const gridRow = Math.floor( row / 3 );
                            const gridCol = Math.floor( col / 3 );
                            const gridIndex = gridRow * 3 + gridCol;
            
                            // Save each grid in a new row
                            _grid[gridIndex].push(data[row][col]);
                            
                        }
                    }
            
                };
            
                const init = function(data){
                    reorganizeData(data);
                    return isValid();
                };
            
                return init(playBoard);

            }//!validateSudoku()

        };//!gameServer

        /***********************************/
        /***********************************/

        /*
            ******************** 
            pageFunctions
            ******************** 
        */ 


        /*
            ******************** 
            mainPage
            ******************** 
        */ 

        const main=()=>{
            const guestBtn=document.getElementById("guestBtn");
            const loginBtn=document.getElementById("loginBtn");
        
            guestBtn.addEventListener('click',()=>{
                userServer.loginAsGuestRequest();
            });
        
            loginBtn.addEventListener('click',()=>{
                pageManager.goToPage("login",login);
            });
         

        };// !main()


        /*
            ******************** 
            loginPage 
            ******************** 
        */ 
        const login=()=>{
            const signUpBtn=document.getElementById('signUpBtn');
            const connectBtn=document.getElementById('connectBtn');


            signUpBtn.addEventListener('click',()=>{
                pageManager.goToPage("signUp",signUp);
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

                
                try{// Ask the user-server for permission to connect
                    userServer.loginRequest(loginUser);           
                }catch(error){
                    const rejectMessage=error;
                    alert(rejectMessage);

                    // Reset loginUser and the form
                    loginUser.resetUser();
                    loginName.value='';
                    loginPassword.value='';
                }
                
            });

        };// !login()


        /*
            ******************** 
            signUp
            ******************** 
        */ 

        const signUp=()=>{
        
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
                    },

                    reset: function(){
                        this.firstName='';
                        this.lastName='';
                        this.userName= '';
                        this. userPassword= '';
                    }
                };

                try{

                    signUpUser.set(firstName.value,lastName.value,userName.value,userPassword.value);

                    // Registrate user to  User-Server
                    userServer.signUpRequest(signUpUser);
            
                }catch(error){// registration Failed
                    signUpUser.reset();
                    alert(error);
                }

            });

            form.addEventListener('input',(e)=>{
                
                if(e.target.tagName!=='INPUT'){
                    return;
                }
                createBtn.disabled=true;

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

  
        };//!signUp()


        /*
            ******************** 
            gameSetUp
            ******************** 
        */ 
        
        const gameSetUp=()=>{ 
            const gameUserName=document.getElementById("gameUserName");
            const startBtn=document.getElementById("startBtn");


            function setGame(){
                //html form references
                //Points to the place to write the connected user's name.
                const ul= document.getElementById("levelSelect");
                const listPermissions=document.querySelectorAll(`input[type=radio]`);
            
            
                //user's data recieved from the gameServer   
                const gameUser=gameServer.gameUser.userName;
                const gameUserPermissions=gameServer.gameUser.allowedToPlay;
        
                gameUserName.textContent=gameUser;//"Guest" - To be replaced with gameUser> integration
            
                /*
                    Looking for a permission recieved from the list
                    of permissions exist on the html list, in an array
                    of the playing user permissions.
                    @param -gameUserPermissions - an array representing a list of the playing user permissions.
                    @param -listPermission- A string representing a permission from the html setup list.
                    
                    @return true- if the listPermission is found, and false otherwise.
            
                */
                function isAllowedToPlay(gameUserPermissions,listPermission){
                    let i=0;
                    while(i<gameUserPermissions.length){
                        if(gameUserPermissions[i]===listPermission){
                            return true;
                        }
                        i++;
                    }
                    return false;
                }
            
            
            
                    /*
                        Loop throug list game levels, for each one,
                        look if the gameUser has a permission,
                        if not delete the coresponding <li>.
                    */
                
                    for(let listPrm=0;listPrm<listPermissions.length;listPrm++){
                        if( !isAllowedToPlay(gameUserPermissions,listPermissions[listPrm].value)){
                            const parentLi=listPermissions[listPrm].parentNode;
                            ul.removeChild(parentLi);
                        }
                    }
                
                    // Check the firs available game level.
                    const firstLi=ul.firstElementChild;
                    if(firstLi){
                        const firstPermitedLevel=firstLi.querySelector(`input[type=radio]`);
                        firstPermitedLevel.checked=true;
                    }else{ // User isnt allowed to play any level
                        startBtn.disabled=true;
                    }
        
            
        
            }//!setGame()



            startBtn.addEventListener('click',()=>{
                //1.Pick the checked radio-button and store the value.
                const gameLevel=document.querySelector(`input:checked`).value;
                //2.Request gameServer to start a game with the selected level.
                gameServer.startGame(gameLevel);
            });
            
            setGame();
   
        }// !gameSetUp()


        /*
            ******************** 
            game
            ******************** 
        */ 
        
        const game=()=>{
            const sudokuTable= document.querySelector("table");
            const completeBtn=document.getElementById("completeBtn");
            const board=gameServer.playBoard;
        
        
        
            const gameScreen={
                rowScreenIndices:            
                ['a','b','c',
                'd','e','f',
                'g','h','i'],
        
                colScreenIndices:
                ['1','2','3',
                '4','5','6',
                '7','8','9'],
        
                /*
                    Convert a 2d array row and col indices
                    into screen index - represented by id.
                    @param boardRow- an int representing a row on board
                    @param boardCol- an int representing a col on board
                    @return - A string that represents an Id of a screen's input, like "a1","f6"...
                */
                getScreenLocationId: function(boardRow,boardCol){
                    const screenRow=gameScreen.rowScreenIndices[boardRow];
                    const screenCol=gameScreen.colScreenIndices[boardCol];
                    const screenLocationId = screenRow+screenCol;
                    return screenLocationId;
                },
        
                /*
                    Convert an id to 2d array row index.
                    @param screenLocationId- a string representing an input id from screen,like "b4","g8"...
        
                    @return - An int representing a row index on board.
                */
                getBoardRow:function(screenLocationId){
                    let boardRow=0;
                    while(this.rowScreenIndices[boardRow]!==screenLocationId.charAt(0)){
                        boardRow++;
                    }
                    return boardRow;
                },
        
                /*
                    Convert an id to 2d array col index.
                    @param screenLocationId- a string representing an input id from screen,like "b4","g8"...
        
                    @return - An int representing a col index on board.
                */
                getBoardCol:function(screenLocationId){
                    let boardCol=0;
                    while(this.colScreenIndices[boardCol]!==screenLocationId.charAt(1)){
                        boardCol++;
                    }
                    return boardCol;
                },
        
        
                /*
                    Writes a value to the specified location on screen.
                    @param value- represents the value to be written to the screen.
                    @param screenId- A string representing an id(like "a1","f6","b4","g8"...)
                    of an input element to write into.
                */
                writeValueToScreenFromBoard: function(value,screenId){
                    const sudokuCell= document.getElementById(screenId);
                    if(value>0 && value<10){
                        const boardValueToWrite=value;
                        sudokuCell.value=boardValueToWrite;
                    }else{
                        sudokuCell.value= '';
                    }
                },
        
                writeValueToScreenFromUser:function(value,target){
                    if( value.length!==1 || !(value>='1' && value<='9') ){
                        target.value="";
                    }else{
                        target.value=value;
                    }
                },
        
                /*
                    Loop throug each sudou-cell on the screen,
                    coping it`s value to the coresponding place 
                    on the board.
                */
                readFromScreen: function(){
                    for(let boardRow=0;boardRow<board.length;boardRow++){
                        for(let boardCol=0;boardCol<board[boardRow].length;boardCol++){
                            const screenId= gameScreen.getScreenLocationId(boardRow,boardCol);
                            const sudokuCell= document.getElementById(screenId);
                            let valueFromScreen;
        
                            if(sudokuCell.value.length<1){
                                valueFromScreen=0;
                            }else{
                                valueFromScreen=parseInt(sudokuCell.value);
                            }
                            board[boardRow][boardCol]=valueFromScreen;
                        }
                    }
                },
        
                /*
                    Loading the values from the board to the screen.
                */
                loadBoardToScreen:function (){
                    for(let row=0;row<board.length;row++) {
                        for(let col=0;col<board.length;col++) {
                            const value=board[row][col];
                            const screenId =gameScreen.getScreenLocationId(row,col);
                            const input= document.getElementById(screenId);
                            gameScreen.writeValueToScreenFromBoard(value,screenId);
                            if(value!==0){
                                input.disabled=true;
                            } 
                        }
                    }
                }
            };
            
        
            sudokuTable.addEventListener('input',(e)=>{                   
                if(e.target.tagName!=='INPUT'){
                    return;
                }
        
                const inputTarget=e.target;
                const inputValue=e.target.value;
        
                gameScreen.writeValueToScreenFromUser(inputValue,inputTarget);
            });
        
        
            completeBtn.addEventListener('click',()=>{
                gameScreen.readFromScreen();
                gameServer.finishGame(board);
            });
            // Run
            gameScreen.loadBoardToScreen();
        
        };// !game()



        /*
            ******************** 
            gameOver
            ******************** 
        */ 

        const gameOver=()=>{ 
            const tryAgain=document.getElementById("tryAgain");
            const exitGame=document.getElementById("exitGame");
    
            function gameResult(){
                const gameResult=document.getElementById("gameResult");
                const gameUser=gameServer.gameUser;
                const gameStatus=gameServer.gameStatus;
                let resultMessage=`${gameUser.userName} `;
        
                if(gameStatus){
                    resultMessage+= `WIN !!!`;
                }else{
                    resultMessage+= `Lose...`;
                }
        
                gameResult.textContent=resultMessage;
            }
    
            tryAgain.addEventListener('click',()=>{
                pageManager.goToPage("gameSetUp",gameSetUp);
            });
    
            exitGame.addEventListener('click',()=>{
                pageManager.goToPage("main",main);
            });
    
            gameResult();
        };//!gameOver()


        /***********************************/
        /***********************************/
        
        /*
            ******************** 
            main call
            ******************** 
        */ 
        pageManager.goToPage("main",main);
        


    });// !DOMContentLoaded

}