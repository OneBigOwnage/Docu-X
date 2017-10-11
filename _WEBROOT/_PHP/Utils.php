<?php
abstract class Utils
{
    public static function inclCSS()
    {
        if (!isset($GLOBALS['CSSIncludes'])) {
            $GLOBALS['CSSIncludes'] = array();
        }

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
        if (!isset($GLOBALS['JSIncludes'])) {
            $GLOBALS['JSIncludes'] = array();
        }

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
