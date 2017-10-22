<?php
require_once '_Default.php';

//Routine selection area.
//-----------------------

if (function_exists($_GET['procedure'])) {
  if (!empty($_GET['arguments'])) {
    $_GET['procedure']($_GET['arguments']);
  } else {
    $_GET['procedure']();
  }
} else {
  // echo json_encode(false, json_encode(array(''));
  AJAXReply(false, array());
}


function AJAXReply($successful, $data) {
  echo json_encode(array('successful' => $successful, 'responseData' => $data));
}


//Procedure declaration area.
//-------------------------

function verifyCredentials() {
  AJAXReply(true, array('no' => 'data'));
}


function registerJSError($obj) {
  $handle = logManager::jsHandler($obj);

  if ($handle) {
    AJAXReply(true, array('message' => "The error has successfully logged to the database!"));
  } else {
    AJAXReply(false, array('message' => "The error has not been logged correctly, please check the server-log!"));
  }
}


?>
