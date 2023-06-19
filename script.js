const message = document.querySelector(".message");
const modal = document.querySelector(".modal");
const gBoard = document.querySelector("#gameboard");

//create module for the game board

const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];

  //renders squares of game board
  const render = () => {
    let boardHTMl = "";
    gameboard.forEach((square, index) => {
      boardHTMl += `<div class="square" id="square-${index}">${square}</div>`;
    });

    document.querySelector("#gameboard").innerHTML = boardHTMl;
  };

  render();

  //listens to click on game board squares
  const clickListener = () => {
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };

  const update = (index, value) => {
    gameboard[index] = value;
    render();
    clickListener();
  };

  //   way to see within the gameboard what is inside of gameboard
  //but we don't want to access it directly
  //we create function which is called accessor fn(cannot modify our array)
  //resposibility is to only give access to gameboard without directly
  //sending gameboard to the exterior of Gameboard
  const getGameboard = () => gameboard;

  return {
    render,
    clickListener,
    update,
    getGameboard,
  };
})();

// create factory fn, if you need multiple of something
// like player
const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

//any thing related to the logic on game will be encapsulated in Game fn
const Game = (() => {
  let player = [];
  let currentPlayerIndex;
  let gameOver;

  const start = () => {
    player = [
      createPlayer(document.querySelector("#player1").value, "X"),
      createPlayer(document.querySelector("#player2").value, "O"),
    ];

    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render();
    Gameboard.clickListener();
  };

  //   click squares to mark X or O
  const handleClick = (event) => {
    if (gameOver) {
      return;
    }

    let index = parseInt(event.target.id.slice(-1));

    // to check if the square is empty
    if (Gameboard.getGameboard()[index] !== "") return;

    Gameboard.update(index, player[currentPlayerIndex].mark);

    //display message -> modal

    if (
      checkForWin(Gameboard.getGameboard(), player[currentPlayerIndex].mark)
    ) {
      gameOver = true;
      message.textContent = `${player[currentPlayerIndex].name} won!`;
    } else if (checkForTie(Gameboard.getGameboard())) {
      gameOver = true;
      message.textContent = "It's a tie!";
    }

    if (currentPlayerIndex === 0) {
      currentPlayerIndex = 1;
    } else {
      currentPlayerIndex = 0;
    }
  };

  //close modal

  const restart = () => {
    for (let i = 0; i < 9; i++) {
      //using update fn to place empty string at all index positions (squares)
      Gameboard.update(i, "");
      Gameboard.render();
      Gameboard.clickListener();
      gameOver = false; //to fix the issue where we unable to click squares after restarting
    }
  };

  const resetResults = () => {
    message.textContent = "";
  };

  return {
    start,
    handleClick,
    restart,
    resetResults,
  };
})();

const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", () => {
  Game.restart();
  Game.resetResults();
});

let clicked = false;
const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", (event) => {
  Game.start();
});

//deciding winner

function checkForWin(board) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function checkForTie(board) {
  return board.every((cell) => cell !== "");
}
