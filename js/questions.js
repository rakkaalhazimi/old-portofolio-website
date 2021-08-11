let counts = document.getElementById("counts");
let gen_btn = document.getElementById("gen-btn");
let sheet = document.getElementById("sheet");

function inputErrorMsg() {
	alert("Please input any number from 1 - 200");
}

function elt(type, ...children) {
	let node = document.createElement(type);
	for (let child of children) {
		if (typeof child != "string") node.appendChild(child);
		else node.appendChild(document.createTextNode(child));
	}
	return node;
}

function generate() {
	let number = Number(counts.value);
	if (number) {
		
		counts.value = "";
		sheet.appendChild(elt("p", "rakka"));
		
	} else {
		inputErrorMsg();
	}
	
}

//gen_btn.addEventListener("click", generate);