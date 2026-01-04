let quotes = [];
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");

fetch("quotes.json")
  .then((res) => res.json())
  .then((data) => {
    quotes = data;
    showQuote();
  });

function showQuote() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteText.textContent = randomQuote.quote;
  authorText.textContent = randomQuote.author
    ? `— ${randomQuote.author}`
    : "— Unknown";

  document.getElementById(
    "tweet-quote"
  ).href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    randomQuote.quote
  )}`;

  if (!document.body.classList.contains("dark-mode")) {
    document.body.style.background = `hsl(${Math.random() * 360}, 70%, 80%)`;
  }
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  document.getElementById("theme-toggle").textContent = isDark
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});

document.getElementById("copy-quote").addEventListener("click", () => {
  const fullText = `"${quoteText.textContent}" ${authorText.textContent}`;
  navigator.clipboard.writeText(fullText);
  alert("Quote copied!");
});

document.getElementById("read-quote").addEventListener("click", () => {
  const speech = new SpeechSynthesisUtterance(
    `${quoteText.textContent} by ${authorText.textContent}`
  );
  window.speechSynthesis.speak(speech);
});

const favList = document.getElementById("favorites-list");

document.getElementById("fav-quote").addEventListener("click", () => {
  const quote = quoteText.textContent;

  let favorites = JSON.parse(localStorage.getItem("myQuotes")) || [];
  if (!favorites.includes(quote)) {
    favorites.push(quote);
    localStorage.setItem("myQuotes", JSON.stringify(favorites));
    renderFavorites();
  }
});

function renderFavorites() {
  const favorites = JSON.parse(localStorage.getItem("myQuotes")) || [];
  favList.innerHTML = favorites.map((q) => `<li>${q}</li>`).join("");
}

renderFavorites();
document.getElementById("new-quote").addEventListener("click", showQuote);
