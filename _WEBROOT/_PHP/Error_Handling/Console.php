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

  public static function setLogPosted($id, $posted = true)
  {
    if (gettype($id) === 'array') {
      foreach ($id as $id) {
        Database::Update('fwk_console_lines', ['posted' => (int)$posted], [['id', '=', $id]]);
      }
    } else if (gettype($id) === 'string') {
      Database::Update('fwk_console_lines', ['posted' => (int)$posted], [['id', '=', $id]]);
    }
  }
}

?>
