//TODO: Write an error-handler, that does at least the following things:
//TODO: - Catch any error;
//TODO: - Categorise errors.
//TODO: - If severe enough, send error to the server;

window.addEventListener('error', function(e) {
  var eArr = {'eMsg'  : e.message,
              'eFile' : e.filename,
              'eLine' : e.lineno,
              'eCol'  : e.colno};

  serverRequest('registerJSError', eArr);
});


myfunc();

//TODO: Write custom exceptions, and handle them.
