const calculatorEl = document.querySelector("#calculator"),
    resultEl = document.querySelector(".result"),
    clearAllEl = document.querySelector("#clearAll"),
    deleteACharEl = document.querySelector("#deleteAChar");

let firstNumber = "";
let selectedOperator = "";
let afterNumber = "";
let iswaitingANewValue = false;

runEventListener();

function runEventListener() {
    calculatorEl.addEventListener("click", write);
    clearAllEl.addEventListener("click", clearAll);
    deleteACharEl.addEventListener("click", deleteAChar);
}

function clearAll() {
    firstNumber = "";
    selectedOperator = "";
    afterNumber = "";
    iswaitingANewValue = false;
    clearResultPanel();
}

function deleteAChar() {
    if (iswaitingANewValue) {
        afterNumber = Calculator.deleteLastCharacter(afterNumber);
    } else {
        firstNumber = Calculator.deleteLastCharacter(firstNumber);
    }

    resultEl.innerHTML = Calculator.deleteLastCharacter(resultEl.innerHTML);
}

function write(e) {
    const element = e.target;
    if (element.classList.contains("number")) {
        if (iswaitingANewValue) {
            afterNumber += element.value;
        } else {
            firstNumber += element.value;
        }
        uptadeResultPanel(element.value);
    }
    else if (element.classList.contains("operator")) {
        if (!Calculator.isHaveOperator(resultEl.innerHTML)) {

            selectedOperator = element.value;
            iswaitingANewValue = true;
            uptadeResultPanel(element.value);
        }
    } else if (element.classList.contains("equals")) {
        let result = calculate(firstNumber, selectedOperator, afterNumber).toString();
        firstNumber = result;
        iswaitingANewValue = false;
        clearOperatorAndAfterNumber();
        clearResultPanel();
        uptadeResultPanel(result);
    }
}

function calculate(firstNumber, operator, secondNumber) {
    let result;
    let dotResult = Calculator.isDotHave(firstNumber) || Calculator.isDotHave(secondNumber);
    switch (operator) {
        case "+":
            result = dotResult ? parseFloat(firstNumber) + parseFloat(secondNumber) : parseInt(firstNumber) + parseInt(secondNumber);
            break;
        case "-":
            result = dotResult ? parseFloat(firstNumber) - parseFloat(secondNumber) : parseInt(firstNumber) - parseInt(secondNumber);
            break;
        case "*":
            result = dotResult ? parseFloat(firstNumber) * parseFloat(secondNumber) : parseInt(firstNumber) * parseInt(secondNumber);
            break;
        case "/":
            result = dotResult ? parseFloat(firstNumber) / parseFloat(secondNumber) : parseInt(firstNumber) / parseInt(secondNumber);
            break;
    }
    return result;
}

function uptadeResultPanel(value) {
    if (value.length >= 6) {
        value = parseFloat(value).toFixed(2);
    }
    resultEl.innerHTML += value;
}

function clearResultPanel() {
    resultEl.innerHTML = "";
}

function clearOperatorAndAfterNumber() {
    selectedOperator = "";
    afterNumber = "";
}