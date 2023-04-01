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
            square.addEventListener("click", (e) => {
                addSquareIndexToBoardIndex(e)
                addSquareIndexToPlayer(e)
                movePlayerPieceToPiecesOnBoard(e);
                render();
            })
            board.appendChild(square);
        }
        body.appendChild(board);
    }

    const clear = () => {
        const squares = document.querySelectorAll(".square");
        squares.forEach(square => square.textContent = "");
        gameBoard.piecesOnBoard = ["X","O","X","O","X","O","X","O","X"];
        player1.reset();
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
        if(isSquareEmpty(e)) { //runs only if square is empty
            if(isPlayer1Turn()) {
                const playerPiece = player1.pieces.pop()
                //e.target.textContent = piece ;
                piecesOnBoard.push(playerPiece);
            } else {
                const playerPiece = player2.pieces.pop()
                //e.target.textContent = piece ;
                piecesOnBoard.push(playerPiece);
            }
        } 
    }

    const remove = () => {
        document.querySelector(".board").remove();
        gameBoard.piecesOnBoard = ["X","O","X","O","X","O","X","O","X"];
    }

    const render = () => {
        for(let i = 0; i < piecesOnBoard.length; i++) {
            //match up board pieces with their indexes and then print the piece at the index
            //using "i" we can get the piece on board index and then push the shape accordingly
            const index = parseInt(piecesOnBoardIndexes[i]);
            const square = document.querySelector(`div[data-index="${index}"]`);
            const shape = piecesOnBoard[i];
            square.textContent = `${shape}`;
        }
    }

    return {
        create,
        clear,
        render,
        remove,
        piecesOnBoard,
        piecesOnBoardIndexes
    } 
})();


//for players we can have shape(X or O) and we can also have its piecesOnBoard on the board. 
//It can have 9 possible piecesOnBoard, 1-9
const player = (playerName, shape) => {
    let pieces = [];
    let index = [];

    const setPlayerPieces = () => {
        if(shape == "X") {
            pieces = ["X","X","X","X","X"];
        } else pieces = ["O","O","O","O"];
    }

    setPlayerPieces();

    const reset = () => {
        setPlayerPieces();
        index = [];
    }

    return {playerName, shape, pieces, index, reset}
}

const player1 = player("player1", "X");
const player2 = player("player2", "O");


//Once a player reaches a certain pattern of piecesOnBoard, such as 1,2,3 = the top row, then the winnder will be announced;


const gameFlow = (() => {
    //Base turns off of piecesOnBoard 
    const turn = player1
})();

gameBoard.create();