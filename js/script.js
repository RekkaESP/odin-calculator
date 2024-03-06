const operationButtons = document.querySelectorAll('.calculator.operation');
const numberButtons = document.querySelectorAll('.calculator.number');
const equalButton = document.querySelector('.calculator.equal');
const delButton = document.querySelector('.calculator.delete');
const display = document.getElementById('display');

//18 Digit max

let operand_1 = '0';
let operand_2 = '0';
let operator = '';
let editingFirstOp = true;

operationButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
            console.log('operator set to : '+btn.value);
            operator = btn.value;
            if(operator === 'C' || operator === 'decimal'){
                handleOperation();
            }
            else if(operator != '' && getOperandsCheck()){
                handleOperation();
                if(editingFirstOp) {
                    show(operand_2);
                    editingFirstOp = false;
                }
            }

        }

    )});

numberButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
        console.log(editingFirstOp);
        if (editingFirstOp) {
            if (operand_1 === '0' || Number.isNaN(operand_1) || operand_1 == '') operand_1 = btn.value;
            else operand_1 += btn.value
            console.log('op1 ' + operand_1);
            show(operand_1);
        } else {
            if (operand_2 === '0' || Number.isNaN(operand_2) || operand_2 == '') operand_2 = btn.value;
            else operand_2 += btn.value
            console.log('op2 ' + operand_2);
            show(operand_2);
        }
    });
});
delButton.addEventListener('click', function(){
    if(editingFirstOp){
        operand_1 = operand_1.toString().slice(0, -1);
        if(operand_1.length == 0){
            operand_1 = '0';
        }
    } 
    else {
        operand_2 = operand_2.slice(0, -1);
        if(operand_2.length == 0){
            operand_2 = '0';
        }
    } 
    return editingFirstOp ? show(operand_1) : show(operand_2);
});

equalButton.addEventListener('click', handleOperation);

function show(element) {
    display.textContent = element;
}

function operate(operator, op1, op2) {
    //Parse number
    let a = parseFloat(op1);
    let b = parseFloat(op2);
    if (a === undefined) a = parseInt(op1);
    if (b === undefined) b = parseInt(op2);
    console.log('a : ' + a + " b : " + b + ' op : ' + operator);
    let res = operand_1;
    switch (operator) {
        case "sqrt":
            res = Math.sqrt(a);
            return res;
            break;
        case "/":
            res = a / b;
            return (b != 0) ? a / b : "Self Destruct ON";
            break;
        case "mult":
            if(editingFirstOp && operand_2 === '0'){
                return operand_1;
            }else{
            res = a * b;
            return res;
            }
            break;
        case "-":
            res = a - b;
            return res;
            break;

        case "+":
            res = a + b;
            return res;
            break;

        case "C":
            operand_1 = "0";
            operand_2 = "0";
            return 0;
            break;

        case "decimal":
            if(editingFirstOp){
                if (!(operand_1.includes('.'))) operand_1 += '.';
                return operand_1;
            }else{
                if (!(operand_2.includes('.'))) operand_2 += '.';
                return operand_1;
            }

            break;

        default:
            break;
    }
}

function handleOperation(){
 let res = operate(operator, operand_1, operand_2);
 //Return to first operand after operation
 if (operator != 'decimal') editingFirstOp = true;
 operand_1 = res;
 if(operator === 'C'){
     operand_1 = '0';
     operand_2 = '0';
     operator = '';
      //Return to first operand after operation
 editingFirstOp = true;
 }
 show(operand_1);
}
function getOperandsCheck(){
    //Returns true if both numbers are valid
    let op1 = false;
    let op2 = false;
    if(!(typeof operand_1 === undefined) && operand_1 != '') op1 = true;
    if(!(typeof operand_2 === undefined) && operand_2 != '') op2 = true;
    return op1 && op2;
}