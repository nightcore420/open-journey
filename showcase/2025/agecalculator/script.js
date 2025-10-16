function calculateAge() {
  const input = document.getElementById("birthDate").value;
  const result = document.getElementById("result");

  if (!input) {
    result.textContent = "⚠️ Please select your date of birth.";
    return;
  }

  const birthDate = new Date(input);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  result.textContent = `🎉 You are ${years} years, ${months} months, and ${days} days old.`;
}
