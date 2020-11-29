

let calcDataDigits = '';
const calcDataString = [];
const calcOperations = [];
let display = '';

(function clickDigitHandler() {
    const digitButtons = document.querySelectorAll('.btn-digit, .btn-decimal');
    
    for (let i = 0; i < digitButtons.length; i += 1) {
        digitButtons[i].addEventListener('click', (event) => {
            calcDataDigits = calcDataDigits + event.target.textContent;
            display = display + event.target.textContent;
            document.querySelector('.screen').textContent = '';
            document.querySelector('.screen').insertAdjacentHTML('beforeend', display);
        });
    };
})();

(function clickOperationHandler() {
    const operationButtons = document.querySelectorAll('.btn-operation');
    for (let i = 0; i < operationButtons.length; i += 1) {
        operationButtons[i].addEventListener('click', (event) => {
            if (calcDataDigits !== '') {
                calcDataString.push(calcDataDigits);
            }
            calcDataDigits = '';
            if (calcOperations.length + 1 === calcDataString.length) {
                calcOperations.push(event.target.textContent);
                display = display + event.target.textContent;
            } else {
                document.querySelector('.screen').insertAdjacentHTML('beforeend', 'error');
            };

            document.querySelector('.screen').insertAdjacentHTML('beforeend', event.target.textContent);
            console.log('temporary digit holder: ' + calcDataDigits);
            console.log('collecting numnbers array: '  + calcDataString);
            console.log('collecting operations array: ' + calcOperations);
        });
    };
})();


(function reload() {
    const cancelButton = document.querySelector('.btn-cancel');
    cancelButton.addEventListener('click', (event) => {
        calcDataDigits = [];
        location.reload();
    });
})();

let calcDataNumbers;
(function clickResultHandler() {
    
    const resultButton = document.querySelector('.btn-result');

    resultButton.addEventListener('click', (event) => {

        if (calcOperations.length === calcDataString.length) {
            calcDataString.push(calcDataDigits);
            calcDataNumbers = parseFloatArray(calcDataString);
            
        }
        let showResult = resultCalculating();
        
        console.log('should be the result number: ' + showResult);
        
        document.querySelector('.screen').textContent = showResult;
    });
})();

sum = (a, b) => a + b;
subtract = (a, b) => a - b;
divide = (a, b) => a / b;
multiply = (a, b) => a * b;

parseFloatArray = (arr) => arr.map(item => parseFloat(item));


function resultCalculating() {
    let result = [];
    result[0] = calcDataNumbers[0];
    for (let i = 0; i < calcOperations.length; i += 1) {
        
        if (calcOperations[i] == "+") {
            result.push(sum(result[i], calcDataNumbers[i + 1]));
        } else if (calcOperations[i] == "-") {
            result.push(subtract(result[i], calcDataNumbers[i + 1]));
        } else if (calcOperations[i] == "x") {
            result.push(multiply(result[i], calcDataNumbers[i + 1]));
        } else if (result[i] == "/") {
            result.push(divide(result[i], calcDataNumbers[i + 1]));
        }
    }
    console.log(' - - - CALCULATION - - - ')
    console.log('numbers array: ' + calcDataNumbers);
    console.log('operations array: ' + calcOperations)
    console.log('step by step result array: '+ result);
    return result[result.length-1];
};






