function calculateBMI() {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value) / 100;
  const result = document.getElementById("result");

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    result.textContent = "⚠️ Please enter valid height and weight values.";
    return;
  }

  const bmi = weight / (height * height);
  let category = "";

  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 24.9) category = "Normal weight";
  else if (bmi < 29.9) category = "Overweight";
  else category = "Obese";

  result.innerHTML = `
    💡 Your BMI: <strong>${bmi.toFixed(1)}</strong><br>
    🩺 Category: <strong>${category}</strong>
  `;
}
