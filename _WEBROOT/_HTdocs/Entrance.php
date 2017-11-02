<?php
require_once '_Default.php';

//Routine selection area.
//-----------------------
if (function_exists($_GET['procedure'])) {
  if (!empty($_GET['arguments'])) {
    $_GET['procedure'](json_decode($_GET['arguments'], true));
  } else {
    $_GET['procedure']();
  }
} else {
  AJAXReply(false, array());
}


function AJAXReply($successful, $data) {
  echo json_encode(array('successful' => $successful, 'responseData' => $data));
}



//Procedure declaration area.
//-------------------------


function registerJSError($obj) {
  $handle = true;//logManager::jsHandler($obj);

  if ($handle) {
    AJAXReply(true, array('message' => "The error has successfully logged to the database!"));
  } else {
    AJAXReply(false, array('message' => "The error has not been logged correctly, please check the server-log!"));
  }
}


function console_log($obj)
{
  Console::log($obj['message']);
}


function console_get_logs()
{
  Console::log('Hello World');
  $data = Console::getOpenLogs();
  AJAXReply(true, $data);
}


function console_set_posted($obj)
{
  $handle = Console::setLogPosted($obj['id'], $obj['posted']);
  AJAXReply(true, $handle);
}
?>
