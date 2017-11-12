<?php

define('WEBROOT', realpath($_SERVER["DOCUMENT_ROOT"] . '\\..\\'));
define('SRC_DIR', realpath(WEBROOT . '\\src\\'));
define('PUBLIC_DIR', realpath(WEBROOT . '\\public\\'));


// MVC component location.
define('MVC_DIRS', [
  'MODELS'      => WEBROOT . '\\src\\MVC\\Models\\',
  'VIEWS'       => WEBROOT . '\\src\\MVC\\Views\\',
  'CONTROLLERS' => WEBROOT . '\\src\\MVC\\Controllers\\',
  'TEMPLATES'   => WEBROOT . '\\src\\MVC\\Templates\\'
]);

define('RESOURCE_DIRS', [
  'JAVASCRIPT'  => WEBROOT . '\\public\\js\\',
  'CSS'         => WEBROOT . '\\public\\css\\',
  'IMAGES'      => WEBROOT . '\\public\\images\\'
]);


// Database configuration
define('DB_CONFIG', [
  'HOST'      => '',
  'PORT'      => '',
  'USERNAME'  => '',
  'PASSWORD'  => '',
  'DB_NAME'   => ''
]);
