 const display = document.getElementById("display");

    let firstValue = null;
    let operator = null;
    let waitingForSecondValue = false;

    function updateDisplay(value) {
      display.value = value;
    }

    function clearAll() {
      firstValue = null;
      operator = null;
      waitingForSecondValue = false;
      updateDisplay("0");
    }

    function appendNumber(number) {
      const current = display.value;

      if (waitingForSecondValue) {
        updateDisplay(number);
        waitingForSecondValue = false;
      } else {
        updateDisplay(current === "0" ? number : current + number);
      }
    }

    function appendDecimal() {
      if (waitingForSecondValue) {
        updateDisplay("0.");
        waitingForSecondValue = false;
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
    }

    function calculateResult() {
      if (operator === null || firstValue === null) return;

      const inputValue = parseFloat(display.value);
      const result = calculate(firstValue, inputValue, operator);

      updateDisplay(String(result));
      firstValue = result;
      operator = null;
      waitingForSecondValue = false;
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

    document.querySelectorAll("[data-number]").forEach((button) => {
      button.addEventListener("click", () => appendNumber(button.dataset.number));
    });

    document.querySelectorAll("[data-operator]").forEach((button) => {
      button.addEventListener("click", () => handleOperator(button.dataset.operator));
    });

    document.getElementById("decimal").addEventListener("click", appendDecimal);
    document.getElementById("equals").addEventListener("click", calculateResult);
    document.getElementById("clear").addEventListener("click", clearAll);
    document.getElementById("delete").addEventListener("click", deleteLast);
