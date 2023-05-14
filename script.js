const gameContainer = document.querySelector(".tic");
const gameChildrens = document.querySelectorAll(".tic .board-row > div:not(:last-child,:nth-last-child(2))");
const result = document.querySelector("footer");
const playOrder = document.querySelector("footer span");

const chooseContainer = document.querySelector(".choose");
const choose = document.querySelectorAll(".choose button");
const restart = document.querySelector(".restart button");
restart.addEventListener("click", () => {
    restart.classList.add("scale");
    
    setTimeout(() => {
        restart.classList.remove("scale");
        location.reload();
    }, 400);
})

let player = "X";
let squares = Array(9).fill(null);
let AgainstComputer;
let theresAWinner = false;
window.addEventListener("DOMContentLoaded", () => {
    gameContainer.classList.add("disabled")

})
choose.forEach(e => {
    e.addEventListener("click", () => {
        e.classList.add("scale");
        if (e.textContent=="Against Noone") {
            AgainstComputer = false;
        } else {
            AgainstComputer = true;
        }
        gameContainer.classList.add("working")
        setTimeout(() => {
            e.classList.remove("scale");
            setTimeout(() => {
               chooseContainer.classList.add("disabled");
            }, 600);
        }, 400);
    })

})
gameChildrens.forEach(childE => {

    childE.addEventListener("click", () => {

        if (theresAWinner) {
            result.textContent = `Winner : ${checkWinner(squares)}`;
            return;
        }
        if (childE.textContent === "") {
            childE.textContent = player;
            squares[childE.id] = player;
            if (player === "X") {
                player = "O";
            } else {
                player = "X";

            }
            playOrder.textContent = player;

        }
        if (AgainstComputer) {
            computerPlay();
        }
        checkWinner(squares);
    })

})
const vertical1 = document.querySelector(".vertical-1");
const vertical2 = document.querySelector(".vertical-2");
const vertical3 = document.querySelector(".vertical-3");

const winningRows = [
  { positions: [0, 1, 2], selector: ".horizontal-1" },
  { positions: [3, 4, 5], selector: ".horizontal-2" },
  { positions: [6, 7, 8], selector: ".horizontal-3" },
  { positions: [0, 4, 8], selector: ".diagonal-2" },
  { positions: [2, 4, 6], selector: ".diagonal-1" },
  { positions: [0, 3, 6], selector: ".vertical-1" },
  { positions: [1, 4, 7], selector: ".vertical-2" },
  { positions: [2, 5, 8], selector: ".vertical-3" }
];

function checkWinner(squares) {
    for (let i = 0; i < winningRows.length; i++) {
        const {
            positions,
            selector
        } = winningRows[i];
        const [a, b, c] = positions;
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            theresAWinner = true;
            if (selector === ".vertical-1" || selector === ".vertical-2" ||
                selector === ".vertical-3") {
                document.querySelector(selector).classList.add("reveal-2");

            } else if (selector === ".diagonal-1" || selector === ".diagonal-2") {
                document.querySelector(selector).classList.add("reveal-3");
            } else {
                document.querySelector(selector).classList.add("reveal");
            }
            result.textContent = `Winner : ${squares[a]}`;
            return squares[a];
        }
    }
    return false;
}

function computerPlay() {
    const emptySquares = squares.reduce((arr, sq, index) => (sq === null ? [...arr, index] : arr), []);
    if (theresAWinner) {
        return;
    } else {
        if (checkWinner(squares)) {
            return;
        } else {
            let time = setTimeout(() => {
                const random = Math.floor(Math.random() * emptySquares.length);
                const chosenSquare = emptySquares[random];
                squares[chosenSquare] = "O";
                document.getElementById(chosenSquare).textContent = "O";

                player = "X";
                playOrder.textContent = player;
                
            }, 500);

            return () => clearTimeout(time);

        }

    }
}