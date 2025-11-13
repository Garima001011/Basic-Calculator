const display = document.getElementById("display");
const history = document.getElementById("history");

let expression = "";
let currentValue = "";

const updateDisplay = () => {
  display.textContent = currentValue || "0";
  history.textContent = expression;
};

const inputDigit = (digit) => {
  currentValue += digit;
  updateDisplay();
};

const inputDot = () => {
  if (!currentValue.includes(".")) {
    currentValue = currentValue === "" ? "0." : currentValue + ".";
    updateDisplay();
  }
};

const clearAll = () => {
  expression = "";
  currentValue = "";
  updateDisplay();
};

const handleOperator = (op) => {
  if (currentValue === "" && expression !== "") {
    expression = expression.slice(0, -1) + op;
  } else {
    expression += currentValue + op;
    currentValue = "";
  }
  updateDisplay();
};

const changeSign = () => {
  if (currentValue) {
    currentValue = String(-parseFloat(currentValue));
    updateDisplay();
  }
};

const percent = () => {
  if (currentValue) {
    currentValue = String(parseFloat(currentValue) / 100);
    updateDisplay();
  }
};

const equals = () => {
  if (!currentValue && !expression) return;

  expression += currentValue;

  try {
    const result = eval(
      expression.replace(/×/g, "*").replace(/÷/g, "/")
    );
    currentValue = String(result);
  } catch (e) {
    currentValue = "Err";
  }

  expression = "";
  updateDisplay();
};

document.querySelector(".calc__keys").addEventListener("click", (e) => {
  const btn = e.target;
  if (!btn.classList.contains("btn")) return;

  const { digit, op, dot, action } = btn.dataset;

  if (digit !== undefined) return inputDigit(digit);
  if (dot !== undefined) return inputDot();
  if (op !== undefined) return handleOperator(op);

  if (action === "clear") return clearAll();
  if (action === "sign") return changeSign();
  if (action === "percent") return percent();
  if (action === "equals") return equals();
});
