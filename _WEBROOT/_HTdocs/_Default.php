<?php
  // This file has to be included by every
  // other php file, to manage certain defaults and rules.
  session_start();
  define('SERVER_ROOT', realpath($_SERVER['DOCUMENT_ROOT'].'/../'));
  set_include_path(SERVER_ROOT.'/_PHP/');
  require_once 'CONSTANTS.php';

  $CSSIncludes = array();
  $JSIncludes = array();

  function inclCSS()
  {
      global $CSSIncludes;
      $arg_count = func_num_args();
      $args = func_get_args();

      if ($arg_count >= 1) {
          foreach ($args as $script) {
              $CSSIncludes[] = realpath($script);
          }
      } else {
          //Errormsg.
      }
  }

  function inclJS()
  {
      global $JSIncludes;
      $arg_count = func_num_args();
      $args = func_get_args();

      if ($arg_count >= 1) {
          foreach ($args as $script) {
              $JSIncludes[] = realpath($script);
          }
      } else {
          //Errormsg.
      }
  }


  //Defaults go under here:
  //-----------------------
  require_once 'sessionManager.php';

  require_once 'databaseManager.php'; //Access the DB via Database class.
  require_once 'logManager.php';
    set_error_handler('LogManager::phpHandler');


  //By Default we need some Bootstrap and jQuery imports.
  inclCSS(SERVER_ROOT.'/_Resources/Libraries/bootstrap.min.css', SERVER_ROOT.'/_Resources/Libraries/fa.min.css');
  inclJS(SERVER_ROOT.'/_Resources/Libraries/jquery.min.js', SERVER_ROOT.'/_Resources/Libraries/bootstrap.min.js');

  inclCSS(CSS_LOC.'Master.css');
