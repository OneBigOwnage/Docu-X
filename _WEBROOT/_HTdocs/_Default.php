<?php
  // This file has to be included by every
  // other php file, to manage certain defaults and rules.
  session_start();
  define('SERVER_ROOT', realpath($_SERVER['DOCUMENT_ROOT'].'/../'));
  set_include_path(SERVER_ROOT.'/_PHP/');
  require_once 'CONSTANTS.php';
  require_once 'databaseManager.php';
    Database::initConnection();
  require_once 'logManager.php';
    set_error_handler('LogManager::phpHandler');
  require_once 'sessionManager.php';
    SessionManager::init();
    require_once 'Utils.php';

  //By Default we need some Bootstrap and jQuery imports.
  Utils::inclCSS('bootstrap.min.css', 'fa.min.css', 'master.css');
  Utils::inclJS('jquery.min.js', 'bootstrap.min.js');
