const units = {
  length: { m: 1, cm: 0.01, km: 1000, inch: 0.0254, ft: 0.3048 },
  weight: { kg: 1, g: 0.001, lb: 0.453592, oz: 0.0283495 },
  temperature: { C: 'C', F: 'F', K: 'K' },
};

const typeSelect = document.getElementById("type");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const inputValue = document.getElementById("inputValue");
const result = document.getElementById("result");

function populateUnits() {
  const type = typeSelect.value;
  fromUnit.innerHTML = '';
  toUnit.innerHTML = '';

  Object.keys(units[type]).forEach(u => {
    fromUnit.innerHTML += `<option value="${u}">${u}</option>`;
    toUnit.innerHTML += `<option value="${u}">${u}</option>`;
  });
}
populateUnits();
typeSelect.addEventListener("change", populateUnits);

document.getElementById("convertBtn").addEventListener("click", () => {
  const type = typeSelect.value;
  const val = parseFloat(inputValue.value);
  const from = fromUnit.value;
  const to = toUnit.value;

  if (isNaN(val)) return result.textContent = "⚠️ Enter a valid number";

  let output;
  if (type === "temperature") {
    output = convertTemp(val, from, to);
  } else {
    output = (val * units[type][from]) / units[type][to];
  }
  result.textContent = `Result: ${output.toFixed(4)} ${to}`;
});

function convertTemp(v, f, t) {
  if (f === t) return v;
  if (f === "C" && t === "F") return v * 9/5 + 32;
  if (f === "F" && t === "C") return (v - 32) * 5/9;
  if (f === "C" && t === "K") return v + 273.15;
  if (f === "K" && t === "C") return v - 273.15;
  if (f === "F" && t === "K") return (v - 32) * 5/9 + 273.15;
  if (f === "K" && t === "F") return (v - 273.15) * 9/5 + 32;
}