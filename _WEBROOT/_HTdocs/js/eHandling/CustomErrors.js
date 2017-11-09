// Custom error declaration
class argumentError extends Error {
  constructor(...params) {
    super(...params);
    Error.captureStackTrace(this, argumentError);
    this.message = "Not all required arguments were filled!";
  }
}


class AJAXError extends Error {
  constructor(AJAXObj, response, ...params) {
    super(...params);
    Error.captureStackTrace(this, AJAXError);
    this.message = "Error in AJAX call.\nObject: " + AJAXObj + "\nResponse: " + response;
  }
}

class AJAXValidationError extends Error {
  constructor(missing) {
    super(...params);
    Error.captureStackTrace(this, AJAXValidationError);
    this.message = `AJAXUnit validation failed!\nYou're missing '${m}'!`;
  }
}

class DefaultCustomError extends Error {
  constructor(msg, ...params) {
    console.warn("Usage of DefaultCustomError should only be temporary, please create a GOOD custom error for this event!");
    super(...params);
    Error.captureStackTrace(this, DefaultCustomError);
    this.message = msg;
  }
}
