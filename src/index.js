const baseUrl = "https://dog.ceo/api/breed/";
const defaultUrl = "https://dog.ceo/api/breeds/image/random/50";

const urlSuffix = "/images/random/50";

// dog.ceo returns a maximum of 50 images in each call.


/**
 * Selectors to identify our HTML elements
 */

const indvThumbnail = document.querySelector('.indv-thumbnail');
const inputForm = document.querySelector('#input-form');
const selectedBreed = document.querySelector('.dog-breed');
const resultsMessage = document.querySelector('#results-message');

let breed = '';

/**
 * 
 * @param {*} images 
 */
const displaySearchResults = (images) => {
    resultsMessage.innerHTML = '';
/**
 * JSON looks like this.
 * {
    "message": [
        "https://images.dog.ceo/breeds/terrier-patterdale/patterdale-terrier-287612805105275kBT.jpg",
        "https://images.dog.ceo/breeds/spaniel-brittany/n02101388_1517.jpg",
        "https://images.dog.ceo/breeds/springer-english/n02102040_841.jpg"
    ],
    "status": "success"
}
 */
   images.forEach(element => {
       let newImageElement = document.createElement('img');

       newImageElement.setAttribute('src', element);
       newImageElement.setAttribute('alt', 'Image of Dog');
       indvThumbnail.appendChild(newImageElement);

       newImageElement.addEventListener('click', (event) => {
           event.preventDefault();
           imageModal.src = element;
       })
   });
}
/**
 * Fetch images from the API
 * @param {*} breedSelection 
 */


const getDogImages = async(breedSelection) => {

    // if nothing selected - default to random selection which means using a different URL

    let endpoint;

    if (breedSelection == 'all') {
        endpoint = defaultUrl;
    } else {
        endpoint = baseUrl + breedSelection + urlSuffix;
    }
  

    let response = await fetch(endpoint);

    // error handling if !response.ok

    let dogData = await response.json();

    console.log('Dog Data' + dogData);

    if (dogData.message.length > 0) {
        
        displaySearchResults(dogData.message);
    } else {
        resultsMessage.innerHTML = 'No images found';
    }

}

const handleFormSubmission = () => {

    console.log('Handling Form Submission I think');
    if (inputForm) {
        inputForm.addEventListener('submit', (event) => {
            event.preventDefault();

            if (selectedBreed.value) {
                breed = selectedBreed.value;
                getDogImages(breed);
            } else {
                getDogImages('all');
            }
        })
    }
}


handleFormSubmission();
/**
 * A sample on how to paginate the results on the client side.
 * Reference: http://jsfiddle.net/Lzp0dw83/1/
 * 
 * var current_page = 1;
var records_per_page = 3;

var objJson = [
    { adName: "AdName 1"},
    { adName: "AdName 2"},
    { adName: "AdName 3"},
    { adName: "AdName 4"},
    { adName: "AdName 5"},
    { adName: "AdName 6"},
    { adName: "AdName 7"},
    { adName: "AdName 8"},
    { adName: "AdName 9"},
    { adName: "AdName 10"}
]; // Can be obtained from another source, such as your objJson variable

function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}
    
function changePage(page)
{
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementById("listingTable");
    var page_span = document.getElementById("page");
 
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    listing_table.innerHTML = "";

    for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < objJson.length; i++) {
        listing_table.innerHTML += objJson[i].adName + "<br>";
    }
    page_span.innerHTML = page + "/" + numPages();

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function numPages()
{
    return Math.ceil(objJson.length / records_per_page);
}

window.onload = function() {
    changePage(1);
};
 */