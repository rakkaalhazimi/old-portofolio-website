var summary;
let article = document.getElementById("article");
let result = document.getElementById("result")
let loading = document.getElementById("loading");

function split_and_generate(sen) {
  // Split sentences
  sentences = sen.split(".")
                 .filter( x => x != "" )                    // remove whitespace item
                 .map( (x) => {x += "."; return x.trim()} ) // add "." and trim

  // Add paragraph node
  for (sen of sentences) {
    let para = document.createElement("p");
    let text = document.createTextNode(sen);
    let line = document.createElement("br");

    para.appendChild(text);
    result.appendChild(para);
  }
}

// Function to request summarization from API
function request_summary(req_data) {
  // Redirect to result page
  window.location = "#result"

  // Instantiate request object
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {

    // When receive OK status from API
    if (this.readyState == 4 && this.status == 200) {
      // Remove loading image when finish
      loading.style.display = "none";
      split_and_generate(this.responseText);
    }

    // Else, show the loading image
    else {
      loading.style.display = "inline";
    }
  }

  xhttp.open("POST", "https://alhazimi.herokuapp.com/text_sum/", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(req_data);
}

// Function to remove all result content
function remove_child(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// Main Function
function get_summary() {

  // Remove all child
  remove_child(result);

  // Fetch article
  data = {"date": Date.now(), "article": article.value}
  data = JSON.stringify(data)

  // Request for summary to Flask Server
  request_summary(data);
 }