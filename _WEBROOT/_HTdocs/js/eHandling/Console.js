'use strict';

class PHPConsole {
  constructor(window) {
    this.window = window;
    this.consoleLines;
    this.currentFilter;
    this.currentSearch;
    this.settings;
  }

  renderView() {}                   // Applies currentFilter & currentSearch.
                                    // Only responsible for turning this.consoleLines into readable text on page!!

  fetchLines(limit = -1) {}         // Fetches lines from backend

  fetchLinesCallback(cBackData) {}  // Turns data into ConsoleLine Objects.
                                    // Then calls this.addLines() for the created Objects

  addLines(line) {}                 // Adds line to this.
                                    // Can be called with array of ConsoleLine Objects,
                                    //  --> to add all of them (recursively).

  deleteLines(line, del = true) {}  // Removes given line from this.consoleLines
                                    // Also sends signal to backend, to set line as 'posted'
                                    // Can be called with array of ConsoleLine Objects,
                                    //  --> to delete all of them (recursively).
                                    // Can be called with parameter 'false' to send signal not-'posted' to backend
                                    //  --> (used with persistency of console in front-end)

  filterLines(fString) {}           // Applies implementation of filtering to each of this.consoleLines.
                                    // Finally calls this.renderView()

  searchLines(sString) {}           // Applies implementation of searching to each of this.consoleLines.
                                    // Calls this.renderView()
                                    // Finally calls this.scrollWindow() with the first found item as parameter.
                                    // When called with the same parameter as last call
                                    //  --> will iterate through found items using this.scrollWindow

  scrollWindow(elem) {}             // Scrolls to given Object. Scrolls to given element in this.window.
                                    // Can be called with parameter 'true' to scroll to end.

  // Implementation of settings (in local storage);
}

const instance = new phpConsole();

export default instance;
