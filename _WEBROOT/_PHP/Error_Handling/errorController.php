<?php

abstract class errorController {
  public $errors;


  public function getErrors($limit = 100)
  {

  }


  public function handlePHPError($eLevel, $eMessage, $eFileName, $eLineNr)
  {
    $e = new Error('PHPError', array('message' => $eMessage, 'level' => $eLevel, 'filename' => $eFileName, 'linenumber' => $eLineNr));
    $e->save();
  }


  public function handleJSError()
  {

  }

  public function tempHandler($eLevel, $eMessage, $eFileName, $eLineNr) {
    echo $eLevel, $eMessage, $eFileName, $eLineNr;
  }

}

?>
