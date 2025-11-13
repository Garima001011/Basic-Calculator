const display = document.getElementById("display");

let expression = "";
let currentValue = "";
let justEvaluated = false;

// Show full expression in main screen
const refreshDisplay = () => {
  let toShow = (expression + currentValue) || "0";
  // Pretty display for * and /
  toShow = toShow.replace(/\*/g, "×").replace(/\//g, "÷");
  display.textContent = toShow;
};

const inputDigit = (digit) => {
  if (justEvaluated) {
    // Start a new expression after =
    expression = "";
    currentValue = digit;
    justEvaluated = false;
  } else {
    currentValue += digit;
  }
  refreshDisplay();
};

const inputDot = () => {
  if (justEvaluated) {
    expression = "";
    currentValue = "0.";
    justEvaluated = false;
    refreshDisplay();
    return;
  }

  if (!currentValue.includes(".")) {
    currentValue = currentValue === "" ? "0." : currentValue + ".";
    refreshDisplay();
  }
};

const clearAll = () => {
  expression = "";
  currentValue = "";
  justEvaluated = false;
  refreshDisplay();
};

const handleOperator = (op) => {
  // Continue with result after equals
  if (justEvaluated) {
    expression = currentValue;
    currentValue = "";
    justEvaluated = false;
  }

  if (currentValue === "" && expression !== "") {
    // Replace last operator
    const lastChar = expression[expression.length - 1];
    if ("+-*/".includes(lastChar)) {
      expression = expression.slice(0, -1) + op;
    } else {
      expression += op;
    }
  } else if (currentValue !== "") {
    expression += currentValue + op;
    currentValue = "";
  }
  refreshDisplay();
};

const changeSign = () => {
  if (!currentValue) return;
  const num = parseFloat(currentValue);
  if (!isNaN(num)) {
    currentValue = String(-num);
    refreshDisplay();
  }
};

const percent = () => {
  if (!currentValue) return;
  const num = parseFloat(currentValue);
  if (!isNaN(num)) {
    currentValue = String(num / 100);
    refreshDisplay();
  }
};

const equals = () => {
  if (!currentValue && !expression) return;

  expression += currentValue;
  currentValue = "";

  try {
    const raw = expression.replace(/×/g, "*").replace(/÷/g, "/");
    const result = eval(raw); // simple expression calculator
    currentValue = String(result);
  } catch (e) {
    currentValue = "Err";
  }

  expression = "";
  justEvaluated = true;
  refreshDisplay();
};

document.querySelector(".calc__keys").addEventListener("click", (e) => {
  const btn = e.target;
  if (!btn.classList.contains("btn")) return;

  const { digit, op, dot, action } = btn.dataset;

  if (digit !== undefined) {
    inputDigit(digit);
    return;
  }
  if (dot !== undefined) {
    inputDot();
    return;
  }
  if (op !== undefined) {
    handleOperator(op);
    return;
  }

  if (action === "clear") clearAll();
  else if (action === "sign") changeSign();
  else if (action === "percent") percent();
  else if (action === "equals") equals();
});

// Initial display
refreshDisplay();
