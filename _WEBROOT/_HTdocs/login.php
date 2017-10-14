<?php
  require_once '_Default.php';
  $page_name = "LOGIN_PAGE";
  $page_title = "Log in to Docu-X";

  Utils::inclCSS('login.css');
  Utils::inclJS('login.js');
  Utils::inclJS('Connect.js');
  
  // noMenu();
  ?>
<?php include_once 'page_header.php';?>

<div class="h-center-container v-spacer-before-2">

  <div id="log-in-form" class="login-form">

    <div class="h-center-container">
      <img src="/resources/images/Docu-X Logo Square.png" width="150" height="150"/>
    </div>

    <div class="input-group v-spacer-before-1">
      <span class="input-group-addon login-input-addon"><span class="glyphicon glyphicon-user"></span></span>
      <input type="text" class="form-control login-input-field" id="username" placeholder="username...">
    </div>

    <div class="input-group v-spacer-before-05">
      <span class="input-group-addon login-input-addon"><span class="glyphicon glyphicon-eye-close"></span></span>
      <input type="password" class="form-control login-input-field" id="password" placeholder="password...">
    </div>

    <div class="v-spacer-before-2 h-center-container">
      <button type="button" class="login-btn hide-show-btn">Create Account</button>
      <button type="button" class="login-btn">Log In</button>
    </div>

  </div>

  <div hidden id="sign-up-form" class="login-form">

    <div class="h-center-container">
      <img src="/resources/images/Docu-X Logo Square.png" width="150" height="150"/>
    </div>

    <div class="input-group v-spacer-before-1">
      <span class="input-group-addon login-input-addon"><span class="glyphicon glyphicon-envelope"></span></span>
      <input type="text" class="form-control login-input-field" id="username" placeholder="email address...">
    </div>

    <div class="input-group v-spacer-before-05">
      <span class="input-group-addon login-input-addon"><span class="glyphicon glyphicon-eye-close"></span></span>
      <input type="password" class="form-control login-input-field" id="password" placeholder="password...">
    </div>

    <div class="input-group v-spacer-before-05">
      <span class="input-group-addon login-input-addon"><span class="glyphicon glyphicon-eye-close"></span></span>
      <input type="password" class="form-control login-input-field" id="password" placeholder="retype password...">
    </div>

    <div class="v-spacer-before-1 h-center-container">
      <button type="button" class="login-btn hide-show-btn">Back to Log In</button>
      <button type="button" class="login-btn">Sign Up</button>
    </div>

  </div>

</div>
<?php include_once 'page_footer.php' ?>
