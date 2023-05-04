window.onload = function() {
  let currentPlayer = "X";
  let gameStarted = false;
  let gameEnd = false;
  let player1Name = "";
  let player2Name = "";
  player1Symbol = "X";
  player2Symbol = "O";
   
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const cells = document.querySelectorAll(".cells");
  const playerNamesDiv = document.querySelector("#playerNames");
  const startGame = document.querySelector("#startButton");
  const restartGame = document.querySelector("#restartButton");
  const player1Display = document.querySelector("#player1Display");
  const player2Display = document.querySelector("#player2Display");

  startGame.addEventListener("click", () => {
    //obtenes los nombres cuando ingresan
    player1Name = document.querySelector("#player1").value;
    player2Name = document.querySelector("#player2").value;

    //verificamos si se ingreso los nombres
    if (player1Name === "" || player2Name === "") {
      alert("Por favor, ingresa los nombres de ambos jugadores para empezar el juego.");
      return;
    }

    player1Display.textContent = player1Name + " (" + player1Symbol + ")";
    player2Display.textContent = player2Name + " (" + player2Symbol + ")";

    gameStarted = true;
  });


  restartGame.addEventListener("click", () =>{
    cells.forEach(cell => {
      cell.textContent = "";
    });
    document.querySelectorAll("input[type='text']").forEach(input => input.value = "");
    gameEnd = false; // Establece gameEnd en falso al reiniciar el juego
  });
  

  cells.forEach(cell => {
    cell.addEventListener("click", () => {
      if (!gameStarted || gameEnd) {
        return;
      }
      if (cell.textContent === "") {
        cell.textContent = currentPlayer;
        if (checkWin()) {
          gameEnd = true;
        } else if (checkTie()) {
          gameEnd = true;
          alert("Excelente juego, es un empate!");
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
        if (gameEnd) {
          player1Display.textContent = "";
          player2Display.textContent = "";
        }
      }
    });
  });
  
  
  function checkWin() {
    let winnerName = "";
    //en base a nuestra constante winConditions verificamos si la posición del tablero muestra alguna victoria.
    const isWinningCombo = winConditions.some(condition => {
      const hasWon = condition.every(index => {
        return cells[index].textContent === currentPlayer;
      });
      if (hasWon) {
        winnerName = currentPlayer === player1Symbol ? player1Name : player2Name;
      }
      return hasWon;
    });
    if (isWinningCombo) {
      alert(`${winnerName} es el ganador!`);
      return true;
    } else {
     return
    }
  }
  
  function checkTie() {
    //en base a nuestras celdas del tablero verificamos que todas las celdas estén ocupadas por alguna ficha.
    return Array.from(cells).every(cell => {
      return cell.textContent !== "";
    });
  }
}