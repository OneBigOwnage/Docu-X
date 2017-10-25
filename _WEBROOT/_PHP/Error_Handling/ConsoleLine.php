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
    $this->output_text = $txt;
    $this->posted = 0;
  }


  public static function loadFromDB($obj) {

  }


  public function save() {
    $insertObj = array( 'output_text' => $this->output_text/*,
                        'line_number' => $this->line_number,
                        'file_name'   => $this->file_name*/,
                        'posted'     => $this->posted);
    Database::insert('fwk_console_lines', $insertObj);
  }

  private function setScope()
  {
    return -1;
  }


}



?>
