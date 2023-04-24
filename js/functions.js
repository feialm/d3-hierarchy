var allStatements = ["",
	"",
	"Do you have color blindness visual impairment?",
	"What is your current experience and or knowledge of information visualization?",
	"",
	"Does node X and Node Y have the same parent?"
]


var testPosition = 0;
var userAnswers = [];
var currentUser = [];


// update page with with the current question + reset button
function onPageLoad() {
	//document.getElementById("button").style.color = "#a6a6a6";
	document.getElementById("button").style.color = "#000";
	document.getElementById("button").style.backgroundColor = "#74a9cf";//reset button color
	document.getElementById("statement").innerHTML = allStatements[testPosition];
	document.getElementById("likert").style.display = "none";
	document.getElementById("yesNo").style.display = "none";
	document.getElementById("lessMore").style.display = "none";
	document.getElementById("demographics").style.display = "none";
	document.getElementById("evaluation").style.display = "none";
	document.getElementById("freetext").style.display = "none";
	document.getElementById("survey").style.display = "none";
	document.getElementById("iframe").style.display = "none";
	document.getElementById("howmany").style.display = "none";
	
	currentUser.push(userVar);
	console.log("Test Participant: ", userVar);
	permuationsOfQuestions(parseInt(userVar,10));
}


function saveUserData() {		
	$.post("savedata.php", { userAnswers: userAnswers, currentUser:currentUser});
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
		unCheckRadios3();
		document.getElementById("freetext").value = "";
		document.getElementById("howmany").value = "";

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
		document.getElementById("lessMore").style.display = "inline-block";
	} else {
		document.getElementById("yesNo").style.display = "none";
		document.getElementById("lessMore").style.display = "none";
	}//Modify rom down here
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
		document.getElementById("lessMore").style.display = "none";
		document.getElementById("howmany").style.display = "none";
		
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

// reset radio-buttons
function unCheckRadios3(){

	var radioButtons = document.getElementsByName("lessMore");
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
		answer = recordTimeBtn + "\t" + " " + formElements.elements["yesNo"].value + "\t" + formElements.elements["lessMore"].value + "\t" + formElements.elements["query"].value + "\t" + document.getElementById("freetext").value + "\t" + document.getElementById("howmany").value;
	} else {
		answer = recordTimeBtn + "\t" +" "+ "--" + "\t" + "---" + "\t" + "---" + "\t" + " ---" + "\t" + " ----";
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

	// direct user to correct questionnaire
	if (mod === 1) {
		console.log("1 and: ", c);
		//allStatements = a1a2a3_1234;
	}
	if (mod === 2) {
		console.log("2 and: ", c);
		//allStatements = a1a2a3_1234;
	}
	if (mod === 3) {
		console.log("3 and: ", c);
		//allStatements = a1a2a3_1234;
	}
	if (mod === 4) {
		console.log("4 and: ", c);
		//allStatements = a1a2a3_1234;
	}
	if (mod === 5) {
		console.log("5 and: ", c);
		//allStatements = a1a2a3_1234;
	}
	if (mod === 6) {
		console.log("6 and: ", c);
		//allStatements = a1a2a3_1234;
	}
	if (mod === 7) {
		console.log("7 and: ", c);
		//allStatements = a1a2a3_1234;
	}
	if (mod === 8) {
		console.log("8 and: ", c);
		//allStatements = a1a2a3_1234;
	}
	if (mod === 9) {
		console.log("9 and: ", c);
		//allStatements = a1a2a3_1234;
	}
	if (mod === 10) {
		console.log("10 and: ", c);
		//allStatements = a1a2a3_1234;
	}
	if (mod === 11) {
		console.log("11 and: ", c);
		//allStatements = a1a2a3_1234;
	}
	if (mod === 0) {
		console.log("12 and: ", c);
		//allStatements = a1a2a3_1234;
	}
}


// --------------------------- 12  variations of the test -----------------------

