const display = document.getElementById("display");

let firstValue = null;
let operator = null;
let waitingForSecond = false;

const formatValue = (value) => {
  const str = String(value);
  return str.length > 12 ? Number(value).toPrecision(10) : str;
};

const updateDisplay = (value) => {
  display.textContent = formatValue(value);
};

const inputDigit = (digit) => {
  if (waitingForSecond) {
    display.textContent = digit;
    waitingForSecond = false;
  } else {
    const current = display.textContent === "0" ? "" : display.textContent;
    display.textContent = current + digit;
  }
};

const inputDot = () => {
  if (waitingForSecond) {
    display.textContent = "0.";
    waitingForSecond = false;
    return;
  }
  if (!display.textContent.includes(".")) {
    display.textContent += ".";
  }
};

const clearAll = () => {
  firstValue = null;
  operator = null;
  waitingForSecond = false;
  updateDisplay(0);
};

const changeSign = () => {
  if (display.textContent === "0") return;
  if (display.textContent.startsWith("-")) {
    display.textContent = display.textContent.slice(1);
  } else {
    display.textContent = "-" + display.textContent;
  }
};

const percent = () => {
  const current = parseFloat(display.textContent) || 0;
  updateDisplay(current / 100);
};

const performCalc = (op, first, second) => {
  switch (op) {
    case "+": return first + second;
    case "-": return first - second;
    case "*": return first * second;
    case "/": return second === 0 ? "Err" : first / second;
    default:  return second;
  }
};

const handleOperator = (nextOp) => {
  const current = parseFloat(display.textContent);

  if (firstValue === null) {
    firstValue = current;
  } else if (!waitingForSecond && operator) {
    const result = performCalc(operator, firstValue, current);
    firstValue = typeof result === "number" ? result : null;
    updateDisplay(result);
  }

  operator = nextOp;
  waitingForSecond = true;
};

const equals = () => {
  if (operator === null || waitingForSecond) return;
  const current = parseFloat(display.textContent);
  const result = performCalc(operator, firstValue, current);
  firstValue = typeof result === "number" ? result : null;
  operator = null;
  waitingForSecond = false;
  updateDisplay(result);
};

document.querySelector(".calc__keys").addEventListener("click", (e) => {
  const btn = e.target;
  if (!btn.classList.contains("btn")) return;

  const { digit, op, action, dot } = btn.dataset;

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
  if (action === "clear") {
    clearAll();
  } else if (action === "sign") {
    changeSign();
  } else if (action === "percent") {
    percent();
  } else if (action === "equals") {
    equals();
  }
});
