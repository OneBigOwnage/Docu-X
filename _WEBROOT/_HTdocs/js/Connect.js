/**
* Method used to perform calls to the server.
*
* @param r The routine you want to call on.
* @param args The arguments to pass the routine.
* @param callback The name of the callback-function for when the serverCall is executed.
*/
function serverCall(r, args, callback, aSync = true) {
  if (!r) {
    console.log('Server Call invalid, no routine specified!');
    return false;
  } else if (callback != null && (typeof window[callback] !== 'function')) {
    console.log('Server Call invalid, callback function does not exist!');
    return false;
  }

  $.ajax({
    url: '/PHP/Entry.php',
    async: aSync,
    data:{
      routine: r,
      arguments: args
        },
    dataType: 'JSON',
    success: function(data) {
      if (typeof window[callback] === 'function') {
        window[callback](JSON.parse(data['response']));
      } else {
        console.log('Response data:', data);
      }
    },
    error: function(data) {
      console.log(data);
      if (data['statusText'] == 'parsererror') {
        console.log('PHP Parse Error\n', data['responseText']);
      } else {
        console.log('AJAX Error\n', data);
      }
    }
  });;
}

// TODO: Refactor Function.
