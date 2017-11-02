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
    $this->output_text = var_export($this->setScope(), true);
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

  public function setScope()
  {
    $stack = debug_backtrace();
    $desiredItem;
    foreach ($stack as $stackItem) {
      if ($stackItem->class == 'Console' && $stackitem->function == 'log') {
        $desiredItem = $stackItem;
      }
    }

    $info = "$desiredItem->file: $desiredItem->line.";

    return $info;
  }

/*array ( 0 => array ( 'file' => 'C:\\WWW\\_WebRoot\\_PHP\\Error_Handling\\ConsoleLine.php',
                     'line' => 17,
                     'function' => 'setScope',
                     'class' => 'ConsoleLine',
                     'object' => ConsoleLine::__set_state(array( 'ID' => NULL, 'output_text' => NULL, 'line_number' => NULL, 'file_name' => NULL, 'posted' => NULL, 'account_ID' => NULL, 'c_dt' => NULL, )),
                     'type' => '->',
                     'args' => array ( ), ),

        1 => array ( 'file' => 'C:\\WWW\\_WebRoot\\_PHP\\Error_Handling\\Console.php',
                     'line' => 10,
                     'function' => '__construct',
                     'class' => 'ConsoleLine',
                     'object' => ConsoleLine::__set_state(array( 'ID' => NULL, 'output_text' => NULL, 'line_number' => NULL, 'file_name' => NULL, 'posted' => NULL, 'account_ID' => NULL, 'c_dt' => NULL, )),
                     'type' => '->',
                     'args' => array ( 0 => 'Hello World', ), ),

        2 => array ( 'file' => 'C:\\WWW\\_WebRoot\\_HTdocs\\Entrance.php',
                     'line' => 46,
                     'function' => 'log',
                     'class' => 'Console',
                     'type' => '::',
                     'args' => array ( 0 => 'Hello World', ), ), 3 => array ( 'file' => 'C:\\WWW\\_WebRoot\\_HTdocs\\Entrance.php', 'line' => 10, 'function' => 'console_get_logs', 'args' => array ( ), ), );*/


}



?>
