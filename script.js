let firstNumber = 0;
let secondNumber = 0;
let operator = "";

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

function operate(x, y, op) {
    switch (op) {
        case "+":
            add(x,y);
            break;
        case "-":
            sub(x,y);
            break;
        case "*":
            mul(x,y);
            break;
        case "/":
            div(x,y);
            break;
        default:
            return false;
    }
    return true;
}