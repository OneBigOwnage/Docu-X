<?php

abstract class ErrorObject
{

  public function toJSON()
  {
    return json_encode(get_object_vars($this));
  }


  public function printCompressed($html = true)
  {
    # code...
  }


  public function printComplete($html = true)
  {
    # code...
  }

}


?>
