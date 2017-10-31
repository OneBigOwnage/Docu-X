/**
 * Function to perform a request to the serverside application.
 * Requests are executed via AJAX, and you can specify a callback function.
 * The callback will be executed after the call is completed without errors,
 * with the resulting data as argument.
 *
 * @method serverRequest
 * @param  {String}       procedure    [description]
 * @param  {any}          args         An array containing the
 * @param  {String}       callback     [description]
 * @param  {Boolean}      [aSync=true] Whether or not the AJAX call should be made a-synchronous
 *                                     (use 'undefined' or 'true' if you want to use cBackArgs)
 * @param  {any}          cBackArgs    Extra arguments that will be passed to the callback function.
 * @return {Boolean}                   returns false only if no procedure was given,
 *                                     or the provided callback is not a function.
 */
function serverRequest(procedure, args, callback, aSync = true, ...cBackArgs) {
  let isSet = !Utils.empty(callback);
  if (!procedure) {
    //TODO: throw error.
    return false;
  } else if ((isSet && !Utils.isFunc(callback)) || (Utils.empty(callback) && !Utils.empty(cBackArgs))) {
    //TODO: throw error.
    return false;
  }

  $.ajax({
    url: '/../Entrance.php',
    async: aSync,
    data: {
      procedure: procedure,
      arguments: args
    },
    datatype: 'JSON',
    complete: function(rData, rStatus) {
      let failResponses = ['notmodified', 'nocontent', 'error', 'timeout', 'abort', 'parsererror'];
      if ($.inArray(rStatus, failResponses) == -1 && Utils.isJSON(rData['responseText']) && (JSON.parse(rData['responseText'])['successful'] == true)) {
        if (!aSync) {
          return rData['responseText'];
        } else if (isSet) {
          Utils.callFunctionFromString(callback, JSON.parse(rData['responseText'])['responseData'], ...cBackArgs);
        } else {
          // TODO: throw error.
          console.log("No callback was specified of the response is an invalid JSON. The response is output to console:\n", rData['responseText']);
        }
      } else {
        console.log("Something went wrong in a serverRequest:");
        console.log('AJAX_status:', rStatus);
        console.log('isJSON:', Utils.isJSON(rData['responseText']));
        console.log('PHP response boolean:', JSON.parse(rData['responseText'])['successful']);
        //TODO: throw error.
      }
    }
  });
  return true;
}
