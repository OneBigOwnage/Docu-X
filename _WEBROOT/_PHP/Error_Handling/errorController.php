<?php

require_once 'Error_Handling/Console.php';
require_once 'Error_Handling/Error.php';
require_once 'Error_Handling/ErrorObject.php';
require_once 'Error_Handling/PHPError.php';
require_once 'Error_Handling/JSError.php';



abstract class errorController {
  public static $errors;


  public static function getErrors($limit = 100)
  {

  }


  public static function handlePHPError($eLevel, $eMessage, $eFileName, $eLineNr)
  {
    $e = new customError('PHPError', array('message' => $eMessage, 'level' => $eLevel, 'filename' => $eFileName, 'linenumber' => $eLineNr));
    $e->save();
  }


  public static function handleJSError()
  {

  }

  public static function tempHandler($eLevel, $eMessage, $eFileName, $eLineNr) {
    echo $eLevel, $eMessage, $eFileName, $eLineNr;
  }

}

?>
