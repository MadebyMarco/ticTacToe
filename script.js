const gameBoard = (() => {
    let piecesOnBoard = [];
    let piecesOnBoardIndexes = [];
    
    const create = () => {
        const body = document.querySelector("body");
        const board = document.createElement("div");
        board.classList.add("board");
        for(let i = 1; i <= 9; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.dataset.index = `${i}`;
            square.addEventListener("click", (e) => { //I realize after adding isSquareEmpty to functions individually, I could add it here, but its too late

                if(!(getWinner().winner || isTie().tie)) {
                    addSquareIndexToBoardIndex(e)
                    addSquareIndexToPlayer(e)
                    movePlayerPieceToPiecesOnBoard(e);
                    render();
                    createEndGameBanner();
                } else console.log("Restart Game");
            })
            board.appendChild(square);
        }
        body.appendChild(board);
    }

    const clear = () => {
        const squares = document.querySelectorAll(".square");
        squares.forEach(square => square.textContent = "");
    }

    const isPlayer1Turn = () => {
        if(piecesOnBoard[0] == undefined || piecesOnBoard[piecesOnBoard.length - 1] == "O") {
            return true
        } else return false;
    }

    const isSquareEmpty = (e) => {
        if (e.target.textContent == "") {
            return true;
        } else return false;
    }

    const addSquareIndexToBoardIndex = (e) => {
        if(isSquareEmpty(e)) piecesOnBoardIndexes.push(e.target.dataset.index);
    }

    const addSquareIndexToPlayer = (e) => {
        if(isSquareEmpty(e)) {
            if(isPlayer1Turn()) {
                player1.index.push(e.target.dataset.index);
            } else player2.index.push(e.target.dataset.index);
        }
    }

    const movePlayerPieceToPiecesOnBoard = (e) => {
        if(isSquareEmpty(e)) { 
            if(isPlayer1Turn()) {
                const playerPiece = player1.pieces.pop()
                piecesOnBoard.push(playerPiece);
            } else {
                const playerPiece = player2.pieces.pop()
                piecesOnBoard.push(playerPiece);
            }
        } 
    }

    const restart = () => {
        piecesOnBoard = [];
        piecesOnBoardIndexes = [];
        player1.reset();
        player2.reset();
        document.querySelector(".board").remove();
        const banner = document.querySelector(".banner")
        if(banner != null) banner.remove();
        create();
        console.log(piecesOnBoard)
    }
    
    const render = () => {
        for(let i = 0; i < piecesOnBoard.length; i++) {
            //match up board pieces with their indexes and then print the piece at the index
            //using "i" we can get the piece on board index and then push the shape accordingly
            const index = parseInt(piecesOnBoardIndexes[i]);
            const square = document.querySelector(`div[data-index="${index}"]`);
            const playerPiece = piecesOnBoard[i];
            square.textContent = `${playerPiece}`;
            console.log(piecesOnBoard)
        }
    }
    
    const isWinner = (player) => {
        //Once a player reaches a certain pattern of piecesOnBoard, such as 1,2,3 = the top row, then the winnder will be announced
        // top row
        if(player.index.includes("1")) {
            if(player.index.includes("2")) {
                if(player.index.includes("3")) {
                    return true
                }   
            }
        } 
        // middle row
        if(player.index.includes("4")) {
            if(player.index.includes("5")) {
                if(player.index.includes("6")) {
                    return true
                }   
            } 
        } 
        //bottom row
        if(player.index.includes("7")) {
            if(player.index.includes("8")) {
                if(player.index.includes("9")) {
                    return true
                }   
            } 
        } 
        //left column
        if(player.index.includes("1")) {
            if(player.index.includes("4")) {
                if(player.index.includes("7")) {
                    return true
                }   
            } 
        } 
        // middle column
        if(player.index.includes("2")) {
            if(player.index.includes("5")) {
                if(player.index.includes("8")) {
                    return true
                }   
            } 
        } 
        //right column
        if(player.index.includes("3")) {
            if(player.index.includes("6")) {
                if(player.index.includes("9")) {
                    return true
                }   
            } 
        } 
        // top left to bottom right diagonal
        if(player.index.includes("1")) {
            if(player.index.includes("5")) {
                if(player.index.includes("9")) {
                    return true
                }   
            } 
        } 
        // top right to bottom left diagonal 
        if(player.index.includes("3")) {
            if(player.index.includes("5")) {
                if(player.index.includes("7")) {
                    return true
                }   
            } 
        } 

    }

    const isTie = () => {
        if(player1.pieces.length == 0 && getWinner().winner == false) {
            return {announce: "Its a Tie",tie:true}
        } else return {tie: false}
    }
    const getWinner = () => {
        if (isWinner(player1)) {
            console.log(`${player1.playerName} wins!`);
            return {name: player1.playerName, winner: true};
        } else if (isWinner(player2)) {
            console.log(`${player2.playerName} wins!`);
            return {name: player2.playerName, winner: true};
        } else return {winner: false}
    }

    const createEndGameBanner = () => {
        if(getWinner().winner || isTie().tie) {
            const banner = document.createElement("div");
            banner.classList.add("banner");
            
            if(isTie().tie !== true) {
                banner.textContent = `${getWinner().name} wins!`;
            } else banner.textContent = `${isTie().announce}`;
            
            document.querySelector("body").appendChild(banner);
        }

            
    }

    return {
        create,
        restart,
        isTie,
        getWinner
    } 
})();


//for players we can have shape(X or O) and we can also have its piecesOnBoard on the board. 
//It can have 9 possible piecesOnBoard, 1-9
const player = (playerName, shape) => {
    let pieces = [];
    let index = [];
    const setPlayerPieces = (shape) => {
        if(shape === "X") {
            pieces = ["X","X","X","X","X"];
        } else pieces = ["O","O","O","O"];
    }

    setPlayerPieces(shape);

    const reset = () => {
        if(shape == "X") {
            player1.index = [];
            player1.pieces = ["X","X","X","X","X"];
        } else if (player2){
            player2.index = [];
            player2.pieces = ["O","O","O","O"]; 
        }
    }



    return {playerName, shape, pieces, index, reset}
}

const player1 = player("John", "X");
const player2 = player("Melissa", "O");





gameBoard.create();

//create a function that clears players and gameboard in order to act as a restart button.