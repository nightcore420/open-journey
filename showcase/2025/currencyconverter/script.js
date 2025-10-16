const rates = {
  USD: 1.0,        // base currency
  EUR: 0.93,
  IDR: 15750,
  JPY: 155.2,
  GBP: 0.79,
};

const from = document.getElementById("fromCurrency");
const to = document.getElementById("toCurrency");
const result = document.getElementById("result");

// isi dropdown otomatis
function populateSelects() {
  Object.keys(rates).forEach(cur => {
    from.innerHTML += `<option value="${cur}">${cur}</option>`;
    to.innerHTML += `<option value="${cur}">${cur}</option>`;
  });
  from.value = "USD";
  to.value = "IDR";
}

function convert() {
  const amount = parseFloat(document.getElementById("amount").value);
  if (isNaN(amount) || amount <= 0) {
    result.textContent = "⚠️ Please enter a valid amount.";
    return;
  }

  const fromCur = from.value;
  const toCur = to.value;

  const usdValue = amount / rates[fromCur];
  const converted = usdValue * rates[toCur];

  result.innerHTML = `
    💵 ${amount.toFixed(2)} ${fromCur} = 
    <strong>${converted.toLocaleString(undefined, {maximumFractionDigits: 2})}</strong> ${toCur}
  `;
}

populateSelects();
