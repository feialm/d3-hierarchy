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
var whatTest = null;


// update page with with the current question + reset button
function onPageLoad() {
	//document.getElementById("button").style.color = "#a6a6a6";
	document.getElementById("button").style.color = "#000";
	document.getElementById("button").style.backgroundColor = "#74a9cf";//reset button color
	document.getElementById("statement").innerHTML = allStatements[testPosition].q;
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
	//console.log("Test Participant: ", userVar);
    //permuationsOfQuestions(parseInt(userVar, 10));
    
    getQuestions();
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
		unCheckRadios3();
		document.getElementById("freetext").value = "";
		document.getElementById("howmany").value = "";

		testPosition++;
		document.getElementById("statement").innerHTML = allStatements[testPosition].q;
	}
	else {
		alert("Please fill in an answer to proceed!");
    }
    if (allStatements[testPosition] !== "") {
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
	}
	if (testPosition === 2) {
        document.getElementById("yesNo").style.display = "inline-block";
        document.getElementById("demographics").style.display = "none";
	}
	if (testPosition === 3) {
        document.getElementById("likert").style.display = "inline-block";
        document.getElementById("yesNo").style.display = "none";
    }
	if (testPosition === 4) {
		document.getElementById("evaluation").style.display = "inline-block";
		document.getElementById("button").style.color = "#000";
        document.getElementById("button").style.backgroundColor = "#74a9cf";
        document.getElementById("likert").style.display = "none";
    }
    if (testPosition === 5) {
        document.getElementById("evaluation").style.display = "none";
        document.getElementById("button").style.color = "#000";
        document.getElementById("button").style.backgroundColor = "#74a9cf";
    }
    // textfield
    if (testPosition === 10 || testPosition === 15 || testPosition === 20 || testPosition === 25 || testPosition === 30 ||
        testPosition === 35 || testPosition === 40 || testPosition === 45 || testPosition === 50 || testPosition === 56 ||
        testPosition === 61 || testPosition === 66 || testPosition === 67 || testPosition === 68 || testPosition === 69 ||
        testPosition === 74 || testPosition === 79 || testPosition === 84 || testPosition === 85 || testPosition === 86 ||
        testPosition === 87 || testPosition === 92 || testPosition === 97 || testPosition === 102 || testPosition === 103 ||
        testPosition === 104 || testPosition === 105 || testPosition === 107 || testPosition === 108 || testPosition === 109) {
        
        document.getElementById("freetext").style.display = "inline-block";
    } else {
        document.getElementById("freetext").style.display = "none";
    }
    // text pages
    if (testPosition === 6 || testPosition === 21 || testPosition === 36 || testPosition === 51 || testPosition === 52 ||
        testPosition === 70 || testPosition === 88 || testPosition === 106 || testPosition === 110 ) {
        document.getElementById("button").style.color = "#000";
        document.getElementById("button").style.backgroundColor = "#74a9cf";
    }
    // direct user to different order of siblings, ascendants, descendants
    if (whatTest === "a1a2a3_1234" || whatTest === "a2a3a1_1234"|| whatTest === "a3a1a2_1234" ||
        whatTest === "a3a2a1_1234"|| whatTest === "a2a1a3_1234" || whatTest === "a1a3a2_1234" ) {
        //sadOrder();
    }
   if (whatTest === "a1a2a3_1324" || whatTest === "a2a3a1_1324"|| whatTest === "a3a1a2_1324" ||
        whatTest === "a3a2a1_1324"|| whatTest === "a2a1a3_1324" || whatTest === "a1a3a2_1324" ) {
        //sdaOrder()
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



// 6 questions
var introQ = [   
    { q: "", id: "I1", type: "info" },
    { q: "", id: "I2", type: "info" },
    { q: "Do you have color blindness visual impairment?", id: "I3", type: "yes/no" },
    { q: "What is your current experience and or knowledge of information visualization?", id: "I4", type: "likert" },
    { q: "", id: "I5", type: "info" },
    { q: "", id: "I6", type: "info" }
];


    
// 4 questions    
var endingQ = [
    {
        q: "The following 3 questions requires longer answers.\nYou will see a still image and one of the three visualizations at once.\nPlay around in the visualization interface and answer the question.",
        id: "CMV",
        type: "info"
    },
    { q: "What would you like to happen in the table when interacting with the node-link diagram or vice versa?", id: "CMV1", type: "textfield" },
    { q: "What would you like to happen in the table when interacting with the treemap or vice versa?", id: "CMV1", type: "textfield" },
    { q: "What would you like to happen in the table when interacting with the icicle plot or vice versa?", id: "CMV1", type: "textfield" }
];





// Small dataset 36 questions
var visQ1 = [
    {//node-link
        q: "To answer the following questions, you will see a dataset visualized in a node-link diagram. You are free to interact and play around in it.\nClick on Continue to proceed.",
        id: "",
        type: "info",
        questions: [
            // questions    
            // siblings
            [
                { q: "How many siblings does node Polygon Shapes have?", id: "S1S1", type: "howmany" },
                { q: "Does node triangle have more or less siblings than node Conic Shapes?", id: "S1S2", type: "less/more" },
                { q: "Is node Conic Shapes and node Polygon Shapes siblings?", id: "S1S3", type: "yes/no" }
            ],
            // ancestors
            [
                { q: "Does node hexagon and node octagon have the same parent?", id: "A1S1", type: "yes/no" },
                { q: "How many ancestor does node 2D Shapes have?", id: "A1S2", type: "howmany" },
                { q: "Is node Polygon Shapes parent to node hexagon?", id: "A1S3", type: "yes/no" },
                { q: "Does node Polygon Shapes have more or less ancestor than node circle?", id: "A1S4", type: "less/more" },
            ],
            // descendants
            [
                { q: "How many children does node triangle have? (children = one level down in hierarchy)", id: "D1S1", type: "howmany" },
                { q: "How many descendants does node Conic Shapes have?", id: "D1S2", type: "howmany" },
                { q: "Does node Conic Shapes have more or less children than node Polygon Shapes? (children = one level down in hierarchy)", id: "D1S3", type: "less/more" },
                { q: "Is node circle child to node Conic Shapes? (children = one level down in hierarchy)", id: "D1S4", type: "yes/no" }
            ]
        ]
    },
    {//treemap
        q: "To answer the following questions, you will see a dataset visualized in a treemap. You are free to interact and play around in it.\nClick on Continue to proceed.",
        id: "",
        type: "info",
        questions: [
            // questions
            // siblings
            [
                { q: "How many siblings does hexagon have?", id: "S2S1", type: "howmany" },
                { q: "Does node pentagon have more or less siblings than node circle?", id: "S2S2", type: "less/more" },
                { q: "Is node Conic Shapes and node 2D Shapes siblings?", id: "S2S3", type: "yes/no" }
            ],
            //ancestors
            [
                { q: "Does node heptagon and node circle have the same parent?", id: "A2S1", type: "yes/no" },
                { q: "How many ancestors does node octagon have?", id: "A2S2", type: "howmany" },
                { q: "Is node Polygon Shapes parent to node triangle?", id: "A2S3", type: "yes/no" },
                { q: "Does node Conic Shapes have more or less ancestors than node quadtrilateral?", id: "A2S4", type: "less/more" }
            ],
            //descendants
            [
                { q: "How many children does node 2D Shapes have? (children = one level down in hierarchy)", id: "D2S1", type: "howmany" },
                { q: "How many descendants does node Polygon Shapes have?", id: "D2S2", type: "howmany" },
                { q: "Does node Polygon Shapes have more or less children than node ellipse? (children = one level down in hierarchy)", id: "D2S3", type: "less/more" },
                { q: "Is node circle child to node 2D Shapes? (children = one level down in hierarchy)", id: "D2S4", type: "yes/no" }
            ]
        ]
    },
    {//icicle plot
        q: "To answer the following questions, you will see a dataset visualized in an icicle plot. You are free to interact and play around in it.\nClick on Continue to proceed.",
        id: "",
        type: "info",
        questions: [
            // questions
            // siblings
            [
                { q: "How many siblings does node 2D Shapes have?", id: "S3S1", type: "howmany" },
                { q: "Does node Polygon Shapes have more or less siblings than node heptagon?", id: "S3S2", type: "less/more" },
                { q: "Is node Conic Shapes and node octagon siblings?", id: "S3S3", type: "yes/no" },
            ],
            // ancestors
            [
                { q: "Does node heptagon and node circle have the same parent?", id: "A3S1", type: "yes/no" },
                { q: "How many ancestors does node circle have?", id: "A3S2", type: "howmany" },
                { q: "Is node Polygon Shapes parent to node triangle?", id: "A3S3", type: "yes/no" },
                { q: "Does node Conic Shapes have more or less ancestors than node 2D Shapes?", id: "A3S4", type: "less/more" }
            ],
            // descendants
            [
                { q: "How many children does node Polygon Shapes have? (children = one level down in hierarchy)", id: "D3S1", type: "howmany" },
                { q: "How many descendants does node 2D Shapes have?", id: "D3S2", type: "howmany" },
                { q: "Does node Polygon Shapes have more or less children than node decagon? (children = one level down in hierarchy)", id: "D3S3", type: "less/more" },
                { q: "Is node deceagon child to node Conic Shapes? (children = one level down in hierarchy)", id: "D3S4", type: "yes/no" }
            ]
        ]
    },
];



// Large dataset 46 questions
var visQ2 = [
    {//node-link
        q: "You will see a dataset visualized in a node-link diagram again.\nThis time the dataset is larger.\nClick on Continue to proceed.",
        id: "",
        type: "info",
        questions: [
            // questions    
            // siblings
            [
                { q: "How many ancestors does node Stockholms län have?", id: "S1L1", type: "howmany" },
                { q: "Is node Norrmalm, City parent to node Reimerholme?", id: "S1L2", type: "less/more" },
                { q: "Does node Gamla stan have more or less ancestors than node Kungsholmen?", id: "S1L3", type: "yes/no" },
                { q: "Is the techniques for investigate sibling nodes suitable for the datasets (Stockholm and 2DShapes)? Is it more relevant/less for one of the datasets? (motivate why or why not)", id: "S1L4", type: "textfield" }
            ],
            // ancestors
            [
                { q: "Does node Rissne and node Duvbo have the same parent?", id: "A1L1", type: "yes/no" },
                { q: "How many ancestors does node Stockholms län have?", id: "A1L2", type: "howmany" },
                { q: "Is node Norrmalm, City parent to node Reimerholme?", id: "A1L3", type: "yes/no" },
                { q: "Does node Gamla stan have more or less ancestors than node Kungsholmen?", id: "A1L4", type: "less/more" },
                { q: "Is the techniques for investigate ascendant nodes suitable for the datasets (Stockholm and 2DShapes)? Is it more relevant/less for one of the datasets? (motivate why or why not)", id: "A1L5", type: "textfield" }
            ],
            // descendants
            [
                { q: "How many children does node Järfälla have? (children = one level down in hierarchy)", id: "D1L1", type: "howmany" },
                { q: "How many descendants does node Söderort have?", id: "D1L2", type: "howmany" },
                { q: "Does node Upplands Väsby have more or less children than node Upplands-Bro? (children = one level down in hierarchy)", id: "D1L3", type: "less/more" },
                { q: "Is node Hölö child to node Södertälje? (children = one level down in hierarchy)", id: "D1L4", type: "yes/no" },
                { q: "Is the technique for investigate descendants and child nodes suitable for the datasets (Stockholm and 2DShapes)? Is it more relevant/less for one of the datasets? (motivate why or why not)", id: "D1L5", type: "textfield" }
            ]
        ]
    },
    {//treemap
        q: "You will see a dataset qualized in a treemap again.\nThis time the dataset is larger.\nClick on Continue to proceed.",
        id: "",
        type: "info",
        questions: [
            // questions
            // siblings
            [
                { q: "How many siblings does node Viksjö have?", id: "S2L1", type: "howmany" },
                { q: "Does node Hässelby-Vällingby have more or less siblings than node Enskede-Årsta-Vantör?", id: "S2L2", type: "less/more" },
                { q: "Is node Järva and node Haga siblings?", id: "S2L3", type: "yes/no" },
                { q: "Is the techniques for investigate sibling nodes suitable for the datasets (Stockholm and 2DShapes)? Is it more relevant/less for one of the datasets? (motivate why or why not)", id: "S2L4", type: "textfield" }
            ],
            //ancestors
            [
                { q: "Does node Vega and node Skogås have the same parent?", id: "A2L1", type: "yes/no" },
                { q: "How many ancestors does node Traneberg have?", id: "A2L2", type: "howmany" },
                { q: "Is node Västerort parent to node Alvik?", id: "A2L3", type: "yes/no" },
                { q: "Does node Valsta have more or less ancestors than node Botkyrka?", id: "A2L4", type: "less/more" },
                { q: "Is the techniques for investigate ascendant nodes suitable for the datasets (Stockholm and 2DShapes)? Is it more relevant/less for one of the datasets? (motivate why or why not)", id: "A2L5", type: "textfield" }
            ],
            //descendants
            [
                { q: "How many children does node Västerort have? (children = one level down in hierarchy)", id: "D2L1", type: "howmany" },
                { q: "How many descendants does node Inre Staden have?", id: "D2L2", type: "howmany" },
                { q: "Does node Danderyd have more or less children than node Salem? (children = one level down in hierarchy)", id: "D2L3", type: "less/more" },
                { q: "Is node Tveta child to node Sundbyberg?(children = one level down in hierarchy)", id: "D2L4", type: "yes/no" },
                { q: "Is the technique for investigate descendants and child nodes suitable for the datasets (Stockholm and 2DShapes)? Is it more relevant/less for one of the datasets? (motivate why or why not)", id: "D2L5", type: "textfield" }
            ]
        ]
    },
    {//icicle plot
        q: "You will see a dataset visualized in an icicle plot.\nThis time the dataset is larger.\nClick on Continue to proceed.",
        id: "",
        type: "info",
        questions: [
            // questions
            // siblings
            [
                { q: "How many siblings does node Täby have?", id: "S3L1", type: "howmany" },
                { q: "Does node Enhörna have more or less siblings than node Haga?", id: "S3L2", type: "less/more" },
                { q: "Is node Botkyrka and node Lidingö siblings?", id: "S3L3", type: "yes/no" },
                { q: "Is the techniques for investigate sibling nodes suitable for the datasets (Stockholm and 2DShapes)? Is it more relevant/less for one of the datasets? (motivate why or why not)", id: "S3L4", type: "textfield" }
            ],
            // ancestors
            [
                { q: "Does node Hägersten-Älvsjö and node Västerort have the same parent?", id: "A3L1", type: "yes/no" },
                { q: "How many ancestors does node Bromma have?", id: "A3L2", type: "howmany" },
                { q: "Is node Sundbyberg parent to node Sigtuna?", id: "A3L3", type: "yes/no" },
                { q: "Does node Aspudden have more or less ancestors than node Täby?", id: "A3L4", type: "less/more" },
                { q: "Is the techniques for investigate ascendant nodes suitable for the datasets (Stockholm and 2DShapes)? Is it more relevant/less for one of the datasets? (motivate why or why not)", id: "A3L5", type: "textfield" }
            ],
            // descendants
            [
                { q: "How many children does node Inre staden have? (children = one level down in hierarchy)", id: "D3L1", type: "howmany" },
                { q: "How many descendants does node Västerort have?", id: "D3L2", type: "howmany" },
                { q: "Does node Stockholm have more or less children than node Sollentuna? (children = one level down in hierarchy)", id: "D3L3", type: "less/more" },
                { q: "Is node Sätra child to node Skarpnäck?(children = one level down in hierarchy)", id: "D3L4", type: "yes/no" },
                { q: "Is the technique for investigate descendants and child nodes suitable for the datasets (Stockholm and 2DShapes)? Is it more relevant/less for one of the datasets? (motivate why or why not)", id: "D3L5", type: "textfield" }
            ]
        ]
    },
];


// visualization order
let visSeq = [[0, 1, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0], [1, 0, 2], [0, 2, 1]];



function getQuestions() {

    allStatements = [];

    
    for (let i = 0; i < introQ.length; i++){
        allStatements.push(introQ[i]);
    }

    let randVis = Math.floor(Math.random() * 6);// random number 0-5
    let randTech = Math.floor(Math.random() * 2);//random number 0-1, sad or sda order brushing and linking

    console.log("Math random n: ", randVis);
    console.log("Math random m: ", randTech);

    //console.log("visSeq: ", visSeq[randVis]);
    var arrayVis = [];

    for (let i = 0; i < visSeq[randVis].length; i++) {
        arrayVis.push(visSeq[randVis][i]);
    }

    //console.log("ArrayVis: ", arrayVis, "\nShould be same as visSeq");

    var arrayTeq = [];
    if (randTech === 0) {
        arrayTeq = [0, 1, 2];//sad order
    
    } else if(randTech === 1){
        arrayTeq = [0, 2, 1];//sda order
    }
    //console.log("ArrayTeq: ", arrayTeq);

    

    for (let i = 0; i < arrayVis.length; i++) {
    
        //console.log("Order of vis: ", visQ1[arrayVis[i]].q);
        allStatements.push(visQ1[arrayVis[i]]);

        for (let j = 0; j < arrayTeq.length; j++) {
            var brushingLinking = visQ1[arrayVis[i]].questions;
            //console.log("Order of brushing and linking: ", brushingLinking[arrayTeq[j]]);
            var sortedBL = brushingLinking[arrayTeq[j]];
            
            for (let k = 0; k < sortedBL.length; k++){
                allStatements.push(sortedBL[k]);
            }
        }
    }



    for (let i = 0; i < arrayVis.length; i++) {
    
        //console.log("Order of vis: ", visQ2[arrayVis[i]].q);
        allStatements.push(visQ2[arrayVis[i]]);

        for (let j = 0; j < arrayTeq.length; j++) {
            var brushingLinking = visQ2[arrayVis[i]].questions;
            //console.log("Order of brushing and linking: ", brushingLinking[arrayTeq[j]]);
            var sortedBL = brushingLinking[arrayTeq[j]];
            
            for (let k = 0; k < sortedBL.length; k++){
                allStatements.push(sortedBL[k]);
            }
        }
    }


    for (let i = 0; i < endingQ.length; i++){
        allStatements.push(endingQ[i]);
    }

    console.log("Ending: ", allStatements);

}







/*
// psuedo code for 12 permutations of the test
function permuationsOfQuestions(c) {
    var mod = c % 12;
    if (whatTest === null) {
        //console.log("HSdwefr");
    }

    // direct user to correct questionnaire
    if (mod === 1) {
        //console.log("1 and: ", c);
        //allStatements = a1a2a3_1234;
        whatTest = "a1a2a3_1234";
        //console.log("whatTest: ", whatTest);
    }
    if (mod === 2) {
        //console.log("2 and: ", c);
        //allStatements = a1a2a3_1324;
        whatTest = "a1a2a3_1324";
        //console.log("whatTest: ", whatTest);
    }
    if (mod === 3) {
        //console.log("3 and: ", c);
        //allStatements = a2a3a1_1234;
        whatTest = "a2a3a1_1234";
        //console.log("whatTest: ", whatTest);
    }
    if (mod === 4) {
        //console.log("4 and: ", c);
        //allStatements = a2a3a1_1324;
        whatTest = "a2a3a1_1324";
        //console.log("whatTest: ", whatTest);
    }
    if (mod === 5) {
        //console.log("5 and: ", c);
        //allStatements = a3a1a2_1234;
        whatTest = "a3a1a2_1234";
        //console.log("whatTest: ", whatTest);
    }
    if (mod === 6) {
        //console.log("6 and: ", c);
        //allStatements = a3a1a2_1324;
        whatTest = "a3a1a2_1324";
        //console.log("whatTest: ", whatTest);
    }
    if (mod === 7) {
        //console.log("7 and: ", c);
        //allStatements = a3a2a1_1234;
        whatTest = "a3a2a1_1234";
        //console.log("whatTest: ", whatTest);
    }
    if (mod === 8) {
        //console.log("8 and: ", c);
        //allStatements = a3a2a1_1324;
        whatTest = "a3a2a1_1324";
        //console.log("whatTest: ", whatTest);
    }
    if (mod === 9) {
        //console.log("9 and: ", c);
        //allStatements = a2a1a3_1234;
        whatTest = "a2a1a3_1234";
        //console.log("whatTest: ", whatTest);
    }
    if (mod === 10) {
        //console.log("10 and: ", c);
        //allStatements = a2a1a3_1324;
        whatTest = "a2a1a3_1324";
        //console.log("whatTest: ", whatTest);
    }
    if (mod === 11) {
        //console.log("11 and: ", c);
        //allStatements = a1a3a2_1234;
        whatTest = "a1a3a2_1234";
        //console.log("whatTest: ", whatTest);
    }
    if (mod === 0) {
        //console.log("12 and: ", c);
        //allStatements = a1a3a2_1324;
        whatTest = "a1a3a2_1324";
        //console.log("whatTest: ", whatTest);
    }
}
*/











/*
function sadOrder() {
    
    if (testPosition === 2 || testPosition === 9 || testPosition === 11 || testPosition === 13 || testPosition === 19 ||
        testPosition === 24 || testPosition === 26 || testPosition === 28 || testPosition === 34 || testPosition === 39 ||
        testPosition === 41 || testPosition === 44 || testPosition === 49 || testPosition === 55 || testPosition === 57 ||
        testPosition === 59 || testPosition === 65 || testPosition === 73 || testPosition === 75 || testPosition === 77 ||
        testPosition === 83 || testPosition === 91 || testPosition === 93 || testPosition === 95 || testPosition === 101 ) {
        
        document.getElementById("yesNo").style.display = "inline-block";      
    } else {
        document.getElementById("yesNo").style.display = "none";
    }


    if (testPosition === 8 || testPosition === 14 || testPosition === 18 || testPosition === 23 || testPosition === 29 ||
        testPosition === 33 || testPosition === 38 || testPosition === 44 || testPosition === 48 || testPosition === 54 ||
        testPosition === 60 || testPosition === 64 || testPosition === 72 || testPosition === 78 || testPosition === 82 ||
        testPosition === 90 || testPosition === 96 || testPosition === 100 ) {
        
        document.getElementById("lessMore").style.display = "inline-block";    
    } else {
        document.getElementById("lessMore").style.display = "none";
    }


    if (testPosition === 7 || testPosition === 12 || testPosition === 16 || testPosition === 17 || testPosition === 22 ||
        testPosition === 27 || testPosition === 31 || testPosition === 32 || testPosition === 37 || testPosition === 42 ||
        testPosition === 46 || testPosition === 47 || testPosition === 53 || testPosition === 58 || testPosition === 62 ||
        testPosition === 63 || testPosition === 71 || testPosition === 76 || testPosition === 80 || testPosition === 81 ||
        testPosition === 89 || testPosition === 94 || testPosition === 98 || testPosition === 99 ) {
        
        document.getElementById("howmany").style.display = "inline-block";     
    } else {
        document.getElementById("howmany").style.display = "none";
    }
    
}*/ 












