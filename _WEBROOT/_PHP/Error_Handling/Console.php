<?php

require_once 'Error_handling/ConsoleLine.php';

abstract class Console
{
    public static function log($message)
    {
        $log = new ConsoleLine($message);
        $log->save();
    }

    public static function getOpenLogs()
    {
        $dataset = Database::enhancedSelect("SELECT id, c_dt, output_text FROM fwk_console_lines WHERE posted = 0 AND d_dt IS NULL ORDER BY c_dt ASC;");
        return $dataset;
    }

    public static function setLogsPosted($ids, $posted)
    {
        if ($posted) {
            $posted = 1;
        } else {
            $posted = 0;
        }

        if ($ids === var_export(true, true)) {
            Database::update('fwk_console_lines', ['posted' => $posted]);
        } elseif (gettype($ids) === 'array') {
            foreach ($ids as $id) {
                Database::Update('fwk_console_lines', ['posted' => $posted], [['id', '=', $id]]);
            }
            return true;
        } elseif (gettype($ids) === 'string') {
            Database::Update('fwk_console_lines', ['posted' => $posted], [['id', '=', $ids]]);
            return true;
        }

        return false;
    }
}
