const gameBoard = (() => {
    let positions = [];
    
    const create = () => {
        const body = document.querySelector("body");
        const board = document.createElement("div");
        board.classList.add("board");
        for(let i = 1; i <= 9; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.dataset.index = `${i}`;
            square.addEventListener("click", (e) => {
                addSquareIndexToPlayer(e)
                markSquare(e);
            })
            board.appendChild(square);
        }
        body.appendChild(board);
    }

    const clear = () => {
        const squares = document.querySelectorAll(".square");
        squares.forEach(square => square.textContent = "");
        gameBoard.positions = ["X","O","X","O","X","O","X","O","X"];
    }

    const isPlayer1Turn = () => {
        if(positions[0] == undefined || positions[positions.length - 1] == "O") {
            return true
        } else return false;
    }

    const addSquareIndexToPlayer = (e) => {
        if(isPlayer1Turn()) {
            player1.index.push(e.target.dataset.index);
        } else player2.index.push(e.target.dataset.index);
    }
    const isSquareEmpty = (e) => {
        if (e.target.textContent == "") {
            return true;
        } else return false;
    }

    const markSquare = (e) => {
        if(isSquareEmpty(e)) { //runs only if square is empty
            if(isPlayer1Turn()) {
                const piece = player1.pieces.pop()
                e.target.textContent = piece ;
                positions.push(piece);
            } else {
                const piece = player2.pieces.pop()
                e.target.textContent = piece ;
                positions.push(piece);
            }
        } 
    }

    const remove = () => {
        document.querySelector(".board").remove();
        gameBoard.positions = ["X","O","X","O","X","O","X","O","X"];
    }

    const render = () => {
        for(let i = 0; i < positions.length; i++) {
            const positionSquare = document.querySelector(`div[data-index="${i + 1}"]`);
            const shape = positions[i];
            positionSquare.textContent = `${shape}`;
        }
    }

    return {
        create,
        clear,
        render,
        remove,
        isPlayer1Turn,
        positions
    } 
})();


//for players we can have shape(X or O) and we can also have its positions on the board. 
//It can have 9 possible positions, 1-9
const player = (playerName, shape) => {
    let pieces = [];
    if(shape == "X") {
        pieces = ["X","X","X","X","X"];
    } else pieces = ["O","O","O","O"];


    const index = [];
    return {playerName, shape, pieces, index}
}

const player1 = player("player1", "X");
const player2 = player("player2", "O");


//Once a player reaches a certain pattern of positions, such as 1,2,3 = the top row, then the winnder will be announced;


const gameFlow = (() => {
    //Base turns off of positions 
    const turn = player1
})();

gameBoard.create();