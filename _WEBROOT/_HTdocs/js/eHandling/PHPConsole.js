'use strict';
let PHPConsole__instance = undefined;

class PHPConsole {

  // This constructor enforces PHPConsole to be a singleton.
  constructor(win) {
    if (PHPConsole__instance !== undefined) {
      return PHPConsole__instance;
    } else {
      PHPConsole__instance = this;
    }

    this.screen = $(win);
    this.consoleLines = [];
    this.currentFilter;
    this.currentSearch;
    this.settings;

    return this;
  }

  /**
   * Reapplies current filter & search, then refreshes the console screen.
   * Done by clearing the screen, and printing all this.consoleLines to it.
   * (Only responsible for turning this.consoleLines into readable text on page!)
   *
   * @method renderView
   * @return {void}   [description]
   */
  renderView() {
    const i = PHPConsole.getInstance();

    // Next line is required for spacing, this way the lines start at the bottom.
    i.screen.html(`<div style="margin-bottom:auto;"></div>`);

    for (const line of i.consoleLines) {
      i.screen.append(line.print());
    }

    i.scrollWindow();
  }

  /**
   * Fetches console lines from backend.
   * @method fetchLines
   * @return {void}
   */
  fetchLines() {
    let aj = new AJAXUnit('console_get_logs');
    aj.setCallback(this.fetchLinesCallback);
    aj.fire();
  }

  /**
   * Turns fetched data into ConsoleLine Objects.
   * Then calls this.addLines() for the created Objects.
   * When the adding is finished, will redo the current search & filtering. Then call this.renderView().
   *
   * @method fetchLinesCallback
   * @param  {Object}           cBackData Returned data, fetched with this.fetchLines
   * @return {void}
   */
  fetchLinesCallback(cBackData) {
    if (cBackData.hasOwnProperty('result')) {
      return false;
    }

    let i = PHPConsole.getInstance();
    for (const lineObj of cBackData) {
      i.addLines(new ConsoleLine(lineObj.id, lineObj.output_text, lineObj.c_dt));
    }

    // FIXME: Check if searchLines/filterLines goes right;
    i.searchLines();
    i.filterLines();
    i.renderView();
  }

  /**
   * Adds line to this.consoleLines.
   * Can be called with an array of ConsoleLine objects to add them all.
   * @method addLines
   * @param  {Object<ConsoleLine>} line Line to be added, can be typeof array.
   */
  addLines(line) {
    const i = PHPConsole.getInstance();
    const list = i.consoleLines;
    const mapping = list.map(x => x.id);

    if (line instanceof ConsoleLine && mapping.indexOf(line.id) === -1) {
      list.push(line);
    } else if (Array.isArray(line)) {
      for (const l of line) {
        i.addLines(l);
      }
    }
  }

  /**
   * Removes given line from this.consoleLines, and sends signal to backend to set flag posted.
   * Can be used with single ConsoleLine objects, or Array of objects.
   * Call with parameter true to delete all this.consoleLines.
   *
   * @method deleteLines
   * @param  {Object<ConsoleLine>|Array<Object>|Boolean}   [line=true] Consoleline, Array of ConsoleLines or  boolean true to delete all.
   * @param  {Boolean}   [del=true]
   * @return {void}
   */
  deleteLines(line = true, del = true) {
    let i = PHPConsole.getInstance();

    if (line === true) {
      i.consoleLines = [];
      i.renderView();

      let aj = new AJAXUnit('console_set_logs_posted');
      aj.setCallback(null);
      aj.addArguments({ id:true, posted:true});
      aj.fire();

    } else if (Array.isArray(line)) {
      let deletedArray = [];
      let listClone = [...i.consoleLines];

      for (let l of listClone) {
        i.consoleLines.splice(i.consoleLines.indexOf(l), 1);
        deletedArray.push(l.getID());
      }

      i.renderView();

      let aj = new AJAXUnit('console_set_logs_posted');
      aj.addArguments({ id:deletedArray, posted:del});
      aj.setCallback(null);
      aj.fire();
    } else if (i.consoleLines.indexOf(line) !== -1) {
      i.consoleLines.splice(i.consoleLines.indexOf(line), 1);
      i.renderView();

      let aj = new AJAXUnit('console_set_logs_posted');
      aj.addArguments({id:line.getID(), posted:del});
      aj.setCallback(null);
      aj.fire();
    }
  }

  /**
   * Filters each of this.consoleLines and calls this.renderView().
   *
   * @param  {String|Boolean} [fString=true] The string to filter on, can be true to reapply last filter
   * @return {void}
   */
  filterLines(fString = true) {
    let i = PHPConsole.getInstance();

    if (fString === true && i.currentFilter) {

      i.filterLines(i.currentFilter);

    } else if (typeof fString === 'string') {

      i.currentFilter = fString;

      for (let line of i.consoleLines) {

        if (line.text.toUpperCase().indexOf(fString.toUpperCase()) === -1) {
          line.setHidden();
        } else {
          line.setHidden(false);
        }

      }

    }
  }
  /**
   * Searches through each of this.consoleLines, adding & removing found-tags on its way. if
   *
   * @method searchLines
   * @param  {Boolean}   [sString=true] [description]
   * @return {[type]}                   [description]
   */
  searchLines(sString = true) {
    let i = PHPConsole.getInstance();

    if (sString === true && i.currentSearch) {
      i.searchLines(i.currentSearch);
    } else if (sString === i.currentSearch) {
      // TODO: implement scroll-to-next found.
    } else if (typeof sString === 'string') {
      i.currentSearch = sString;
      for (let line of i.consoleLines) {
        if (line.text.indexOf(sString) !== -1) {
          line.insertSearchTags(sString);
        } else {
          line.removeSearchTags();
        }
      }
    }
  }

  /**
   * Scrolls console window to given element. Call with parameter true to scroll to the end.
   *
   * @method scrollWindow
   * @param  {Object<jQuery>|Boolean} [elem=true] Element that is to be scrolled to. Pass in true to scroll to end.
   */
  scrollWindow(elem = true) {
    let win = PHPConsole.getInstance().screen;
    if ($('.console-line').length <= 0) {
      return false;
    }

    // End animation if there is one.
    if (win.is(':animated')) {
      win.finish();
    }

    if (elem === true) {
      win.scrollTo($('.console-line:last'), 150);
    } else {
      win.scrollTo(elem, 150);
    }

  }

  /**
   * Helps with the singleton-ness of PHPConsole.
   * @method getInstance
   * @param  {Object}    window jQuery Object representing the window that the
   * @return {Object<PHPConsole>}
   */
  static getInstance(win) {
    if (PHPConsole__instance === undefined) {
      PHPConsole__instance = new PHPConsole($(win));
    } else if (!Utils.empty(win)) {
      PHPConsole__instance.screen = $(win);
    }
    return PHPConsole__instance;
  }
}
