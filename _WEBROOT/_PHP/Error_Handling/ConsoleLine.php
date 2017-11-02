<?php

class ConsoleLine
{

  private $ID;
  private $output_text;
  private $line_number;
  private $file_name;
  private $posted;
  private $account_ID;
  private $c_dt;


  public function __construct($txt)
  {
    $this->output_text = print_r($txt, true);
    $this->setScope();
    $this->posted = 0;
  }


  public static function loadFromDB($obj) {

  }


  public function save() {
    $insertObj = array( 'output_text' => $this->output_text,
                        'line_number' => $this->line_number,
                        'file_name'   => $this->file_name,
                        'posted'      => $this->posted);

    Database::insert('fwk_console_lines', $insertObj);
  }

  public function setScope()
  {
    $stack = debug_backtrace();
    foreach ($stack as $stackItem) {
      if ($stackItem['class'] == 'Console' && $stackItem['function'] == 'log') {
        $this->file_name = basename($stackItem['file']);
        $this->line_number = $stackItem['line'];
      }
    }
    unset($stackItem);
    return true;
  }
}



?>
