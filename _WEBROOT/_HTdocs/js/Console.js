$('#force-add-btn').on('click', function(e) {
  let args = {'message':$('#force-add-input').val()};
  console.log(serverRequest('console_log', args, 'addConsoleLogCallback'));
});


function addConsoleLogCallback(args) {
  console.log('Callback: ', args);
}

// Class Definition
class phpConsole {


  static getLines() {
    return phpConsole.lines;
  }

  static setLines(l) {
    phpConsole.lines = l;
  }

  static show() {

  }



}
// Static property definition.
phpConsole.lines;

//-- End Class Definition

//New Start
//--------------------
//Make the console draggable, the top bar is the handle.
$('.console').draggable({handle:'#console-top-bar'});


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
  let lineHTML = `<div class="console-line">[${line['c_dt']}] ${line['output_text']}</div>`;
  $consoleList.append(lineHTML);

  //Next line is to autoscroll to the bottom of the console.
  // $consoleList.animate({scrollTop:$consoleList[0].scrollHeight}, 1000);
  $consoleList.scrollTop($consoleList[0].scrollHeight);
}


function hardLoad(amount) {
  for (var i = 0; i < amount; i++) {
    addLineToConsole('[DATETIME] ' + i);
  }
}

fetchConsoleLogs();
// hardLoad(15);
