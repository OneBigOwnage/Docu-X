<?php
  require_once '_Default.php';
  $page_name = "LOGIN_PAGE";
  $page_title = "Log in to Docu-X";
  ?>
<?php include_once 'page_header.php';?>
  <div class="well col-xs-13">
    <form>

      <div class="form-group">
        <div class="input-group">
          <span class="input-group-addon glyphicon glyphicon-user"></span>
          <input type="text" class="form-control" placeholder="Username...">
        </div>

        <label for=""></label>
        <input type="text" class="form-control" id="" placeholder="">
      </div>
    </form>
  <div>
<!--
          <form id="loginForm" novalidate="novalidate">
            <div id="form-group"class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                <input id="username" type="text" class="form-control" required="true" placeholder="Username" data-toggle="popover" data-trigger="hover" data-content="Click anywhere in the document to close this popover">
              </div>
              <div class="input-group">
                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                <input id="password" type="password" class="form-control" required="true" title="Please enter your password" placeholder="Password" data-trigger="click" data-toggle="popover" title="Popover Header">
              </div>
            </div>
            <button id="loginBtn" class="btn btn-success btn-block">Login</button>
            <div id="fail-alert" role="alert" class="alert alert-danger collapse"><strong>Wrong Username or Password!</strong></div>
          </form> -->

<?php include_once 'page_footer.php' ?>
