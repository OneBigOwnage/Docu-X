<?php
require_once '_Default.php';

//Routine selection area.
//-----------------------

if (function_exists($_GET['procedure'])) {
  $_GET['procedure']();
} else {

  echo json_encode(array("This clearly doesnt work", $_GET['procedure']));
}


function AJAXReply($successful, $data) {
  echo json_encode(array('successful' => $successful, 'responseData' => $data));
}


//Procedure declaration area.
//-------------------------

function verifyCredentials() {
  AJAXReply(true, array('no' => 'data'));
}


?>
