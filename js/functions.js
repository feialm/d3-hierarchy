var allStatements = [];// put this in the beginning instead??

const iframeArray = ["S1L", "A1L", "D1L", "S1S", "A1S", "D1S",
    "S2L", "A2L", "D2L", "S2S", "A2S", "D2S",
    "S3L", "A3L", "D3L", "S3S", "A3S", "D3S",
    "CMV1"];

const inputArray = ["likert", "yesNo", "textfield"];

const pageArray = ["survey", "survey2", "survey3", "theory", "CMV", "demographics"];

const radios = ["query", "yesNo"];


var datevalues = [];
let testPosition = 0;
var userAnswers = [];
var currentUser = [];
var colorVision = false;
var knowledge = false;

class date_ {
    constructor(hh, mm, ss) {
        this.hh = hh;
        this.mm = mm;
        this.ss = ss;
    }
}



// 6 questions
const introQ = [   
    { q: "", q2: "", q3: "", q4: "", id: "I1", iframe:"no", type: "info" },
    {
        q: "Do you have color blindness visual impairment?",
        q3: "",
        q4: "",
        type: "yesNo",
        q2: "What is your current experience and or knowledge of information visualization?", type2: "likert2",
        id: "I2", iframe: "no"
    },
    { q: "", q2: "", q3: "", q4: "", id: "I3", iframe:"no", type: "info" }
];
 

// 4 questions    
const endingQ = [
    {
        q: "The following 3 questions requires longer answers.\nYou will see a still image and one of the three visualizations at once.\nPlay around in the visualization interface, compare the techniques that are available in the menu and then answer the question.",
        q2: "",
        q3: "",
        q4: "",
        id: "CMV",
        iframe:"no",
        type: "info"
    },
    {
        q:"Locate the correct visualizations in the menu down below and compare them to answer the follwoing questions:",
        q2: "What would you like to happen in the table and the node-link diagram when interacting with the interface exploring the data?",
        q3: "What would you like to happen in the table and treemap when interacting with the interface exploring the data?",
        q4: "What would you like to happen in the table and the icicle plot when interacting with the interface exploring the data",
        id: "CMV1", iframe: "CMV1", type: "textfield"
    },
    {
        q: "Do you have any thought on how the techniques that you have seen today can be improved for explore and understand a node's relationships to other nodes?",
        q2: "",
        q3: "",
        q4: "",
        id: "other", iframe: "no", type: "textfield"
    },
    { q: "Thank you for participating in this survey! :)", q2: "", q3: "", q4: "", id:"", iframe:"no", type:"info"}
];


