<?php
  abstract class Database
  {
      private static $conn;
      //TODO: Expand following list.
      private static $allowedOperators = ['=', '!=', '<=', '>=', '<', '>', '<>', 'LIKE', 'NOT LIKE'];


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

          $res = self::$conn->query($queryString);
          if (!$res) {
              self::onError("Query execution error:\n$queryString\n$res.");
              return false;
          } else {
              return $res;
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

      public static function simpleSelect($table, $where, $collumns = '*')
      {
        if (empty($table)) {
          return false;
        }
        $statement = "SELECT ";

        foreach ($collumns as $col) {
          $statement .= self::sanitize($col) . ", ";
        }
        $statement = substr($statement, 0 , strlen($statement) - 2);
        $statement .= " FROM " . self::sanitize($table);

        if (!self::whereSolver($where)) {
          $statement .= $where . ";";
        }

        return self::execQuery($statement);
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


      public static function Update($table, $data, $where)
      {
          if (empty($table) || empty($data)) {
              return false;
          }

          $statement = "UPDATE $table SET ";
          foreach ($data as $colName => $val) {
              $statement .= self::sanitize($colName) . " = '" . self::sanitize($val) . "', ";
          }

          $statement = substr($statement, 0, strlen($statement) - 2) . " WHERE ";
          //TODO: Make this into oneliner $statement .=  self::whereSolver($where) . ";";
          if (!self::whereSolver($where)) {
            $statement .= $where . ";";
          } else {
            $statement .= ";";
          }

          return self::execQuery($statement);
      }


      public static function Delete($table, $whereClause, $soft = true)
      {
        $statement;

        if ($soft) {
          $statement = "UPDATE $table SET d_dt = NOW()" . self::whereSolver($where) . ";";
        } else {
          $statement = "DELETE FROM $table" . self::whereSolver($where) . ";";

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


      public static function enhancedSelect($query)
      {
        if (strpos(strtoupper(ltrim($query)), 'SELECT') === 0) {
          return self::execQuery($query);
        } else {
          return false;
        }
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


      public static function whereSolver($where)
      {
        $whereString = " WHERE ";
        foreach ($where as $arr) {
          //TODO Split between numerals and strings.
          if (!empty($arr[0]) && !empty($arr[1]) && !empty($arr[2]) && in_array($arr[1], self::$allowedOperators)) {
            $whereString .= self::sanitize($arr[0]) . " {$arr[1]} '" . self::sanitize($arr[2]) . "' AND ";
          }
        }
        if (strlen($whereString) <= 7) {
          return false;
        } else {
          return substr($whereString, 0, strlen($whereString) - 5) . ";";
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
