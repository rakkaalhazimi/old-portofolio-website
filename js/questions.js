// global variables
let counts = document.getElementById("counts");
let sheet = document.getElementById("sheet");
const limit = 10;

// Error Message
function inputError() {
	alert("Please insert a number between 1 - 200");
}

// HTML Tags Creator
function elt(type, cls="", attr="", ...children) {
      let node = document.createElement(type);
			// add class name
			node.className = cls;
			
			// add attributes
			if (attr) {
				console.log(typeof attr);
				for (let key in attr) {
					node.setAttribute(key, attr[key]);
				}
			}
			
			// add children
      for (let child of children) {
				console.log(child);
        if (typeof child != "string") node.appendChild(child);
        else node.appendChild(document.createTextNode(child));
      }
      return node;
    }

// Toogle Sheet Creation
function generate(event) {
	let counts_value = Number(counts.value);
	if (counts_value) {
		console.log("success");
		let node = createOuterOptionsTag(counts_value)
		sheet.appendChild(node);
		
		
	} else {
		inputError();
	};
}



// Radio Button Tags with Container

function createOptionsTag(num) {
	// List of tags needed
	let nodes = [];
	
	// Number on row
	let number_indicator = elt("h5", cls="col-2", attr="", `${num}.`);
	nodes.push(number_indicator);
	
	// ABCDE radio button
	for (opt of "ABCDE") {
		let input_node = elt("input", 
												 cls="form-check-input",
												 attr={"type": "radio", 
															 "name": `number-${num}`,
															 "id": `options-${num}-${opt}`})
		let label_node = elt("label",
												 cls="form-check-label",
												 attr={"for": `options-${num}-${opt}`},
												 children=`${opt}`)
		
		let radio_nodes = [input_node, label_node];
		// Wrap all options inside this tag
		let form_check = elt("div", cls="form-check", attr="", ...radio_nodes);										 
											 
		nodes.push(form_check);
		
	} return nodes
}

function createInnerOptionsTag(start, end) {
	// List of tags needed
	let nodes = [];
	
	for (num = start; num <= end; num++) {
		
		let optionsTag = createOptionsTag(num);
		let innerNearWrapper = elt("div", "col d-flex gap-2", "", ...optionsTag);
		
		// Div tag to wrap the options
		let innerWrapper = elt("div", "col", "", innerNearWrapper);
		nodes.push(innerWrapper)
	}
	return nodes;
}

function createMiddleOptionsTag(sheet_number) {
	// Inner Elements Tags
	let upper_bound = sheet_number * limit; // upper limit is 10 or multiple
	let lower_bound = upper_bound - (limit - 1); // lower limit is 
	
	let innerElements = createInnerOptionsTag(start=lower_bound, 
																						end=upper_bound);
	
	// Div tag to wrap inner elements
	let middleNearWrapper = elt("div", "row row-cols-1", "", ...innerElements);
	let middleWrapper = elt("div", "col", "", middleNearWrapper);
	
	return middleWrapper
}


function createOuterOptionsTag(counts_value) {
	// List of tags needed
	let nodes = [];
	
	let numberOfSheets = Math.ceil(counts_value / limit);
	console.log("Debug " + numberOfSheets);
	for (let num=1; num <= numberOfSheets; num++) {
		// Middle Elements Tags
		let middleElements = createMiddleOptionsTag(num);
		nodes.push(middleElements)
	}
	
	let outerWrapper = elt("div", "row row-cols-lg-3 row-cols-1 gy-3", "", ...nodes);
	return outerWrapper;
}

function testHide() {
	
}