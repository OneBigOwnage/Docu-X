<?php
  require_once '_Default.php';
  $page_name = "My Name";
  $page_title = "This is the title of the page...";
  ?>
<?php include_once 'page_header.php';?>
Hello World!<br>
This is the index page.<br>
----<br>
<?php
  LogManager::QLog(@true);
  ?>
<?php include_once 'page_footer.php';?>
