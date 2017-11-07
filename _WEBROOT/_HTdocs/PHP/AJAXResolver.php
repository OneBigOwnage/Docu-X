<?php
  require_once '../_Default.php';

  abstract class AJAXResolver
  {
    static $initiated = false;

    public static function initiate($data) {
      self::$initiated = true;

      $methodName = $data['methodName'];
      $arguments = $data['arguments'][0];

      self::dispatch($methodName, $arguments);
    }


    public static function dispatch($mName, $mArgs)
    {
      if (!function_exists($mName)) {
        self::terminate("Function does not exist!");
      } else {
        if (!empty($mArgs)) {
          $mName($mArgs);
        } else {
          $mName();
        }
      }
    }

    public static function respond($returnVal)
    {
      echo json_encode($returnVal, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
      self::$initiated = false;
    }

    public static function terminate($reason)
    {
      if (empty($reason)) {
        $reason = error_get_last();
      }

      echo json_encode(['AJAX_TERMINATED' => true, 'reason' => $reason]);
      self::$initiated = false;
    }
  }

  // Startup the process.
  AJAXResolver::initiate($_GET);



  function console_get_logs(){AJAXResolver::respond(Console::getOpenLogs());}







?>
