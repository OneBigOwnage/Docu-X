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
   * @return {Boolean} Only returns false if the validation fails.
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

  /**
   * Sets beforeSend function, which will be executed before the sending of the AJAXUnit.
   *
   * @method setBeforeSend
   * @param {Function} fun Function that is to be called.
   */
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
   *  Arguments are to be given in the following form: {paramName:paramVal, paramName:paramVal}.
   *  Can specify whether or not to override existing arguments with the same name.
   *
   * @method addAruments
   * @param  {Object}    argumentsObject  The arguments object given in the form of {paramName:paramVal, paramName:paramVal}.
   * @param  {Boolean}   [replace=false]  Whether or not the given arguments should replace existing arguments with the same name.
   */
  addArguments(argumentsObject, replace = true) {
    let relayArgs = this.relayData.arguments;
    let orig = $.extend({}, relayArgs);

    if (replace) {
      relayArgs = $.extend(relayArgs, argumentsObject);
    } else {
      relayArgs = $.extend($.extend(relayArgs, argumentsObject), orig);
    }
  }

  /**
   * Defines the callback function that will be executed upon retrieval of the AJAXUnit result.
   * The first argument of given function will be the (clean) result of the AJAXUnit call.
   * It is also possible to pass in more arguments via this function.
   *
   * @method setCallback
   * @param {Function} cBackFunction  The function that is to be called when the result comes back.
   * @param {any} args additional arguments that will be passed to the callback funcion.
   */
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
   * Please note, function will throw an error if the validation fails!
   *
   * @method validate
   * @param  {Object<AJAXUnit>} dis AJAXUnit object that needs to be validated.
   * @return {Boolean}
   */
  static validate(dis) {
    // The minimum of the AJAXUnit that needs to be filled in.
    const min = ['url', 'datatype', 'complete'];

    for (let m of min) {
      if (dis.AJAXObject[m] === undefined) {
        throw new AJAXValidationError(m);
        return false;
      }
    }
    return true;
  }

  /**
   * This function is a wrapper for the callback of any AJAXUnit.
   * Main use:
   * 1) Verify the result was a success, and no AJAX or PHP errors occurred.
   * 2) To have a unified way of passing the returned data & extra arguments to the respective callback handler.
   *
   * @method callbackWrapper
   * @param  {Object<jqXHR>}  result                                      The ajax result, in form of an jqXHR object.
   * @param  {String}         status                                      The statusstring, given by the returned ajax request.
   * @param  {Function}       [callbackFunction=AJAXUnit.defaultCallback] The callback function that will be called when the
   * @param  {any}            callbackArguments                           Additional arguments to be passed to the callback function
   * @return {void}
   */
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
   * The default callback for AJAXUnit replies. Will just output the plain resultText.
   * Please note that this function is only to be used for developing and/or testing purposes!
   *
   * @method defaultCallback
   * @param  {Object}         resultObj The result, coming from the callbackwrapper
   * @return {void}
   */
  static defaultCallback(resultObj) {
    console.log("Default AJAX Callback used, result:", resultObj);
  }
}
