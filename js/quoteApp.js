// random quotes

//Things you need:
// create an array 
const QUOTE_LIST = [];


// assign 10 quotes to each array index
QUOTE_LIST[0] = "“All our dreams can come true, if we have the courage to pursue them";
QUOTE_LIST[1] = "The secret of getting ahead is getting started.";
QUOTE_LIST[2] = "Only the paranoid survive.";
QUOTE_LIST[3] = "Lighten up on yourself. No one is perfect.";
QUOTE_LIST[4] = "Take time to do what makes your soul happy";
QUOTE_LIST[5] = "Trust in your life that goodness is on its way to you.";


// need a randomize math function
// create a constant for quote
// create randomQuote function

//load quotes
window.onload = function selectQuote () {
    // randomize quotes
    var randomIndexNumber = Math.floor(Math.random() * (QUOTE_LIST.length));

    // select the randomQuote class 
    const randomQuote = document.getElementById("randomQuote");

    // use the value of randomNIndexumber to randomly retrieve a quote from the QUOTE_LIST
    // array and insert this chosen index value into the HTML document.
    //insert quote into the html document 
    
    randomQuote.innerHTML = QUOTE_LIST[randomIndexNumber]; // so onload, 
                                                           // randomQuote.innerHHTML
                                                           // = QUOTE_LIST[1]; which is 
                                                           // "The secret of getting ahead
                                                           // is getting started".
    

    // store quote in local storage
    // if quote exist in local storage, remove it or hide it from the array so 
    // that it cannot be picked again.
}

// a new quote should replace the old quote at 12:00 am everyday. 