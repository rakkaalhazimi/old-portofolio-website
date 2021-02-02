var summary;
article = document.getElementById("article");
result = document.getElementById("result");
block = document.querySelector(".app__result");


function request_summary(req_data) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	   summary = this.responseText;
	   result.value = summary;
	}
  }

  xhttp.open("POST", "https://alhazimi.herokuapp.com/text_sum/", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(req_data);
}

function get_summary() {

  data = {"date": Date.now(), "article": article.value}
  data = JSON.stringify(data)

  request_summary(data);
  block.style.display = "flex";
  window.location.href = "#result";
 }