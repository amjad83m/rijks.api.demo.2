// search the collection using a JSON call
      function search(query) {
        return $.getJSON("https://www.rijksmuseum.nl/api/nl/collection?q=" + encodeURIComponent(query) + "&key=eBvLLJik&format=json");
      }


var searchBtn = document.getElementById("search");
searchBtn.addEventListener("click", doSearch);

var resultD = document.getElementById("result");
var searchField = document.getElementById("query");

hideElement("loader");

let resultsArray = [];
let resultsObj = {};
let artworkCounter = 0;

function doSearch() {
    var searchString = searchField.value;
    if (!searchString) {
        resultD.innerHTML = "The search field can't be empty!!!";
    } else {
        showElement("loader");
        resultD.innerHTML = "";
        resultsArray = [];
        search(searchString).done(function(data) {
            /*
            for (let artObj in data.artObjects) {
                var rDiv = document.createElement("div");
                var rImg = document.createElement("img");
                var rTitleText = document.createTextNode(data.artObjects[artObj].title);
                var rTitle = document.createElement("p");
                rTitle.appendChild(rTitleText);
                rDiv.appendChild(rImg);
                rDiv.appendChild(rTitle);
                
                rImg.src = data.artObjects[artObj].webImage.url;
                
                
                
                resultD.appendChild(rDiv);
            }
            */
            hideElement("loader");
            artworkCounter = 0;
            $.each(data.artObjects, function(index, artObj) {
                artworkCounter++;
                console.log(artObj);
                resultsObj = {count: artworkCounter, code: artObj.objectNumber, title: artObj.title, webpage: artObj.links.web, artist: artObj.principalOrFirstMaker};
                resultsArray.push(resultsObj);
            });
            displayResults();
        });
    }
}

function displayResults() {
    resultsArray.forEach(function(result, index) {
        resultD.innerHTML += "<div class='results'><ul><li>Artwork #" + result.count + "</li><li>Title: " + result.title + "</li><li>Rijksmuseum Code: " + result.code + "</li><li>Artist (Maker): " + result.artist + "</li><li><a href=" + result.webpage + " target='_blank'>Go to artwork</a></li></ul></div>";
    });
}


function showElement(elementId) {
    document.getElementById(elementId).style.display = "block";
}

function hideElement(elementId) {
    document.getElementById(elementId).style.display = "none";
}

