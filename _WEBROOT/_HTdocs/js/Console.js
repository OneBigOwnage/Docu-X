//New Start
//--------------------
//Make the console draggable, the top bar is the handle.
$('.console').draggable({
  handle: '#console-top-bar'
});



// Class declaration of phpConsole_
class PHPConsole {
  constructor() {
    // this.jQlines = $('.console-line');
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
    $win.scrollTop(this.$consoleWindow[0].scrollHeight);
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
    if (Utils.empty(lineObj)) {
      this.lines = {};
    }
    //TODO: Implement.
    this.refresh();
  }

  /**
   * Fetches unPosted lines from the backend database.
   * @method fetchLines
   * @return {void}
   */
  fetchLines() {
    serverRequest('get_new_console_logs', null, 'phpConsole.fetchLinesCallback', true, this);
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
   * Sets a line as 'posted' in the backend database, this way it will not be retrieved on next fetch.
   * Can also give false as second parameter to set line as 'not posted'.
   * @method setLinePosted
   * @param  {String|Array<String>}      lineID        LineID or Array of IDs to set
   * @param  {Boolean}                   [posted=true] Whether to set as 'posted' or 'not posted', defaults to true
   * @return {void}
   */
  setLinePosted(lineID, posted = true) {
    // TODO: Implement posted
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
    // if true, scroll to bottom of list.
    // FIXME
    if (elem === true) {
      this.scroll($('.console-line:last'));
    } else {
      $(this.$consoleWindow).scrollTo($(elem), 200);
    }
  }
}
//Var instead of let because var is global (=accessable from window).
var phpConsole = new PHPConsole();


/**
 * Creates function for given object, to show/hide it.
 * Call with true (also default to true) to show, call with false to hide.
 * Note: For now only to be used in the console top bar.
 * @method createShowHide
 * @param  {String} w The width to grow to when showing.
 * @param  {Number} s The speed at which to grow when showing.
 * @return {Function} The returned function.
 */
let createShowHide = function(w, s) {
  return function() {
    this.origPadding = this.origPadding || {left:this.css('padding-left'), right:this.css('padding-right')};
    if (this.is(':hidden')) {
      let t = this;
      this.show().animate({ width:w, 'padding-left':this.origPadding.left, 'padding-right':this.origPadding.right}, s).focus();
    } else if (!this.is(':hidden')) {
      let t = this;
      this.animate({width:0, 'padding-left':0, 'padding-right':0}, s, function() {t.hide();});
    }
  }
}

// Listener declaration.
let $s = $('#console-input-search');
$s.showMe = createShowHide('200px', 200);
$('#console-btn-search').on('click', function() {
  $s.showMe();
});

let $f = $('#console-input-filter');
$f.showMe = createShowHide('200px', 200);
$('#console-btn-filter').on('click', function() {
  $f.showMe();
});

$('#console-btn-refresh').on('click', function() {
  phpConsole.fetchLines();
});

$('#console-btn-clear').on('click', function() {
  phpConsole.removeLine();
});

$('#console-input-search').on('keyup', function() {
  phpConsole.search($(this).val());
});

$('#console-input-filter').on('keyup', function() {
  phpConsole.filter($(this).val());
});
// Testing area
