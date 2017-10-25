<?php

class PHPError extends ErrorObject
{
  protected $message;
  protected $level;
  protected $lineNumber;
  protected $fileName;


  public function __construct($args)
  {
    $this->message = $args['message'];
    $this->level = $args['level'];
    $this->lineNumber = $args['linenumber'];
    $this->fileName = $args['filename'];
  }

}


?>
