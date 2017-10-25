<?php
  // This file has to be included by every
  // other php file, to manage certain defaults and rules.
  session_start();
  define('SERVER_ROOT', realpath($_SERVER['DOCUMENT_ROOT'].'/../'));
  set_include_path(SERVER_ROOT.'/_PHP/');

  require_once 'CONSTANTS.php';
  require_once 'databaseManager.php';
    Database::initConnection();
  require_once 'Error_Handling/errorController.php';
    set_error_handler('errorController::handlePHPError');
  require_once 'sessionManager.php';
    SessionManager::init();
  require_once 'Utils.php';


  //By Default we need some Bootstrap and jQuery imports.
  Utils::inclCSS('bootstrap.min', 'fa.min', 'master');
  Utils::inclJS('jquery.min', 'bootstrap.min','Utils');
 ?>
