const DISPLAY = document.querySelector("#display");
const BUTTONS = document.querySelector("#buttons");

let firstNumber = null;
let operator = "";
let displayText = "0";
let hasDecimal = false;
let displayShowsResult = false;
let displayShowsError = false;
let lastButtonWasOperator = false;

function add(x, y) {
    return x+y;
}

function sub(x, y) {
    return x-y;
}

function mul(x, y) {
    return x*y;
}

function div(x, y) {
    return x/y;
}

function mod(x, y) {
    if (x == 0 || y == 0) {
        return x;
    }
    let xNeg = false;
    if (x < 0) {
        y = -y;
        x = -x;
        xNeg = true;
    }
    let yNeg = y < 0;
    y = Math.abs(y);
    while (x >= y) {
        x -= y;
    }
    if (yNeg && x != 0) {
        x -= y;
    }
    if (xNeg) {
        x = -x;
    }
    return x;
}

function operate(x, y, op) {
    let num = y;
    switch (op) {
        case "add":
            num = add(x,y);
            break;
        case "sub":
            num = sub(x,y);
            break;
        case "mul":
            num = mul(x,y);
            break;
        case "div":
            num = div(x,y);
            break;
        case "mod":
            num = mod(x,y);
            break;
    }
    return num;
}

function updateDisplay() {
    DISPLAY.textContent = displayText;
}

function calculate() {
    if (operator === "div" && parseFloat(displayText) == 0){
        displayText = "ERROR";
        displayShowsError = true;
        updateDisplay();
        return;
    }
    firstNumber = (Math.round((operate(firstNumber, parseFloat(displayText), operator)) * 10000) / 10000);
    displayText = firstNumber;
    displayShowsResult = true;
}

function storeNumber(op) {
    hasDecimal = false;
    if (firstNumber === null) {
        firstNumber = parseFloat(displayText);
        displayText = "0";
    }else if (operator === "") {
        operator = op;
    }else {
        calculate();
    }
    updateDisplay();
}

function resetCalculator() {
    operator = "";
    firstNumber = null;
    displayText = "0";
    hasDecimal = false;
    displayShowsResult = false;
    displayShowsError = false;
    lastButtonWasOperator = false;
    updateDisplay();
}

function removeLastChar() {
    if (displayShowsResult) {
        return;
    }
    if (displayText.slice(displayText.length-1) === ".") {
        hasDecimal = false;
    }
    displayText = displayText.slice(0, displayText.length-1);
    if (displayText === "" || displayText === "-") {
        displayText = "0";
    }
}

function handleNumberButton(id) {
    lastButtonWasOperator = false;
    if (operator === "" && displayShowsResult) {
        resetCalculator();
    }
    if (displayShowsResult) {
        displayText = "0";
        displayShowsResult = false;
    }
    switch (id) {
        case "decimal": // Add decimal point
            if (hasDecimal) {
                break;
            }
            displayText += ".";
            hasDecimal = true;
            break;
        case "sign": // Toggle sign
            if (displayText.charAt(0) == "-") {
                displayText = displayText.slice(1);
            }else {
                displayText = "-" + displayText;
            }
            break;
        default: // Add clicked number to display
            if (displayText === "-0") {
                displayText = "-" + id;
            }else if (displayText === "0") {
                displayText = id;
            }else {
                displayText += id;
            }
             break;
    }
    updateDisplay();
}

function handleOperatorButton(id) {
    switch (id) {
        case "equals":
            if (firstNumber === null) {
                break;
            }
            calculate();
            operator = "";
            break;
        case "clear":
            resetCalculator();
            break;
        case "back":
            removeLastChar();
            break;
        default: // Handle +-/*% buttons
            if (!lastButtonWasOperator) {
                storeNumber(id);
            }
            lastButtonWasOperator = true;
            operator = id;
            break;
    }
    updateDisplay();
}

function getClickedButton(target) {
    if (target.classList.contains("operator")) {
        if (displayShowsError) {
            resetCalculator();
        }
        handleOperatorButton(target.id);
    }else if (target.classList.contains("number")) {
        if (displayShowsError) {
            resetCalculator();
        }
        handleNumberButton(target.id);
    }
}

function getPressedKey(key) {
    switch (key) {
        case "0":
            handleNumberButton("0");
            break;
        case "1":
            handleNumberButton("1");
            break;
        case "2":
            handleNumberButton("2");
            break;
        case "3":
            handleNumberButton("3");
            break;
        case "4":
            handleNumberButton("4");
            break;
        case "5":
            handleNumberButton("5");
            break;
        case "6":
            handleNumberButton("6");
            break;
        case "7":
            handleNumberButton("7");
            break;
        case "8":
            handleNumberButton("8");
            break;
        case "9":
            handleNumberButton("9");
            break;
        case ".":
            handleNumberButton("decimal");
            break;
        case "+":
            handleOperatorButton("add");
            break;
        case "+":
            handleOperatorButton("sub");
            break;
        case "*":
            handleOperatorButton("mul");
            break;
        case "/":
            handleOperatorButton("div");
            break;
        case "%":
            handleOperatorButton("mod");
            break;
        case "Escape":
            handleOperatorButton("clear");
            break;
        case "Backspace":
            handleOperatorButton("back");
            break;
        case "Enter":
            handleOperatorButton("equals");
            break;
    }
    console.log(key);
}

BUTTONS.addEventListener("click", event => getClickedButton(event.target));
document.addEventListener("keydown", event => getPressedKey(event.key));