// Small dataset 33 questions
const visQ1 = [
    {//node-link
        questions: [
            // questions    
            // siblings
            [
                {
                    q: "Is",
                    q2: " Polygon Shapes ",
                    q3: "sibling to",
                    q4: " circle?",
                    facit: "N", id: "S1S1", iframe: "S1S", type: "yesNo", node1: "Polygon Shapes", node2: "circle"
                },
                {
                    q: "Is",
                    q2: " Conic Shapes ",
                    q3: "sibling to",
                    q4: " Polygon Shapes?",
                    facit: "Y", id: "S1S2", iframe: "S1S", type: "yesNo", node1: "Conic Shapes", node2: "Polygon Shapes"
                }
            ],
            // ancestors
            [
                {
                    q: "Is",
                    q2: " hexagon ",
                    q3: "an ancestor to",
                    q4: " octagon?",
                    facit: "N", id: "A1S1", iframe: "A1S", type: "yesNo", node1: "hexagon", node2: "octagon"
                },
                {
                    q: "Is",
                    q2: " Polygon Shapes ",
                    q3: "parent to",
                    q4: " hexagon?",
                    facit: "Y", id: "A1S2", iframe: "A1S", type: "yesNo", node1: "Polygon Shapes", node2: "hexagon"
                },
            ],
            // descendants
            [
                {
                    q: "Is",
                    q2: " decagon ",
                    q3: "a descendant to",
                    q4: " 2D Shapes?",
                    facit: "Y", id: "D1S2", iframe: "D1S", type: "yesNo", node1: "decagon", node2: "2D Shapes"
                },
                {
                    q: "Is",
                    q2: " circle ",
                    q3: "child to",
                    q4: " Conic Shapes?",
                    facit: "Y", id: "D1S2", iframe: "D1S", type: "yesNo", node1: "circle", node2: "Conic Shapes"
                }
            ]
        ]
    },
    {//treemap
        questions: [
            // questions
            // siblings
            [
                {
                    q: "Is",
                    q2: " Polygon Shapes ",
                    q3: "sibling to",
                    q4: " pentagon?",
                    facit: "N", id: "S2S1", iframe: "S2S", type: "yesNo", node1: "Polygon Shapes", node2: "pentagon"
                },
                {
                    q: "Is",
                    q2: " Conic Shapes ",
                    q3: "sibling to",
                    q4: " 2D Shapes?",
                    facit: "N", id: "S2S2", iframe: "S2S", type: "yesNo", node1: "Conic Shapes", node2: "2D Shapes"
                }
            ],
            //ancestors
            [
                {
                    q: "Is",
                    q2: " 2D Shapes ",
                    q3: "an ancestor to",
                    q4: " circle?",
                    facit: "Y", id: "A2S1", iframe: "A2S", type: "yesNo", node1: "2D Shapes", node2: "circle"
                },
                {
                    q: "Is",
                    q2: " Polygon Shapes ",
                    q3: "parent to",
                    q4: " triangle?",
                    facit: "Y", id: "A2S2", iframe: "A2S", type: "yesNo", node1: "Polygon Shapes", node2: "triangle"
                },
            ],
            //descendants
            [
                {
                    q: "Is",
                    q2: " decagon ",
                    q3: "a descendant to",
                    q4: " Conic Shapes?",
                    facit: "N", id: "D2S2", iframe: "D2S", type: "yesNo", node1: "decagon", node2: "Conic Shapes"
                },
                {
                    q: "Is",
                    q2: " circle ",
                    q3: "child to",
                    q4: " 2D Shapes?",
                    facit: "N", id: "D2S2", iframe: "D2S", type: "yesNo", node1: "circle", node2: "2D Shapes"
                }
            ]
        ]
    },
    {//icicle plot
        questions: [
            // questions
            // siblings
            [
                {
                    q: "Is",
                    q2: " circle ",
                    q3: "sibling to",
                    q4: " ellipse?",
                    facit: "Y", id: "S3S1", iframe: "S3S", type: "yesNo", node1: "circle", node2: "ellipse"
                },
                {
                    q: "Is",
                    q2: " Conic Shapes ",
                    q3: "sibling to",
                    q4: " octagon?",
                    facit: "N", id: "S3S2", iframe: "S3S", type: "yesNo", node1: "Conic Shapes", node2: "octagon"
                },
            ],
            // ancestors
            [
                {
                    q: "Is",
                    q2: " Conic Shapes ",
                    q3: "an ancestor to",
                    q4: " heptagon?",
                    facit: "N", id: "A3S1", iframe: "A3S", type: "yesNo", node1: "Conic Shapes", node2: "heptagon"
                },
                {
                    q: "Is",
                    q2: " Polygon Shapes ",
                    q3: "parent to",
                    q4: " triangle?",
                    facit: "N", id: "A3S2", iframe: "A3S", type: "yesNo", node1: "Polygon Shapes", node2: "triangle"
                },
            ],
            // descendants
            [
                {
                    q: "Is",
                    q2: " heptagon ",
                    q3: "a descendant to",
                    q4: " 2D Shapes?",
                    facit: "Y", id: "D3S2", iframe: "D3S", type: "yesNo", node1: "heptagon", node2: "2D Shapes"
                },
                {
                    q: "Is",
                    q2: " decagon ",
                    q3: "child to",
                    q4: " Conic Shapes?",
                    facit: "N", id: "D3S2", iframe: "D3S", type: "yesNo", node1: "decagon", node2: "Conic Shapes"
                }
            ]
        ]
    },
];


