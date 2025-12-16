let quotes = [];
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const tweetBtn = document.getElementById('tweet-quote');

fetch('quotes.json')
    .then(response => response.json())
    .then(data => {
        quotes = data;
        showQuote();
    });


function showQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    quoteText.textContent = randomQuote.quote;
    authorText.textContent = `— ${randomQuote.author}`;

    
    tweetBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent('"' + randomQuote.quote + '" — ' + randomQuote.author)}`;
}


newQuoteBtn.addEventListener('click', showQuote);
