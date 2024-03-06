const operationButtons = document.querySelectorAll('.calculator.operation');
const numberButtons = document.querySelectorAll('.calculator.number');
const equalButton = document.querySelector('.calculator.equal')
const display = document.getElementById('display');

//18 Digit max

let operand_1 = NaN;
let operand_2 = NaN;
let operator = '';
let editingFirstOp = true;

operationButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
            console.log('operator set to : '+btn.value);
            operator = btn.value;
            if(editingFirstOp) {editingFirstOp = false;}
            else {editingFirstOp = true;}

        }

    )});

numberButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
        console.log(editingFirstOp);
        if (editingFirstOp == true) {
            if (operand_1 == '0' || Number.isNaN(operand_1)) operand_1 = btn.value;
            else operand_1 += btn.value
            console.log('op1 ' + operand_1);
            show(operand_1);
        } else {
            if (operand_2 == '0' || Number.isNaN(operand_2)) operand_2 = btn.value;
            else operand_2 += btn.value
            console.log('op2 ' + operand_2);
            show(operand_2);
        }
    });
});

equalButton.addEventListener('click', handleOperation);

function show(element) {
    display.textContent = element;
}

function operate(operator, op1, op2) {
    let a = parseFloat(op1);
    let b = parseFloat(op2);
    if (a === undefined) a = parseInt(op1);
    if (b === undefined) b = parseInt(op2);
    console.log('a : ' + a + " b : " + b + ' op : ' + operator);
    let res = 0;
    switch (operator) {
        case "fraction":
            res = 1 / a;
            return res;
            break;
        case "sqrt":
            res = Math.sqrt(a);
            return res;
            break;
        case "div":
            res = a / b;
            return (b != 0) ? a / b : "Self Destruct ON";
            break;
        case "mult":
            res = a * b;
            return res;
            break;
        case "minus":
            res = a - b;
            return res;
            break;

        case "add":
            res = a + b;
            return res;
            break;

        case "C":
            operand_1 = "0";
            operand_2 = "0";
            return 0;
            break;

        case "decimal":
            if (!(operand_1.includes('.'))) operand_1 += '.';
            return operand_1;
            break;

        default:
            break;
    }
}

function handleOperation(){
 let res = operate(operator, operand_1, operand_2);
 console.log('res : ' + res);
 operand_1 = res;
 if(operator == 'C'){
     operand_1 == '0';
     operand_2 == '0';
 }
 show(operand_1);
}