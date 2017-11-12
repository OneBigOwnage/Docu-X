<?php

namespace DocuX\App\MVC\Views;

class HomePageView extends BaseView
{
  protected $template = MVC_DIRS['TEMPLATES'] . 'Homepage.php';
  private $model;
  private $controller;

  public function __construct($controller = NULL, $model = NULL)
  {
    $this->controller = $controller;
    $this->model = $model;
  }

  public function setTemplate($template)
  {
    $this->template = $template;
  }

  public function display()
  {
    require realpath($this->template);
  }

}
