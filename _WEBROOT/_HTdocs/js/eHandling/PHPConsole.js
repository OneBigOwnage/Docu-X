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
   * Only responsible for turning this.consoleLines into readable text on page!
   * @method renderView
   * @return {[type]}   [description]
   */
  renderView() {
    const i = PHPConsole.getInstance();
    i.screen.html(`<div style="margin-bottom:auto;"></div>`);

    i.searchLines();
    i.filterLines();

    for (const line of i.consoleLines) {
      i.screen.append(line.print());
    }
  }

  /**
   * Fetches console lines from backend. Possibility to specify a limit.
   * @method fetchLines
   * @param  {Number}   [limit=-1] The limit for getting lines (-1 for no limit), defaults to -1
   * @return {void}              [description]
   */
  fetchLines(limit = -1) {
    let aj = new AJAXUnit('console_get_logs');
    aj.setCallback(this.fetchLinesCallback);
    aj.fire();
  }

  /**
   * Turns fetched data into ConsoleLine Objects.
   * Then calls this.addLines() for the created Objects
   * @method fetchLinesCallback
   * @param  {Object}           cBackData Returned data, fetched with this.fetchLines
   * @return {void}
   */
  fetchLinesCallback(cBackData) {
    for (const lineData of cBackData) {
      PHPConsole.getInstance().addLines(ConsoleLine.fromJSON(lineData));
    }
    PHPConsole.getInstance().renderView();
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


  deleteLines(line, del = true) {}  // Removes given line from this.consoleLines
                                    // Also sends signal to backend, to set line as 'posted'
                                    // Can be called with array of ConsoleLine Objects,
                                    //  --> to delete all of them (recursively).
                                    // Can be called with 2nd parameter 'false' to send signal not-'posted' to backend
                                    //  --> (used with persistency of console in front-end)

  filterLines(fString = true) {}           // Applies implementation of filtering to each of this.consoleLines.
                                    // Finally calls this.renderView()

  searchLines(sString = true) {}           // Applies implementation of searching to each of this.consoleLines.
                                    // Calls this.renderView()
                                    // Finally calls this.scrollWindow() with the first found item as parameter.
                                    // When called with the same parameter as last call
                                    //  --> will iterate through found items using this.scrollWindow
  /**
   * Scrolls console window to given element. Call with parameter true to scroll to the end.
   *
   * @method scrollWindow
   * @param  {Object<jQuery>|Boolean} [elem=true] Element that is to be scrolled to. Pass in true to scroll to end.
   */
  scrollWindow(elem = true) {
    let win = PHPConsole.getInstance().screen;
    if (Utils.empty($('.console-line:last'))) {
      return false;
    }

    // End animation if there is one.
    if (win.is(':animated')) {
      win.finish();
    }

    if (elem === true) {
      win.scrollTo($('.console-line:last'));
    } else {
      win.scrollTo(elem, 200);
    }

  }

  // Implementation of settings (in local storage);


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
