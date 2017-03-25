export class ErrorBase {
  isCustomError = true;
  httpStatusCode = 500;
  humanReadableMessage = 'Error';
  errorType = 'INTERNAL_ERROR';
  extraData = {};

  constructor(type, httpStatusCode, extraData) {
    this.errorType = type.toUpperCase();
    this.httpStatusCode = httpStatusCode;
    this.extraData = extraData;
  }

  toObject() {
    return {
      type: this.errorType,
      extra: this.extraData,
      message: this.humanReadableMessage
    }
  }
}
