<?php
    header('X-Content-Type-Options: nosniff');
    $userAnswers = array();
    $countArray = array();
    $count="undefined";

    if(isset($_POST['currentUser'])){
        $countArray = $_POST['currentUser'];

        for ($x = 0; $x < sizeof($countArray); $x++) {
            $count = $countArray[$x];
        }
    }
 
    if (isset($_POST['userAnswers'])) {
        $userAnswers = $_POST['userAnswers'];

        $stringToSave = "id\thh:mm:ss\tY/N\tL/M\tRating\tText\tHM\n";

        for ($x = 0; $x < sizeof($userAnswers); $x++) {
            $stringToSave = $stringToSave . $userAnswers[$x] . "\n";
        }

        $time = date("Y_m_d_H_i_sa"); //save date
        $filename = "C:/xampp/htdocs/d3-hierarchy/collectData/"."testPerson_". $count. "_Time_" . $time . ".txt";
        $dataFile = fopen($filename, "w"); // Use "w" mode for creating a new file or overwriting an existing file

        if ($dataFile) {
            if (fwrite($dataFile, $stringToSave) !== false) {
                fclose($dataFile);
                //fclose($countParticipant);
                echo "Data has been successfully saved to the file.";
            } else {
                echo "Error writing data to file.";
            }
        } else {
            echo "Error opening file for writing.";
        }
    }
?>
