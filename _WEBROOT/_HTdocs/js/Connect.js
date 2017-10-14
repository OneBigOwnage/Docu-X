/**
 * Function to perform a request to the serverside application.
 * Requests are executed via AJAX, and you can specify a callback function.
 * That function will be executed after the call is completed without errors,
 * with the resulting data as argument.
 *
 * @method serverRequest
 * @param  {String}       procedure    [description]
 * @param  {String|Array} args         An array containing the
 * @param  {String}       callback     [description]
 * @param  {Boolean}      [aSync=true] [description]
 * @return {Boolean}                   returns false only if no procedure was given,
 *                                     or
 */
function serverRequest(procedure, args, callback, aSync = true) {
  if (!procedure) {
    //TODO: throw error.
    return false;
  } else if (callback != null && (typeof window[callback] !== 'function')) {
    //TODO: throw error.
    return false;
  }

  $.ajax({
    url:      '/../Entrance.',
    async:    aSync,
    data:     {procedure: procedure, arguments: args},
    datatype: 'JSON',
    complete: function(rData, rStatus) {
      if (!$.inArray(rStatus, ['notmodified', 'nocontent', 'error', 'timeout', 'abort', 'parsererror'])) {
        window[callback](JSON.parse(rData['responseText']));
      } else {
        //TODO: throw error.
      }
    }
  });
  return true;
}
