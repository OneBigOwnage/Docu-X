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

      private static function execQuery($queryString)
      {
          if (!self::hasConnection()) {
              return false;
          }
          return $this->conn->query($conn->real_escape_string($queryString));
      }

      public static function initConnection($host = DATABASE_HOST, $name = DATABASE_USERNAME, $pass = DATABASE_PASSWORD, $db = DATABASE_NAME)
      {
          self::$conn = new mysqli($host, $name, $pass, $db);
          if ($this->connection->connect_errno) {
              unset($conn);
              return false;
          } else {
              return true;
          }
      }

      public function simpleSelect($table, $collumns = '*')
      {
      }

      public function enhancedSelect($query)
      {
      }

      public function Insert($table, $data)
      {

      }

      public function Update($table, $whereClause, $fields, $values)
      {
      }

      public function Delete($table, $soft = true)
      {
      }

      public function RAWSQL($query)
      {
      }

      private function onError($message)
      {
          //If there is no valid database-connection,
        //this should be handled via the backupHandler.
        if (!self::hasConnection()) {
            LogManager::backupHandler($message);
        } else {
        }
      }

      /**
       * Turns any query result into an associative array,
       * containing the result of the query;
       * Note: Only works on 'SELECT' statements;
       *
       * @param {mysqli-queryresult} $result The result of a query.
       */
      public static function resultToArray($queryResult)
      {
          if ($queryResult == NULL || !$queryResult || $queryResult->num_rows <= 0) {
            //TODO: Generate eMsg in log;
            return false;
          }

          $data = array();
          while ($r = $queryResult->fetch_assoc()) {
              $data[] = $r;
          }
          return $data;
      }
  }

 ?>
