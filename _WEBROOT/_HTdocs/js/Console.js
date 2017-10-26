$('#force-add-btn').on('click', function(e) {
  let args = {'message':$('#force-add-input').val()};
  console.log(serverRequest('console_log', args, 'addConsoleLogCallback'));
});


function addConsoleLogCallback(args) {
  console.log('Callback: ', args);
}


//New Start
//--------------------
//Make the console draggable, the top bar is the handle.
$('.console').draggable({handle:'#console-top-bar'});

let phpConsole = new _phpConsole();

function _phpConsole() {
  this.logLines = ['line', 'line', 'line'];

  this.fetchLogs = function() {

  }

  this.processIncoming = function(e) {

  }

  this.getLogs = function() {
    return logLines;
  }

}



//Array to keep track of all log lines in the browser.
let logLines = [];

function fetchConsoleLogs() {
  serverRequest('get_new_console_logs', null, 'processIncomingConsoleLogs');
}


function processIncomingConsoleLogs(obj) {
  if (obj['successful']) {
    obj['responseData'].forEach(function(line) {
      addLineToConsole(line);
      logLines.push(line);
    });
  }
}


function addLineToConsole(line) {
  let $consoleList = $('.console').find('#console-window');
  // let lineHTML = `<li>${line.toString()}</li>`;
  let lineHTML = `<div class="console-line">${line.toString()}</div>`;
  $consoleList.append(lineHTML);
}


function hardLoad(amount) {
  for (var i = 0; i < amount; i++) {
    addLineToConsole('[DATETIME] ' + i);
  }
}

hardLoad(15);
