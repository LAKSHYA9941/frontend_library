/* ====================================================================
   FOCUS DECK — script.js
   Every feature below follows the same shape:
     1. Grab the HTML elements we need to control
     2. Load any saved data from Local Storage
     3. Draw that data on screen
     4. Listen for user actions (clicks/typing)
     5. Update the data + save it + redraw
   Once you understand this shape in one feature, you understand
   it in all of them.
==================================================================== */


/* ====================================================================
   1. NAVIGATION
   Job: show the dashboard by default, and when a feature card is
   clicked, hide the dashboard and show that one feature view.
==================================================================== */
const dashboard = document.getElementById('dashboard');
const featureViews = document.querySelectorAll('.feature-view');
const featureCards = document.querySelectorAll('.feature-card');

function openFeature(name) {
  dashboard.style.display = 'none';
  featureViews.forEach(view => {
    view.classList.toggle('active', view.dataset.view === name);
  });
}

function closeFeature() {
  featureViews.forEach(view => view.classList.remove('active'));
  dashboard.style.display = 'grid';
}

featureCards.forEach(card => {
  card.addEventListener('click', () => openFeature(card.dataset.feature));
});

// Every "← Back" button has a data-close attribute, so ONE listener
// per button (found via querySelectorAll) handles all of them.
document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', closeFeature);
});


/* ====================================================================
   2. TODO LIST
==================================================================== */
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoListEl = document.getElementById('todo-list');

// Load saved tasks, or start with an empty array if nothing saved yet.
let todos = JSON.parse(localStorage.getItem('fd-todos')) || [];

function saveTodos() {
  localStorage.setItem('fd-todos', JSON.stringify(todos));
}

function renderTodos() {
  todoListEl.innerHTML = ''; // clear, then rebuild from the data
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = (todo.completed ? 'completed ' : '') + (todo.important ? 'important' : '');
    li.innerHTML = `
      <span class="item-text">${escapeHTML(todo.text)}</span>
      <button data-action="important" title="Mark important">★</button>
      <button data-action="complete" title="Mark done">✓</button>
      <button data-action="delete" title="Delete">✕</button>
    `;
    // Store which todo this row belongs to, using its id
    li.dataset.id = todo.id;
    todoListEl.appendChild(li);
  });
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault(); // stop the page from reloading (default form behavior)
  const text = todoInput.value.trim();
  if (!text) return; // ignore empty submissions
  todos.push({ id: Date.now(), text, completed: false, important: false });
  todoInput.value = '';
  saveTodos();
  renderTodos();
});

// EVENT DELEGATION: instead of adding a click listener to every button
// on every task (wasteful, and breaks for new tasks), we add ONE
// listener on the list itself and figure out what was clicked.
todoListEl.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const li = btn.closest('li');
  const id = Number(li.dataset.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return;

  if (btn.dataset.action === 'important') todo.important = !todo.important;
  if (btn.dataset.action === 'complete') todo.completed = !todo.completed;
  if (btn.dataset.action === 'delete') todos = todos.filter(t => t.id !== id);

  saveTodos();
  renderTodos();
});

renderTodos();


/* ====================================================================
   3. DAILY PLANNER
   One text field per hour of the day. Typing into any of them
   saves the whole plan object to Local Storage.
==================================================================== */
const plannerListEl = document.getElementById('planner-list');
let plan = JSON.parse(localStorage.getItem('fd-plan')) || {};

function renderPlanner() {
  plannerListEl.innerHTML = '';
  const currentHour = new Date().getHours();
  for (let hour = 6; hour <= 22; hour++) { // 6 AM to 10 PM
    const row = document.createElement('div');
    row.className = 'planner-row' + (hour === currentHour ? ' current-hour' : '');
    const label = formatHourLabel(hour);
    row.innerHTML = `
      <span class="planner-hour">${label}</span>
      <input type="text" data-hour="${hour}" placeholder="Nothing planned"
             value="${escapeHTML(plan[hour] || '')}" />
    `;
    plannerListEl.appendChild(row);
  }
}

