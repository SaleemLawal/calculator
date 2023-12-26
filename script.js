// Gets the elements from the HTML file
const numbers = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operator");
const decimal = document.getElementById("decimal");
const equal = document.getElementById("equal");
const lastOperationScreen = document.querySelector('.lastOperationScreen')
const currentOperationScreen = document.querySelector('.currentOperationScreen')
const clear = document.getElementById("clear");
const _delete = document.getElementById("delete");

// Variables
let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let operandInputed = false

// Event Listeners
numbers.forEach(number => number.addEventListener("click", () => append(number.innerHTML)));
operators.forEach(button => button.addEventListener("click", () => setOperation(button.innerHTML)));

decimal.addEventListener("click", () => {
    if (currentOperationScreen.innerHTML === "") currentOperationScreen.innerHTML = "0";
    if (currentOperationScreen.innerHTML.includes(".")) return;
    currentOperationScreen.innerHTML += ".";
})

equal.addEventListener("click", evaluate);

clear.addEventListener("click", () => {
    resetcurrentOperationScreen();
    lastOperationScreen.textContent = "";
    currentOperationScreen.innerHTML = "0";
    firstOperand = "";
    secondOperand = "";
    currentOperation = null;
});

_delete.addEventListener("click", () => {
    currentOperationScreen.innerHTML = currentOperationScreen.innerHTML.slice(0, -1);
    if (currentOperationScreen.innerHTML === "") currentOperationScreen.innerHTML = "0";
})

// Appends the number to the screen
function append(button) {
    if (currentOperationScreen.innerHTML == "0" || operandInputed) {
        resetcurrentOperationScreen();
    }
    currentOperationScreen.innerHTML += button;
    secondOperand = Number(currentOperationScreen.textContent);
}

// sets the operation
function setOperation(operator) {
    // if there is already an operation, evaluate it first
    if (currentOperation !== null) {
        evaluate();
    }
    // set the operation and reset the current operation screen on the next call
    firstOperand = currentOperationScreen.textContent;
    currentOperation = operator;
    lastOperationScreen.textContent = firstOperand + " " + currentOperation;
    operandInputed = true;
}
// reset the operation screen
function resetcurrentOperationScreen() {
    currentOperationScreen.innerHTML = "";
    operandInputed = false;
}
// evaluate the operation at hand
function evaluate() {
    if (currentOperation === null || operandInputed){
        return;
    }
    // gets the second operand
    secondOperand = currentOperationScreen.textContent;
    // perform action and output it tp the screen
    currentOperationScreen.textContent = roundNum(operate(currentOperation, firstOperand, secondOperand));
    lastOperationScreen.textContent = firstOperand + " " + currentOperation + " " + secondOperand + " =";
    currentOperation = null;
}

function roundNum(number) {
    return Math.round(number * 1000) / 1000;
}

// calculates the operation
function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);

    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case 'x':
            return a * b;
        case '/':
            if (b === 0){
                alert("You can't divide by 0!");
                return null
            }else{
                return a / b;
            }
        default:
            return null;
    }
}


