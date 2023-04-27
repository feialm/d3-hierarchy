var allStatements = [{ q: "undefined", id: "I1", iframe:null, type: "info" },
    { q: "undefined", id: "I2", iframe:null, type: "info" }
]

var iframeArray = ["S1L", "A1L", "D1L", "S1S", "A1S", "D1S",
    "S2L", "A2L", "D2L", "S2S", "A2S", "D2S",
    "S3L", "A3L", "D3L","S3S", "A3S", "D3S",
    
];


var otherDisplays = ["likert", "yesNo", "lessMore", "demographics", "evaluation", "freetext",
    "survey", "howmany", "theory"];



var testPosition = 0;
var userAnswers = [];
var currentUser = [];


function hideIFRAMES() {
    for (let i = 0; i < iframeArray.length; i++){
        let getIFRAME = iframeArray[i];
        document.getElementById(getIFRAME).style.display = "none";
    }  
};

function showIFRAME(iframe) {

    if (iframe === null) {
        return;
    }

    hideIFRAMES();//reset iframes
    
    for (let i = 0; i < iframeArray.length; i++){
        if (iframe === iframeArray[i]) {
            document.getElementById(iframe).style.display = "inline-block";
        }
    } 
};


function hideOtherDisplays() {
    for (let i = 0; i < otherDisplays.length; i++){
        let getItem = otherDisplays[i];
        document.getElementById(getItem).style.display = "none";
    }  
};


// update page with with the current question + reset button
function onPageLoad() {
	//document.getElementById("button").style.color = "#a6a6a6";
	document.getElementById("button").style.color = "#000";
	document.getElementById("button").style.backgroundColor = "#74a9cf";//reset button color
    document.getElementById("statement").innerHTML = allStatements[testPosition].q;

    pageCount = testPosition + 1;
    document.getElementById("qq").innerHTML = "Page: " + (testPosition+1) +"/92";
    
    hideOtherDisplays();
    hideIFRAMES();

	currentUser.push(userVar);
	//console.log("Test Participant: ", userVar);
    //permuationsOfQuestions(parseInt(userVar, 10));
    
    getQuestions();
    console.log("Length: ",allStatements.length);
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
        pageCount++;
        document.getElementById("statement").innerHTML = allStatements[testPosition].q;
        document.getElementById("qq").innerHTML = "Page: " +  (testPosition+1) +"/92";
	}
	else {
		alert("Please fill in an answer to proceed!");
    }
    if (allStatements[testPosition].q !== "" || allStatements[testPosition].type !== "info") {
        document.getElementById("survey").style.display = "inline-block";
    } else {
        document.getElementById("survey").style.display = "none";
    }
    if (allStatements[testPosition].type == "info") {
        document.getElementById("button").style.color = "#000";
        document.getElementById("button").style.backgroundColor = "#74a9cf";
    }
    if (allStatements[testPosition].type == "textfield") {
        document.getElementById("freetext").style.display = "inline-block";
    } else {
        document.getElementById("freetext").style.display = "none";
    }
    if (allStatements[testPosition].type == "howmany") {
        document.getElementById("howmany").style.display = "inline-block";
    }else {
        document.getElementById("howmany").style.display = "none";
    }
    if (allStatements[testPosition].type == "less/more") {
        document.getElementById("lessMore").style.display = "inline-block";
    }else {
        document.getElementById("lessMore").style.display = "none";
    }
    if (allStatements[testPosition].type == "yes/no") {
        document.getElementById("yesNo").style.display = "inline-block";
    }else {
        document.getElementById("yesNo").style.display = "none";
    }
    if (allStatements[testPosition].type == "likert") {
        document.getElementById("likert").style.display = "inline-block";
    }else {
        document.getElementById("likert").style.display = "none";
    }
    if (allStatements[testPosition].id === "I1") {
        document.getElementById("intro").style.display = "inline-block";
    } else {
        document.getElementById("intro").style.display = "none";
    }
    if (allStatements[testPosition].id === "I2") {
        document.getElementById("demographics").style.display = "inline-block";
    } else {
        document.getElementById("demographics").style.display = "none";
    }
    if (allStatements[testPosition].id === "I5") {
        document.getElementById("evaluation").style.display = "inline-block";
    } else {
        document.getElementById("evaluation").style.display = "none";
    }
    if (allStatements[testPosition].id === "I6") {
        document.getElementById("theory").style.display = "inline-block";
    } else {
        document.getElementById("theory").style.display = "none";
    }

    showIFRAME(allStatements[testPosition].iframe);

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
    { q: "", id: "I1", iframe:null, type: "info" },
    { q: "", id: "I2", iframe:null, type: "info" },
    { q: "Do you have color blindness visual impairment?", id: "I3", iframe:null, type: "yes/no" },
    { q: "What is your current experience and or knowledge of information visualization?", id: "I4", iframe:null, type: "likert" },
    { q: "", id: "I5", iframe:null, type: "info" },
    { q: "", id: "I6", iframe:null, type: "info" }
];


    
// 4 questions    
var endingQ = [
    {
        q: "The following 3 questions requires longer answers.\nYou will see a still image and one of the three visualizations at once.\nPlay around in the visualization interface and answer the question.",
        id: "CMV",
        iframe:null,
        type: "info"
    },
    { q: "What would you like to happen in the table when interacting with the node-link diagram or vice versa?", id: "CMV1", iframe:"CMV1", type: "textfield" },
    { q: "What would you like to happen in the table when interacting with the treemap or vice versa?", id: "CMV2", iframe:"CMV2", type: "textfield" },
    { q: "What would you like to happen in the table when interacting with the icicle plot or vice versa?", id: "CMV3", iframe:"CMV3", type: "textfield" }
];





