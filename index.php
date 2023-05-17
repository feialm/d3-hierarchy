<?php
    // count how many particpants
	// issue different versions of tests where the order of the questions has been changed
	$countParticipant = fopen('C:/xampp/htdocs/d3-hierarchy/countParticipant/countParticipant.txt', 'r+');
	if($countParticipant){
		$count = file_get_contents('C:/xampp/htdocs/d3-hierarchy/countParticipant/countParticipant.txt');
		$newCount = intval($count) + 1;
		fwrite($countParticipant, $newCount);
	}
	fclose($countParticipant);
?>

<script>
    var userVar = '<?php echo $count; ?>';
</script>

<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="./css/style2.css">
		<script src="https://code.jquery.com/jquery-latest.js"></script>
		<script type="text/javascript" src="./js/functions.js"></script>
		<title>Brushing & Linking on Hierarchical data</title>
	</head>
	<body onload="onPageLoad();">
	<!------------ Help page ------------->
	<div class="menu"> <div>
      <a onclick="on();">?</a>
    </div>
	<div onclick="off()" id="introPOP">
		<div class="menu">
		<a onclick="off();">X</a>
		</div>
	<p class="prePage">
	<span class="bolded"> The aim: </span> The research study is to investigate what techniques are most suitable for exploring the structure and details of hierarchical data.
    To be able to examine it you will encounter hierarchical data sets of varying size and content visualized in different ways.<br><br>
    <span class="bolded">The setup: </span>You will be asked to perform tasks and answer questions regarding the data and the visualizations.
    Some tasks and questions require deeper answers. In the beginning, you will be asked to fill in some details which will be used to see if the results differ by demographics. This information will not include questions such as
    name or contact information to keep the answers anonymized when showing the results.<br><br>
    <span class="bolded">Interacting with the visualizations: </span> You are free to explore the visualizations and see what techniques are available.<br><br>
    <span class="bolded">Submit answer: </span>You submit an answer to a question by clicking on the continue button and you are then taken to the next question.<br>
    It is <span class="bolded">not</span> possible to change an answer afterward.<br><br>
    <span class="bolded">Language: </span> You can answer the questions in both Swedish and English.<br><br>
    <span class="bolded">Stuck on a question: </span>You are free to ask the test leader of the test if you do not understand the task/question and need it to be clarified.
	However, the test leader <span class="bolded">will not</span> help you fulfill the tasks and questions. Try your best to complete it.<br><br>
    <span class="bolded">Glossary:<br></span>children = one level down in hierarchy,<br>parent = one level up in hierarchy,<br>descendant = children and its children,<br>ancestor = parents and its parents.
	</div>
	
	<!------------- Main pages ------------->
	<p><span class="margin" id='currentPage'></span><br>
    <div class="prePage" id="intro">
    <p>Hello,<br>
    In this test, you will encounter <span class="bolded">three</span> datasets and <span class="bolded">two</span> distinct differences in the size of the datasets.
    <br><br>
    You can answer the questions in both Swedish and English. You are free to ask the test leader of the test if you do not understand the task/question and need it to be clarified.
    However, the test leader <span class="bolded">will not</span> help you fulfill the tasks and questions.
	It is <span class="bolded">not</span> possible to change an answer afterward.
    <br><br>
    Let's begin by clicking on the Continue button!</p>
    </div>

	<div class="prePage" id="demographics">
    <p>
    The two questions below are necessary to see if the results differ by demographics. You will still be anonymous in the test.
	</p>
    </div>

	<div class="prePage" id="theory">
		<p><span class="bolded">Theory</span><br>
   		In the test, three visualization graphs will be shown to represent hierarchical data.
        The following pages will show the visualizations. Every visualization will include question(s) and/or task(s).<br>
        <span class="bolded">Interact and play around</span> in the coming visualizations.
        You can enlarge the images by clicking on them.<br><br>
        The most classic way to present hierarchical data is to visualize individual data items as nodes.
		Edges are drawn between data items that have an ancestral-descendant relationship in so-called Node-Link diagrams.
		<div class="row">
			<div class="column">
				<h2>Node-Link diagram</h2>
				<img class="img" id="img1" src="./images/nodelink.PNG" style="width:80%">
			</div>
			<div class="column">
				<h2>Icicle Plot</h2>
				<img class="img" src="./images/icicle.PNG" style="width:60%">			
			</div>
			<div class="column">
				<h2>Treemap</h2>
				<img class="img" id="img3" src="./images/treemap.PNG" style="width:70%">
			</div>
			<div class="column" id="shorter">
			<p>	It is read from the top-to-bottom. The ancestor to all the other nodes lays in the shallowest hierarchy level at the top of the graph. Further down the graph the descendants are placed.<br><br>
			All nodes that are aligned on the same height belong to the same level in the hierarchy.
			</p>
			</div>
			<div class="column"id="shorter">
			<p> It's also read from the top-to.bottom.
				The vertical and horizontal lines are used to section up the data.<br><br>
				Each row is representing one level in the hierarchy from the dataset. Each column within a row is an individual node.
			</p>
			</div>
			<div class="column" id="shorter">
			<p>The descendant nodes are placed in and on top of the ancestor node, so-called nestled treemap.<br><br>
				Vertical and horizontal lines are used to section up the data and distinguish the individual nodes in the layers.
				The deepest nodes are on top.
			</p>
			</div>
		</div>
	</div>


	<div>
		<form class="margin" id="survey3" method="post" name="surveyForm">
			<p><span id='statementFirst'></span><br></p>	
			<p><span id='statementA'></span><br>
			</p>
			<p><span id='statementB'></span><br>
			</p>
			<p><span id='statementC'></span>
			</p>
			<span id='yesNo3'>
			<input type='radio' name='yesNo' id='yes' value='' class='form-radio' onclick='changeSubmitButtonColor("colorVision")'>
			</span>
			<span id='likert3'>
			<input type='radio' name='query' id='radio1' value='' class='form-radio' onclick='changeSubmitButtonColor("knowledge")'>
			</span>
		</form>
	</div>

	<div class="prePage" id="CMV">
		<img id="CMV_table" src="./images/table.PNG" style="width:50%">
	</div>


	<div>
		<form class="margin" id="survey" method="post" name="surveyForm">
			<p><span id='statement'></span><span id='node1'></span><span id="text"></span><span id='node2'></span><br>
				<span id='yesNo'>Yes
					<input type='radio' name='yesNo' id='yes' value='Y' class='form-radio' onclick='changeQuestionnaireSubmitButton()'>
					<input type='radio' name='yesNo' id='no' value='N' class='form-radio' onclick='changeQuestionnaireSubmitButton()'>
				No</span><br>
				<span id='likert'>
				Very Poor Knowledge and/or Experience
					<input type='radio' name='query' id='radio1' value='1' class='form-radio' onclick='changeQuestionnaireSubmitButton()'>
					<input type='radio' name='query' id='radio2' value='2' class='form-radio' onclick='changeQuestionnaireSubmitButton()'>
					<input type='radio' name='query' id='radio3' value='3' class='form-radio' onclick='changeQuestionnaireSubmitButton()'>
					<input type='radio' name='query' id='radio4' value='4' class='form-radio' onclick='changeQuestionnaireSubmitButton()'>
					<input type='radio' name='query' id='radio5' value='5' class='form-radio' onclick='changeQuestionnaireSubmitButton()'>
				Very Good Knowledge and/or Experience</span>
			</p>
			<p>
				<textarea name="textfield" id="textfield" onkeyup="changeQuestionnaireSubmitButton()" placeholder="Please answer in English or Swedish."></textarea>
				<!--<textarea name="howmany" id="howmany" onkeyup="checkNumber(this)" placeholder="Enter a number please."></textarea>-->
            </p>
		</form>
		<form class="margin" id="survey2" method="post" name="surveyForm">
			<p><span id='statement2'></span><br>
				<span id='yesNo2'>Yes
					<input type='radio' name='yesNo' id='yes' value='Y' class='form-radio' onclick='changeSubmitButtonColor("colorVision")'>
					<input type='radio' name='yesNo' id='no' value='N' class='form-radio' onclick='changeSubmitButtonColor("colorVision")'>
				No</span><br><br>
				<span id='statement3'></span><br>
				<span id='likert2'>
				Very Poor
					<input type='radio' name='query' id='radio1' value='1' class='form-radio' onclick='changeSubmitButtonColor("knowledge")'>
					<input type='radio' name='query' id='radio2' value='2' class='form-radio' onclick='changeSubmitButtonColor("knowledge")'>
					<input type='radio' name='query' id='radio3' value='3' class='form-radio' onclick='changeSubmitButtonColor("knowledge")'>
					<input type='radio' name='query' id='radio4' value='4' class='form-radio' onclick='changeSubmitButtonColor("knowledge")'>
					<input type='radio' name='query' id='radio5' value='5' class='form-radio' onclick='changeSubmitButtonColor("knowledge")'>
				Very Good</span>
			</p>
		</form>
	</div>

	<script>
	function loading(){		
  	//$.getScript("./js/utils/utils.js");
	document.getElementById('S1L').src = "./html/nodelink/tree3.html";
	document.getElementById('A1L').src = "./html/nodelink/tree.html";
	document.getElementById('D1L').src = "./html/nodelink/tree2.html";
	document.getElementById('S1S').src = "./html/nodelink/tree4.html";
	document.getElementById('A1S').src = "./html/nodelink/tree5.html";
	document.getElementById('D1S').src = "./html/nodelink/tree6.html";
	document.getElementById('S2L').src = "./html/treemap/treemap2.html";			
	document.getElementById('A2L').src = "./html/treemap/treemap.html";
	document.getElementById('D2L').src = "./html/treemap/treemap3.html";
	document.getElementById('S2S').src = "./html/treemap/treemap4.html";			
	document.getElementById('A2S').src = "./html/treemap/treemap5.html";
	document.getElementById('D2S').src = "./html/treemap/treemap6.html";
	document.getElementById('S3L').src = "./html/icicle/icicle2.html";			
	document.getElementById('A3L').src = "./html/icicle/icicle.html";
	document.getElementById('D3L').src = "./html/icicle/icicle3.html";
	document.getElementById('S3S').src = "./html/icicle/icicle4.html";			
	document.getElementById('A3S').src = "./html/icicle/icicle5.html";
	document.getElementById('D3S').src = "./html/icicle/icicle6.html";
	advanceTest();} 
	</script>

	<div class="margin" id="button" onclick="loading()">Continue</div>

	<div class="iframe">
		<!-- sibling, ancestor,  descendant -->
		<!-- Large dataset -->
		<iframe id="S1L" type="text/html" src="./html/nodelink/tree3.html">
			<p>Your browser does not support iframes.</p>
		</iframe>
		<iframe id="A1L" type="text/html" src="./html/nodelink/tree.html">
			<p>Your browser does not support iframes.</p>
		</iframe>
		<iframe id="D1L" type="text/html" src="./html/nodelink/tree2.html">
			<p>Your browser does not support iframes.</p>
		</iframe>
		<iframe id="S1S" type="text/html" src="./html/nodelink/tree4.html">
			<p>Your browser does not support iframes.</p>
		</iframe>
		<iframe id="A1S" type="text/html" src="./html/nodelink/tree5.html">
			<p>Your browser does not support iframes.</p>
		</iframe>
		<iframe id="D1S" type="text/html" src="./html/nodelink/tree6.html">
			<p>Your browser does not support iframes.</p>
		</iframe>
		<iframe id="S2L" type="text/html" src="./html/treemap/treemap2.html">
			<p>Your browser does not support iframes.</p>
		</iframe>
		<iframe id="A2L" type="text/html" src="./html/treemap/treemap.html">
			<p>Your browser does not support iframes.</p>
		</iframe>
		<iframe id="D2L" type="text/html" src="./html/treemap/treemap3.html">
			<p>Your browser does not support iframes.</p>
		</iframe>
		<iframe id="S2S" type="text/html" src="./html/treemap/treemap4.html">
			<p>Your browser does not support iframes.</p>
		</iframe>
		<iframe id="A2S" type="text/html" src="./html/treemap/treemap5.html">
			<p>Your browser does not support iframes.</p>
		</iframe>
		<iframe id="D2S" type="text/html" src="./html/treemap/treemap6.html">
			<p>Your browser does not support iframes.</p>
		</iframe>
		<iframe id="S3L" type="text/html" src="./html/icicle/icicle2.html">
			<p>Your browser does not support iframes.</p>
		</iframe>
		<iframe id="A3L" type="text/html" src="./html/icicle/icicle.html">
			<p>Your browser does not support iframes.</p>
		</iframe>
		<iframe id="D3L" type="text/html" src="./html/icicle/icicle3.html">
			<p>Your browser does not support iframes.</p>
		</iframe>
		<iframe id="S3S" type="text/html" src="./html/icicle/icicle4.html">
			<p>Your browser does not support iframes.</p>
		</iframe>
		<iframe id="A3S" type="text/html" src="./html/icicle/icicle5.html">
			<p>Your browser does not support iframes.</p>
		</iframe>
		<iframe id="D3S" type="text/html" src="./html/icicle/icicle6.html">
			<p>Your browser does not support iframes.</p>
		</iframe>
		<iframe id="CMV1" type="text/html" src="./html/CMV/CMV1_A.html">
			<p>Your browser does not support iframes.</p>
		</iframe>
	</div>
	<!--<script language="javascript">
	function checkNumber(object) {
		var invalidChars = /[^0-9]/gi
		if(invalidChars.test(object.value)) {
			alert("Enter a number instead of text please");
			object.value = object.value.replace(invalidChars,"");
		}else{
			changeQuestionnaireSubmitButton();
		}
	}
	</script>-->

	</body>
</html>