// Large dataset 42 questions
const visQ2 = [
    {//node-link
        questions: [
            // questions    
            // siblings
            [
                {
                    q: "Is",
                    q2: " Norrby ",
                    q3: "sibling to",
                    q4: " Handen?",
                    facit: "Y", id: "S1L1", iframe: "S1L", type: "yesNo", node1: "Norrby", node2: "Handen"
                },
                {
                    q: "Is",
                    q2: " Rådmansrö ",
                    q3: "sibling to",
                    q4: " Helenelund?",
                    facit: "N", id: "S1L2", iframe: "S1L", type: "yesNo", node1: "Rådmansrö", node2: "Helenelund"
                },
                {
                    q: "Is the techniques for investigate sibling nodes suitable for the datasets (Stockholm and 2D Shapes)? Is it more/less relevant for one of the datasets? (motivate why or why not)",
                    q2: "",
                    q3: "",
                    q4: "",
                    id: "S1L2", iframe: "no", type: "textfield"
                }
            ],
            // ancestors
            [
                {
                    q: "Is",
                    q2: " Rissne ",
                    q3: "an ancestor to",
                    q4: " Duvbo?",
                    facit: "N", id: "A1L1", iframe: "A1L", type: "yesNo", node1: "Rissne", node2: "Duvbo"
                },
                {
                    q: "Is",
                    q2: " Norrmalm, City ",
                    q3: "parent to",
                    q4: " Reimersholme?",
                    facit: "N", id: "A1L2", iframe: "A1L", type: "yesNo", node1: "Norrmalm, City", node2: "Reimersholme"
                },
                {
                    q: "Is the techniques for investigate ascendant nodes suitable for the datasets (Stockholm and 2D Shapes)? Is it more/less relevant for one of the datasets? (motivate why or why not)",
                    q2: "",
                    q3: "",
                    q4: "",
                    id: "A1L3", iframe: "no", type: "textfield"
                }
            ],
            // descendants
            [
                {
                    q: "Is",
                    q2: " Högdalen ",
                    q3: "a descendant to",
                    q4: " Söderort?",
                    facit: "Y", id: "D1L1", iframe: "D1L", type: "yesNo", node1: "Högdalen", node2: "Söderort"
                },
                {
                    q: "Is",
                    q2: " Hölö ",
                    q3: "child to",
                    q4: " Tyresö?",
                    facit: "N", id: "D1L2", iframe: "D1L", type: "yesNo", node1: "Hölö", node2: "Tyresö"
                },
                {
                    q: "Is the technique for investigate descendants and child nodes suitable for the datasets (Stockholm and 2D Shapes)? Is it more/less relevant for one of the datasets? (motivate why or why not)",
                    q2: "",
                    q3: "",
                    q4: "",
                    id: "D1L3", iframe: "no", type: "textfield"
                }
            ]
        ]
    },
    {//treemap
        questions: [
            // questions
            // siblings
            [
                {
                    q: "Is",
                    q2: " Viksjö ",
                    q3: "sibling to",
                    q4: " Huddinge?",
                    facit: "N", id: "S2L1", iframe: "S2L", type: "yesNo", node1: "Viksjö", node2: "Huddinge"
                },
                {
                    q: "Is",
                    q2: " Järva ",
                    q3: "sibling to",
                    q4: " Råsunda?",
                    facit: "Y", id: "S2L2", iframe: "S2L", type: "yesNo", node1: "Järva", node2: "Råsunda"
                },
                {
                    q: "Is the techniques for investigate sibling nodes suitable for the datasets (Stockholm and 2D Shapes)? Is it more/less relevant for one of the datasets? (motivate why or why not)",
                    q2: "",
                    q3: "",
                    q4: "",
                    id: "S2L3", iframe: "no", type: "textfield"
                }
            ],
            //ancestors
            [
                {
                    q: "Is",
                    q2: " Stockholms län ",
                    q3: "an ancestor to",
                    q4: " Vega?",
                    facit: "Y", id: "A2L1", iframe: "A2L", type: "yesNo", node1: "Stockholms län", node2: "Vega"
                },
                {
                    q: "Is",
                    q2: " Västerort ",
                    q3: "parent to",
                    q4: " Alvik?",
                    facit: "N", id: "A2L2", iframe: "A2L", type: "yesNo", node1: "Västerort", node2: "Alvik"
                },
                {
                    q: "Is the techniques for investigate ascendant nodes suitable for the datasets (Stockholm and 2D Shapes)? Is it more/less relevant for one of the datasets? (motivate why or why not)",
                    q2: "",
                    q3: "",
                    q4: "",
                    id: "A2L3", iframe: "no", type: "textfield"
                }
            ],
            //descendants
            [
                {
                    q: "Is",
                    q2: " Långholmen ",
                    q3: "a descendant to",
                    q4: " Inre Staden?",
                    facit: "Y", id: "D2L1", iframe: "D2L", type: "yesNo", node1: "Långholmen", node2: "Inre Staden"
                },
                {
                    q: "Is",
                    q2: " Tveta ",
                    q3: "child to",
                    q4: " Sundbyberg?",
                    facit: "N", id: "D2L2", iframe: "D2L", type: "yesNo", node1: "Tveta", node2: "Sundbyberg"
                },
                {
                    q: "Is the technique for investigate descendants and child nodes suitable for the datasets (Stockholm and 2D Shapes)? Is it more/less relevant for one of the datasets? (motivate why or why not)",
                    q2: "",
                    q3: "",
                    q4: "",
                    id: "D2L3", iframe: "no", type: "textfield"
                }
            ]
        ]
    },
    {//icicle plot
        questions: [
            // questions
            // siblings
            [
                {
                    q: "Is",
                    q2: " Täby ",
                    q3: "sibling to",
                    q4: " Arninge?",
                    facit: "N", id: "S3L1", iframe: "S3L", type: "yesNo", node1: "Täby", node2: "Arninge"
                },
                {
                    q: "Is",
                    q2: " Botkyrka ",
                    q3: "sibling to",
                    q4: " Lidingö?",
                    facit: "Y", id: "S3L2", iframe: "S3L", type: "yesNo", node1: "Botkyrka", node2: "Lidingö"
                },
                {
                    q: "Is the techniques for investigate sibling nodes suitable for the datasets (Stockholm and 2D Shapes)? Is it more/less relevant for one of the datasets? (motivate why or why not)",
                    q2: "",
                    q3: "",
                    q4: "",
                    id: "S3L3", iframe: "no", type: "textfield"
                }
            ],
            // ancestors
            [
                {
                    q: "Is",
                    q2: " Västerort ",
                    q3: "an ancestor to",
                    q4: " Nockeby?",
                    facit: "Y", id: "A3L1", iframe: "A3L", type: "yesNo", node1: "Västerort", node2: "Nockeby"
                },
                {
                    q: "Is",
                    q2: " Sundbyberg ",
                    q3: "parent to",
                    q4: " Solna?",                    
                    facit: "N", id: "A3L2", iframe: "A3L", type: "yesNo", node1: "Sundbyberg", node2: "Solna"
                },
                {
                    q: "Is the techniques for investigate ascendant nodes suitable for the datasets (Stockholm and 2D Shapes)? Is it more/less relevant for one of the datasets? (motivate why or why not)",
                    q2: "",
                    q3: "",
                    q4: "",
                    id: "A3L3", iframe: "no", type: "textfield"
                }
            ],
            // descendants
            [
                {
                    q: "Is",
                    q2: " Sundbyberg ",
                    q3: "a descendant to",
                    q4: " Västerort?",
                    facit: "N", id: "D3L1", iframe: "D3L", type: "yesNo", node1: "Sundbyberg", node2: "Västerort"
                },
                {
                    q: "Is",
                    q2: " Sätra ",
                    q3: "child to",
                    q4: " Skarpnäck?",
                    facit: "N", id: "D3L2", iframe: "D3L", type: "yesNo", node1: "Sätra", node2: "Skarpnäck"
                },
                {
                    q: "Is the technique for investigate descendants and child nodes suitable for the datasets (Stockholm and 2D Shapes)? Is it more/less relevant for one of the datasets? (motivate why or why not)",
                    q2: "",
                    q3: "",
                    q4: "",
                    id: "D3L3", iframe: "no", type: "textfield"
                }
            ]
        ]
    },
];



