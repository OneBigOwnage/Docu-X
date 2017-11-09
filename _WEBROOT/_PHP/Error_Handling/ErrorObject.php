<?php

abstract class ErrorObject
{

  public function toJSON()
  {
    return json_encode(get_object_vars($this));
  }

  public function print($html = true, $compact = false)
  {
    
  }
}


?>
