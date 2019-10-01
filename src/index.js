import "./styles.css";

var currentsymbol = "x";
var winner = null;
var progressTracker;

window.onload = startGame(currentsymbol);

document.getElementById("board").addEventListener("click", playMove);
document.getElementById("newgame").addEventListener("click", startGame);

function startGame() {
  var x = document.getElementsByClassName("cell");
  for (var i = 0; i < x.length; i++) {
    x[i].innerHTML = "";
  }

  winner = null;

  currentsymbol = "x";
  setMessage(currentsymbol + " goes first");
}

function setMessage(msg) {
  document.getElementById("message").innerHTML = msg;
}

function playMove(event) {
  stopTimer();
  if (winner != null) {
    setMessage(currentsymbol + " already won the game!");
  } else if (document.getElementById(event.target.id).innerHTML === "") {
    document.getElementById(event.target.id).innerHTML = currentsymbol;

    if (currentsymbol === "x") {
      const att = document.createAttribute("class");
      att.value = "colorX";
      document.getElementById(event.target.id).setAttributeNode(att);
    } else if (currentsymbol === "o") {
      const att = document.createAttribute("class");
      att.value = "colorO";
      document.getElementById(event.target.id).setAttributeNode(att);
    }

    switchTurn();
  } else {
    setMessage("That cell is already used");
  }
}

function switchTurn() {
  if (checkForWin(currentsymbol)) {
    winner = currentsymbol;
    alert(currentsymbol + " wins!");
    setMessage(currentsymbol + " wins! Click the button to start a new game.");
  } else if (checkForTie()) {
    setMessage("Game over! Click the button to start a new game.");
  } else if (currentsymbol === "x") {
    startTimer();
    currentsymbol = "o";
    setMessage("It's " + currentsymbol + "'s turn");
  } else {
    startTimer();
    currentsymbol = "x";
    setMessage("It's " + currentsymbol + "'s turn");
  }
}

function checkForWin(currentsymbol) {
  var result = false;
  if (
    checkRow(11, 12, 13, 14, 15, currentsymbol) ||
    checkRow(21, 22, 23, 24, 25, currentsymbol) ||
    checkRow(31, 32, 33, 34, 35, currentsymbol) ||
    checkRow(41, 42, 43, 44, 45, currentsymbol) ||
    checkRow(51, 52, 53, 54, 55, currentsymbol) ||
    checkRow(11, 21, 31, 41, 51, currentsymbol) ||
    checkRow(12, 22, 32, 42, 52, currentsymbol) ||
    checkRow(13, 23, 33, 43, 53, currentsymbol) ||
    checkRow(14, 24, 34, 44, 54, currentsymbol) ||
    checkRow(15, 25, 35, 45, 55, currentsymbol) ||
    checkRow(11, 22, 33, 44, 55, currentsymbol) ||
    checkRow(15, 24, 33, 42, 51, currentsymbol)
  ) {
    result = true;
  }
  return result;
}

function checkRow(a, b, c, d, e, currentsymbol) {
  var result = false;
  if (
    ((((getCellValue(a) === currentsymbol && getCellValue(b)) ===
      currentsymbol && getCellValue(c)) === currentsymbol &&
      getCellValue(d)) === currentsymbol && getCellValue(e)) === currentsymbol
  ) {
    result = true;
  }
  return result;
}

function getCellValue(id) {
  return document.getElementById(id).innerText;
}

function checkForTie() {
  var x = document.getElementsByClassName("cell");
  for (var i = 0; i < x.length; i++) {
    if (x[i].innerHTML === "") {
      return false;
    }
  }
  return true;
}

function startTimer() {
  var elem = document.getElementById("progressBar");
  var width = 0;
  progressTracker = setInterval(status, 100);
  function status() {
    if (width >= 100) {
      clearInterval(progressTracker);
      document.getElementById("count").innerHTML =
        "Time's up! " + currentsymbol + " missed their turn";
      switchTurn();
    } else {
      width++;
      elem.style.width = width + "%";
      var num = (width * 1) / 10;
      num = num.toFixed(0);
      document.getElementById("count").innerHTML = num + "s";
    }
  }
}

function stopTimer() {
  clearInterval(progressTracker);
}
