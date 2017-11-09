<?php

require_once 'Error_Handling/Console.php';
require_once 'Error_Handling/Error.php';
require_once 'Error_Handling/ErrorObject.php';
require_once 'Error_Handling/PHPError.php';
require_once 'Error_Handling/JSError.php';



abstract class ErrorController {
  public static $errors;

  public static function init()
  {
    register_shutdown_function('ErrorController::shutdownHandler');
    set_error_handler('ErrorController::handlePHPError');
  }

  public static function handlePHPError($eLevel, $eMessage, $eFileName, $eLineNr)
  {
    $e = new customError('PHPError', array('message' => $eMessage, 'level' => $eLevel, 'filename' => $eFileName, 'linenumber' => $eLineNr));
    $e->save();
  }


  public static function handleJSError()
  {
    //TODO: Errors coming from the front-end should be saved to the database.
  }

  public static function shutdownHandler()
  {
    $err = error_get_last();
    if ($err !== NULL && $err['type'] === E_ERROR) {
      Console::log(print_r($err, true));
      self::terminateExecution();
    }
  }


  public static function terminateExecution($reason)
  {
    while (ob_get_status()) {
      ob_end_clean();
    }
    header('localhost/index.php');
      //TODO: Implement the stop of execution and send the user to some kind of error page.
  }

}

?>
