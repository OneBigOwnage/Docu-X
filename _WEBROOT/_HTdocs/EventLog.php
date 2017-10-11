<?php
  require_once '_Default.php';
  $page_name = "EVENT_LOG";
  $page_title = "Application Event Log";

  Utils::inclCSS('EventLog.css');
  ?>
<?php include_once 'page_header.php';?>

<div id="div_eventlog">
  <h2>Application Event Log</h2>
  <table class="table table-bordered table-condensed">
    <thead>
      <tr>
        <th class="col-xs-1">Time</th>
        <th class="col-xs-9">Message</th>
        <th class="col-xs-2">Origin & Type</th>
      </tr>
      <tbody>
        <?php
          $ds = Database::enhancedSelect("SELECT c_dt, message, type, origin FROM " . ERROR_LOG_TABLE . " WHERE d_dt IS NULL ORDER BY c_dt DESC;");
          foreach ($ds as $row) {
            echo "<tr><td>".$row['c_dt']."</td><td>".str_replace(array("\r\n", "\n", "\r"), " ", $row['message'])."</td><td>".$row['origin']." - ".$row['type']."</td></tr>";
          }
         ?>
      </tbody>
    </thead>
  </table>
</div>

<?php include_once 'page_footer.php';?>
