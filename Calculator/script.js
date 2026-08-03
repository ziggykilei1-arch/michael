const display = document.getElementById("display");

let firstValue = null;
let operator = null;
let waitingForSecondValue = false;
let justCalculated = false;

function updateDisplay(value) {
  display.value = value;
}

function clearAll() {
  firstValue = null;
  operator = null;
  waitingForSecondValue = false;
  justCalculated = false;
  updateDisplay("0");
}

function appendNumber(number) {
  const current = display.value;

  if (waitingForSecondValue || current === "0" || (justCalculated && operator === null)) {
    updateDisplay(number);
    waitingForSecondValue = false;
    justCalculated = false;
  } else {
    updateDisplay(current + number);
  }
}

function appendDecimal() {
  if (waitingForSecondValue) {
    updateDisplay("0.");
    waitingForSecondValue = false;
    justCalculated = false;
    return;
  }

  if (!display.value.includes(".")) {
    updateDisplay(display.value + ".");
  }
}

function calculate(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        alert("Cannot divide by zero");
        return 0;
      }
      return a / b;
    default:
      return b;
  }
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(display.value);

  if (operator && waitingForSecondValue) {
    operator = nextOperator;
    return;
  }

  if (firstValue === null) {
    firstValue = inputValue;
  } else if (operator) {
    const result = calculate(firstValue, inputValue, operator);
    updateDisplay(String(result));
    firstValue = result;
  }

  operator = nextOperator;
  waitingForSecondValue = true;
  justCalculated = false;
}

function calculateResult() {
  if (operator === null || firstValue === null) return;

  const inputValue = parseFloat(display.value);
  const result = calculate(firstValue, inputValue, operator);

  updateDisplay(String(result));
  firstValue = result;
  operator = null;
  waitingForSecondValue = false;
  justCalculated = true;
}

function deleteLast() {
  let current = display.value;

  if (current.length <= 1) {
    updateDisplay("0");
    return;
  }

  current = current.slice(0, -1);
  updateDisplay(current);
}

function applyFunction(fn) {
  const currentValue = parseFloat(display.value);
  let result;

  switch (fn) {
    case "sqrt":
      result = Math.sqrt(currentValue);
      break;
    case "pow2":
      result = currentValue * currentValue;
      break;
    case "pow3":
      result = currentValue * currentValue * currentValue;
      break;
    case "sin":
      result = Math.sin(currentValue);
      break;
    case "cos":
      result = Math.cos(currentValue);
      break;
    case "tan":
      result = Math.tan(currentValue);
      break;
    case "log":
      result = Math.log10(currentValue);
      break;
    case "ln":
      result = Math.log(currentValue);
      break;
    case "exp":
      result = Math.exp(currentValue);
      break;
    case "pi":
      result = Math.PI;
      break;
    default:
      return;
  }

  if (!isFinite(result) || Number.isNaN(result)) {
    alert("Invalid input for this function");
    result = 0;
  }

  updateDisplay(String(result));
  waitingForSecondValue = true;
  justCalculated = true;
  operator = null;
  firstValue = null;
}

document.querySelectorAll("[data-number]").forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.dataset.number));
});

document.querySelectorAll("[data-operator]").forEach((button) => {
  button.addEventListener("click", () => handleOperator(button.dataset.operator));
});

document.querySelectorAll("[data-function]").forEach((button) => {
  button.addEventListener("click", () => applyFunction(button.dataset.function));
});

document.getElementById("decimal").addEventListener("click", appendDecimal);
document.getElementById("equals").addEventListener("click", calculateResult);
document.getElementById("clear").addEventListener("click", clearAll);
document.getElementById("delete").addEventListener("click", deleteLast);