// visualization order
const visSeq = [[0, 1, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0], [1, 0, 2], [0, 2, 1]];


function addQuestions(arrayVis, arrayTeq, visQ) {
    
    for (let i = 0; i < arrayVis.length; i++) {  
        //console.log("Order of vis: ", visQ[arrayVis[i]].q);
        //allStatements.push(visQ[arrayVis[i]]);
        for (let j = 0; j < arrayTeq.length; j++) {
            var brushingLinking = visQ[arrayVis[i]].questions;
            //console.log("Order of brushing and linking: ", brushingLinking[arrayTeq[j]]);
            var sortedBL = brushingLinking[arrayTeq[j]];
            for (let k = 0; k < sortedBL.length; k++){
                allStatements.push(sortedBL[k]);
            }
        }
    }  
}


function getQuestions() {
    
    for (let i = 0; i < introQ.length; i++){
        allStatements.push(introQ[i]);
    }

    let randVis = Math.floor(Math.random() * 6);// random number 0-5
    let randTech = Math.floor(Math.random() * 2);//random number 0-1, sad or sda order brushing and linking

    console.log("visSeq: ", visSeq[randVis]);
    var arrayVis = [];
    for (let i = 0; i < visSeq[randVis].length; i++) {
        arrayVis.push(visSeq[randVis][i]);
    }

    console.log("ArrayVis: ", arrayVis, "\nShould be same as visSeq");

    var arrayTeq = [];
    if (randTech === 0) {
        arrayTeq = [0, 1, 2];//sad order
    
    } else if(randTech === 1){
        arrayTeq = [0, 2, 1];//sda order
    }
    console.log("ArrayTeq: ", arrayTeq);
 
    //addQuestions(arrayVis, arrayTeq, visQ1);
    //addQuestions(arrayVis, arrayTeq, visQ2);

    for (let i = 0; i < endingQ.length; i++){
        allStatements.push(endingQ[i]);
    }

    console.log("Questions: ", allStatements);
}



