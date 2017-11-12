class ConsoleLine {
  constructor(id, text, time, hidden = false) {
    this.id = id;
    this.text = text;
    this.time = time;
    this.hidden = hidden;
  }

  getID() {
    return this.id;
  }

  /**
   * TODO: Implement compact modus.
   *
   * Returns string representation of text, html-tags are included,
   * can be called with @param compact = true for 1-liner return value.
   * @method print
   * @param  {Boolean} [compact=false] Whether or not the returned string should be a single.
   * @return {String}
   */
  print(compact = false) {
    let hideString = '';
    if (this.hidden) {
      hideString = ' hidden';
    }

    let timeString = Utils.formatDateTime('XX', this.time);
    return `<div class="console-line" line-id="${this.id}"${hideString}>[${timeString}] ${this.text}</div>`;
  }


  insertSearchTags(sString) {
    this.text = Utils.stripTags(this.text);
    this.text = Utils.replaceAll(this.text, sString, `<span class="console-find-highlight">${sString}</span>`);
  }

  removeSearchTags() {
    this.text = Utils.stripTags(this.text);
  }

  /**
   * Sets this.hidden property, hidden ConsoleLines will not be shown when PHPConsole.renderView() gets called.
   * @method setHidden
   * @param  {Boolean} [bool=true] Whether this ConsoleLine should be hidden or not.
   */
  setHidden(bool = true) {
    this.hidden = bool;
  }

  /**
   * Returns JSON string, representing this ConsoleLine Object.
   * This makes the object ready for sending off to the backend.
   * @method toJSON
   * @return {String} String representation of this Object.
   */
  toJSON() {
    return JSON.stringify(this);
  }
}