// Small dataset 36 questions
var visQ1 = [
    {//node-link
        q: "To answer the following questions, you will see a dataset visualized in a node-link diagram. You are free to interact and play around in it.\nClick on Continue to proceed.",
        id: "",
        iframe: null,
        type: "info",
        questions: [
            // questions    
            // siblings
            [
                { q: "How many siblings does node Polygon Shapes have?", id: "S1S1", iframe:"S1S", type: "howmany" },
                { q: "Does node triangle have more or less siblings than node Conic Shapes?", id: "S1S2", iframe:"S1S", type: "less/more" },
                { q: "Is node Conic Shapes and node Polygon Shapes siblings?", id: "S1S3", iframe:"S1S", type: "yes/no" }
            ],
            // ancestors
            [
                { q: "Does node hexagon and node octagon have the same parent?", id: "A1S1", iframe:"A1S", type: "yes/no" },
                { q: "How many ancestor does node 2D Shapes have?", id: "A1S2", iframe:"A1S", type: "howmany" },
                { q: "Is node Polygon Shapes parent to node hexagon?", id: "A1S3", iframe:"A1S", type: "yes/no" },
                { q: "Does node Polygon Shapes have more or less ancestor than node circle?", id: "A1S4", iframe:"A1S", type: "less/more" },
            ],
            // descendants
            [
                { q: "How many children does node triangle have? (children = one level down in hierarchy)", id: "D1S1", iframe:"D1S", type: "howmany" },
                { q: "How many descendants does node Conic Shapes have?", id: "D1S2", iframe:"D1S", type: "howmany" },
                { q: "Does node Conic Shapes have more or less children than node Polygon Shapes? (children = one level down in hierarchy)", id: "D1S3", iframe:"D1S", type: "less/more" },
                { q: "Is node circle child to node Conic Shapes? (children = one level down in hierarchy)", id: "D1S4", iframe:"D1S", type: "yes/no" }
            ]
        ]
    },
    {//treemap
        q: "To answer the following questions, you will see a dataset visualized in a treemap. You are free to interact and play around in it.\nClick on Continue to proceed.",
        id: "",
        iframe: null,
        type: "info",
        questions: [
            // questions
            // siblings
            [
                { q: "How many siblings does hexagon have?", id: "S2S1", iframe:"S2S", type: "howmany" },
                { q: "Does node pentagon have more or less siblings than node circle?", id: "S2S2", iframe:"S2S", type: "less/more" },
                { q: "Is node Conic Shapes and node 2D Shapes siblings?", id: "S2S3", iframe:"S2S", type: "yes/no" }
            ],
            //ancestors
            [
                { q: "Does node heptagon and node circle have the same parent?", id: "A2S1", iframe:"A2S", type: "yes/no" },
                { q: "How many ancestors does node octagon have?", id: "A2S2", iframe:"A2S", type: "howmany" },
                { q: "Is node Polygon Shapes parent to node triangle?", id: "A2S3", iframe:"A2S", type: "yes/no" },
                { q: "Does node Conic Shapes have more or less ancestors than node quadtrilateral?", id: "A2S4", iframe:"A2S", type: "less/more" }
            ],
            //descendants
            [
                { q: "How many children does node 2D Shapes have? (children = one level down in hierarchy)", id: "D2S1", iframe:"D2S", type: "howmany" },
                { q: "How many descendants does node Polygon Shapes have?", id: "D2S2", iframe:"D2S", type: "howmany" },
                { q: "Does node Polygon Shapes have more or less children than node ellipse? (children = one level down in hierarchy)", id: "D2S3", iframe:"D2S", type: "less/more" },
                { q: "Is node circle child to node 2D Shapes? (children = one level down in hierarchy)", id: "D2S4", iframe:"D2S", type: "yes/no" }
            ]
        ]
    },
    {//icicle plot
        q: "To answer the following questions, you will see a dataset visualized in an icicle plot. You are free to interact and play around in it.\nClick on Continue to proceed.",
        id: "",
        iframe: null,
        type: "info",
        questions: [
            // questions
            // siblings
            [
                { q: "How many siblings does node 2D Shapes have?", id: "S3S1", iframe:"S3S", type: "howmany" },
                { q: "Does node Polygon Shapes have more or less siblings than node heptagon?", id: "S3S2", iframe:"S3S", type: "less/more" },
                { q: "Is node Conic Shapes and node octagon siblings?", id: "S3S3", iframe:"S3S", type: "yes/no" },
            ],
            // ancestors
            [
                { q: "Does node heptagon and node circle have the same parent?", id: "A3S1", iframe:"A3S", type: "yes/no" },
                { q: "How many ancestors does node circle have?", id: "A3S2", iframe:"A3S", type: "howmany" },
                { q: "Is node Polygon Shapes parent to node triangle?", id: "A3S3", iframe:"A3S", type: "yes/no" },
                { q: "Does node Conic Shapes have more or less ancestors than node 2D Shapes?", id: "A3S4", iframe:"A3S", type: "less/more" }
            ],
            // descendants
            [
                { q: "How many children does node Polygon Shapes have? (children = one level down in hierarchy)", id: "D3S1", iframe:"D3S", type: "howmany" },
                { q: "How many descendants does node 2D Shapes have?", id: "D3S2", iframe:"D3S", type: "howmany" },
                { q: "Does node Polygon Shapes have more or less children than node decagon? (children = one level down in hierarchy)", id: "D3S3", iframe: "D3S", type: "less/more" },
                { q: "Is node deceagon child to node Conic Shapes? (children = one level down in hierarchy)", id: "D3S4", iframe:"D3S", type: "yes/no" }
            ]
        ]
    },
];



