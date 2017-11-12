<?php

namespace DocuX\Core\Routing;
use \DocuX\App\MVC\Controllers;

abstract class Router
{
    private static $routes = [];


    public static function route()
    {
      self::loadRoutes();

      $url = $_SERVER['REQUEST_URI'];

      $parts = self::parseURL($url);

      $info = self::parseRoute($parts);

      self::bootstrap($info);
    }


    public static function parseURL($url): array
    {
        $tokens = [];

        foreach (self::$routes as $route) {
            preg_match("@^" . $route['pattern'] . "$@i", $url, $matches);

            if ($matches) {
                foreach ($matches as $key => $match) {
                    if ($key == 0) {
                        continue;
                    }

                    $tokens[$route['tokens'][$key - 1]] = $match;
                }
                return $tokens;
            }
        }
        return $tokens;
    }

    public function parseRoute($route): array
    {
      $info = [ 'Controller' => 'HomeController',
                'Action'     => 'DefaultAction',
                'Params'     => []];

      if (count($route) > 0 && class_exists('\\DocuX\\App\\MVC\\Controllers\\' . array_keys($route)[0])) {
        $info['Controller'] = array_keys($route)[0];

        // Remove the used array index, so we can use the remainding items in the array for the action and/or params.
        array_shift($route);
      }

      if (count($route) > 0 && method_exists("\\DocuX\\App\\MVC\\Controllers\\" . $info['Controller'], array_keys($route)[0])) {
        $info['Action'] = array_keys($route)[0];
        // Remove the used array index, so we can use the remainding items in the array for the action and/or params.
        array_shift($route);
      }

      if (count($route) > 0) {
        $info['Params'] = array_values($route);
      }

      // echo "Going to use <b>" . self::$controller . "</b>, executing action <b>" . self::$action . "</b>.<br>Additional Parameters: " . var_export(self::$params, true);

      return $info;
    }


    public static function bootstrap($controllerInfo)
    {
      $controllerName = "\\DocuX\\App\\MVC\\Controllers\\$controllerInfo[Controller]";
      $methodName     = $controllerInfo['Action'];
      $params         = $controllerInfo['Params'];

      call_user_func_array([new $controllerName(), $methodName], $params);
    }

    public static function addRoute($pattern, $tokens = []): void
    {
        self::$routes[] = ['pattern' => $pattern, 'tokens' => $tokens];
    }


    public static function loadRoutes()
    {
      // Homepage/defaultpage
      Router::addRoute("^\/?(?![\s\S])", ['HomeController']);

      // For testing purposes
      // Router::add("/(profile)/?(remove)?/([0-9]{1,6})/?", ['', 'testFun', 'ID']);
      // Router::add("/(profile)/?(remove)?/([0-9]{1,6})/?([0-9]{1,6})/?", ['FirstController', 'testFun', 'ID', '2ndID']);

      // Fallback in case the requested URL is invalid;
      self::addRoute("/(.*)", ['ErrorController', 'das']);
    }
}
