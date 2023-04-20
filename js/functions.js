var allStatements = ["",
	"",
	"Do you have color blindness visual impairment?",
	"What is your current experience and or knowledge of information visualization?",
	"",
	"Does node X and Node Y have the same parent?"
	]

var testPosition = 0;

var userAnswers = [];
var a = [];


// update page with with the current question + reset button
function onPageLoad() {
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
	
	a.push(hej);
	console.log("Test Participant: ", hej);
	permuationsOfQuestions(parseInt(hej,10));
}


function saveUserData() {		
	$.post("savedata.php", { userAnswers: userAnswers, a:a});
}




function changeQuestionnaireSubmitButton(){
	document.getElementById("button").style.color = "#000";
	document.getElementById("button").style.backgroundColor = "#74a9cf";
}



// take you to the next question
function advanceTest(){
	var c = document.getElementById("button").style.color;
	var rgb = c.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').replace(/\s/g, '').split(',');

	//console.log("testPosition: ", testPosition);

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


// POP-up window for Help page
function on() {
	document.getElementById("introPOP").style.display = "block";
}

function off() {
	document.getElementById("introPOP").style.display = "none";
}



// psuedo code for 12 permutations of the test
function permuationsOfQuestions(c) {

	var mod = c % 12;

	if (mod === 1) {
		console.log("1 and: ", c);
	}
	if (mod === 2) {
		console.log("2 and: ", c);
	}
	if (mod === 3) {
		console.log("3 and: ", c);
	}
	if (mod === 4) {
		console.log("4 and: ", c);
	}
	if (mod === 5) {
		console.log("5 and: ", c);
	}
	if (mod === 6) {
		console.log("6 and: ", c);
	}
	if (mod === 7) {
		console.log("7 and: ", c);
	}
	if (mod === 8) {
		console.log("8 and: ", c);
	}
	if (mod === 9) {
		console.log("9 and: ", c);
	}
	if (mod === 10) {
		console.log("10 and: ", c);
	}
	if (mod === 11) {
		console.log("11 and: ", c);
	}
	if (mod === 0) {
		console.log("12 and: ", c);
	}
}


