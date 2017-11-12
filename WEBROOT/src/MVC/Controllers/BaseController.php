<?php

namespace DocuX\App\MVC\Controllers;

abstract class BaseController
{
  protected $defaultModel;
  protected $defaultView;
  protected $model;
  protected $view;

  public function __construct()
  {
    echo 'Constructed!!';
  }


  public function defaultAction($options = NULL)
  {
  }

  public function loadModel($model)
  {
    echo 'dads';
  }
}
