<?php

namespace DocuX\App\MVC\Controllers;

class HomeController extends BaseController
{
  protected $defaultModel;
  protected $defaultView = 'HomePageView';
  protected $model;
  protected $view;


  // public function __construct($model = NULL, $view = NULL)
  // {
  //   $this->loadModel($model);
  //   // $this->loadView($view);
  // }


  public function defaultAction($options = NULL)
  {
    $viewName = "\\DocuX\\App\\MVC\\Views\\$this->defaultView";
    $this->view = new $viewName($this);
    $this->view->display();
  }

}
