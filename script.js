//create module for the game board

const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    let boardHTMl = "";
    gameboard.forEach((square, index) => {
      boardHTMl += `<div class="square" id="square-${index}">${square}</div>`;
    });

    document.querySelector("#gameboard").innerHTML = boardHTMl;
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };

  const update = (index, value) => {
    gameboard[index] = value;
    render();
  };

  return {
    render,
    update,
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
  };

  //   click squares to mark X or O
  const handleClick = (event) => {
    let index = parseInt(event.target.id.slice(-1));
    Gameboard.update(index, player[currentPlayerIndex].mark);

    if (currentPlayerIndex === 0) {
      currentPlayerIndex = 1;
    } else {
      currentPlayerIndex = 0;
    }
  };

  return {
    start,
    handleClick,
  };
})();

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
  Game.start();
});
