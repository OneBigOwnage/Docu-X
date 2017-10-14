$('document').ready(function() {
  $('#username').focus();
});

$('.hide-show-btn').click(function() {
  $('#log-in-form').find('*').css({'overflow':'hidden'});
  $('#sign-up-form').find('*').css({'overflow':'hidden'});

  $('#log-in-form').animate({width:'toggle', padding:'toggle'}, 'fast');
  $('#sign-up-form').animate({width:'toggle', padding:'toggle'}, 'fast');
});
