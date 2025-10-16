const cities = [
  { name: "Jakarta", tz: "Asia/Jakarta" },
  { name: "Tokyo", tz: "Asia/Tokyo" },
  { name: "London", tz: "Europe/London" },
  { name: "New York", tz: "America/New_York" },
  { name: "Sydney", tz: "Australia/Sydney" },
];

const grid = document.getElementById("clockGrid");

function createCards() {
  cities.forEach(city => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="city">${city.name}</div>
      <div class="time" id="${city.tz.replace('/', '_')}">--:--:--</div>
    `;
    grid.appendChild(card);
  });
}

function updateTime() {
  cities.forEach(city => {
    const el = document.getElementById(city.tz.replace('/', '_'));
    const now = new Date().toLocaleTimeString('en-US', {
      timeZone: city.tz,
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    });
    el.textContent = now;
  });
}

createCards();
updateTime();
setInterval(updateTime, 1000);
