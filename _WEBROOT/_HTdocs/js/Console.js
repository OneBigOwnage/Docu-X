//New Start
//--------------------
//Make the console draggable, the top bar is the handle.
$('.console').draggable({
  handle: '#console-top-bar'
});



// Class declaration of phpConsole_
class PHPConsole {
  constructor() {
    this.lines = {};
    this.settings = {};
    this.isPersistent;
    this.$consoleWindow = $('#console-window');

    this.getSettings();
  }

  /**
   * Refreshes the view (With @this.currentfilter).
   * Will return false if no lines are present.
   * @method refresh
   * @param  {Boolean} [scroll=true] Whether or not the console should scroll to the end after reloading content.
   * @return {void}
   */
  refresh(scroll = true) {
    let $win = this.$consoleWindow;
    let ll = this.lines;
    $win.html("<div style=\"margin-bottom:auto;\"></div>");
    $.each(ll, function(id, lineObj){
      let date = Utils.formatDateTime('XX', lineObj['c_dt']);
      let text = lineObj['output_text'];
      let html = `<div class="console-line" line-ID="${id}">[${date}] ${text}</div>`;
      $win.append(html);
    });

    this.filter(true);
    this.search(true);
    // If animating, stop the current animation, scroll to the end instantly and start a new animation.
    // $win.scrollTop(this.$consoleWindow[0].scrollHeight);
    this.scroll(true);
  }

  /**
   * Adds given line to the console, and refreshes the console view.
   * Function accepts Objects as well as array of Objects.
   * @method addLine
   * @param  {Object|Array<Object>} lineObj The line (as object or array of objects) to be added.
   * @param  {Boolean}              [scrollDown] Whether or not to scroll to the bottom after adding a new line.
   * @return {void}
   */
   addLine(lineObj) {
     let list = this.lines;
     if (Array.isArray(lineObj)) {
       lineObj.forEach(function(l) {
         list[l['id']] = l;
       });
     } else if (typeof lineObj == 'Object') {
       list[lineObj['id']] = lineObj;
     } else {
       // TODO: throw error.
     }
     this.refresh();
  }

  /**
   * Removes line with given lineID from the console, and refreshes the console.
   * Can be called with a single ID, an array of IDs.
   * If no parameters are given, the whole console is cleared.
   * @method removeLine
   * @param  {String|Array<String>}   lineObj The object or ID to be removed from the console.
   * @return {void}
   */
  removeLine(lineObj) {
    if (lineObj === true) {
      this.lines = {};
    } else if (Array.isArray(lineObj)) {
      for (line of lineObj) {
        this.removeLine(line);
      }
    } else if(typeof lineObj === 'string') {
      delete this.lines[lineObj];
    }
  }

  /**
   * Fetches unPosted lines from the backend database.
   * @method fetchLines
   * @return {void}
   */
  fetchLines() {
    serverRequest('console_get_logs', null, 'phpConsole.fetchLinesCallback', true, this);
  }
  /**
   * Fetches unPosted lines from the backend database.
   * @method fetchLines
   * @return {void}
   */
  fetchLines() {
    serverRequest('console_get_logs', null, 'phpConsole.fetchLinesCallback', true, this);
  }
/**
 * Function only to be used as callback function for the fetchLines function. Will
 * @method fetchLinesCallback
 * @param  {[type]}           obj The object given back from serverRequest
 * @return {void}
 */
  fetchLinesCallback(obj, t) {
    t.addLine(obj);
  }

  /**
   * Sets a line as 'posted' in the backend database, this way it will not be retrieved on next fetch.
   * Can also give false as second parameter to set line as 'not posted'.
   * @method setLinePosted
   * @param  {String|Array<String>}      lineID        LineID or Array of IDs to set
   * @param  {Boolean}                   [posted=true] Whether to set as 'posted' or 'not posted', defaults to true
   * @return {void}
   */
  setLinePosted(lineID, posted = true) {
    if (lineID === true) {
      let list = [];
      for (let l of Object.keys(this.lines)) {
        let hidden = $(`div.console-line[line-id=${l}]`).is(':hidden');
        if (!hidden) {
          list.push(l);
        }
      }
      this.setLinePosted(list, posted);
    } else if (Array.isArray(lineID)) {
      serverRequest('console_set_posted', JSON.stringify({id:lineID, posted:posted}));
      for (let line of lineID) {
        this.removeLine(line);
      }
    } else if (typeof lineID === 'string') {
      serverRequest('console_set_posted', JSON.stringify({id:lineID, posted:posted}));
      this.removeLine(lineID);
    }
    this.refresh();
  }

  /**
   * Filters the console by given string and refreshes the console-view.
   * @method filter
   * @param  {String}  filterString          The string that the console should be filtered on.
   * @param  {Boolean} [caseSensitive=false] Whether or not case sentitivity should be used, defaults to false.
   * @return {void}
   */
  filter(filter, caseSensitive = false) {
    //Call itself with the last entered string if search() is called with parameter true.
    if (filter === true && this.filterString !== undefined) {
      this.filter(this.filterString);
    }

    if (typeof filter === 'string') {
      this.filterString = filter;
      for (let l of $('div.console-line')) {
        if ($(l).html().indexOf(filter) === -1) {
          $(l).hide();
        } else {
          $(l).show();
        }
      }
    }
  }


  /**
   * Sets the persistence of the console lines. If true, the console-lines will
   * stay, even if the tab is closed or the browser is shut down.
   * @method setPersistence
   * @param  {Boolean}       bool true for persistent, false for nonpersistent.
   * @param  {jQuery Object} zoo
   * @return {void}
   */
  setPersistence(p = true, obj) {
    //TODO: Implement
  }

  /**
   * Searches the shown console lines for given string, can
   * @method search
   * @param  {String} searchString            String to search for
   * @param  {Boolean} [caseSensitive=false]  Whether or not case sentitivity should be used, defaults to false.
   * @return {void}
   */
  search(search, caseSensitive = false) {
    //Call itself with the last entered string if search() is called with parameter true.
    if (search === true && this.searchString !== undefined) {
      return this.search(this.searchString);
    }

    let lines = this.jQlines = $('div.console-line');

    //Cleans the whole area.
    for (let line of this.jQlines) {
      $(line).html($(line).text());
    }

    if (typeof search === 'string' && search !== '') {
      this.searchString = search;
      let lastFound;
      for (let l of lines) {
        if ($(l).html().indexOf(search) !== -1) {
          $(l).html(Utils.replaceAll($(l).html(), search, `<b><span class="find">${search}</span></b>`));
          lastFound = $(l);
        }
      }
      lastFound && this.scroll(lastFound);
    }
  }

  getSettings() {

  }


  setSettings() {

  }

  scroll(elem) {
    if (this.$consoleWindow.is(':animated')) {
      console.log('Already animating');
      return false;
    }
    if (elem === true && !Utils.empty($('.console-line:last').length)) {
      this.scroll($('.console-line:last'));
    } else if (elem !== true && !Utils.empty($(elem).length)) {
      $(this.$consoleWindow).scrollTo($(elem), 200);
    }
  }
}
//Var instead of let because var is global (=accessable from window).
// var phpConsole = new PHPConsole();




// Testing area
