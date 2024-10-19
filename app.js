let boxes = document.querySelectorAll(".box"); 
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!box.disabled) {
        if (turnO) { 
            box.innerHTML = "O"
            turnO = false
            box.classList.add("color")
        }else{
            box.innerHTML = "X"
            turnO = true
            box.classList.remove("color")
        }
    }
            box.disabled = true; 
            checkWinner();
    });
});

const showWinner = (winner) => {
     msg.innerHTML = `congratulation winner is ${winner}`
     msgContainer.classList.remove("hide")
     disableBoxes()
};

const showDraw = () => {
    msg.innerHTML = "It's a draw!";
     msgContainer.classList.remove("hide")
     disableBoxes()
};

function checkWinner() {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val)
                return;
            }
        }
    }
    checkDraw()
}

const disableBoxes = () => {
    for (const box of boxes) {
         box.disabled = true;
}
}

const enableBoxes = () => {
    for (const box of boxes) {
         box.disabled = false;
         box.innerHTML = ""
}
}

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msg.innerText = "";
    msgContainer.classList.add("hide");
}

const checkDraw = () =>{
    let allPattern = [...boxes].every(box => 
        box.innerHTML !== ""
    )
    if (allPattern) {
        showDraw()
    }
};
newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
