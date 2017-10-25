<?php
require_once '_Default.php';
$page_name = '';
$page_title = "";

Utils::inclJS('Connect', 'Console');
Utils::inclCSS('console');
?>
<?php
//Pre-Assembly:
//------------

$dataSet = Database::enhancedSelect("SELECT c_dt, output_text FROM fwk_console_lines WHERE posted = 0 AND d_dt IS NULL ORDER BY c_dt DESC;");
?>
<?php include_once 'page_header.php';?>


<div class="container">

  <div class="form-inline">
    <div class="input-group col-xs-7 col-xs-offset-5">
      <input id="force-add-input" type="text" class="form-control" placeholder="Add output message...">
      <span class="input-group-btn"><button id="force-add-btn"class="btn btn-default"><span class="glyphicon glyphicon-floppy-disk"></span></button></span>
    </div>

    <div class="input-group col-xs-7">
      <input id="search-input" type="text" class="form-control" placeholder="Search...">
      <span class="input-group-btn"><button class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button></span>
    </div>
  </div>

  <br />
  <div id="console-item-container">
    <table class="console-table">
      <thead>
        <tr>
          <th class="col-xs-2">Timestamp</th>
          <th class="col-xs-22">Message</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($dataSet as $line): ?>
          <tr>
            <th class="col-xs-2">[<?php echo date_format(date_create($line['c_dt']), 'H:i:s')?>]: </th>
            <th class="col-xs-22"><?php echo $line['output_text']?></th>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  </div>
</div>

<div class="console draggable">
  <div id="console-top-bar">
    Console
  </div>
  <div id="console-window" class="push-down-next">
    <ul id="console-list">
      
    </ul>
  </div>
</div>


<?php include_once 'page_footer.php';?>
