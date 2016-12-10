// search the collection using a JSON call
      function search(query) {
        return $.getJSON("https://www.rijksmuseum.nl/api/nl/collection?q=" + encodeURIComponent(query) + "&key=eBvLLJik&format=json");
      }

// creating variables for required HTML elements on the page, the search text field, the search button, and the result div
var searchBtn = document.getElementById("search");
var resultDiv = document.getElementById("result-div");
var searchField = document.getElementById("query");

searchBtn.addEventListener("click", doSearch);

hideElement("loader");

// my global variables to store a local copy of the data sent by the server, as an array of objects
let resultsArray = [];
let resultsObj = {};

// data added to the local copy of the response
let artworkCounter = 0;

function doSearch() {
    var searchString = searchField.value;
    if (!searchString) {
        resultDiv.innerHTML = "<p>The search field can't be empty!!!</p>";
    } else {
        
        showElement("loader");
        resultDiv.innerHTML = "";
        resultsArray = [];
        
        // performing the search and getting the request from the server
        var response = search(searchString);
        
        response.done(function(data) {
            hideElement("loader");
            artworkCounter = 0;
            $.each(data.artObjects, function(index, artObj) {
                artworkCounter++;
                resultsObj = {count: artworkCounter, code: artObj.objectNumber, title: artObj.title, webpage: artObj.links.web, artist: artObj.principalOrFirstMaker};
                resultsArray.push(resultsObj);
            });
            displayResults();
        });
    }
}

function displayResults() {
    resultsArray.forEach(function(result, index) {
        resultDiv.innerHTML += "<div class='results'><ul class='results-ul'><li>Artwork <p class='results-p'>#" + result.count + "</p></li><li>Title: <p class='results-p'>" + result.title + "</p></li><li>Rijksmuseum Code: <p class='results-p'>" + result.code + "</p></li><li>Artist (Maker): <p class='results-p'>" + result.artist + "</p></li></ul><p id='link-p'>Check it in <a href=" + result.webpage + " target='_blank'><img src='images/rijkslogo.jpg' id='rijks-logo'></a></p></div>";
    });
}

function showElement(elementId) {
    document.getElementById(elementId).style.display = "block";
}

function hideElement(elementId) {
    document.getElementById(elementId).style.display = "none";
}

