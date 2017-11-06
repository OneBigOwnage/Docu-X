const defaultSettings = {async:true};

class DispatchEntity {
  /*
  Needs:
  [datatype]
  [callback function & extra callback args & static default callback]
  --[error handling AJAXValidationError?]
  [argument handing]
  --[beforeSend loadingBar?] Default loadingbar w/ bootstrap notify
  [context]
  */

  constructor(mName) {
    this.AJAXObject;
  }

  /**
   * Fire current DispatchEntity object off to the backend.
   * Also autmatically runs object through validate function.
   */
  fire() {
    if (DispatchEntity.validate(this)) {
      $.ajax(this.AJAXObject);
    }
  }


  setBeforeSend(fun) {
    if (Utils.isFunc(fun)) {
      this.AJAXObject.beforeSend = fun;
    } else {
      throw new DefaultCustomError("Provided 'BeforeSend' method is not a function!")
    }
  }

  setcBackContext(context) {
    
  }

  setMethod(mName) {
    this.AJAXObject.method = mName;
  }

  setCallback(cBackString, ...args) {}
  setURL(url) {
    this.AJAXObject.url = url;
  }

  setASync(bool) {
    this.AJAXObject.async = bool;
  }

  setArgs(...args) {}
  setReturnType(type) {}

  onError() {} // To be implemented

  /**
   * TODO: Define minumun requirements for the ajax requests.
   * @param  {[type]} dis [description]
   * @return {[type]}     [description]
   */
  static validate(dis) {
    return true;
  }

  static callbackWrapper() {

  }


  static defaultCallback(...args) {}

}
