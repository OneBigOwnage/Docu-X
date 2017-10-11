<?php
  require_once '_Default.php';
  $page_name = "LOGIN_PAGE";
  $page_title = "Log in to Docu-X";

  Utils::inclCSS('login.css');
  // noMenu();
  ?>
<?php include_once 'page_header.php';?>

<div class="h-center-container">
  <div class="login-form col-xs-24 col-md-6">

    <ul class="nav nav-tabs nav-justified">
      <li class="login-tab-headers active"><a data-toggle="tab" href="#login-form-content-login"><span class="glyphicon glyphicon-lock login-tab-headers"></span>&ensp;Login</a></li>
      <li><a class="login-tab-headers" data-toggle="tab" href="#login-form-content-register"><span class="glyphicon glyphicon-pencil login-tab-headers"></span>&ensp;Register</a></li>
    </ul>

    <div class="tab-content">
      <div id="login-form-content-login" class="tab-pane fade in active p-top-1">
        <form>
          <div id="login-form-group" class="form-group">

            <div class="input-group m-bot-05 login-input">
              <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
              <input type="text" class="form-control" placeholder="username...">
            </div>

            <div class="input-group login-input m-bot-05">
              <span class="input-group-addon"><span class="glyphicon glyphicon-eye-open"></span></span>
              <input type="password" class="form-control" placeholder="password...">
            </div>

            <button type="button" class="btn btn-default pull-right">
              Login <span class="glyphicon glyphicon-chevron-right"></span>
            </button>

          </div> <!-- login-form-group -->
        </form>
      </div> <!-- login-form-content-login -->
      <div id="login-form-content-register" class="tab-pane fade p-top-1">

        <form>
          <div id="register-form-group" class="form-group">

            <p class="m-bot-05 h-center-container">
              Please enter your email address, email address and we will contact you as soon as possible!
            </p>

            <div class="input-group m-bot-05">
              <span class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></span>
              <input type="text" class="form-control" placeholder="email">
            </div>
              <button type="button" class="btn btn-default pull-right">
                Contact me <span class="glyphicon glyphicon-chevron-right"></span>
              </button>
          </div> <!-- login-form-group -->

        </form>
      </div>
    </div> <!-- tab-content -->
  </div>
</div>
<?php include_once 'page_footer.php' ?>
