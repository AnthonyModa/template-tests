const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Hide loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show New quote
function newQuote() {
    loading();
    //Pick a random quote from API Quotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    // Check if Author field is blank and replace it with 'unknown'
    if (!quote.author) {
        authorText.textContent = 'Anonymous';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quotes length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    complete();

}


// Get quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //alert(error)
        //Catch error here
    }
}

//Event Listener
if(newQuoteBtn){
    newQuoteBtn.addEventListener('click', newQuote);
}


//onLoad
getQuotes();
