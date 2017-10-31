<?php
Utils::inclJS('Connect', 'Console');
Utils::inclCSS('console');
?>

<div class="console draggable">
  <div id="console-top-bar">
    <div id="console-title">
      Console
    </div>
    <div id="console-btn-container">
      <button id="console-btn-search" type="button" class="btn-square"><span class="glyphicon glyphicon-search"></span></button>
      <input id="console-input-search" type="text" placeholder="Search...">
      <button id="console-btn-filter" type="button" class="btn-square"><span class="glyphicon glyphicon-filter"></span></button>
      <input id="console-input-filter" type="text" placeholder="Filter...">
      <button id="console-btn-clear" type="button" class="btn-square"><span class="glyphicon glyphicon-trash"></span></button>
      <button id="console-btn-config" type="button" class="btn-square"><span class="glyphicon glyphicon-cog"></span></button>
      <button id="console-btn-refresh" type="button" class="btn-square"><span class="glyphicon glyphicon-refresh"></span></button>
    </div>
  </div>
  <div id="console-window" class="custom-scroll-bar">
    <div style="margin-bottom:auto;"></div>
  </div>
</div>
