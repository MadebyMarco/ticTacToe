const gameboard = {
    gameboard: [1,2,3,4,5,6,7,8,9],
    
};


//for players we can have shape(X or O) and we can also have its positions on the board. 
//It can have 9 possible positions, 1-9
const player = (playerName, shape) => {
    const positions = [];
    return {playerName, shape, positions}
}

const player1 = player("player1", "x");
const player2 = player("player2", "o");


//Once a player reaches a certain pattern of positions, such as 1,2,3 = the top row, then the winnder will be announced;

const board = (() => {
    //create doms and ui elements
    const create = () => {
        const body = document.querySelector("body");
        const board = document.createElement("div");
        board.classList.add("board");
        for(let i = 1; i <= 9; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.dataset.index = `${i}`;
            board.appendChild(square);
    }
    body.appendChild(board);
    }
    const clear = () => {
       document.querySelector(".board").remove();
    }

    return {
        create,
        clear 
    }
})();

const gameFlow = {};