function hideIT(thatArray) {
    
    for (let i = 0; i < thatArray.length; i++){
        let getItem = thatArray[i];
        document.getElementById(getItem).style.display = "none";
    }  
}


function showIFRAME(iframe) {

    hideIT(iframeArray);//reset iframes
    
    for (let i = 0; i < iframeArray.length; i++){
        if (iframe === iframeArray[i]) {
            document.getElementById(iframe).style.display = "inline-block";
        }
    } 
};


function showINPUT(type) {

    hideIT(inputArray);//reset inputs
    
    for (let i = 0; i < inputArray.length; i++){
        if (type === inputArray[i]) {
            document.getElementById(type).style.display = "inline-block";
        }
    } 
};


function saveLocalStorage() {
    $(document).ready(function () {
        localStorage.setItem('node1', allStatements[testPosition].node1);
        localStorage.setItem('node2', allStatements[testPosition].node2);
    });
};


// update page with with the current question + reset button
function onPageLoad() {
    getQuestions();// read in the questions
    saveLocalStorage();
	//document.getElementById("button").style.color = "#a6a6a6";
	document.getElementById("button").style.color = "#000";
	document.getElementById("button").style.backgroundColor = "#74a9cf";//reset button color
    document.getElementById("currentPage").innerHTML = "Page: " + (testPosition+1) +"/52";
    
    hideIT(pageArray);
    hideIT(iframeArray);

	currentUser.push(userVar);
	//console.log("Test Participant: ", userVar);    
}


