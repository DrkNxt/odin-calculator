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

function mod(x, y) {
    if (x <= 0 || y == 0) {
        return x;
    }
    let neg = y < 0;
    y = Math.abs(y);
    while (x >= y) {
        x -= y;
    }
    if (neg && x != 0) {
        return x-y;
    }
    return x;
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