<?php

  abstract class logManager
  {

    // Custom event handler for PHP events
    public static function phpHandler($errorLevel, $errorText, $thrownFile, $thrownLine)
    {
        $msg = "phpHandler caught the following event:".PHP_EOL."$errorLevel: $errorText.".PHP_EOL."File: $thrownFile,".PHP_EOL."Line: $thrownLine.";
        self::saveEvent($msg, self::getType($errorLevel), E_ORIG_PHP);
        return true;
    }

    // Custom event handler for JavaScript events.
    public static function jsHandler()
    {
        return false;
    }


    // A saveEvent call with predefined values + text;
    public static function Qlog($message, $origin = E_ORIG_PHP)
    {
        self::saveEvent($message, E_TYPE_QUICKLOG, $origin);
    }

    //Gets the event type by a given string.
    public static function getType($e)
    {
        $eType;
        switch ($e) {
        case E_ERROR: $eType = E_TYPE_ERROR; break;
        case E_WARNING: $eType = E_TYPE_WARNING; break;
        case E_NOTICE: $eType = E_TYPE_NOTICE; break;
        default: E_UNDEFINED; break;
      }
        return $eType;
    }

    //Save the event to the database.
    private static function saveEvent($message, $type, $origin)
    {
        if (!Database::hasConnection()) {
          self::backupHandler($message, $type, $origin);
          return false;
        }

        $insertData = array("message"   => $message,
                            "type"      => $type,
                            "origin"    => $origin);

        $res = Database::Insert(ERROR_LOG_TABLE, $insertData);

        if (!$res) {
          self::backupHandler($message, $type, $origin);
        }
    }

    public static function backupHandler() {
      //TODO: Create the backupHandler functionality.
    }
  }
