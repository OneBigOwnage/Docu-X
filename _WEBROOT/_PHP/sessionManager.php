<?php
  abstract class SessionManager {

    private static $auth;

    public static function isLoggedIn()
    {
    }

    public static function init()
    {
      if (!self::isLoggedIn()) {
        // header("Location: index");
      }
    }

    public static function setAuth($id) {
      $GLOBALS['auth']['accID'] = $id;
    }

  }

 ?>
