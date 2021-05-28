const qouteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQouteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQoutes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  qouteContainer.hidden = true;
}

function removeLoadingSpinner() {
  qouteContainer.hidden = false;
  loader.hidden = true;
}

//Show newQoute
function newQoutes() {
  showLoadingSpinner();
  // Pick a random qoutes from Api
  const qoute = apiQoutes[Math.floor(Math.random() * apiQoutes.length)];

  // Check if Author field is blank and replace It with "Unknown"
  if (!qoute.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = qoute.author;
  }

  //Check Qoute length to determine styling
  if (qoute.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = qoute.text;
  removeLoadingSpinner();
}

// Get Quotes From API
async function getQoutesFromAPI() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQoutes = await response.json();
    newQoutes();
  } catch (error) {
    getQoutesFromAPI();
  }
}

//Tweet Qoute
function tweetQoute() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listener
newQouteBtn.addEventListener("click", newQoutes);
twitterBtn.addEventListener("click", tweetQoute);

//On load
getQoutesFromAPI();
