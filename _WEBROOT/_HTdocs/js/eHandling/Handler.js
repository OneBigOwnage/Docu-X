class eHandler {
  static requiredArguments(...params) {
    for (let param of params) {
      if (param === undefined) {
        throw new argumentError();
      }
    }
  }
}
