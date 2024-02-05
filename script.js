/* Function that creates the gameboard */
function Gameboard () {
    let row = 3;
    let column = 3;
    let gameboard = [];

    /* function that creates the gameboard array and pushes an empty string into it */
    function createBoard () {
        for (let i = 0; i < row; i++) {
            gameboard[i] = [];
            let sub = document.createElement('div');
            sub.classList.add('sub');
            for (let j = 0; j < column; j++) {
                gameboard[i].push('');
            }
        }
    }

    createBoard();

    /* function that resets the gameboard to empty string when invoked in clearboard() in gameController() */
    function reset () {
        gameboard.forEach((item, num) => item.forEach((value, index) => {
            gameboard[num][index] = '';
        }));
    }

    const getBoard = () => gameboard;

    /* function that adds a token to gameboard when invoked in playRound() in gameController() */
    function addToBoard (myRow,myColumn, token) {
        if (gameboard[myRow][myColumn] == '') {
            gameboard[myRow][myColumn] = token;
        }
    }

    return {gameboard,  getBoard, addToBoard, reset};
}

/* function that controls the gameflow and checks for a winner or draw. Player1 is x and player2 is O */
function gameController (player1name = "Player1", player2name = "Player2") {
    let myBoard = Gameboard();

    let players = [{name : player1name},{name : player2name}];

    let activePlayer = players[0];

    /* function that switches the player who's turn it is */
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    /* function that clears the board and sets active player to player1 */
    myBoard.clearBoard = () => {
        myBoard.reset();
        activePlayer = players[0];
    }

    let result = document.querySelector('.result');
    
    
    /* function that adds X or O to the gameboard and also checks for win or draw when invoked by update() in screen() */
    let playRound = (Row, Column, token) => {
        myBoard.addToBoard(Row, Column, token);

    let inputPlayer1 = document.querySelector('#Player1Name').value;
    let inputPlayer2 = document.querySelector('#Player2Name').value;
        
        /* checks if there's an available space in gameboard */
        let checkForDraw = myBoard.gameboard.some((value) => value.some((item) => item == ''));

        /* function that disables the dom buttons is there is a winner or tie */
        function blockedButtons () {
            let blockButtons = document.querySelectorAll('.eachCell');
            blockButtons.forEach(item => {
                item.disabled = true;
            })
        }
        
        /* function that checks if there's a winner or tie. If no winner or tie, it switches the player */
        function checkForWinOrDraw () {
            if ( ((myBoard.gameboard[0][0] == 'x') && (myBoard.gameboard[0][1] == 'x') && (myBoard.gameboard[0][2] == 'x')) || ((myBoard.gameboard[1][0] == 'x') && (myBoard.gameboard[1][1] == 'x') && (myBoard.gameboard[1][2] == 'x')) ||  ((myBoard.gameboard[2][0] == 'x') && (myBoard.gameboard[2][1] == 'x') && (myBoard.gameboard[2][2] == 'x')) ||  ((myBoard.gameboard[0][0] == 'x') && (myBoard.gameboard[1][0] == 'x') && (myBoard.gameboard[2][0] == 'x')) ||  ((myBoard.gameboard[0][1] == 'x') && (myBoard.gameboard[1][1] == 'x') && (myBoard.gameboard[2][1] == 'x')) ||   ((myBoard.gameboard[0][2] == 'x') && (myBoard.gameboard[1][2] == 'x') && (myBoard.gameboard[2][2] == 'x'))  ||  ((myBoard.gameboard[0][0] == 'x') && (myBoard.gameboard[1][1] == 'x') && (myBoard.gameboard[2][2] == 'x'))  ||   ((myBoard.gameboard[0][2] == 'x') && (myBoard.gameboard[1][1] == 'x') && (myBoard.gameboard[2][0] == 'x')) ) {
                result.textContent = `${inputPlayer1} is the Winner`;
                myBoard.clearBoard();
                blockedButtons();
            } else if ( ((myBoard.gameboard[0][0] == 'o') && (myBoard.gameboard[0][1] == 'o') && (myBoard.gameboard[0][2] == 'o')) || ((myBoard.gameboard[1][0] == 'o') && (myBoard.gameboard[1][1] == 'o') && (myBoard.gameboard[1][2] == 'o')) ||  ((myBoard.gameboard[2][0] == 'o') && (myBoard.gameboard[2][1] == 'o') && (myBoard.gameboard[2][2] == 'o')) ||  ((myBoard.gameboard[0][0] == 'o') && (myBoard.gameboard[1][0] == 'o') && (myBoard.gameboard[2][0] == 'o')) ||  ((myBoard.gameboard[0][1] == 'o') && (myBoard.gameboard[1][1] == 'o') && (myBoard.gameboard[2][1] == 'o')) ||   ((myBoard.gameboard[0][2] == 'o') && (myBoard.gameboard[1][2] == 'o') && (myBoard.gameboard[2][2] == 'o'))  ||  ((myBoard.gameboard[0][0] == 'o') && (myBoard.gameboard[1][1] == 'o') && (myBoard.gameboard[2][2] == 'o'))  ||   ((myBoard.gameboard[0][2] == 'o') && (myBoard.gameboard[1][1] == 'o') && (myBoard.gameboard[2][0] == 'o'))  ) {
                result.textContent = `${inputPlayer2} is the Winner`;;
                myBoard.clearBoard();
                blockedButtons();
            } else if ( checkForDraw == false ) {
                result.textContent = "Game Over. It's a tie";
                myBoard.clearBoard();
                blockedButtons();
            } else {
                switchPlayerTurn();
            }
        }
        checkForWinOrDraw();
        

        
    };
    // Initial play game message
    /* printNewRound(); */
    return {  myBoard, result, playRound, getActivePlayer, getBoard: myBoard.getBoard };
}

/* function that controls the dom */
function screen () {
    let game = gameController();
    let boardDiv = document.querySelector('.board');
    let playerTurn = document.querySelector('.playerTurn');
    
    /* function that creates the dom buttons and appends X or O to each button when clicked */
    let update = () => {
        boardDiv.textContent = '';

        playerTurn.textContent = `${game.getActivePlayer().name}'s turn`;

        game.myBoard.gameboard.forEach((item, num) => item.forEach((value, index) => {
            
            let addButton = document.createElement('button');
            addButton.classList.add('eachCell');
            addButton.textContent = value;

            /* if button textcontent is empty and active player is player1, set the button textcontent to  X, else set button textcontent to O */
            addButton.addEventListener('click', () => {
                if (addButton.textContent == '') {
                    if (game.getActivePlayer().name == 'Player1') {
                        game.playRound(num, index, 'x');
                        addButton.textContent = 'X';
                        playerTurn.textContent = `${game.getActivePlayer().name}'s turn`;
                    } else {
                        game.playRound(num, index, 'o');
                        addButton.textContent = 'O';
                        playerTurn.textContent = `${game.getActivePlayer().name}'s turn`;
                    } 
                } 
            }) 
            boardDiv.appendChild(addButton);
        }) 
            
        );
    }

    update();

    /* function that clears the gameboard and set dom button textcontent to empty string */
    function Reset () {
        let resetButton = document.querySelector('.resetButtons');
        resetButton.addEventListener('click', () => {
            newButton =  document.querySelectorAll('.eachCell');
            newButton.forEach(item => {
                item.disabled = false;
                item.textContent = '';
                
            })
            game.myBoard.clearBoard();
            game.result.textContent = '';
            playerTurn.textContent = `${game.getActivePlayer().name}'s turn`;
        })
        
    }
    Reset();
}

screen();