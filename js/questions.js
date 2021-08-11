let counts = document.getElementById("counts");

function inputError() {
	alert("Please insert a number between 1 - 200");
}

function generate(event) {
	if (Number(counts.value)) {
		console.log("success");
	} else {
		inputError();
	};
}

function elt(type, ...children) {
      let node = document.createElement(type);
      for (let child of children) {
        if (typeof child != "string") node.appendChild(child);
        else node.appendChild(document.createTextNode(child));
      }
      return node;
    }