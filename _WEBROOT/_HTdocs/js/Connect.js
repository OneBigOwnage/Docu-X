/**
 * Function to perform a request to the serverside application.
 * Requests are executed via AJAX, and you can specify a callback function.
 * That function will be executed after the call is completed without errors,
 * with the resulting data as argument.
 *
 * @method serverRequest
 * @param  {String}       procedure    [description]
 * @param  {any}          args         An array containing the
 * @param  {String}       callback     [description]
 * @param  {Boolean}      [aSync=true] [description]
 * @return {Boolean}                   returns false only if no procedure was given,
 *                                     or the provided callback is not a function.
 */
function serverRequest(procedure, args, callback, aSync = true) {
  let isSet = !Utils.empty(callback);
  if (!procedure) {
    //TODO: throw error.
    return false;
  } else if (isSet && (typeof window[callback] !== 'function')) {
    //TODO: throw error.
    return false;
  }

  $.ajax({
    url:      '/../Entrance.php',
    async:    aSync,
    data:     {procedure: procedure, arguments: args},
    datatype: 'JSON',
    complete: function(rData, rStatus) {
      let failResponses = ['notmodified', 'nocontent', 'error', 'timeout', 'abort', 'parsererror'];
      if ($.inArray(rStatus, failResponses) == -1) {
        if (isSet && isJSON(rData['responseText'])) {
          window[callback](JSON.parse(rData['responseText']));
        } else {
          console.log("No callback was specified of the response is an invalid JSON. The response is output to console:\n", rData['responseText']);
        }
      } else {
        console.log('rStatus: ', rStatus, 'rData: ', rData);
        //TODO: throw error.
      }
    }
  });
  return true;
}
