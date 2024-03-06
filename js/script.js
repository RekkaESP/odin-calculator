function operate(operator, a, b) {
    switch (operator) {
        case "fraction":
            return 1/a;
            break;
        case "sqrt":
            return Math.sqrt(a);
            break;
        case "div":
            return a/b;
            break;
        case "mult":
            return show(a*b);
            break;
        case "minus":
            return a-b;
            break;

        case "add":
            return a+b;
            break;

        case "C":

            break;

        case "decimal":

            break;

        default:
            break;
    }

}

function show(element){
    const display = document.getElementById("display");
    display.textContent = element;
}