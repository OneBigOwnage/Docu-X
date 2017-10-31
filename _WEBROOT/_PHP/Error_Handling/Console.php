<?php

require_once 'Error_handling/ConsoleLine.php';

abstract class Console
{

  public static function log($message)
  {
    $log = new ConsoleLine($message);
    $log->save();
  }

  public static function getOpenLogs()
  {
    $dataset = Database::enhancedSelect("SELECT id, c_dt, output_text FROM fwk_console_lines WHERE posted = 0 AND d_dt IS NULL ORDER BY c_dt ASC;");
    return $dataset;
  }

}

?>
