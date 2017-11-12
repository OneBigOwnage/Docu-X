const consoleInstance = new PHPConsole('#console-window');


$('.console').draggable({
  handle: '#console-top-bar'
});

/**
 * Creates function for given object, to show/hide it.
 * Call with true (also default to true) to show, call with false to hide.
 * Note: For now only to be used in the console top bar.
 * @method createShowHides
 * @param  {String} w The width to grow to when showing.
 * @param  {Number} s The speed at which to grow when showing.
 * @return {Function} The returned function.
 */
let createShowHide = function(w, s) {
  return function() {
    this.origPadding = this.origPadding || {left:this.css('padding-left'), right:this.css('padding-right')};
    if (this.is(':hidden')) {
      let t = this;
      this.show().animate({ width:w, 'padding-left':this.origPadding.left, 'padding-right':this.origPadding.right}, s).focus();
    } else if (!this.is(':hidden')) {
      let t = this;
      this.animate({width:0, 'padding-left':0, 'padding-right':0}, s, function() {t.hide();});
    }
  }
}

// Listener declaration.
let $s = $('#console-input-search');
$s.showMe = createShowHide('200px', 200);
$('#console-btn-search').on('click', function() {
  $s.showMe();
});

let $f = $('#console-input-filter');
$f.showMe = createShowHide('200px', 200);
$('#console-btn-filter').on('click', function() {
  $f.showMe();
});

$('#console-btn-refresh').on('click', function() {
  consoleInstance.fetchLines();
});

$('#console-btn-clear').on('click', function() {
  consoleInstance.deleteLines();
});

$('#console-input-search').on('keyup', function() {
  let t = $('#console-input-search').val();
    consoleInstance.searchLines(t);
    consoleInstance.renderView();
});

$('#console-input-filter').on('keyup', function() {
  let t = $('#console-input-filter').val();
    consoleInstance.filterLines(t);
    consoleInstance.renderView();
});
