class ConsoleLine {
  constructor(id, text, time, hidden = false) {
    this.id = id;
    this.output_text = text;
    this.c_dt = time;
    this.hidden = hidden;
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
    let hideString = this.hidden && ' hidden';
    return `<div class="console-line" line-id="${this.id}"${hideString}>[${Utils.formatDateTime('XX', this.c_dt)}] ${this.output_text}</div>`;
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

  /**
   * Returns ConsoleLine Object, built from given jsonString.
   * @method fromJSON
   * @param  {[type]} jsonString [description]
   * @return {Object}
   */
  static fromJSON(json) {
    // TODO: Check if JSON Object or JSON String.
    return Object.assign(new ConsoleLine, json);
  }
}
