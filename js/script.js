const operationButtons = document.querySelectorAll('.calculator.operation');
const numberButtons = document.querySelectorAll('.calculator.number');
const equalButton = document.querySelector('.calculator.equal');
const delButton = document.querySelector('.calculator.delete');
const display = document.getElementById('display');

let operand_1 = '0';
let operand_2 = '0';
let operator = '';
let lastOperator = '';
let editingFirstOp = true;
let evaluated = false;

//Click event handlers
operationButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
            lastOperator = operator;
            operator = btn.value;
            //Handle operators that directly change operand value (eg. sign)
            if(operator === 'C' || operator === 'decimal' || operator === 'sign'){
                handleOperation();
            }
            //Check if operand is valid and start editing second one
            else if(operator != '' && getOperandsCheck()){
                if(!evaluated && lastOperator != ''){
                    operator = lastOperator;
                    //show(operand_1);
                    handleOperation();
                    
                }
                operator = btn.value;
                operand_2 = '0';
                
                if(editingFirstOp) {
                    //show(operand_2);
                    editingFirstOp = false;
                }
            }
        }
    )});

numberButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
        if (editingFirstOp) {
            if (operand_1 === '0' || Number.isNaN(operand_1) || operand_1 == '') operand_1 = btn.value;
            else operand_1 += btn.value;
            evaluated = false;
            show(operand_1);
        } else {
            if (operand_2 === '0' || Number.isNaN(operand_2) || operand_2 == '') operand_2 = btn.value;
            else operand_2 += btn.value;
            evaluated = false;
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

//Keydown event handlers

document.addEventListener('keydown', function(e){
    let key = e.key;
    let btn;
    if(key != 'Enter') key = filterKeypress(key);123
    switch (key){
        case '':

            break;

        case '.':
            btn = document.querySelector('.calculator.operation.decimal');
            btn.dispatchEvent(new Event('click'));
        break;

        case 'Enter':
            equalButton.dispatchEvent(new Event('click'));
            break;

        default:
            btn = document.querySelector('.calculator.number[value="' + key +'"]');
            btn.dispatchEvent(new Event('click'));
            break;
    }

})



function show(element) {
    if(element.length > 18) element = Math.round(parseFloat(element)).toString().slice(0,18);
    display.textContent = element;
}

function operate(operator, op1, op2) {
    //Parse number
    let a = parseFloat(op1);
    let b = parseFloat(op2);
    if (a === undefined) a = parseInt(op1);
    if (b === undefined) b = parseInt(op2);
    let res = operand_1;

    switch (operator) {
        case "sign":
            //If number is not 0 then switch sign
            if(editingFirstOp){
                if(operand_1 != '0'){
                if (!(operand_1.includes('-'))) operand_1 = '-' + operand_1;
                else operand_1 = operand_1.slice(1);
                }
                return operand_1;
            }else{
                if(operand_1 != '0'){
                if (!(operand_2.includes('-'))) operand_2 = '-' + operand_2;
                else operand_2 = operand_2.slice(1);
            }
                return operand_1;
            }
            break;
        case "/":
            //Returns division once both numbers have been set
            if(editingFirstOp && operand_2 === '0'){
                return operand_1;
            }else{
            res = a / b;
            return (b != 0) ? a / b : "Self Destruct ON";
            }
            break;
        case "mult":
            //Returns multiplication once both numbers have been set
            if(editingFirstOp && operand_2 === '0'){
                return operand_1;
            }else{
            res = a * b;
            return res;
            }
            break;
        case "-":
            if(editingFirstOp && operand_2 === '0'){
                return operand_1;
            }else{
            res = a - b;
            return res;
            }
            break;

        case "+":
            if(editingFirstOp && operand_2 === '0'){
                return operand_1;
            }else{
            res = a + b;
            return res;
            }
            break;

        case "C":
            //Clear
            operand_1 = "0";
            operand_2 = "0";
            return 0;
            break;

        case "decimal":
            //Adds a decimal point to the number once
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
 if (operator != 'decimal'){
    editingFirstOp = true;
    evaluated = true;
    lastOperator = '';
 } 
 operand_1 = res.toString();
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

function filterKeypress(key){
    //Returns key if its accepted or an empty string if it isnt
    const regex = /^[0-9.]*$/;

    return regex.test(key) ? key : '';
}