function saveUserData() {		
	$.post("savedata.php", { userAnswers: userAnswers, currentUser:currentUser});
}

function isFilled(s) {
    if (s === true) {
        return true;
    }
    return false;
}

function change2True(s) {
    return s = true;
}

 function changeSubmitButtonColor(string) {
    
    if (string === "knowledge") {
        knowledge = change2True(knowledge);
    }
    if (string === "colorVision") {
       colorVision = change2True(colorVision);
    }
    if (isFilled(colorVision) && isFilled(knowledge)) {
        changeQuestionnaireSubmitButton();
    }
}


 function changeQuestionnaireSubmitButton(){
	document.getElementById("button").style.color = "#000";
	document.getElementById("button").style.backgroundColor = "#74a9cf";
}


function durationTime() {

    let prevTime = datevalues[testPosition - 1];
    let thisTime = datevalues[testPosition];
    let hh = -1;//default, easy debugg
    let mm = -1;
    let ss = -1;

    // same hour
    if (prevTime.hh === thisTime.hh) {
        hh = 0;
    } else if (thisTime.hh > prevTime.hh) {
        //does not take case into account for if the testparticipant perform test during midnight, will not happen
        hh = prevTime.hh - thisTime.hh;
    }

    if (prevTime.mm === thisTime.mm) {
        mm = 0;
    } else if (thisTime.mm > prevTime.mm) {
        mm = thisTime.mm - prevTime.mm;
    } else if (thisTime.mm < prevTime.mm) {
        mm = 60 - (prevTime.mm - thisTime.mm);
    }
    if (prevTime.ss === thisTime.ss) {
        ss = 0;
    } else if (thisTime.ss > prevTime.ss) {
        ss = thisTime.ss - prevTime.ss;
    } else if (thisTime.ss < prevTime.ss) {
        ss = 60 - (prevTime.ss - thisTime.ss);
    }

    if (hh < 10) {
        hh = "0" + hh;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    if (ss < 10) {
        ss = "0" + ss;
    }
    
    return [hh+":"+mm+":"+ss];
}


function checkFacit() {
    var formElements = document.getElementById('survey');
    
    if (formElements.elements["yesNo"].value === allStatements[testPosition].facit
     ) {
        return "T";
    }
    else {
        return "F";
    }
}


// reset radio-buttons
function unCheckRadios(){
    for (var j = 0; j < radios.length; j++){
        var radioButtons = document.getElementsByName(radios[j]);
        for (var i = 0; i < radioButtons.length; i++) {
            if(radioButtons[i].checked) {
                document.getElementById(radioButtons[i].id).checked = false;
            }
        }        
    }

}


// save answers in .txt file, send to php-file
function saveUserAnswers(recordTimeBtn, facit, s) {
	var formElements = document.getElementById(s);
	var answer;

	if (allStatements[testPosition] !== "") {
        answer = allStatements[testPosition].id
            + "\t"+ recordTimeBtn
            + "\t" + formElements.elements["yesNo"].value
            + "\t" + formElements.elements["query"].value
            + "\t" + facit
            + "\t" + document.getElementById("textfield").value + document.getElementById("textfieldA").value
            + "\t" + document.getElementById("textfieldB").value
            + "\t" + document.getElementById("textfieldC").value;
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




// take you to the next question
 function advanceTest(){
	var c = document.getElementById("button").style.color;
	var rgb = c.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').replace(/\s/g, '').split(',');

	console.log("testPosition: ", testPosition, "id", allStatements[testPosition].id);

	if (rgb[0] == 0) {
		var currentTime = Date.now();
        var date = new Date(currentTime);
        datevalues.push(new date_(date.getHours(), date.getMinutes(), date.getSeconds()));

		document.getElementById("button").style.backgroundColor = "#a6a6a6";//reset button color
        document.getElementById("button").style.color = "#909090"
        
        if (allStatements[testPosition].type !== "info") {
            
            var saveDate = "";
            var facit = "";

            if (allStatements[testPosition].id === "I2") {
                saveUserAnswers(saveDate, facit, "survey2"); // save answers 
            }
            else if (allStatements[testPosition].id === "CMV1") {
                 saveUserAnswers(saveDate, facit, "survey3"); // save answers 
            }
            else if (allStatements[testPosition].id !== "CMV1" && allStatements[testPosition].type === "textfield") {
                 saveUserAnswers(saveDate, facit, "survey"); // save answers 
            }
            else if(allStatements[testPosition].type === "yesNo"){
                saveDate = durationTime();
                facit = checkFacit()
                saveUserAnswers(saveDate, facit, "survey"); // save answers 
            }
        }
		
        unCheckRadios();
        document.getElementById("textfield").value = "";
        document.getElementById("textfieldA").value = "";
        document.getElementById("textfieldB").value = "";
        document.getElementById("textfieldC").value = "";
        testPosition++;
        console.log(allStatements[testPosition].node1, allStatements[testPosition].node2);
        saveLocalStorage();
        document.getElementById("statement").innerHTML = allStatements[testPosition].q;
        document.getElementById("node1").innerHTML = allStatements[testPosition].q2;
        document.getElementById("text").innerHTML = allStatements[testPosition].q3;
        document.getElementById("node2").innerHTML = allStatements[testPosition].q4;
        document.getElementById("currentPage").innerHTML = "Page: " +  (testPosition+1) +"/52";
	}
	else {
		alert("Please fill in an answer to proceed!");
    }
    if (testPosition == allStatements.length-1) {
        document.getElementById("button").style.display = "none";
        hideIT(iframeArray);
        hideIT(inputArray);
        hideIT(pageArray);

        saveUserData();
        console.log(datevalues);
    }
    if (allStatements[testPosition].q !== "" || allStatements[testPosition].type !== "info") {
        document.getElementById("survey").style.display = "inline-block";
    } else {
        document.getElementById("survey").style.display = "none";
    }

    if (allStatements[testPosition].id === "I2") {
        document.getElementById("survey2").style.display = "inline-block";
        document.getElementById("statement2").innerHTML = allStatements[testPosition].q;
        document.getElementById("statement3").innerHTML = allStatements[testPosition].q2;
        document.getElementById("survey").style.display = "none";
        document.getElementById("demographics").style.display = "inline-block";

    } else {
        document.getElementById("survey2").style.display = "none";
        document.getElementById("demographics").style.display = "none";
    }


    if (allStatements[testPosition].type === "info") {
        document.getElementById("button").style.color = "#000";
        document.getElementById("button").style.backgroundColor = "#74a9cf";
    }
    if (allStatements[testPosition].id === "I1") {
        document.getElementById("intro").style.display = "inline-block";
    } else {
        document.getElementById("intro").style.display = "none";
    }
    if (allStatements[testPosition].id === "I3") {
        document.getElementById("theory").style.display = "inline-block";
    } else {
        document.getElementById("theory").style.display = "none";
    }
    if (allStatements[testPosition].id === "CMV1"
    ) {
        document.getElementById("CMV").style.display = "inline-block";
        document.getElementById("survey3").style.display = "inline-block";
        document.getElementById("statementFirst").innerHTML = allStatements[testPosition].q;
        document.getElementById("statementA").innerHTML = allStatements[testPosition].q2;
        document.getElementById("statementB").innerHTML = allStatements[testPosition].q3;
        document.getElementById("statementC").innerHTML = allStatements[testPosition].q4;
        document.getElementById("survey").style.display = "none";
        document.getElementById("yesNo3").style.display = "none";
        document.getElementById("likert3").style.display = "none";
    } else {
        document.getElementById("CMV").style.display = "none";
        document.getElementById("survey3").style.display = "none";

    }

    showINPUT(allStatements[testPosition].type);
    showIFRAME(allStatements[testPosition].iframe);
}











