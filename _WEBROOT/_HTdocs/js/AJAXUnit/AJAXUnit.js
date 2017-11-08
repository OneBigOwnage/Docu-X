class AJAXUnit {
  constructor(mName) {
    const defaultSettings = { url: './PHP/AJAXResolver.PHP',
                              async: true,
                              datatype: 'JSON',
                              complete: function(result, status) {
                                AJAXUnit.callbackWrapper(result, status);
                              }
                            };

    this.AJAXObject = defaultSettings;
    this.relayData = {};
    this.relayData.methodName = mName;
    return this;
  }

  /**
   * Fire current AJAXUnit object off to the backend.
   * Also autmatically runs object through validate function.
   * @method fire
   * @return {Boolean}
   */
  fire() {
    if (AJAXUnit.validate(this)) {
      this.AJAXObject.data = this.relayData;
      $.ajax(this.AJAXObject);
      return true;
    } else {
      return false;
    }
  }

  setBeforeSend(fun) {
    if (Utils.isFunc(fun)) {
      this.AJAXObject.beforeSend = fun;
    } else {
      throw new DefaultCustomError("Provided 'BeforeSend' method is not a function!");
    }
    return this;
  }

  setCallbackContext(context) {
    this.AJAXObject.context = context;
    return this;
  }

  setMethod(mName) {
    this.AJAXObject.relayData.method = mName;
    return this;
  }

  /**
   *  Adds arguments to be used in the function that is called on.
   *
   * @method addAruments
   * @param  {Object}    argumentsObject  The arguments object given in the form of {paramName:paramVal, paramName:paramVal}.
   * @param  {Boolean}   [replace=false]  Whether or not the given arguments should replace existing arguments with the same name.
   */
  addArguments(argumentsObject, replace = true) {
    let orig = $.extend({}, this.relayData.arguments);

    console.log('Start:');
    console.log('orig', orig);
    console.log('argumentsObject', argumentsObject);
    console.log('this.relayData.arguments', this.relayData.arguments);

    if (replace) {
      this.relayData.arguments = $.extend(this.relayData.arguments, argumentsObject);
    } else {
      this.relayData.arguments = $.extend(this.relayData.arguments, argumentsObject);
      this.relayData.arguments = $.extend(this.relayData.arguments, orig);
    }

    console.log('End:');
    console.log('orig', orig);
    console.log('argumentsObject', argumentsObject);
    console.log('this.relayData.arguments', this.relayData.arguments);

  }

  setCallback(cBackFunction, ...args) {
    this.AJAXObject.complete = function(result, status) {
      AJAXUnit.callbackWrapper(result, status, cBackFunction, ...args);
    }
    return this;
  }

  setURL(url) {
    this.AJAXObject.url = url;
    return this;
  }

  setASync(bool) {
    this.AJAXObject.async = bool;
    return this;
  }

  setReturnType(type) {
    this.AJAXObject.datatype = type;
    return this;
  }

  /**
   * Validates given AJAXUnit object, checks if mandatory keys are in the object.
   *
   * @param  {Object<AJAXUnit>} dis AJAXUnit object that needs to be validated.
   * @return {Boolean}
   */
  static validate(dis) {
    // The minimum of the AJAXUnit that needs to be filled in.
    const min = ['url', 'datatype', 'complete'];

    for (let m of min) {
      if (dis.AJAXObject[m] === undefined) {
        throw new DefaultCustomError(`AJAXUnit validation failed!\nYou don't have: '${m}'!`);
        return false;
      }
    }
    return true;
  }

  static callbackWrapper(result, status, callbackFunction = AJAXUnit.defaultCallback, ...callbackArguments) {
    if (status !== 'success') {
      throw new DefaultCustomError(`AJAXUnit callback failed! Status: '${status}'.`);
    } else if (!Utils.isJSON(result.responseText)) {
      throw new DefaultCustomError(`AJAXUnit result is not a JSON!\nResult: ${result.responseText}`);
    } else {
      let returnObj = JSON.parse(result.responseText);

      if (Object.keys(returnObj)[0] === 'AJAX_TERMINATED' && returnObj['AJAX_TERMINATED'] === true) {
        throw new DefaultCustomError(`AJAXUnit result came back terminated! Reason: ${returnObj.reason}`);
      } else {
        callbackFunction(returnObj, ...callbackArguments);
      }
    }
  }

  /**
   * The default callback for AJAXUnit replies.
   *
   * @method defaultCallback
   * @param  {[type]}        resultObj [description]
   * @return {[type]}                  [description]
   */
  static defaultCallback(resultObj) {
    console.log("Default AJAX Callback used, result:", resultObj);
  }
}
