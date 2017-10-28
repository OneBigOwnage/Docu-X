(function($) {
  $.fn.draggable = function(opt) {

    opt = $.extend({
      handle: "",
      cursor: "move"
    }, opt);

    if (opt.handle === "") {
      var $el = this;
    } else {
      var $el = this.find(opt.handle);
    }

    return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
      if (opt.handle === "") {
        var $drag = $(this).addClass('is-dragging');
      } else {
        var $drag = $(this).addClass('active-handle').parent().addClass('is-dragging');
      }
      var z_idx = $drag.css('z-index'),
        drg_h = $drag.outerHeight(),
        drg_w = $drag.outerWidth(),
        pos_y = $drag.offset().top + drg_h - e.pageY,
        pos_x = $drag.offset().left + drg_w - e.pageX;
      $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
        $('.is-dragging').offset({
          top: e.pageY + pos_y - drg_h,
          left: e.pageX + pos_x - drg_w
        }).on("mouseup", function() {
          $(this).removeClass('is-dragging').css('z-index', z_idx);
        });
      });
      e.preventDefault(); // disable selection
    }).on("mouseup", function() {
      if (opt.handle === "") {
        $(this).removeClass('is-dragging');
      } else {
        $(this).removeClass('active-handle').parent().removeClass('is-dragging');
      }
    });

  }
})(jQuery);


class Utils {

  static isJSON(str) {
    try {
      return (JSON.parse(str) && !!str)
    } catch (e) {
      return false;
    }
  }


  /**
   * Check if given variable is empty. Will return true for the following:
   * Null / undefined variable / empty string ("") / 0 / false
   *
   * @method empty
   * @param  {any}  variable Variable to be tested on emptyness.
   * @return {Boolean}      Returns true for empty values as described above, otherwise returns FALSE.
   */
  static empty(v) {
    return !(typeof(v) !== 'undefined' && v);
  }


  static isDate(str) {
    return (new Date(str) !== "Invalid Date") && !isNaN(new Date(str));
  }


  static replaceAll(input, search, replace) {
    if (Array.isArray(search)) {
      search.forEach(function(s) {
        input = input.split(s).join(replace);
      });
      return input;
    } else {
      return input.split(search).join(replace);
    }
  }

  /**
   * Method to format a Date (-string); If no date is given, a new (current) date will be used.
   * Below is a legend with the usable format-characters.
   *
   * #Year
   * y    - Short numeric representation of a year, 2 digits
   * Y    - Full numeric representation of a year, 4 digits
   *
   * #Month
   * m    - Numeric representation of a month, without leading zero
   * M    - Numeric representation of a month, with leading zero
   *
   * #Day
   * d    - Day of the month, without leading zero
   * D    - Day of the month, with leading zero
   *
   * #Time
   * g    - 12-hour format of an hour, without leading zero
   * G    - 12-hour format of an hour, with leading zero
   * h    - 24-hour format of an hour, without leading zero
   * H    - 24-hour format of an hour, with leading zero
   * i    - Minutes without leading zero
   * I    - Minutes with leading zero
   * s    - Seconds without leading zero
   * S    - Seconds with leading zero.
   *
   * #Default formats
   * xx   - [16:01]                 - Default padded time format
   * XX   - [07:44:53]              - Default padded accurate time format
   * qq   - [31-12-96]              - Default date format (Dutch)
   * QQ   - [02-08-2022]            - Default padded date format 2 (Japanese)
   * ww   - [96-12-31]              - Default date format (Japanese)
   * WW   - [1996-06-17]            - Default padded date format (Japanese)
   * BB   - [1996-04-03 14:26:34]   - Default padded full date & time format (Japanese)
   *
   *
   * @method formatDateTime
   * @param  {String}       format    Format that should be used as
   * @param  {Date}         [date=new Date()]       [description]
   * @return {[type]}                 [description]
   */
  static formatDateTime(format, date = new Date()) {
    if (!Utils.isDate(date)) {
      return false;
    } else {
      date = new Date(date);
    }

    // Setting of the format replacers.
    let y = date.getFullYear().toString().substring(2, 2);
    let Y = date.getFullYear();

    let m = date.getMonth();
    let M = (m < 10) ? '0'.concat(m) : m;

    let d = date.getDate();
    let D = (d < 10) ? '0'.concat(d) : d;

    let h = date.getHours();
    let H = (h < 10) ? '0'.concat(h) : h;

    let g = (h > 11) ? h - 12 : h;
    let G = (g < 10) ? '0'.concat(g) : g;

    let i = date.getMinutes();
    let I = (i < 10) ? '0'.concat(i) : i;

    let s = date.getSeconds();
    let S = (s < 10) ? '0'.concat(s) : s;

    // Default formats.
    let xx = 'H:I';
    let XX = 'H:I:S';

    let qq = 'D-M-Y';
    let QQ = 'd-m-d';

    let ww = 'y-m-d';
    let WW = 'Y-M-D';

    let BB = 'Y-M-D H:I:S';

    //TODO: Design some kind of quick loop with arrays or something.
    // Replace the default formats first, to their respective format strings.

    format = Utils.replaceAll(format, 'xx', xx);
    format = Utils.replaceAll(format, 'XX', XX);
    format = Utils.replaceAll(format, 'qq', qq);
    format = Utils.replaceAll(format, 'QQ', QQ);
    format = Utils.replaceAll(format, 'ww', ww);
    format = Utils.replaceAll(format, 'WW', WW);
    format = Utils.replaceAll(format, 'BB', BB);


    // Replace all the characters in format, with their respective date/time parts.
    format = Utils.replaceAll(format, 'y', y);
    format = Utils.replaceAll(format, 'Y', Y);
    format = Utils.replaceAll(format, 'm', m);
    format = Utils.replaceAll(format, 'M', M);
    format = Utils.replaceAll(format, 'd', d);
    format = Utils.replaceAll(format, 'D', D);
    format = Utils.replaceAll(format, 'h', h);
    format = Utils.replaceAll(format, 'H', H);
    format = Utils.replaceAll(format, 'g', g);
    format = Utils.replaceAll(format, 'G', G);
    format = Utils.replaceAll(format, 'i', i);
    format = Utils.replaceAll(format, 'I', I);
    format = Utils.replaceAll(format, 's', s);
    format = Utils.replaceAll(format, 'S', S);

    //finally return the format, which by now is the formatted datetime from the input.
    return format;
  }

  /**
   * Method to check if function exists in the global context.
   * Returns true if and only if funcName is a callable function in the global context.
   * @method isFunc
   * @param  {[type]}  funcName The String representing the function to check.
   * @return {Boolean}          Returns true if funcName exists in global context.
   */
  static isFunc(funcName) {
    if (Utils.empty(funcName)) {
      return false;
    }
    funcName = Utils.replaceAll(funcName, ['(', ')'], '');
    return eval(`typeof ${funcName} === 'function';`);
  }

  /**
   *  Method to call a function with a dynamically entered name,
   *  also accepts extra parameters to be passed with the function.
   *
   * @method callFunctionFromString
   * @param  {String}               funcName The name of the function passed as a String.
   * @param  {String|Array<any>}    [funcArgs=''] Array of arguments to be passed in with the to call function.
   * @return {void}                 TODO: add return?
   */
  static callFunctionFromString(funcName, ...funcArgs) {
    if (!Utils.isFunc(funcName)) {
      // TODO: error
      return false;
    } else {
      (eval(`${funcName}`)(...funcArgs));
    }
    // TODO: Refactor using window[]
    // Source: https://stackoverflow.com/questions/912596/how-to-turn-a-string-into-a-javascript-function-call
  }
}
