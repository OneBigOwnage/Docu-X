<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo $page_title; ?></title>
    <?php
      global $CSSIncludes;
      foreach ($CSSIncludes as $val) {
        echo "<link rel=\"stylesheet\" href=\"".CSS_LOC."$val\">\n";
      }
      unset($val);
     ?>
  </head>
  <body>
    <?php include_once 'menu.php'; ?>
    <div id="page_content">
