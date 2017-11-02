class ConsoleLine {
  constructor(id, text, time, hidden = false) {
    this.id = id;
    this.text = text;
    this.time = time;
    this.hidden = hidden;
  }

  print(compact = false) {}               // Returns string representation of text, html tags included.
                                          // Can be called with parameter true for 1-liner return.

  setHidden(bool = true) {}               // Sets this.hidden property

  toJSON() {}                             // Returns JSON string, representing this ConsoleLine Object.

  static fromJSON(jsonString) {}          // Returns ConsoleLine Object, built from given jsonString.

}

export default class ConsoleLine