// node-link A1
// treemap A2
// icicle plot A3
// siblings B1
// ancestor B2
// descendants B3

 var a1a2a3_1234 = ["",
    "",
    "Do you have color blindness visual impairment?",
    "What is your current experience and or knowledge of information visualization?",
    "",
    "",//explain the visualization types //Small dataset
    "",// A1 say what vis Node-link
    "How many siblings does node Polygon Shapes have? Answer in digits please",
    "Does node triangle have more or less siblings than node Conic Shapes?",
    "Is node Conic Shapes and node Polygon Shapes siblings?",
    "",// Qualitative questions Siblings
    "Does node hexagon and node octagon have the same parent?",
    "How many ancestor does node 2D Shapes have? Answer in digits please",
    "Is node Polygon Shapes parent to node hexagon?",
    "Does node Polygon Shapes have more or less ancestor than node circle?",
    "",// Qualitative questions Ancestors
    "How many children does node triangle have? (children = one level down in hierarchy) Answer in digits please",
    "How many descendants does node Conic Shapes have? Answer in digits please",
    "Does node Conic Shapes have more or less children than node Polygon Shapes? (children = one level down in hierarchy)",
    "Is node circle child to node Conic Shapes? (children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",// A2 say what vis Treemap
    "How many siblings does hexagon have? Answer in digits please",
    "Does node pentagon have more or less siblings than node circle?",
    "Is node Conic Shapes and node 2D Shapes siblings?",
    "",// Qualitative questions Siblings
    "Does node heptagon and node circle have the same parent?",
    "How many ancestors does node octagon have? Answer in digits please",
    "Is node Polygon Shapes parent to node triangle?",
    "Does node Conic Shapes have more or less ancestors than node quadtrilateral?",
    "",// Qualitative questions Ancestors
    "How many children does node 2D Shapes have? (children = one level down in hierarchy) Answer in digits please",
    "How many descendants does node Polygon Shapes have? Answer in digits please",
    "Does node Polygon Shapes have more or less children than node ellipse? (children = one level down in hierarchy)",
    "Is node circle child to node 2D Shapes? (children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",//A3 say what vis Icicle
    "How many siblings does node 2D Shapes have? Answer in digits please",
    "Does node Polygon Shapes have more or less siblings than node heptagon?",
    "Is node Conic Shapes and node octagon siblings?",
    "",// Qualitative questions Siblings
    "Does node heptagon and node circle have the same parent?",
    "How many ancestors does node circle have? Answer in digits please",
    "Is node Polygon Shapes parent to node triangle?",
    "Does node Conic Shapes have more or less ancestors than node 2D Shapes?",
    "",// Qualitative questions Ancestors
    "How many children does node Polygon Shapes have? (children = one level down in hierarchy) Answer in digits please",
    "How many descendants does node 2D Shapes have? Answer in digits please",
    "Does node Polygon Shapes have more or less children than node decagon? (children = one level down in hierarchy)",
    "Is node deceagon child to node Conic Shapes? (children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",//------------------- Intro larger dataset ---------------
    "",// A1 say what vis Node-link
    "How many ancestors does node Stockholms län have?",
    "Is node Norrmalm, City parent to node Reimerholme?",
    "Does node Gamla stan have more or less ancestors than node Kungsholmen?",
    "",// Qualitative questions Siblings
    "Does node Rissne and node Duvbo have the same parent?",
    "How many ancestors does node Stockholms län have?",
    "Is node Norrmalm, City parent to node Reimerholme?",
    "Does node Gamla stan have more or less ancestors than node Kungsholmen?",
    "",// Qualitative questions Ancestors
    "How many children does node Järfälla have? (children = one level down in hierarchy)",
    "How many descendants does node Söderort have?",
    "Does node Upplands Väsby have more or less children than node Upplands-Bro? (children = one level down in hierarchy)",
    "Is node Hölö child to node Södertälje?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// A2 say what vis Treemap
    "How many siblings does node Viksjö have?",
    "Does node Hässelby-Vällingby have more or less siblings than node Enskede-Årsta-Vantör?",
    "Is node Järva and node Haga siblings?",
    "",// Qualitative questions Siblings
    "Does node Vega and node Skogås have the same parent?",
    "How many ancestors does node Traneberg have?",
    "Is node Västerort parent to node Alvik?",
    "Does node Valsta have more or less ancestors than node Botkyrka?",
    "",// Qualitative questions Ancestors
    "How many children does node Västerort have? (children = one level down in hierarchy)",
    "How many descendants does node Inre Staden have?",
    "Does node Danderyd have more or less children than node Salem? (children = one level down in hierarchy)",
    "Is node Tveta child to node Sundbyberg?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// A3 say what vis Icicle
    "How many siblings does node Täby have?",
    "Does node Enhörna have more or less siblings than node Haga?",
    "Is node Botkyrka and node Lidingö siblings?",
    "",// Qualitative questions Siblings
    "Does node Hägersten-Älvsjö and node Västerort have the same parent?",
    "How many ancestors does node Bromma have?",
    "Is node Sundbyberg parent to node Sigtuna?",
    "Does node Aspudden have more or less ancestors than node Täby?",
    "",// Qualitative questions Ancestors
    "How many children does node Inre staden have? (children = one level down in hierarchy)",
    "How many descendants does node Västerort have?",
    "Does node Stockholm have more or less children than node Sollentuna? (children = one level down in hierarchy)",
    "Is node Sätra child to node Skarpnäck?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Intro CMV, explain data, why etc
    "What would you like to happen in the table when interacting with the node-link diagram or vice versa?",
    "What would you like to happen in the table when interacting with the treemap or vice versa?",
    "What would you like to happen in the table when interacting with the icicle plot or vice versa?",
    "" // Thank you
];



 var a1a2a3_1324 = ["",
	"",
	"Do you have color blindness visual impairment?",
	"What is your current experience and or knowledge of information visualization?",
	"",
	"",//explain the visualization types //Small dataset
	"",// A1 say what vis Node-link Node-link
	"How many siblings does node Polygon Shapes have? Answer in digits please",
	"Does node triangle have more or less siblings than node Conic Shapes?",
	"Is node Conic Shapes and node Polygon Shapes siblings?",
    "",// Qualitative questions Siblings
    "How many children does node triangle have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node Conic Shapes have? Answer in digits please",
	"Does node Conic Shapes have more or less children than node Polygon Shapes? (children = one level down in hierarchy)",
	"Is node circle child to node Conic Shapes? (children = one level down in hierarchy)",
	"",// Qualitative questions Descendants
	"Does node hexagon and node octagon have the same parent?",
	"How many ancestor does node 2D Shapes have? Answer in digits please",
	"Is node Polygon Shapes parent to node hexagon?",
	"Does node Polygon Shapes have more or less ancestor than node circle?",
	"",// Qualitative questions Ancestors
    "",// A2 say what vis Treemap
	"How many siblings does hexagon have? Answer in digits please",
	"Does node pentagon have more or less siblings than node circle?",
	"Is node Conic Shapes and node 2D Shapes siblings?",
    "",// Qualitative questions Siblings
    "How many children does node 2D Shapes have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node Polygon Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less children than node ellipse? (children = one level down in hierarchy)",
	"Is node circle child to node 2D Shapes? (children = one level down in hierarchy)",
	"",// Qualitative questions Descendants
	"Does node heptagon and node circle have the same parent?",
	"How many ancestors does node octagon have? Answer in digits please",
	"Is node Polygon Shapes parent to node triangle?",
	"Does node Conic Shapes have more or less ancestors than node quadtrilateral?",
	"",// Qualitative questions Ancestors
    "",//A3 say what vis Icicle
	"How many siblings does node 2D Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less siblings than node heptagon?",
	"Is node Conic Shapes and node octagon siblings?",
    "",// Qualitative questions Siblings
    "How many children does node Polygon Shapes have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node 2D Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less children than node decagon? (children = one level down in hierarchy)",
	"Is node deceagon child to node Conic Shapes? (children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
	"Does node heptagon and node circle have the same parent?",
	"How many ancestors does node circle have? Answer in digits please",
	"Is node Polygon Shapes parent to node triangle?",
	"Does node Conic Shapes have more or less ancestors than node 2D Shapes?",
	"",// Qualitative questions Ancestors
    "",//------------------- Intro larger dataset ---------------
    "",// A1 say what vis Node-link
    "How many ancestors does node Stockholms län have?",
    "Is node Norrmalm, City parent to node Reimerholme?",
    "Does node Gamla stan have more or less ancestors than node Kungsholmen?",
    "",// Qualitative questions Siblings
    "How many children does node Järfälla have? (children = one level down in hierarchy)",
    "How many descendants does node Söderort have?",
    "Does node Upplands Väsby have more or less children than node Upplands-Bro? (children = one level down in hierarchy)",
    "Is node Hölö child to node Södertälje?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "Does node Rissne and node Duvbo have the same parent?",
    "How many ancestors does node Stockholms län have?",
    "Is node Norrmalm, City parent to node Reimerholme?",
    "Does node Gamla stan have more or less ancestors than node Kungsholmen?",
    "",// Qualitative questions Ancestors
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// A2 say what vis Treemap
    "How many siblings does node Viksjö have?",
    "Does node Hässelby-Vällingby have more or less siblings than node Enskede-Årsta-Vantör?",
    "Is node Järva and node Haga siblings?",
    "",// Qualitative questions Siblings
    "How many children does node Västerort have? (children = one level down in hierarchy)",
    "How many descendants does node Inre Staden have?",
    "Does node Danderyd have more or less children than node Salem? (children = one level down in hierarchy)",
    "Is node Tveta child to node Sundbyberg?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "Does node Vega and node Skogås have the same parent?",
    "How many ancestors does node Traneberg have?",
    "Is node Västerort parent to node Alvik?",
    "Does node Valsta have more or less ancestors than node Botkyrka?",
    "",// Qualitative questions Ancestors
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// A3 say what vis Icicle
    "How many siblings does node Täby have?",
    "Does node Enhörna have more or less siblings than node Haga?",
    "Is node Botkyrka and node Lidingö siblings?",
    "",// Qualitative questions Siblings
    "How many children does node Inre staden have? (children = one level down in hierarchy)",
    "How many descendants does node Västerort have?",
    "Does node Stockholm have more or less children than node Sollentuna? (children = one level down in hierarchy)",
    "Is node Sätra child to node Skarpnäck?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "Does node Hägersten-Älvsjö and node Västerort have the same parent?",
    "How many ancestors does node Bromma have?",
    "Is node Sundbyberg parent to node Sigtuna?",
    "Does node Aspudden have more or less ancestors than node Täby?",
    "",// Qualitative questions Ancestors
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Intro CMV, explain data, why etc
    "What would you like to happen in the table when interacting with the node-link diagram or vice versa?",
    "What would you like to happen in the table when interacting with the treemap or vice versa?",
    "What would you like to happen in the table when interacting with the icicle plot or vice versa?",
    "" // Thank you
];




 var a2a3a1_1234 = ["",
	"",
	"Do you have color blindness visual impairment?",
	"What is your current experience and or knowledge of information visualization?",
	"",
	"",//explain the visualization types //Small dataset
    "",// A2 say what vis Treemap
	"How many siblings does hexagon have? Answer in digits please",
	"Does node pentagon have more or less siblings than node circle?",
	"Is node Conic Shapes and node 2D Shapes siblings?",
	"",// Qualitative questions Siblings
	"Does node heptagon and node circle have the same parent?",
	"How many ancestors does node octagon have? Answer in digits please",
	"Is node Polygon Shapes parent to node triangle?",
	"Does node Conic Shapes have more or less ancestors than node quadtrilateral?",
	"",// Qualitative questions Ancestors
	"How many children does node 2D Shapes have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node Polygon Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less children than node ellipse? (children = one level down in hierarchy)",
	"Is node circle child to node 2D Shapes? (children = one level down in hierarchy)",
	"",// Qualitative questions Descendants
    "",//A3 say what vis Icicle
	"How many siblings does node 2D Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less siblings than node heptagon?",
	"Is node Conic Shapes and node octagon siblings?",
	"",// Qualitative questions Siblings
	"Does node heptagon and node circle have the same parent?",
	"How many ancestors does node circle have? Answer in digits please",
	"Is node Polygon Shapes parent to node triangle?",
	"Does node Conic Shapes have more or less ancestors than node 2D Shapes?",
	"",// Qualitative questions Ancestors
	"How many children does node Polygon Shapes have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node 2D Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less children than node decagon? (children = one level down in hierarchy)",
	"Is node deceagon child to node Conic Shapes? (children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",// A1 say what vis Node-link
	"How many siblings does node Polygon Shapes have? Answer in digits please",
	"Does node triangle have more or less siblings than node Conic Shapes?",
	"Is node Conic Shapes and node Polygon Shapes siblings?",
	"",// Qualitative questions Siblings
	"Does node hexagon and node octagon have the same parent?",
	"How many ancestor does node 2D Shapes have? Answer in digits please",
	"Is node Polygon Shapes parent to node hexagon?",
	"Does node Polygon Shapes have more or less ancestor than node circle?",
	"",// Qualitative questions Ancestors
	"How many children does node triangle have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node Conic Shapes have? Answer in digits please",
	"Does node Conic Shapes have more or less children than node Polygon Shapes? (children = one level down in hierarchy)",
	"Is node circle child to node Conic Shapes? (children = one level down in hierarchy)",
	"",// Qualitative questions Descendants
    "",//------------------- Intro larger dataset ---------------
    "",// A2 say what vis Treemap
    "How many siblings does node Viksjö have?",
    "Does node Hässelby-Vällingby have more or less siblings than node Enskede-Årsta-Vantör?",
    "Is node Järva and node Haga siblings?",
    "",// Qualitative questions Siblings
    "Does node Vega and node Skogås have the same parent?",
    "How many ancestors does node Traneberg have?",
    "Is node Västerort parent to node Alvik?",
    "Does node Valsta have more or less ancestors than node Botkyrka?",
    "",// Qualitative questions Ancestors
    "How many children does node Västerort have? (children = one level down in hierarchy)",
    "How many descendants does node Inre Staden have?",
    "Does node Danderyd have more or less children than node Salem? (children = one level down in hierarchy)",
    "Is node Tveta child to node Sundbyberg?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// A3 say what vis Icicle
    "How many siblings does node Täby have?",
    "Does node Enhörna have more or less siblings than node Haga?",
    "Is node Botkyrka and node Lidingö siblings?",
    "",// Qualitative questions Siblings
    "Does node Hägersten-Älvsjö and node Västerort have the same parent?",
    "How many ancestors does node Bromma have?",
    "Is node Sundbyberg parent to node Sigtuna?",
    "Does node Aspudden have more or less ancestors than node Täby?",
    "",// Qualitative questions Ancestors
    "How many children does node Inre staden have? (children = one level down in hierarchy)",
    "How many descendants does node Västerort have?",
    "Does node Stockholm have more or less children than node Sollentuna? (children = one level down in hierarchy)",
    "Is node Sätra child to node Skarpnäck?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// A1 say what vis Node-link
    "How many ancestors does node Stockholms län have?",
    "Is node Norrmalm, City parent to node Reimerholme?",
    "Does node Gamla stan have more or less ancestors than node Kungsholmen?",
    "",// Qualitative questions Siblings
    "Does node Rissne and node Duvbo have the same parent?",
    "How many ancestors does node Stockholms län have?",
    "Is node Norrmalm, City parent to node Reimerholme?",
    "Does node Gamla stan have more or less ancestors than node Kungsholmen?",
    "",// Qualitative questions Ancestors
    "How many children does node Järfälla have? (children = one level down in hierarchy)",
    "How many descendants does node Söderort have?",
    "Does node Upplands Väsby have more or less children than node Upplands-Bro? (children = one level down in hierarchy)",
    "Is node Hölö child to node Södertälje?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Intro CMV, explain data, why etc
    "What would you like to happen in the table when interacting with the node-link diagram or vice versa?",
    "What would you like to happen in the table when interacting with the treemap or vice versa?",
    "What would you like to happen in the table when interacting with the icicle plot or vice versa?",
    "" // Thank you
];



 var a2a3a1_1324 = ["",
	"",
	"Do you have color blindness visual impairment?",
	"What is your current experience and or knowledge of information visualization?",
	"",
	"",//explain the visualization types //Small dataset
    "",// A2 say what vis Treemap
	"How many siblings does hexagon have? Answer in digits please",
	"Does node pentagon have more or less siblings than node circle?",
	"Is node Conic Shapes and node 2D Shapes siblings?",
    "",// Qualitative questions Siblings
    "How many children does node 2D Shapes have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node Polygon Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less children than node ellipse? (children = one level down in hierarchy)",
	"Is node circle child to node 2D Shapes? (children = one level down in hierarchy)",
	"",// Qualitative questions Descendants
	"Does node heptagon and node circle have the same parent?",
	"How many ancestors does node octagon have? Answer in digits please",
	"Is node Polygon Shapes parent to node triangle?",
	"Does node Conic Shapes have more or less ancestors than node quadtrilateral?",
	"",// Qualitative questions Ancestors
    "",//A3 say what vis Icicle
	"How many siblings does node 2D Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less siblings than node heptagon?",
	"Is node Conic Shapes and node octagon siblings?",
    "",// Qualitative questions Siblings
    "How many children does node Polygon Shapes have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node 2D Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less children than node decagon? (children = one level down in hierarchy)",
	"Is node deceagon child to node Conic Shapes? (children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
	"Does node heptagon and node circle have the same parent?",
	"How many ancestors does node circle have? Answer in digits please",
	"Is node Polygon Shapes parent to node triangle?",
	"Does node Conic Shapes have more or less ancestors than node 2D Shapes?",
	"",// Qualitative questions Ancestors
    "",// A1 say what vis Node-link
	"How many siblings does node Polygon Shapes have? Answer in digits please",
	"Does node triangle have more or less siblings than node Conic Shapes?",
	"Is node Conic Shapes and node Polygon Shapes siblings?",
    "",// Qualitative questions Siblings
    "How many children does node triangle have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node Conic Shapes have? Answer in digits please",
	"Does node Conic Shapes have more or less children than node Polygon Shapes? (children = one level down in hierarchy)",
	"Is node circle child to node Conic Shapes? (children = one level down in hierarchy)",
	"",// Qualitative questions Descendants
	"Does node hexagon and node octagon have the same parent?",
	"How many ancestor does node 2D Shapes have? Answer in digits please",
	"Is node Polygon Shapes parent to node hexagon?",
	"Does node Polygon Shapes have more or less ancestor than node circle?",
	"",// Qualitative questions Ancestors
    "",//------------------- Intro larger dataset ---------------
    "",// A2 say what vis Treemap
    "How many siblings does node Viksjö have?",
    "Does node Hässelby-Vällingby have more or less siblings than node Enskede-Årsta-Vantör?",
    "Is node Järva and node Haga siblings?",
    "",// Qualitative questions Siblings
    "How many children does node Västerort have? (children = one level down in hierarchy)",
    "How many descendants does node Inre Staden have?",
    "Does node Danderyd have more or less children than node Salem? (children = one level down in hierarchy)",
    "Is node Tveta child to node Sundbyberg?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "Does node Vega and node Skogås have the same parent?",
    "How many ancestors does node Traneberg have?",
    "Is node Västerort parent to node Alvik?",
    "Does node Valsta have more or less ancestors than node Botkyrka?",
    "",// Qualitative questions Ancestors
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// A3 say what vis Icicle
    "How many siblings does node Täby have?",
    "Does node Enhörna have more or less siblings than node Haga?",
    "Is node Botkyrka and node Lidingö siblings?",
    "",// Qualitative questions Siblings
    "How many children does node Inre staden have? (children = one level down in hierarchy)",
    "How many descendants does node Västerort have?",
    "Does node Stockholm have more or less children than node Sollentuna? (children = one level down in hierarchy)",
    "Is node Sätra child to node Skarpnäck?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "Does node Hägersten-Älvsjö and node Västerort have the same parent?",
    "How many ancestors does node Bromma have?",
    "Is node Sundbyberg parent to node Sigtuna?",
    "Does node Aspudden have more or less ancestors than node Täby?",
    "",// Qualitative questions Ancestors
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// A1 say what vis Node-link
    "How many ancestors does node Stockholms län have?",
    "Is node Norrmalm, City parent to node Reimerholme?",
    "Does node Gamla stan have more or less ancestors than node Kungsholmen?",
    "",// Qualitative questions Siblings
    "How many children does node Järfälla have? (children = one level down in hierarchy)",
    "How many descendants does node Söderort have?",
    "Does node Upplands Väsby have more or less children than node Upplands-Bro? (children = one level down in hierarchy)",
    "Is node Hölö child to node Södertälje?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "Does node Rissne and node Duvbo have the same parent?",
    "How many ancestors does node Stockholms län have?",
    "Is node Norrmalm, City parent to node Reimerholme?",
    "Does node Gamla stan have more or less ancestors than node Kungsholmen?",
    "",// Qualitative questions Ancestors
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Intro CMV, explain data, why etc
    "What would you like to happen in the table when interacting with the node-link diagram or vice versa?",
    "What would you like to happen in the table when interacting with the treemap or vice versa?",
    "What would you like to happen in the table when interacting with the icicle plot or vice versa?",
    "" // Thank you
];




 var a3a1a2_1234 = ["",
	"",
	"Do you have color blindness visual impairment?",
	"What is your current experience and or knowledge of information visualization?",
	"",
    "",//explain the visualization types //Small dataset
    "",//A3 say what vis Icicle
	"How many siblings does node 2D Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less siblings than node heptagon?",
	"Is node Conic Shapes and node octagon siblings?",
	"",// Qualitative questions Siblings
	"Does node heptagon and node circle have the same parent?",
	"How many ancestors does node circle have? Answer in digits please",
	"Is node Polygon Shapes parent to node triangle?",
	"Does node Conic Shapes have more or less ancestors than node 2D Shapes?",
	"",// Qualitative questions Ancestors
	"How many children does node Polygon Shapes have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node 2D Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less children than node decagon? (children = one level down in hierarchy)",
	"Is node deceagon child to node Conic Shapes? (children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
	"",// A1 say what vis Node-link
	"How many siblings does node Polygon Shapes have? Answer in digits please",
	"Does node triangle have more or less siblings than node Conic Shapes?",
	"Is node Conic Shapes and node Polygon Shapes siblings?",
	"",// Qualitative questions Siblings
	"Does node hexagon and node octagon have the same parent?",
	"How many ancestor does node 2D Shapes have? Answer in digits please",
	"Is node Polygon Shapes parent to node hexagon?",
	"Does node Polygon Shapes have more or less ancestor than node circle?",
	"",// Qualitative questions Ancestors
	"How many children does node triangle have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node Conic Shapes have? Answer in digits please",
	"Does node Conic Shapes have more or less children than node Polygon Shapes? (children = one level down in hierarchy)",
	"Is node circle child to node Conic Shapes? (children = one level down in hierarchy)",
	"",// Qualitative questions Descendants
    "",// A2 say what vis Treemap
	"How many siblings does hexagon have? Answer in digits please",
	"Does node pentagon have more or less siblings than node circle?",
	"Is node Conic Shapes and node 2D Shapes siblings?",
	"",// Qualitative questions Siblings
	"Does node heptagon and node circle have the same parent?",
	"How many ancestors does node octagon have? Answer in digits please",
	"Is node Polygon Shapes parent to node triangle?",
	"Does node Conic Shapes have more or less ancestors than node quadtrilateral?",
	"",// Qualitative questions Ancestors
	"How many children does node 2D Shapes have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node Polygon Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less children than node ellipse? (children = one level down in hierarchy)",
	"Is node circle child to node 2D Shapes? (children = one level down in hierarchy)",
	"",// Qualitative questions Descendants
    "",//------------------- Intro larger dataset ---------------
    "",// A3 say what vis Icicle
    "How many siblings does node Täby have?",
    "Does node Enhörna have more or less siblings than node Haga?",
    "Is node Botkyrka and node Lidingö siblings?",
    "",// Qualitative questions Siblings
    "Does node Hägersten-Älvsjö and node Västerort have the same parent?",
    "How many ancestors does node Bromma have?",
    "Is node Sundbyberg parent to node Sigtuna?",
    "Does node Aspudden have more or less ancestors than node Täby?",
    "",// Qualitative questions Ancestors
    "How many children does node Inre staden have? (children = one level down in hierarchy)",
    "How many descendants does node Västerort have?",
    "Does node Stockholm have more or less children than node Sollentuna? (children = one level down in hierarchy)",
    "Is node Sätra child to node Skarpnäck?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// A1 say what vis Node-link
    "How many ancestors does node Stockholms län have?",
    "Is node Norrmalm, City parent to node Reimerholme?",
    "Does node Gamla stan have more or less ancestors than node Kungsholmen?",
    "",// Qualitative questions Siblings
    "Does node Rissne and node Duvbo have the same parent?",
    "How many ancestors does node Stockholms län have?",
    "Is node Norrmalm, City parent to node Reimerholme?",
    "Does node Gamla stan have more or less ancestors than node Kungsholmen?",
    "",// Qualitative questions Ancestors
    "How many children does node Järfälla have? (children = one level down in hierarchy)",
    "How many descendants does node Söderort have?",
    "Does node Upplands Väsby have more or less children than node Upplands-Bro? (children = one level down in hierarchy)",
    "Is node Hölö child to node Södertälje?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// A2 say what vis Treemap
    "How many siblings does node Viksjö have?",
    "Does node Hässelby-Vällingby have more or less siblings than node Enskede-Årsta-Vantör?",
    "Is node Järva and node Haga siblings?",
    "",// Qualitative questions Siblings
    "Does node Vega and node Skogås have the same parent?",
    "How many ancestors does node Traneberg have?",
    "Is node Västerort parent to node Alvik?",
    "Does node Valsta have more or less ancestors than node Botkyrka?",
    "",// Qualitative questions Ancestors
    "How many children does node Västerort have? (children = one level down in hierarchy)",
    "How many descendants does node Inre Staden have?",
    "Does node Danderyd have more or less children than node Salem? (children = one level down in hierarchy)",
    "Is node Tveta child to node Sundbyberg?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Intro CMV, explain data, why etc
    "What would you like to happen in the table when interacting with the node-link diagram or vice versa?",
    "What would you like to happen in the table when interacting with the treemap or vice versa?",
    "What would you like to happen in the table when interacting with the icicle plot or vice versa?",
    "" // Thank you
];




 var a3a1a2_1324 = ["",
	"",
	"Do you have color blindness visual impairment?",
	"What is your current experience and or knowledge of information visualization?",
	"",
    "",//explain the visualization types //Small dataset
    "",//A3 say what vis Icicle
	"How many siblings does node 2D Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less siblings than node heptagon?",
	"Is node Conic Shapes and node octagon siblings?",
    "",// Qualitative questions Siblings
    "How many children does node Polygon Shapes have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node 2D Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less children than node decagon? (children = one level down in hierarchy)",
	"Is node deceagon child to node Conic Shapes? (children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
	"Does node heptagon and node circle have the same parent?",
	"How many ancestors does node circle have? Answer in digits please",
	"Is node Polygon Shapes parent to node triangle?",
	"Does node Conic Shapes have more or less ancestors than node 2D Shapes?",
	"",// Qualitative questions Ancestors
	"",// A1 say what vis Node-link
	"How many siblings does node Polygon Shapes have? Answer in digits please",
	"Does node triangle have more or less siblings than node Conic Shapes?",
	"Is node Conic Shapes and node Polygon Shapes siblings?",
    "",// Qualitative questions Siblings
    "How many children does node triangle have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node Conic Shapes have? Answer in digits please",
	"Does node Conic Shapes have more or less children than node Polygon Shapes? (children = one level down in hierarchy)",
	"Is node circle child to node Conic Shapes? (children = one level down in hierarchy)",
	"",// Qualitative questions Descendants
	"Does node hexagon and node octagon have the same parent?",
	"How many ancestor does node 2D Shapes have? Answer in digits please",
	"Is node Polygon Shapes parent to node hexagon?",
	"Does node Polygon Shapes have more or less ancestor than node circle?",
	"",// Qualitative questions Ancestors
    "",// A2 say what vis Treemap
	"How many siblings does hexagon have? Answer in digits please",
	"Does node pentagon have more or less siblings than node circle?",
	"Is node Conic Shapes and node 2D Shapes siblings?",
    "",// Qualitative questions Siblings
    "How many children does node 2D Shapes have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node Polygon Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less children than node ellipse? (children = one level down in hierarchy)",
	"Is node circle child to node 2D Shapes? (children = one level down in hierarchy)",
	"",// Qualitative questions Descendants
	"Does node heptagon and node circle have the same parent?",
	"How many ancestors does node octagon have? Answer in digits please",
	"Is node Polygon Shapes parent to node triangle?",
	"Does node Conic Shapes have more or less ancestors than node quadtrilateral?",
	"",// Qualitative questions Ancestors
    "",//------------------- Intro larger dataset ---------------
    "",// A3 say what vis Icicle
    "How many siblings does node Täby have?",
    "Does node Enhörna have more or less siblings than node Haga?",
    "Is node Botkyrka and node Lidingö siblings?",
    "",// Qualitative questions Siblings
    "How many children does node Inre staden have? (children = one level down in hierarchy)",
    "How many descendants does node Västerort have?",
    "Does node Stockholm have more or less children than node Sollentuna? (children = one level down in hierarchy)",
    "Is node Sätra child to node Skarpnäck?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "Does node Hägersten-Älvsjö and node Västerort have the same parent?",
    "How many ancestors does node Bromma have?",
    "Is node Sundbyberg parent to node Sigtuna?",
    "Does node Aspudden have more or less ancestors than node Täby?",
    "",// Qualitative questions Ancestors
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// A1 say what vis Node-link
    "How many ancestors does node Stockholms län have?",
    "Is node Norrmalm, City parent to node Reimerholme?",
    "Does node Gamla stan have more or less ancestors than node Kungsholmen?",
    "",// Qualitative questions Siblings
    "How many children does node Järfälla have? (children = one level down in hierarchy)",
    "How many descendants does node Söderort have?",
    "Does node Upplands Väsby have more or less children than node Upplands-Bro? (children = one level down in hierarchy)",
    "Is node Hölö child to node Södertälje?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "Does node Rissne and node Duvbo have the same parent?",
    "How many ancestors does node Stockholms län have?",
    "Is node Norrmalm, City parent to node Reimerholme?",
    "Does node Gamla stan have more or less ancestors than node Kungsholmen?",
    "",// Qualitative questions Ancestors
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// A2 say what vis Treemap
    "How many siblings does node Viksjö have?",
    "Does node Hässelby-Vällingby have more or less siblings than node Enskede-Årsta-Vantör?",
    "Is node Järva and node Haga siblings?",
    "",// Qualitative questions Siblings
    "How many children does node Västerort have? (children = one level down in hierarchy)",
    "How many descendants does node Inre Staden have?",
    "Does node Danderyd have more or less children than node Salem? (children = one level down in hierarchy)",
    "Is node Tveta child to node Sundbyberg?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "Does node Vega and node Skogås have the same parent?",
    "How many ancestors does node Traneberg have?",
    "Is node Västerort parent to node Alvik?",
    "Does node Valsta have more or less ancestors than node Botkyrka?",
    "",// Qualitative questions Ancestors
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Intro CMV, explain data, why etc
    "What would you like to happen in the table when interacting with the node-link diagram or vice versa?",
    "What would you like to happen in the table when interacting with the treemap or vice versa?",
    "What would you like to happen in the table when interacting with the icicle plot or vice versa?",
    "" // Thank you
];




 var a3a2a1_1234 = ["",
	"",
	"Do you have color blindness visual impairment?",
	"What is your current experience and or knowledge of information visualization?",
	"",
    "",//explain the visualization types //Small dataset
    "",//A3 say what vis Icicle
	"How many siblings does node 2D Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less siblings than node heptagon?",
	"Is node Conic Shapes and node octagon siblings?",
	"",// Qualitative questions Siblings
	"Does node heptagon and node circle have the same parent?",
	"How many ancestors does node circle have? Answer in digits please",
	"Is node Polygon Shapes parent to node triangle?",
	"Does node Conic Shapes have more or less ancestors than node 2D Shapes?",
	"",// Qualitative questions Ancestors
	"How many children does node Polygon Shapes have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node 2D Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less children than node decagon? (children = one level down in hierarchy)",
	"Is node deceagon child to node Conic Shapes? (children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",// A2 say what vis Treemap
	"How many siblings does hexagon have? Answer in digits please",
	"Does node pentagon have more or less siblings than node circle?",
	"Is node Conic Shapes and node 2D Shapes siblings?",
	"",// Qualitative questions Siblings
	"Does node heptagon and node circle have the same parent?",
	"How many ancestors does node octagon have? Answer in digits please",
	"Is node Polygon Shapes parent to node triangle?",
	"Does node Conic Shapes have more or less ancestors than node quadtrilateral?",
	"",// Qualitative questions Ancestors
	"How many children does node 2D Shapes have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node Polygon Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less children than node ellipse? (children = one level down in hierarchy)",
	"Is node circle child to node 2D Shapes? (children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",// A1 say what vis Node-link
	"How many siblings does node Polygon Shapes have? Answer in digits please",
	"Does node triangle have more or less siblings than node Conic Shapes?",
	"Is node Conic Shapes and node Polygon Shapes siblings?",
	"",// Qualitative questions Siblings
	"Does node hexagon and node octagon have the same parent?",
	"How many ancestor does node 2D Shapes have? Answer in digits please",
	"Is node Polygon Shapes parent to node hexagon?",
	"Does node Polygon Shapes have more or less ancestor than node circle?",
	"",// Qualitative questions Ancestors
	"How many children does node triangle have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node Conic Shapes have? Answer in digits please",
	"Does node Conic Shapes have more or less children than node Polygon Shapes? (children = one level down in hierarchy)",
	"Is node circle child to node Conic Shapes? (children = one level down in hierarchy)",
	"",// Qualitative questions Descendants
    "",//------------------- Intro larger dataset ---------------
    "",// A3 say what vis Icicle
    "How many siblings does node Täby have?",
    "Does node Enhörna have more or less siblings than node Haga?",
    "Is node Botkyrka and node Lidingö siblings?",
    "",// Qualitative questions Siblings
    "Does node Hägersten-Älvsjö and node Västerort have the same parent?",
    "How many ancestors does node Bromma have?",
    "Is node Sundbyberg parent to node Sigtuna?",
    "Does node Aspudden have more or less ancestors than node Täby?",
    "",// Qualitative questions Ancestors
    "How many children does node Inre staden have? (children = one level down in hierarchy)",
    "How many descendants does node Västerort have?",
    "Does node Stockholm have more or less children than node Sollentuna? (children = one level down in hierarchy)",
    "Is node Sätra child to node Skarpnäck?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// A2 say what vis Treemap
    "How many siblings does node Viksjö have?",
    "Does node Hässelby-Vällingby have more or less siblings than node Enskede-Årsta-Vantör?",
    "Is node Järva and node Haga siblings?",
    "",// Qualitative questions Siblings
    "Does node Vega and node Skogås have the same parent?",
    "How many ancestors does node Traneberg have?",
    "Is node Västerort parent to node Alvik?",
    "Does node Valsta have more or less ancestors than node Botkyrka?",
    "",// Qualitative questions Ancestors
    "How many children does node Västerort have? (children = one level down in hierarchy)",
    "How many descendants does node Inre Staden have?",
    "Does node Danderyd have more or less children than node Salem? (children = one level down in hierarchy)",
    "Is node Tveta child to node Sundbyberg?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// A1 say what vis Node-link
    "How many ancestors does node Stockholms län have?",
    "Is node Norrmalm, City parent to node Reimerholme?",
    "Does node Gamla stan have more or less ancestors than node Kungsholmen?",
    "",// Qualitative questions Siblings
    "Does node Rissne and node Duvbo have the same parent?",
    "How many ancestors does node Stockholms län have?",
    "Is node Norrmalm, City parent to node Reimerholme?",
    "Does node Gamla stan have more or less ancestors than node Kungsholmen?",
    "",// Qualitative questions Ancestors
    "How many children does node Järfälla have? (children = one level down in hierarchy)",
    "How many descendants does node Söderort have?",
    "Does node Upplands Väsby have more or less children than node Upplands-Bro? (children = one level down in hierarchy)",
    "Is node Hölö child to node Södertälje?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Intro CMV, explain data, why etc
    "What would you like to happen in the table when interacting with the node-link diagram or vice versa?",
    "What would you like to happen in the table when interacting with the treemap or vice versa?",
    "What would you like to happen in the table when interacting with the icicle plot or vice versa?",
    "" // Thank you
];




 var a3a2a1_1324 = ["",
	"",
	"Do you have color blindness visual impairment?",
	"What is your current experience and or knowledge of information visualization?",
	"",
    "",//explain the visualization types //Small dataset
    "",//A3 say what vis Icicle
	"How many siblings does node 2D Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less siblings than node heptagon?",
	"Is node Conic Shapes and node octagon siblings?",
    "",// Qualitative questions Siblings
    "How many children does node Polygon Shapes have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node 2D Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less children than node decagon? (children = one level down in hierarchy)",
	"Is node deceagon child to node Conic Shapes? (children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
	"Does node heptagon and node circle have the same parent?",
	"How many ancestors does node circle have? Answer in digits please",
	"Is node Polygon Shapes parent to node triangle?",
	"Does node Conic Shapes have more or less ancestors than node 2D Shapes?",
	"",// Qualitative questions Ancestors
    "",// A2 say what vis Treemap
	"How many siblings does hexagon have? Answer in digits please",
	"Does node pentagon have more or less siblings than node circle?",
	"Is node Conic Shapes and node 2D Shapes siblings?",
    "",// Qualitative questions Siblings
    "How many children does node 2D Shapes have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node Polygon Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less children than node ellipse? (children = one level down in hierarchy)",
	"Is node circle child to node 2D Shapes? (children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
	"Does node heptagon and node circle have the same parent?",
	"How many ancestors does node octagon have? Answer in digits please",
	"Is node Polygon Shapes parent to node triangle?",
	"Does node Conic Shapes have more or less ancestors than node quadtrilateral?",
	"",// Qualitative questions Ancestors
    "",// A1 say what vis Node-link
	"How many siblings does node Polygon Shapes have? Answer in digits please",
	"Does node triangle have more or less siblings than node Conic Shapes?",
	"Is node Conic Shapes and node Polygon Shapes siblings?",
    "",// Qualitative questions Siblings
    "How many children does node triangle have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node Conic Shapes have? Answer in digits please",
	"Does node Conic Shapes have more or less children than node Polygon Shapes? (children = one level down in hierarchy)",
	"Is node circle child to node Conic Shapes? (children = one level down in hierarchy)",
	"",// Qualitative questions Descendants
	"Does node hexagon and node octagon have the same parent?",
	"How many ancestor does node 2D Shapes have? Answer in digits please",
	"Is node Polygon Shapes parent to node hexagon?",
	"Does node Polygon Shapes have more or less ancestor than node circle?",
	"",// Qualitative questions Ancestors
    "",//------------------- Intro larger dataset ---------------
    "",// A3 say what vis Icicle
    "How many siblings does node Täby have?",
    "Does node Enhörna have more or less siblings than node Haga?",
    "Is node Botkyrka and node Lidingö siblings?",
    "",// Qualitative questions Siblings
    "How many children does node Inre staden have? (children = one level down in hierarchy)",
    "How many descendants does node Västerort have?",
    "Does node Stockholm have more or less children than node Sollentuna? (children = one level down in hierarchy)",
    "Is node Sätra child to node Skarpnäck?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "Does node Hägersten-Älvsjö and node Västerort have the same parent?",
    "How many ancestors does node Bromma have?",
    "Is node Sundbyberg parent to node Sigtuna?",
    "Does node Aspudden have more or less ancestors than node Täby?",
    "",// Qualitative questions Ancestors
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// A2 say what vis Treemap
    "How many siblings does node Viksjö have?",
    "Does node Hässelby-Vällingby have more or less siblings than node Enskede-Årsta-Vantör?",
    "Is node Järva and node Haga siblings?",
    "",// Qualitative questions Siblings
    "How many children does node Västerort have? (children = one level down in hierarchy)",
    "How many descendants does node Inre Staden have?",
    "Does node Danderyd have more or less children than node Salem? (children = one level down in hierarchy)",
    "Is node Tveta child to node Sundbyberg?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "Does node Vega and node Skogås have the same parent?",
    "How many ancestors does node Traneberg have?",
    "Is node Västerort parent to node Alvik?",
    "Does node Valsta have more or less ancestors than node Botkyrka?",
    "",// Qualitative questions Ancestors
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// A1 say what vis Node-link
    "How many ancestors does node Stockholms län have?",
    "Is node Norrmalm, City parent to node Reimerholme?",
    "Does node Gamla stan have more or less ancestors than node Kungsholmen?",
    "",// Qualitative questions Siblings
    "How many children does node Järfälla have? (children = one level down in hierarchy)",
    "How many descendants does node Söderort have?",
    "Does node Upplands Väsby have more or less children than node Upplands-Bro? (children = one level down in hierarchy)",
    "Is node Hölö child to node Södertälje?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "Does node Rissne and node Duvbo have the same parent?",
    "How many ancestors does node Stockholms län have?",
    "Is node Norrmalm, City parent to node Reimerholme?",
    "Does node Gamla stan have more or less ancestors than node Kungsholmen?",
    "",// Qualitative questions Ancestors
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Intro CMV, explain data, why etc
    "What would you like to happen in the table when interacting with the node-link diagram or vice versa?",
    "What would you like to happen in the table when interacting with the treemap or vice versa?",
    "What would you like to happen in the table when interacting with the icicle plot or vice versa?",
    "" // Thank you
];



 var a2a1a3_1234 = ["",
	"",
	"Do you have color blindness visual impairment?",
	"What is your current experience and or knowledge of information visualization?",
	"",
    "",//explain the visualization types //Small dataset
    "",// A2 say what vis Treemap
	"How many siblings does hexagon have? Answer in digits please",
	"Does node pentagon have more or less siblings than node circle?",
	"Is node Conic Shapes and node 2D Shapes siblings?",
    "",// Qualitative questions Siblings
    "Does node heptagon and node circle have the same parent?",
	"How many ancestors does node octagon have? Answer in digits please",
	"Is node Polygon Shapes parent to node triangle?",
	"Does node Conic Shapes have more or less ancestors than node quadtrilateral?",
	"",// Qualitative questions Ancestors
    "How many children does node 2D Shapes have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node Polygon Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less children than node ellipse? (children = one level down in hierarchy)",
	"Is node circle child to node 2D Shapes? (children = one level down in hierarchy)",
	"",// Qualitative questions Descendants
	"",// A1 say what vis Node-link Node-link
	"How many siblings does node Polygon Shapes have? Answer in digits please",
	"Does node triangle have more or less siblings than node Conic Shapes?",
	"Is node Conic Shapes and node Polygon Shapes siblings?",
    "",// Qualitative questions Siblings
    "Does node hexagon and node octagon have the same parent?",
	"How many ancestor does node 2D Shapes have? Answer in digits please",
	"Is node Polygon Shapes parent to node hexagon?",
	"Does node Polygon Shapes have more or less ancestor than node circle?",
	"",// Qualitative questions Ancestors
    "How many children does node triangle have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node Conic Shapes have? Answer in digits please",
	"Does node Conic Shapes have more or less children than node Polygon Shapes? (children = one level down in hierarchy)",
	"Is node circle child to node Conic Shapes? (children = one level down in hierarchy)",
	"",// Qualitative questions Descendants
    "",//A3 say what vis Icicle
	"How many siblings does node 2D Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less siblings than node heptagon?",
	"Is node Conic Shapes and node octagon siblings?",
    "",// Qualitative questions Siblings
    "Does node heptagon and node circle have the same parent?",
	"How many ancestors does node circle have? Answer in digits please",
	"Is node Polygon Shapes parent to node triangle?",
	"Does node Conic Shapes have more or less ancestors than node 2D Shapes?",
	"",// Qualitative questions Ancestors
    "How many children does node Polygon Shapes have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node 2D Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less children than node decagon? (children = one level down in hierarchy)",
	"Is node deceagon child to node Conic Shapes? (children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",//------------------- Intro larger dataset ---------------
    "",// A2 say what vis Treemap
    "How many siblings does node Viksjö have?",
    "Does node Hässelby-Vällingby have more or less siblings than node Enskede-Årsta-Vantör?",
    "Is node Järva and node Haga siblings?",
    "",// Qualitative questions Siblings
    "Does node Vega and node Skogås have the same parent?",
    "How many ancestors does node Traneberg have?",
    "Is node Västerort parent to node Alvik?",
    "Does node Valsta have more or less ancestors than node Botkyrka?",
    "",// Qualitative questions Ancestors
    "How many children does node Västerort have? (children = one level down in hierarchy)",
    "How many descendants does node Inre Staden have?",
    "Does node Danderyd have more or less children than node Salem? (children = one level down in hierarchy)",
    "Is node Tveta child to node Sundbyberg?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// A1 say what vis Node-link
    "How many ancestors does node Stockholms län have?",
    "Is node Norrmalm, City parent to node Reimerholme?",
    "Does node Gamla stan have more or less ancestors than node Kungsholmen?",
    "",// Qualitative questions Siblings
    "Does node Rissne and node Duvbo have the same parent?",
    "How many ancestors does node Stockholms län have?",
    "Is node Norrmalm, City parent to node Reimerholme?",
    "Does node Gamla stan have more or less ancestors than node Kungsholmen?",
    "",// Qualitative questions Ancestors
    "How many children does node Järfälla have? (children = one level down in hierarchy)",
    "How many descendants does node Söderort have?",
    "Does node Upplands Väsby have more or less children than node Upplands-Bro? (children = one level down in hierarchy)",
    "Is node Hölö child to node Södertälje?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// A3 say what vis Icicle
    "How many siblings does node Täby have?",
    "Does node Enhörna have more or less siblings than node Haga?",
    "Is node Botkyrka and node Lidingö siblings?",
    "",// Qualitative questions Siblings
    "Does node Hägersten-Älvsjö and node Västerort have the same parent?",
    "How many ancestors does node Bromma have?",
    "Is node Sundbyberg parent to node Sigtuna?",
    "Does node Aspudden have more or less ancestors than node Täby?",
    "",// Qualitative questions Ancestors
    "How many children does node Inre staden have? (children = one level down in hierarchy)",
    "How many descendants does node Västerort have?",
    "Does node Stockholm have more or less children than node Sollentuna? (children = one level down in hierarchy)",
    "Is node Sätra child to node Skarpnäck?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Intro CMV, explain data, why etc
    "What would you like to happen in the table when interacting with the node-link diagram or vice versa?",
    "What would you like to happen in the table when interacting with the treemap or vice versa?",
    "What would you like to happen in the table when interacting with the icicle plot or vice versa?",
    "" // Thank you
];




 var a2a1a3_1324 = ["",
	"",
	"Do you have color blindness visual impairment?",
	"What is your current experience and or knowledge of information visualization?",
	"",
    "",//explain the visualization types //Small dataset
    "",// A2 say what vis Treemap
	"How many siblings does hexagon have? Answer in digits please",
	"Does node pentagon have more or less siblings than node circle?",
	"Is node Conic Shapes and node 2D Shapes siblings?",
    "",// Qualitative questions Siblings
    "How many children does node 2D Shapes have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node Polygon Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less children than node ellipse? (children = one level down in hierarchy)",
	"Is node circle child to node 2D Shapes? (children = one level down in hierarchy)",
	"",// Qualitative questions Descendants
	"Does node heptagon and node circle have the same parent?",
	"How many ancestors does node octagon have? Answer in digits please",
	"Is node Polygon Shapes parent to node triangle?",
	"Does node Conic Shapes have more or less ancestors than node quadtrilateral?",
	"",// Qualitative questions Ancestors
	"",// A1 say what vis Node-link Node-link
	"How many siblings does node Polygon Shapes have? Answer in digits please",
	"Does node triangle have more or less siblings than node Conic Shapes?",
	"Is node Conic Shapes and node Polygon Shapes siblings?",
    "",// Qualitative questions Siblings
    "How many children does node triangle have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node Conic Shapes have? Answer in digits please",
	"Does node Conic Shapes have more or less children than node Polygon Shapes? (children = one level down in hierarchy)",
	"Is node circle child to node Conic Shapes? (children = one level down in hierarchy)",
	"",// Qualitative questions Descendants
	"Does node hexagon and node octagon have the same parent?",
	"How many ancestor does node 2D Shapes have? Answer in digits please",
	"Is node Polygon Shapes parent to node hexagon?",
	"Does node Polygon Shapes have more or less ancestor than node circle?",
	"",// Qualitative questions Ancestors
    "",//A3 say what vis Icicle
	"How many siblings does node 2D Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less siblings than node heptagon?",
	"Is node Conic Shapes and node octagon siblings?",
    "",// Qualitative questions Siblings
    "How many children does node Polygon Shapes have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node 2D Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less children than node decagon? (children = one level down in hierarchy)",
	"Is node deceagon child to node Conic Shapes? (children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
	"Does node heptagon and node circle have the same parent?",
	"How many ancestors does node circle have? Answer in digits please",
	"Is node Polygon Shapes parent to node triangle?",
	"Does node Conic Shapes have more or less ancestors than node 2D Shapes?",
	"",// Qualitative questions Ancestors
    "",//------------------- Intro larger dataset ---------------
    "",// A2 say what vis Treemap
    "How many siblings does node Viksjö have?",
    "Does node Hässelby-Vällingby have more or less siblings than node Enskede-Årsta-Vantör?",
    "Is node Järva and node Haga siblings?",
    "",// Qualitative questions Siblings
    "How many children does node Västerort have? (children = one level down in hierarchy)",
    "How many descendants does node Inre Staden have?",
    "Does node Danderyd have more or less children than node Salem? (children = one level down in hierarchy)",
    "Is node Tveta child to node Sundbyberg?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "Does node Vega and node Skogås have the same parent?",
    "How many ancestors does node Traneberg have?",
    "Is node Västerort parent to node Alvik?",
    "Does node Valsta have more or less ancestors than node Botkyrka?",
    "",// Qualitative questions Ancestors
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// A1 say what vis Node-link
    "How many ancestors does node Stockholms län have?",
    "Is node Norrmalm, City parent to node Reimerholme?",
    "Does node Gamla stan have more or less ancestors than node Kungsholmen?",
    "",// Qualitative questions Siblings
    "How many children does node Järfälla have? (children = one level down in hierarchy)",
    "How many descendants does node Söderort have?",
    "Does node Upplands Väsby have more or less children than node Upplands-Bro? (children = one level down in hierarchy)",
    "Is node Hölö child to node Södertälje?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "Does node Rissne and node Duvbo have the same parent?",
    "How many ancestors does node Stockholms län have?",
    "Is node Norrmalm, City parent to node Reimerholme?",
    "Does node Gamla stan have more or less ancestors than node Kungsholmen?",
    "",// Qualitative questions Ancestors
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// A3 say what vis Icicle
    "How many siblings does node Täby have?",
    "Does node Enhörna have more or less siblings than node Haga?",
    "Is node Botkyrka and node Lidingö siblings?",
    "",// Qualitative questions Siblings
    "How many children does node Inre staden have? (children = one level down in hierarchy)",
    "How many descendants does node Västerort have?",
    "Does node Stockholm have more or less children than node Sollentuna? (children = one level down in hierarchy)",
    "Is node Sätra child to node Skarpnäck?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "Does node Hägersten-Älvsjö and node Västerort have the same parent?",
    "How many ancestors does node Bromma have?",
    "Is node Sundbyberg parent to node Sigtuna?",
    "Does node Aspudden have more or less ancestors than node Täby?",
    "",// Qualitative questions Ancestors
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Intro CMV, explain data, why etc
    "What would you like to happen in the table when interacting with the node-link diagram or vice versa?",
    "What would you like to happen in the table when interacting with the treemap or vice versa?",
    "What would you like to happen in the table when interacting with the icicle plot or vice versa?",
    "" // Thank you
];




 var a1a3a2_1234 = ["",
	"",
	"Do you have color blindness visual impairment?",
	"What is your current experience and or knowledge of information visualization?",
	"",
	"",//explain the visualization types //Small dataset
	"",// A1 say what vis Node-link
	"How many siblings does node Polygon Shapes have? Answer in digits please",
	"Does node triangle have more or less siblings than node Conic Shapes?",
	"Is node Conic Shapes and node Polygon Shapes siblings?",
	"",// Qualitative questions Siblings
	"Does node hexagon and node octagon have the same parent?",
	"How many ancestor does node 2D Shapes have? Answer in digits please",
	"Is node Polygon Shapes parent to node hexagon?",
	"Does node Polygon Shapes have more or less ancestor than node circle?",
	"",// Qualitative questions Ancestors
	"How many children does node triangle have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node Conic Shapes have? Answer in digits please",
	"Does node Conic Shapes have more or less children than node Polygon Shapes? (children = one level down in hierarchy)",
	"Is node circle child to node Conic Shapes? (children = one level down in hierarchy)",
	"",// Qualitative questions Descendants
    "",//A3 say what vis Icicle
	"How many siblings does node 2D Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less siblings than node heptagon?",
	"Is node Conic Shapes and node octagon siblings?",
	"",// Qualitative questions Siblings
	"Does node heptagon and node circle have the same parent?",
	"How many ancestors does node circle have? Answer in digits please",
	"Is node Polygon Shapes parent to node triangle?",
	"Does node Conic Shapes have more or less ancestors than node 2D Shapes?",
	"",// Qualitative questions Ancestors
	"How many children does node Polygon Shapes have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node 2D Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less children than node decagon? (children = one level down in hierarchy)",
	"Is node deceagon child to node Conic Shapes? (children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",// A2 say what vis Treemap
	"How many siblings does hexagon have? Answer in digits please",
	"Does node pentagon have more or less siblings than node circle?",
	"Is node Conic Shapes and node 2D Shapes siblings?",
	"",// Qualitative questions Siblings
	"Does node heptagon and node circle have the same parent?",
	"How many ancestors does node octagon have? Answer in digits please",
	"Is node Polygon Shapes parent to node triangle?",
	"Does node Conic Shapes have more or less ancestors than node quadtrilateral?",
	"",// Qualitative questions Ancestors
	"How many children does node 2D Shapes have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node Polygon Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less children than node ellipse? (children = one level down in hierarchy)",
	"Is node circle child to node 2D Shapes? (children = one level down in hierarchy)",
	"",// Qualitative questions Descendants
    "",//------------------- Intro larger dataset ---------------
    "",// A1 say what vis Node-link
    "How many ancestors does node Stockholms län have?",
    "Is node Norrmalm, City parent to node Reimerholme?",
    "Does node Gamla stan have more or less ancestors than node Kungsholmen?",
    "",// Qualitative questions Siblings
    "Does node Rissne and node Duvbo have the same parent?",
    "How many ancestors does node Stockholms län have?",
    "Is node Norrmalm, City parent to node Reimerholme?",
    "Does node Gamla stan have more or less ancestors than node Kungsholmen?",
    "",// Qualitative questions Ancestors
    "How many children does node Järfälla have? (children = one level down in hierarchy)",
    "How many descendants does node Söderort have?",
    "Does node Upplands Väsby have more or less children than node Upplands-Bro? (children = one level down in hierarchy)",
    "Is node Hölö child to node Södertälje?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// A3 say what vis Icicle
    "How many siblings does node Täby have?",
    "Does node Enhörna have more or less siblings than node Haga?",
    "Is node Botkyrka and node Lidingö siblings?",
    "",// Qualitative questions Siblings
    "Does node Hägersten-Älvsjö and node Västerort have the same parent?",
    "How many ancestors does node Bromma have?",
    "Is node Sundbyberg parent to node Sigtuna?",
    "Does node Aspudden have more or less ancestors than node Täby?",
    "",// Qualitative questions Ancestors
    "How many children does node Inre staden have? (children = one level down in hierarchy)",
    "How many descendants does node Västerort have?",
    "Does node Stockholm have more or less children than node Sollentuna? (children = one level down in hierarchy)",
    "Is node Sätra child to node Skarpnäck?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// A2 say what vis Treemap
    "How many siblings does node Viksjö have?",
    "Does node Hässelby-Vällingby have more or less siblings than node Enskede-Årsta-Vantör?",
    "Is node Järva and node Haga siblings?",
    "",// Qualitative questions Siblings
    "Does node Vega and node Skogås have the same parent?",
    "How many ancestors does node Traneberg have?",
    "Is node Västerort parent to node Alvik?",
    "Does node Valsta have more or less ancestors than node Botkyrka?",
    "",// Qualitative questions Ancestors
    "How many children does node Västerort have? (children = one level down in hierarchy)",
    "How many descendants does node Inre Staden have?",
    "Does node Danderyd have more or less children than node Salem? (children = one level down in hierarchy)",
    "Is node Tveta child to node Sundbyberg?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Intro CMV, explain data, why etc
    "What would you like to happen in the table when interacting with the node-link diagram or vice versa?",
    "What would you like to happen in the table when interacting with the treemap or vice versa?",
    "What would you like to happen in the table when interacting with the icicle plot or vice versa?",
    "" // Thank you
];



 var a1a3a2_1324 = ["",
	"",
	"Do you have color blindness visual impairment?",
	"What is your current experience and or knowledge of information visualization?",
	"",
	"",//explain the visualization types //Small dataset
	"",// A1 say what vis Node-link
	"How many siblings does node Polygon Shapes have? Answer in digits please",
	"Does node triangle have more or less siblings than node Conic Shapes?",
	"Is node Conic Shapes and node Polygon Shapes siblings?",
    "",// Qualitative questions Siblings
    	"How many children does node triangle have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node Conic Shapes have? Answer in digits please",
	"Does node Conic Shapes have more or less children than node Polygon Shapes? (children = one level down in hierarchy)",
	"Is node circle child to node Conic Shapes? (children = one level down in hierarchy)",
	"",// Qualitative questions Descendants
	"Does node hexagon and node octagon have the same parent?",
	"How many ancestor does node 2D Shapes have? Answer in digits please",
	"Is node Polygon Shapes parent to node hexagon?",
	"Does node Polygon Shapes have more or less ancestor than node circle?",
	"",// Qualitative questions Ancestors
    "",//A3 say what vis Icicle
	"How many siblings does node 2D Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less siblings than node heptagon?",
	"Is node Conic Shapes and node octagon siblings?",
    "",// Qualitative questions Siblings
    	"How many children does node Polygon Shapes have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node 2D Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less children than node decagon? (children = one level down in hierarchy)",
	"Is node deceagon child to node Conic Shapes? (children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
	"Does node heptagon and node circle have the same parent?",
	"How many ancestors does node circle have? Answer in digits please",
	"Is node Polygon Shapes parent to node triangle?",
	"Does node Conic Shapes have more or less ancestors than node 2D Shapes?",
	"",// Qualitative questions Ancestors
    "",// A2 say what vis Treemap
	"How many siblings does hexagon have? Answer in digits please",
	"Does node pentagon have more or less siblings than node circle?",
	"Is node Conic Shapes and node 2D Shapes siblings?",
    "",// Qualitative questions Siblings
    "How many children does node 2D Shapes have? (children = one level down in hierarchy) Answer in digits please",
	"How many descendants does node Polygon Shapes have? Answer in digits please",
	"Does node Polygon Shapes have more or less children than node ellipse? (children = one level down in hierarchy)",
	"Is node circle child to node 2D Shapes? (children = one level down in hierarchy)",
	"",// Qualitative questions Descendants
	"Does node heptagon and node circle have the same parent?",
	"How many ancestors does node octagon have? Answer in digits please",
	"Is node Polygon Shapes parent to node triangle?",
	"Does node Conic Shapes have more or less ancestors than node quadtrilateral?",
	"",// Qualitative questions Ancestors
    "",//------------------- Intro larger dataset ---------------
    "",// A1 say what vis Node-link
    "How many ancestors does node Stockholms län have?",
    "Is node Norrmalm, City parent to node Reimerholme?",
    "Does node Gamla stan have more or less ancestors than node Kungsholmen?",
    "",// Qualitative questions Siblings
    "How many children does node Järfälla have? (children = one level down in hierarchy)",
    "How many descendants does node Söderort have?",
    "Does node Upplands Väsby have more or less children than node Upplands-Bro? (children = one level down in hierarchy)",
    "Is node Hölö child to node Södertälje?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "Does node Rissne and node Duvbo have the same parent?",
    "How many ancestors does node Stockholms län have?",
    "Is node Norrmalm, City parent to node Reimerholme?",
    "Does node Gamla stan have more or less ancestors than node Kungsholmen?",
    "",// Qualitative questions Ancestors
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// A3 say what vis Icicle
    "How many siblings does node Täby have?",
    "Does node Enhörna have more or less siblings than node Haga?",
    "Is node Botkyrka and node Lidingö siblings?",
    "",// Qualitative questions Siblings
    "How many children does node Inre staden have? (children = one level down in hierarchy)",
    "How many descendants does node Västerort have?",
    "Does node Stockholm have more or less children than node Sollentuna? (children = one level down in hierarchy)",
    "Is node Sätra child to node Skarpnäck?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "Does node Hägersten-Älvsjö and node Västerort have the same parent?",
    "How many ancestors does node Bromma have?",
    "Is node Sundbyberg parent to node Sigtuna?",
    "Does node Aspudden have more or less ancestors than node Täby?",
    "",// Qualitative questions Ancestors
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// A2 say what vis Treemap
    "How many siblings does node Viksjö have?",
    "Does node Hässelby-Vällingby have more or less siblings than node Enskede-Årsta-Vantör?",
    "Is node Järva and node Haga siblings?",
    "",// Qualitative questions Siblings
    "How many children does node Västerort have? (children = one level down in hierarchy)",
    "How many descendants does node Inre Staden have?",
    "Does node Danderyd have more or less children than node Salem? (children = one level down in hierarchy)",
    "Is node Tveta child to node Sundbyberg?(children = one level down in hierarchy)",
    "",// Qualitative questions Descendants
    "Does node Vega and node Skogås have the same parent?",
    "How many ancestors does node Traneberg have?",
    "Is node Västerort parent to node Alvik?",
    "Does node Valsta have more or less ancestors than node Botkyrka?",
    "",// Qualitative questions Ancestors
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Qualitative questions
    "",// Intro CMV, explain data, why etc
    "What would you like to happen in the table when interacting with the node-link diagram or vice versa?",
    "What would you like to happen in the table when interacting with the treemap or vice versa?",
    "What would you like to happen in the table when interacting with the icicle plot or vice versa?",
    "" // Thank you
];


