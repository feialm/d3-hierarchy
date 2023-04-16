var allStatements = ["",
	"",
	"Do you have color blindness visual impairment?",
	"What is your current experience and or knowledge of information visualization?",
	"",
	"Does node X and Node Y have the same parent?"/*,
	"How many ancestor does node X have?",
	"What node or nodes have the highest number of ancestors?",
	"Can you name and order all the ancestor node X have? Starting with the parent and then its parent.",
	"Order the nodes X, Y, Z, depending on how many ancestor they have. Starting with lowest number first.",
	"Is node X parent to node Y?",
	"How many siblings does node X have?",
	"Does node Y have more or less siblings than node X?",
	"What node or nodes have the highest number of siblings?",
	"Order the nodes X, Y, Z, depending on how many siblings they have. Starting with lowest number first.",
	"Is node X and node Y siblings?",
	"How many children does node X have?",
	"How many descendants does node X have?",
	"Does node Y have more or less children than node X?",
	"What node or nodes have the highest number of children?",
	"What node or nodes have the highest number of children?",
	"Order the nodes X, Y, Z, depending on how children ancestor they have. Starting with lowest number first.",
	"Is node X child to node Y?",
	"Name the child nodes to node x?"*/
	]

var testPosition = 0;

var userAnswers = [];


// update page with with the current question + reset button
function onPageLoad(){
	//document.getElementById("button").style.color = "#a6a6a6";
	document.getElementById("button").style.color = "#000";
	document.getElementById("button").style.backgroundColor = "#74a9cf";//reset button color
	document.getElementById("statement").innerHTML = allStatements[testPosition];
	document.getElementById("likert").style.display = "none";
	document.getElementById("yesNo").style.display = "none";
	document.getElementById("demographics").style.display = "none";
	document.getElementById("evaluation").style.display = "none";
	document.getElementById("freetext").style.display = "none";
	document.getElementById("survey").style.display = "none";
	document.getElementById("iframe").style.display = "none";
}



function saveUserData(){
	$.post("savedata.php", { userAnswers: userAnswers });
}




function changeQuestionnaireSubmitButton(){
	document.getElementById("button").style.color = "#000";
	document.getElementById("button").style.backgroundColor = "#74a9cf";
}



// take you to the next question
function advanceTest(){
	var c = document.getElementById("button").style.color;
	var rgb = c.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').replace(/\s/g, '').split(',');

	console.log("testPosition: ", testPosition);

	if (rgb[0] == 0) {
		var currentTime = Date.now();
		var date = new Date(currentTime);
		var datevalues = [date.getHours(),date.getMinutes(),date.getSeconds()];
		
		document.getElementById("button").style.backgroundColor = "#a6a6a6";//reset button color
		document.getElementById("button").style.color ="#909090"
		saveUserAnswers(datevalues);
		unCheckRadios1();
		unCheckRadios2();
		document.getElementById("freetext").value = "";

		testPosition++;
		document.getElementById("statement").innerHTML = allStatements[testPosition];
	}
	else {
		alert("Please fill in an answer to proceed!");
	} if (allStatements[testPosition] !== "") {
		document.getElementById("iframe").style.display = "inline-block";
	}
	if (testPosition > 0) {
		document.getElementById("intro").style.display = "none";
		document.getElementById("survey").style.display = "inline-block";
	}
	if (testPosition === 1) {
		document.getElementById("demographics").style.display = "inline-block";
		document.getElementById("button").style.color = "#000";
		document.getElementById("button").style.backgroundColor = "#74a9cf";
	} else {
		document.getElementById("demographics").style.display = "none";
	}
	if (testPosition === 2 || testPosition == 5) {
		document.getElementById("yesNo").style.display = "inline-block";
	} else {
		document.getElementById("yesNo").style.display = "none";
	}
	if (testPosition === 3) {
		document.getElementById("likert").style.display = "inline-block";
	} else {
		document.getElementById("likert").style.display = "none";
	}
	if (testPosition === 4) {
		document.getElementById("evaluation").style.display = "inline-block";
		document.getElementById("button").style.color = "#000";
		document.getElementById("button").style.backgroundColor = "#74a9cf";
	} else {
		document.getElementById("evaluation").style.display = "none";
	}
	if (testPosition == allStatements.length) {
		document.getElementById("statement").innerHTML = "Thank you for participating in this survey! :)";
		document.getElementById("likert").style.display = "none";
		document.getElementById("button").style.display = "none";
		document.getElementById("freetext").style.display = "none";
		document.getElementById("yesNo").style.display = "none";
		
		saveUserData();
	}
}



// reset radio-buttons
function unCheckRadios1(){
	
	var radioButtons = document.getElementsByName("query");
	for (var i = 0; i < radioButtons.length; i++) {
		if(radioButtons[i].checked) {
			document.getElementById(radioButtons[i].id).checked = false;
		}
	}
}

// reset radio-buttons
function unCheckRadios2(){

	var radioButtons = document.getElementsByName("yesNo");
	for (var i = 0; i < radioButtons.length; i++) {
		if(radioButtons[i].checked) {
			document.getElementById(radioButtons[i].id).checked = false;
		}
	}

}


// save answers in .txt file, send to php-file
function saveUserAnswers(recordTimeBtn){
	var formElements = document.getElementById('survey');
	var answer;

	if (allStatements[testPosition] !== "") {
		answer = recordTimeBtn + "\t" + formElements.elements["yesNo"].value + "\t" + formElements.elements["query"].value + "\t" + document.getElementById("freetext").value;
	} else {
		answer = recordTimeBtn + "\t" + "--" + "\t" + "--" + "\t" + "--";
	}
	
	userAnswers.push(answer);
}


