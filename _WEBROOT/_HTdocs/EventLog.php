<?php
  require_once '_Default.php';
  $page_name = "EVENT_LOG";
  $page_title = "Application Event Log";

  Utils::inclCSS('EventLog');
  ?>
<?php include_once 'page_header.php';?>

<div id="div_eventlog">
  <h2>Application Event Log</h2>
  <table class="table table-bordered table-condensed">
    <thead>
      <tr>
        <th class="col-xs-1">Time</th>
        <th class="col-xs-9">JSON</th>
      </tr>
    </thead>
    <tbody>
      <?php
        $ds = Database::enhancedSelect("SELECT c_dt, error_object, object_class FROM fwk_error_log WHERE d_dt IS NULL ORDER BY c_dt DESC;");
        foreach ($ds as $row) {
            echo "<tr><td>".$row['c_dt']."</td><td>".$row['error_object']."</td></tr>";
        }
       ?>
    </tbody>
  </table>
</div>

<?php include_once 'page_footer.php';?>
