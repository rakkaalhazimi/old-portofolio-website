//  Document Objects
let article = document.getElementById("article");
let result = document.getElementById("result")
let loading = document.getElementById("loading");
let button = document.getElementById("button");


// Function to create element
function create_tag(type) {
  node = document.createElement(type);
  return node;
}

// Function to add children to element
function add_children(elm, ...children) {
  for (child of children) {
    if (typeof child != "string") elm.appendChild(child);
    else elm.appendChild( document.createTextNode(child) );
  }
  return elm;
}

// Function to format the summarization result
function split_and_generate(sen) {
  // Split sentences
  sentences = sen.split(".")
                 .filter( x => x != "" )                    // remove whitespace item
                 .map( (x) => {x += "."; return x.trim()} ) // add "." and trim

  // Append paragraph and break line to the result repeatedly.
  for (sen of sentences) {
    add_children(result,
                 add_children(create_tag("p"), sen),
                 create_tag("br")
    );
  }
}

// Function to request summarization from API
function request_summary(req_data) {
  console.log(req_data);

  // Redirect to result page
  window.location = "#result"

  // Instantiate request object
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {

    // When receive OK status from API
    if (this.readyState == 4 && this.status == 200) {
      // Restore all changes when finish
      loading.style.display = "none";
      button.removeAttribute("disabled");

      split_and_generate(this.responseText);
    }

    // Else, show the loading image
    // and disable the button.
    else {
      loading.style.display = "inline";
      button.setAttribute("disabled", "")
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

  // Article Validation
  if (article.value == "") {
    alert("Article can't be empty");
    return false;
  }

  // Fetch article
  data = {"date": Date.now(), "article": article.value}
  data = JSON.stringify(data)

  // Request for summary to Flask Server
  request_summary(data);
 }