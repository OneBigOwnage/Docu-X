<?php
  abstract class Database
  {
      private static $conn;

      public static function hasConnection()
      {
          if (self::$conn == null || !self::$conn->ping()) {
              return false;
          } else {
              return true;
          }
      }

      public static function execQuery($queryString)
      {
          if (!self::hasConnection()) {
              return false;
          }

          $res = self::$conn->query($queryString);
          if (!$res) {
              self::onError("Query error:\n$queryString\n$res.");
              return false;
          } else {
              return true;
          }
      }

      public static function initConnection($host = DATABASE_HOST, $name = DATABASE_USERNAME, $pass = DATABASE_PASSWORD, $db = DATABASE_NAME)
      {
          self::$conn = new mysqli($host, $name, $pass, $db);
          if (self::$conn->connect_errno) {
              //TODO: Write error.
              return false;
          } else {
              return true;
          }
      }

      public function simpleSelect($table, $collumns = '*', $whereClause)
      {

      }

      public static function Insert($table, $data)
      {
          if ($table == null || $data == null) {
              return false;
          }

          $statement = "INSERT INTO $table (";
          $statementVals = NULL;

          foreach ($data as $colName => $val) {
              $statement .= self::sanitize($colName) . ", ";
              $statementVals .= "'" . self::sanitize($val) . "', ";
          }

          $statement = substr($statement, 0, strlen($statement) - 2) . ") VALUES (" . substr($statementVals, 0, strlen($statementVals) - 2) . ");";
          return self::execQuery($statement);
      }


      public static function Update($table, $data, $whereClause)
      {
          if ($table == null || $data == null) {
              return false;
          }

          $statement = "UPDATE $table SET ";
          foreach ($data as $colName => $val) {
              $statement .= self::sanitize($colName) . " = '" . self::sanitize($val) . "', ";
          }

          $statement = substr($statement, 0, strlen($statement) - 2) . " WHERE ";

          if (is_array($whereClause)) {
              foreach ($whereClause as $colName => $val) {
                  $statement .= self::sanitize($colName) . " = '" . self::sanitize($val) . "' AND ";
              }

              $statement = substr($statement, 0, strlen($statement) - 5) . ";";
          } else {
              $statement = substr($statement, 0, strlen($statement) - 7) . ";";
          }

          return self::execQuery($statement);
      }

      public static function Delete($table, $whereClause, $soft = true)
      {
        $statement;

        if ($soft) {
          $statement = "UPDATE $table SET d_dt = NOW() WHERE ";

          if (is_array($whereClause)) {

          } else {
            $statement = substr($statement, 0, strlen($statement) - 7) . ";";
          }
        } else {
          $statement = "DELETE FROM $table WHERE ";

          if (is_array($whereClause)) {
            foreach ($whereClause as $colName => $val) {
              $statement .= self::sanitize($colName) . " = '" . self::sanitize($val) . "' AND ";
            }
          } else {
            $statement = substr($statement, 0, strlen($statement) - 7) . ";";
          }
          $statement = substr($statement, 0, strlen($statement) - 5);
        }

        return self::execQuery($statement);
      }

      public static function RAWSQL($query)
      {

      }

      private static function onError($message)
      {
          echo $message;
        //If there is no valid database-connection,
        //this should be handled via the backupHandler.
        if (!self::hasConnection()) {
            LogManager::backupHandler($message);
        } else {
            //TODO: Write error to log.
        }
      }


      /**
       * Turns any query result into an associative array,
       * containing the result of the query;
       * Note: Only works on 'SELECT' statements;
       *
       * @param {mysqli-queryresult} $result The result of a query.
       */
      public static function resToArray($queryResult)
      {
          if ($queryResult == null || !$queryResult || $queryResult->num_rows <= 0) {
              //TODO: Generate eMsg in log;
            return false;
          }

          $data = array();
          while ($r = $queryResult->fetch_assoc()) {
              $data[] = $r;
          }
          return $data;
      }


      /**
       * Escapes all dangerous characters in a given variable.
       * @method sanitize
       * @param  any      $var Variable to sanitize.
       * @return [type]        Returns false if no connection,
       *                       otherwise returns sanitized variable.
       */
      public static function sanitize($var)
      {
          if (!self::hasConnection()) {
              return false;
          }
          return self::$conn->real_escape_string($var);
      }
  }
