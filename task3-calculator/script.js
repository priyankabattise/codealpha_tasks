let currentInput = '0';
let previousInput = '';
let operation = undefined;

const currentOperandDisplay = document.getElementById('current-operand');
const previousOperandDisplay = document.getElementById('previous-operand');
const historyList = document.getElementById('history-list');

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operation = undefined;
    updateDisplay();
}

function deleteNumber() {
    if (currentInput === '0') return;
    currentInput = currentInput.toString().slice(0, -1);
    if (currentInput === '') currentInput = '0';
    updateDisplay();
}

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    if (currentInput === '0' && number !== '.') {
        currentInput = number.toString();
    } else {
        currentInput = currentInput.toString() + number.toString();
    }
    updateDisplay();
}

function chooseOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        compute();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

function compute() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = current === 0 ? "Error" : prev / current;
            break;
        default:
            return;
    }

    const fullEquation = `${previousInput} ${getOperatorSymbol(operation)} ${currentInput}`;
    
    // Add to history if calculation was valid
    if (computation !== "Error") {
        addToHistory(fullEquation, computation);
    }

    currentInput = computation.toString();
    operation = undefined;
    previousInput = '';
    updateDisplay();
}

function getOperatorSymbol(op) {
    if (op === '*') return '×';
    if (op === '/') return '÷';
    return op;
}

function updateDisplay() {
    currentOperandDisplay.innerText = currentInput;
    if (operation != null) {
        previousOperandDisplay.innerText = `${previousInput} ${getOperatorSymbol(operation)}`;
    } else {
        previousOperandDisplay.innerText = '';
    }
}

function addToHistory(equation, result) {
    const li = document.createElement('li');
    li.classList.add('history-item');
    
    li.innerHTML = `
        <div class="history-equation">${equation} =</div>
        <div class="history-result">${result}</div>
    `;
    
    historyList.appendChild(li);
    historyList.scrollTop = historyList.scrollHeight; 
}

function clearHistory() {
    historyList.innerHTML = '';
}

window.addEventListener('keydown', e => {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (e.key === '=' || e.key === 'Enter') compute();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clearDisplay();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        chooseOperator(e.key);
    }
});
