const a = document.getElementById('a');
const b = document.getElementById('b');
const out = document.getElementById('out');

const parse = (el) => {
  const v = parseFloat(el.value);
  return Number.isFinite(v) ? v : null;
};

const format = (n) => {
  return Number.isInteger(n) ? String(n) : String(+n.toFixed(8));
};

const calc = (op) => {
  const x = parse(a);
  const y = parse(b);

  if (x === null || y === null) {
    out.textContent = 'Enter both numbers';
    return;
  }
  if (op === '/' && y === 0) {
    out.textContent = 'Cannot divide by 0';
    return;
  }

  const map = {
    '+': () => x + y,
    '-': () => x - y,
    '*': () => x * y,
    '/': () => x / y
  };

  const fn = map[op];
  out.textContent = format(fn());
};

document.querySelector('.calc__buttons').addEventListener('click', (e) => {
  const op = e.target?.dataset?.op;
  if (op) calc(op);
});

let lastOp = '+';
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => { lastOp = btn.dataset.op; });
});
[a, b].forEach(el => {
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') calc(lastOp);
  });
});
