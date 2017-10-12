<?php
  require_once '_Default.php';
  $page_name = "LOGIN_PAGE";
  $page_title = "Log in to Docu-X";

  Utils::inclCSS('login.css');
  // noMenu();
  ?>
<?php include_once 'page_header.php';?>

<div class="h-center-container push-top-2">

  <div id="log-in-form" class="login-form">

    <div class="input-group v-spacer-before-3 v-spacer-after-1">
      <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
      <input type="text" class="form-control" id="username" placeholder="username...">
    </div>

    <div class="input-group">
      <span class="input-group-addon"><span class="glyphicon glyphicon-eye-open"></span></span>
      <input type="password" class="form-control" id="password" placeholder="password...">
    </div>

  </div>

  <div hidden id="sign-up-form" class="login-form">
  </div>

</div>
<?php include_once 'page_footer.php' ?>
