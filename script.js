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

  //   way to see within the gameboard what is inside of gameboard
  //but we don't want to access it directly
  //we create function which is called accessor fn(cannot modify our array)
  //resposibility is to only give access to gameboard without directly
  //sending gameboard to the exterior of Gameboard
  const getGameboard = () => gameboard;

  return {
    render,
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
  };

  //   click squares to mark X or O
  const handleClick = (event) => {
    let index = parseInt(event.target.id.slice(-1));

    console.log(Gameboard.getGameboard());

    // to check if the square is empty
    if (Gameboard.getGameboard()[index] !== "") return;

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