// Large dataset 46 questions
var visQ2 = [
    {//node-link
        q: "You will see a dataset visualized in a node-link diagram again.\nThis time the dataset is larger.\nClick on Continue to proceed.",
        id: "",
        iframe: null,
        type: "info",
        questions: [
            // questions    
            // siblings
            [
                { q: "How many ancestors does node Stockholms län have?", id: "S1L1", iframe:"S1L", type: "howmany" },
                { q: "Is node Norrmalm, City parent to node Reimerholme?", id: "S1L2", iframe:"S1L", type: "less/more" },
                { q: "Does node Gamla stan have more or less ancestors than node Kungsholmen?", id: "S1L3", iframe:"S1L", type: "yes/no" },
                { q: "Is the techniques for investigate sibling nodes suitable for the datasets (Stockholm and 2D Shapes)? Is it more relevant/less for one of the datasets? (motivate why or why not)", id: "S1L4", iframe:null, type: "textfield" }
            ],
            // ancestors
            [
                { q: "Does node Rissne and node Duvbo have the same parent?", id: "A1L1", iframe:"A1L", type: "yes/no" },
                { q: "How many ancestors does node Stockholms län have?", id: "A1L2", iframe:"A1L", type: "howmany" },
                { q: "Is node Norrmalm, City parent to node Reimerholme?", id: "A1L3", iframe:"A1L", type: "yes/no" },
                { q: "Does node Gamla stan have more or less ancestors than node Kungsholmen?", id: "A1L4", iframe:"A1L", type: "less/more" },
                { q: "Is the techniques for investigate ascendant nodes suitable for the datasets (Stockholm and 2D Shapes)? Is it more relevant/less for one of the datasets? (motivate why or why not)", id: "A1L5", iframe:null, type: "textfield" }
            ],
            // descendants
            [
                { q: "How many children does node Järfälla have? (children = one level down in hierarchy)", id: "D1L1", iframe:"D1L", type: "howmany" },
                { q: "How many descendants does node Söderort have?", id: "D1L2", iframe:"D1L", type: "howmany" },
                { q: "Does node Upplands Väsby have more or less children than node Upplands-Bro? (children = one level down in hierarchy)", id: "D1L3", iframe:"D1L", type: "less/more" },
                { q: "Is node Hölö child to node Södertälje? (children = one level down in hierarchy)", id: "D1L4", iframe:"D1L", type: "yes/no" },
                { q: "Is the technique for investigate descendants and child nodes suitable for the datasets (Stockholm and 2D Shapes)? Is it more relevant/less for one of the datasets? (motivate why or why not)", id: "D1L5", iframe:null, type: "textfield" }
            ]
        ]
    },
    {//treemap
        q: "You will see a dataset qualized in a treemap again.\nThis time the dataset is larger.\nClick on Continue to proceed.",
        id: "",
        iframe: null,
        type: "info",
        questions: [
            // questions
            // siblings
            [
                { q: "How many siblings does node Viksjö have?", id: "S2L1", iframe:"S2L", type: "howmany" },
                { q: "Does node Hässelby-Vällingby have more or less siblings than node Enskede-Årsta-Vantör?", id: "S2L2", iframe:"S2L", type: "less/more" },
                { q: "Is node Järva and node Haga siblings?", id: "S2L3", iframe:"S2L", type: "yes/no" },
                { q: "Is the techniques for investigate sibling nodes suitable for the datasets (Stockholm and 2D Shapes)? Is it more relevant/less for one of the datasets? (motivate why or why not)", id: "S2L4", iframe:null, type: "textfield" }
            ],
            //ancestors
            [
                { q: "Does node Vega and node Skogås have the same parent?", id: "A2L1", iframe:"A2L", type: "yes/no" },
                { q: "How many ancestors does node Traneberg have?", id: "A2L2", iframe:"A2L", type: "howmany" },
                { q: "Is node Västerort parent to node Alvik?", id: "A2L3", iframe:"A2L", type: "yes/no" },
                { q: "Does node Valsta have more or less ancestors than node Botkyrka?", id: "A2L4", iframe:"A2L", type: "less/more" },
                { q: "Is the techniques for investigate ascendant nodes suitable for the datasets (Stockholm and 2D Shapes)? Is it more relevant/less for one of the datasets? (motivate why or why not)", id: "A2L5", iframe:null, type: "textfield" }
            ],
            //descendants
            [
                { q: "How many children does node Västerort have? (children = one level down in hierarchy)", id: "D2L1", iframe:"D2L", type: "howmany" },
                { q: "How many descendants does node Inre Staden have?", id: "D2L2", iframe:"D2L", type: "howmany" },
                { q: "Does node Danderyd have more or less children than node Salem? (children = one level down in hierarchy)", id: "D2L3", iframe:"D2L", type: "less/more" },
                { q: "Is node Tveta child to node Sundbyberg?(children = one level down in hierarchy)", id: "D2L4", iframe:"D2L", type: "yes/no" },
                { q: "Is the technique for investigate descendants and child nodes suitable for the datasets (Stockholm and 2D Shapes)? Is it more relevant/less for one of the datasets? (motivate why or why not)", id: "D2L5", iframe:null, type: "textfield" }
            ]
        ]
    },
    {//icicle plot
        q: "You will see a dataset visualized in an icicle plot.\nThis time the dataset is larger.\nClick on Continue to proceed.",
        id: "",
        iframe: null,
        type: "info",
        questions: [
            // questions
            // siblings
            [
                { q: "How many siblings does node Täby have?", id: "S3L1", iframe:"S3L", type: "howmany" },
                { q: "Does node Enhörna have more or less siblings than node Haga?", id: "S3L2", iframe:"S3L", type: "less/more" },
                { q: "Is node Botkyrka and node Lidingö siblings?", id: "S3L3", iframe:"S3L", type: "yes/no" },
                { q: "Is the techniques for investigate sibling nodes suitable for the datasets (Stockholm and 2D Shapes)? Is it more relevant/less for one of the datasets? (motivate why or why not)", id: "S3L4", iframe:null, type: "textfield" }
            ],
            // ancestors
            [
                { q: "Does node Hägersten-Älvsjö and node Västerort have the same parent?", id: "A3L1", iframe:"A3L", type: "yes/no" },
                { q: "How many ancestors does node Bromma have?", id: "A3L2", iframe:"A3L", type: "howmany" },
                { q: "Is node Sundbyberg parent to node Sigtuna?", id: "A3L3", iframe:"A3L", type: "yes/no" },
                { q: "Does node Aspudden have more or less ancestors than node Täby?", id: "A3L4", iframe:"A3L", type: "less/more" },
                { q: "Is the techniques for investigate ascendant nodes suitable for the datasets (Stockholm and 2D Shapes)? Is it more relevant/less for one of the datasets? (motivate why or why not)", id: "A3L5", iframe:null, type: "textfield" }
            ],
            // descendants
            [
                { q: "How many children does node Inre staden have? (children = one level down in hierarchy)", id: "D3L1", iframe:"D3L", type: "howmany" },
                { q: "How many descendants does node Västerort have?", id: "D3L2", iframe:"D3L", type: "howmany" },
                { q: "Does node Stockholm have more or less children than node Sollentuna? (children = one level down in hierarchy)", id: "D3L3", iframe:"D3L", type: "less/more" },
                { q: "Is node Sätra child to node Skarpnäck?(children = one level down in hierarchy)", id: "D3L4", iframe:"D3L", type: "yes/no" },
                { q: "Is the technique for investigate descendants and child nodes suitable for the datasets (Stockholm and 2D Shapes)? Is it more relevant/less for one of the datasets? (motivate why or why not)", id: "D3L5", iframe:null, type: "textfield" }
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