function formatHourLabel(hour) {
  const period = hour >= 12 ? 'PM' : 'AM';
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display}:00 ${period}`;
}

// Save as the user types. In a bigger app you might "debounce" this
// (wait until they pause typing) but for a simple planner, saving
// on every keystroke is fine and keeps the code easy to follow.
plannerListEl.addEventListener('input', (e) => {
  if (e.target.matches('input[data-hour]')) {
    const hour = e.target.dataset.hour;
    plan[hour] = e.target.value;
    localStorage.setItem('fd-plan', JSON.stringify(plan));
  }
});

renderPlanner();


/* ====================================================================
   4. DAILY GOALS
   Nearly identical pattern to the Todo List, plus a progress line.
==================================================================== */
const goalForm = document.getElementById('goal-form');
const goalInput = document.getElementById('goal-input');
const goalListEl = document.getElementById('goal-list');
const goalProgressEl = document.getElementById('goal-progress');

let goals = JSON.parse(localStorage.getItem('fd-goals')) || [];

function saveGoals() {
  localStorage.setItem('fd-goals', JSON.stringify(goals));
}

function renderGoals() {
  goalListEl.innerHTML = '';
  goals.forEach(goal => {
    const li = document.createElement('li');
    li.className = goal.done ? 'completed' : '';
    li.dataset.id = goal.id;
    li.innerHTML = `
      <span class="item-text">${escapeHTML(goal.text)}</span>
      <button data-action="toggle">${goal.done ? '↺' : '✓'}</button>
      <button data-action="delete">✕</button>
    `;
    goalListEl.appendChild(li);
  });
  const done = goals.filter(g => g.done).length;
  goalProgressEl.textContent = `${done} of ${goals.length} completed`;
}

goalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = goalInput.value.trim();
  if (!text) return;
  goals.push({ id: Date.now(), text, done: false });
  goalInput.value = '';
  saveGoals();
  renderGoals();
});

goalListEl.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const id = Number(btn.closest('li').dataset.id);
  if (btn.dataset.action === 'toggle') {
    const goal = goals.find(g => g.id === id);
    goal.done = !goal.done;
  }
  if (btn.dataset.action === 'delete') {
    goals = goals.filter(g => g.id !== id);
  }
  saveGoals();
  renderGoals();
});

renderGoals();


/* ====================================================================
   5. POMODORO TIMER
==================================================================== */
const WORK_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

let secondsLeft = WORK_SECONDS;
let onBreak = false;
let intervalId = null; // holds the setInterval reference so we can stop it

const timerDisplay = document.getElementById('timer-display');
const sessionLabel = document.getElementById('session-label');

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const s = (totalSeconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function renderTimer() {
  timerDisplay.textContent = formatTime(secondsLeft);
  sessionLabel.textContent = onBreak ? 'BREAK' : 'WORK SESSION';
}

document.getElementById('timer-start').addEventListener('click', () => {
  if (intervalId) return; // GUARD: never start a second interval on top of one already running
  intervalId = setInterval(() => {
    secondsLeft--;
    if (secondsLeft <= 0) {
      onBreak = !onBreak;
      secondsLeft = onBreak ? BREAK_SECONDS : WORK_SECONDS;
      alert(onBreak ? "Work session done — take a 5 minute break!" : "Break's over — back to work!");
    }
    renderTimer();
  }, 1000);
});

document.getElementById('timer-pause').addEventListener('click', () => {
  clearInterval(intervalId); // stop ticking, but keep the current time
  intervalId = null;
});

document.getElementById('timer-reset').addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
  onBreak = false;
  secondsLeft = WORK_SECONDS;
  renderTimer();
});

renderTimer();


/* ====================================================================
   6. MOTIVATION QUOTE
   Uses fetch() to call a free public API. If the network fails, we
   fall back to a local list so the card never looks broken.
==================================================================== */
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const quoteBtn = document.getElementById('quote-new');

const fallbackQuotes = [
  { text: "Small steps every day beat big leaps once in a while.", author: "Focus Deck" },
  { text: "Discipline is choosing what you want most over what you want now.", author: "Focus Deck" },
  { text: "Done is better than perfect.", author: "Focus Deck" },
];

async function loadQuote() {
  quoteText.textContent = "Loading a good thought for you…";
  quoteAuthor.textContent = "";
  try {
    const response = await fetch('https://dummyjson.com/quotes/random');
    if (!response.ok) throw new Error('Bad response');
    const data = await response.json();
    quoteText.textContent = `"${data.quote}"`;
    quoteAuthor.textContent = `— ${data.author}`;
  } catch (err) {
    // Network/API failed — show a local quote instead of a blank card
    const pick = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    quoteText.textContent = `"${pick.text}"`;
    quoteAuthor.textContent = `— ${pick.author}`;
  }
}

quoteBtn.addEventListener('click', loadQuote);
loadQuote(); // show one immediately when the page loads


/* ====================================================================
   7. WEATHER WIDGET
   Uses the Geolocation API to get coordinates, then Open-Meteo
   (a free weather API that needs no API key) to get conditions.
==================================================================== */
const weatherBody = document.getElementById('weather-body');

const weatherCodeMap = {
  0: 'Clear sky', 1: 'Mostly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Fog', 51: 'Light drizzle', 61: 'Rain', 71: 'Snow', 80: 'Showers', 95: 'Thunderstorm',
};

async function loadWeather(lat, lon) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;
    const response = await fetch(url);
    const data = await response.json();
    const c = data.current;
    const condition = weatherCodeMap[c.weather_code] || 'Unknown';
    weatherBody.innerHTML = `
      <div class="weather-temp">${Math.round(c.temperature_2m)}°C</div>
      <div class="weather-detail">${condition} · Humidity ${c.relative_humidity_2m}% · Wind ${Math.round(c.wind_speed_10m)} km/h</div>
    `;
  } catch (err) {
    weatherBody.innerHTML = `<span class="weather-loading">Weather unavailable right now.</span>`;
  }
}

function initWeather() {
  if (!navigator.geolocation) {
    // No geolocation support — fall back to a fixed city (Delhi)
    loadWeather(28.6139, 77.2090);
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => loadWeather(pos.coords.latitude, pos.coords.longitude),
    () => loadWeather(28.6139, 77.2090) // user denied location access
  );
}

initWeather();


/* ====================================================================
   8. DATE & TIME
==================================================================== */
const dateTextEl = document.getElementById('date-text');
const timeTextEl = document.getElementById('time-text');

function updateClock() {
  const now = new Date();
  dateTextEl.textContent = now.toLocaleDateString(undefined, {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
  });
  timeTextEl.textContent = now.toLocaleTimeString();
}

updateClock();          // run once immediately so it doesn't start blank
setInterval(updateClock, 1000);


/* ====================================================================
   9. DYNAMIC BACKGROUND
   Picks a color tint based on the current hour.
==================================================================== */
const dynamicBg = document.getElementById('dynamic-bg');

function updateBackground() {
  const hour = new Date().getHours();
  let category;
  if (hour >= 5 && hour < 12) category = 'morning';
  else if (hour >= 12 && hour < 17) category = 'afternoon';
  else if (hour >= 17 && hour < 21) category = 'evening';
  else category = 'night';

  dynamicBg.className = `tint-${category}`;
}

updateBackground();
setInterval(updateBackground, 60 * 1000); // re-check every minute


/* ====================================================================
   10. THEME SWITCH (light/dark)
==================================================================== */
const themeToggleBtn = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');
const rootEl = document.documentElement; // the <html> tag

function applyTheme(theme) {
  rootEl.setAttribute('data-theme', theme);
  themeLabel.textContent = theme.toUpperCase();
  localStorage.setItem('fd-theme', theme);
}

// Apply the saved theme immediately (before the click), so there's
// no flash of the wrong theme when the page loads.
applyTheme(localStorage.getItem('fd-theme') || 'dark');

themeToggleBtn.addEventListener('click', () => {
  const current = rootEl.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});


/* ====================================================================
   SMALL HELPER
   Prevents user-typed text like <script> from being read as real
   HTML tags when we insert it with innerHTML.
==================================================================== */
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
