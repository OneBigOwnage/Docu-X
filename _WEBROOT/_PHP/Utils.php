<?php
abstract class Utils {

  public static function inclCSS()
  {
      $GLOBALS['CSSIncludes'] = array();
      $arg_count = func_num_args();
      $args = func_get_args();

      if ($arg_count >= 1) {
          foreach ($args as $script) {
              $GLOBALS['CSSIncludes'][] = $script;
          }
      } else {
          //Errormsg.
      }
  }

  public static function inclJS()
  {
      $GLOBALS['JSIncludes'] = array();
      $arg_count = func_num_args();
      $args = func_get_args();

      if ($arg_count >= 1) {
          foreach ($args as $script) {
              $GLOBALS['JSIncludes'][] = $script;
          }
      } else {
          //Errormsg.
      }
  }

}
?>
