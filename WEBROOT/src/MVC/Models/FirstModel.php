<?php

namespace DocuX\App\MVC\Models;

class FirstModel extends BaseModel
{
  public $str;

  function __construct()
  {
    $this->str = "First Model!";
  }
}
