<?php
    // count how mnay particpants
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
		<title>Query for vis</title>
	</head>
	<body onload="onPageLoad();">
	<!------------ Help page ------------->
	<div class="menu">
      <a onclick="on();">?</a>
    </div>
	<div onclick="off()" id="introPOP">
		<div class="menu">
		<a onclick="off();">X</a>
		</div>
	The research study will investigate what techniques are most suitable for exploring the structure and details of hierarchical data. 
	To be able to examine it you will encounter hierarchical data sets of varying size and content visualized in different ways.<br><br>
	The visualizations will also have different interaction functionality with the aim of allowing the user to explore and discover different parts and angles of the data.
	You will be asked to perform tasks and answer questions regarding the data and the visualizations.The task can be that you will count, find, order, and name objects using the interface or based on the interface you use.
	Some tasks and questions require deeper answers and justifications as to why one has performed a task in a way or answered a question in a specific way.<br><br>
	You submit an answer to a question by clicking on the continue button and you are then taken to the next question. It is not possible to change an answer afterwards.
	<br><br>
	In the beginning, you will be asked to fill in some details which will be used to see if the results differ by demographics. This information will not include questions such as
	name or contact information to keep the answers anonymized when showing the results.<br><br>
	The test is conducted in English but you are allowed to ask questions in both Swedish or English relating if you do not understand the task/question to clarify the the question.
	However, the test leader will now help you fulfill the tasks and questions by giving any answers or hints.
	</div>
	
	<!------------- Main pages ------------->
	<h1>Brushing and Linking on hierarchical data</h1><br>
	<div class="prePage" id="intro">
	<p>Hello,<br>
	Thank you for taking your time and participating in this research study. The research study will investigate what techniques are most suitable for exploring the structure and details of hierarchical data. 
	To be able to examine it you will encounter hierarchical data sets of varying size and content visualized in different ways.<br><br>
	The visualizations will also have different interaction functionality with the aim of allowing the user to explore and discover different parts and angles of the data.
	You will be asked to perform tasks and answer questions regarding the data and the visualizations.The task can be that you will count, find, order, and name objects using the interface or based on the interface you use.
	Some tasks and questions require deeper answers and justifications as to why one has performed a task in a way or answered a question in a specific way.
	You submit an answer to a question by clicking on the continue button and you are then taken to the next question. It is not possible to change an answer afterwards.
	<br><br>
	In the beginning, you will be asked to fill in some details which will be used to see if the results differ by demographics. This information will not include questions such as
	name or contact information to keep the answers anonymized when showing the results.<br><br>
	The test is conducted in English but you are allowed to ask questions in both Swedish or English relating if you do not understand the task/question to clarify the the question.
	However, the test leader will now help you fulfill the tasks and questions by giving any answers or hints.
	<br><br>
	Let's begin by click on the Continue-button!</p>
	</div>
	<div class="prePage" id="demographics">
		<h3>Personal info</h3>
		<p>The following questions are asked to obtain a demographic view of the participants and to see if the results differ by demographics or not.<br>
			Click on Continue to proceed.</p>
	</div>
	<div class="prePage" id="evaluation">
		<h3>Evaluation</h3>
		<p>The following pages will show visualizations of hierarchical datasets. Every visualization will inlcude question(s) and/or task(s).<br>
			Click on Continue to proceed.</p>
		</p>
	</div>
	<div>
		<form id="survey" method="post" name="surveyForm"><br>
			<p><span id='statement'></span><br>
				<span id='yesNo'>Yes
					<input type='radio' name='yesNo' id='yes' value='yes' class='form-radio' onclick='changeQuestionnaireSubmitButton()'>
					<input type='radio' name='yesNo' id='no' value='no' class='form-radio' onclick='changeQuestionnaireSubmitButton()'>
				No</span><br>
				<span id='lessMore'>Less
					<input type='radio' name='lessMore' id='less' value='l' class='form-radio' onclick='changeQuestionnaireSubmitButton()'>
					<input type='radio' name='lessMore' id='more' value='m' class='form-radio' onclick='changeQuestionnaireSubmitButton()'>
				More</span><br>
				<span id='likert'>
				Very Poor
					<input type='radio' name='query' id='radio1' value='1' class='form-radio' onclick='changeQuestionnaireSubmitButton()'>
					<input type='radio' name='query' id='radio2' value='2' class='form-radio' onclick='changeQuestionnaireSubmitButton()'>
					<input type='radio' name='query' id='radio3' value='3' class='form-radio' onclick='changeQuestionnaireSubmitButton()'>
					<input type='radio' name='query' id='radio4' value='4' class='form-radio' onclick='changeQuestionnaireSubmitButton()'>
					<input type='radio' name='query' id='radio5' value='5' class='form-radio' onclick='changeQuestionnaireSubmitButton()'>
				Very Good</span>
			</p>
			<p>
				<textarea name="freetext" id="freetext" placeholder="Please answer in English or Swedish."></textarea>
				<textarea name="howmany" id="howmany" onkeyup="checkNumber(this)" placeholder="Enter a number please."></textarea>
            </p>
		</form>
	</div>

	<div id="button" onclick="advanceTest();">Continue</div>

	<div>
		<iframe id="iframe" type="text/html"src="./html/icicle.html">
			<p>Your browser does not support iframes.</p>
		</iframe>
	</div>
	<script type="text/javascript" src="./js/functions.js"></script>
	<script language="javascript">
	function checkNumber(object) {
		var invalidChars = /[^0-9]/gi
		if(invalidChars.test(object.value)) {
			alert("Enter a number instead of text please");
			object.value = object.value.replace(invalidChars,"");
		}
	}</script>

	</body>
</html>
