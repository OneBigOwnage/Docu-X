// Custom error declaration
class argumentError extends Error {
  constructor(...params) {
    super(...params);
    Error.captureStackTrace(this, argumentError);
    this.message = 'Not all required arguments were filled!';
  }
}
