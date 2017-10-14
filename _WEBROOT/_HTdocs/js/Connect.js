/**
* Method used to perform calls to the server.
*
* @param r        The routine you want to call on.
* @param args     The arguments to pass the routine.
* @param callback The name of the callback-function for when the serverCall is executed.
* @param aSync    Wether or not this call should be executed asynchronously.
*/
function serverCall(rrr, args, callback, aSync = true) {
  if (!rrr) {
    console.log('Server Call invalid, no routine specified!');
    return false;
  } else if (callback != null && (typeof window[callback] !== 'function')) {
    console.log('Server Call invalid, callback function does not exist!');
    return false;
  }

  $.ajax({
    url: '/../Entrance.php',
    async: aSync,
    data:{
      routine: rrr,
      arguments: args
        },
    dataType: 'JSON',
    success: function(data) {
      // if (typeof window[callback] === 'function') {
      //   window[callback](JSON.parse(data['response']));
      // } else {
      //   console.log('Response data:', data);
      // }
      let r = new Result(data);
      r.printD();
    },
    error: function(data) {
      // console.log(data);
      if (data['statusText'] == 'parsererror') {
        console.log('PHP Parse Error\n', data['responseText']);
      } else {
        console.log('AJAX Error\n', data);
      }
    }
  });;
}

// TODO: Refactor Function.


function Result(data) {
  this.data = data;
  this.printD = function() {
    console.log("Printing data: " + data);
  }
}

serverCall('routine');
