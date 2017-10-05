</div>
<?php
  global $JSIncludes;
  foreach ($JSIncludes as $val) {
    echo "<script src=\"".JS_LOC."$val\"></script>\n";
  }
 ?>
</body>
</html>
