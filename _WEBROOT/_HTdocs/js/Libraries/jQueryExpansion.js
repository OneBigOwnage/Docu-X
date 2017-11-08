/**
 * Used to scroll to a specific element in a scrollable html entity.
 * @method
 * @param  {jQuery} elem  The element to scroll to.
 * @param  {Number} speed Duration of the scrolling in milliseconds, defaults to 1000
 * @return {void}
 */
jQuery.fn.scrollTo = function(elem, speed = 1000) {
  let $this = $(this);
  let $elem = $(elem);

  let thisTop = $this.offset().top;
  let thisBottom = thisTop + $this.height();

  let elemTop = $elem.offset().top;
  let elemBottom = elemTop + $elem.height();

  // check if element is already in view.
  if (elemTop > thisTop && elemBottom < thisBottom) {
    return;
  }

  let newScroll;
  if (elemTop < thisTop) {
    newScroll = {scrollTop: $this.scrollTop() - thisTop + elemTop};
  } else {
    newScroll = {scrollTop: elemBottom - thisBottom + $this.scrollTop()};
  }
  $this.animate(newScroll, speed);

  // Return this for chaining.
  return this;
};

/**
 * Function to make an element draggable, can specify a handle and a modifier key.
 * It is also possible to pass a function that will be called when the modifier key is pressed.
 *
 * @method draggable
 * @param  {jQuery Object}  [handle=this] The handly by which the element can be dragged
 * @param  {String}         [modKey]      Modifier key that needs to be hold in order to enable dragging.
 * @return {this}
 * @param  {Object}         [modChanges]  Function that will be called when the modKey is pressed. Will be called with parameter true for keydown, false for keyup.
 */
 jQuery.fn.makeDraggable = function(handle = this, modKey = [], modChangeFunc) {
  const validMods = ['shift', 'ctrl', 'alt', 'meta'];

  if (typeof modChangeFunc !== 'function') {
    throw new argumentError();
  }

  let $handle = $(handle);
  let iElemZ    = $handle.css('z-index');

  // Execute mod-function when modifier key is down.
  $(':root').on('keydown', function(e) {
    if (checkModKey(e) && typeof modChangeFunc === 'function') {
      modChangeFunc(true);
    }
  }).on('keyup', function(e) {
    if (!checkModKey(e)) {

    }
    modChangeFunc(false);
  });

  // Clicklistener on handle.
  $(handle).on('mousedown', function(e) {
    //
    if (!checkModKey(e)) {
      return false;
    }

    $handle.css('z-index', '999');

    // Initial mouse position.
    let iMouseX = e.pageX;
    let iMouseY = e.pageY;
    // Initial element position.
    let iElemTop  = $handle.offset().top;
    let iElemLeft = $handle.offset().left;

    // Listen for mousemove, then move the object respectively.
    $(':root').on('mousemove', function(e) {
      // Relative mouse position.
      let rMouseX = e.pageX - iMouseX;
      let rMouseY = e.pageY - iMouseY;

      // Relative element position.
      let rElemLeft = rMouseX - iElemLeft;
      let rElemTop = rMouseY - iElemTop;

      // console.log('Offsets:', rElemTop, rElemLeft);

      $handle.offset({
        left:rElemLeft,
         top:rElemTop});
    }).on('mouseup', function() {
      console.log('off-mousemove inner', this);
    });
  }).on('mouseup', function() {
    // Remove drag-listener when mousebutton goes up again.
    $(':root').off('mousemove');
    $handle.css('z-index', iElemZ);
    console.log('off-mousemove outer', this);
  });
  // end all changes & loops on mouseUp

  function checkModKey(ev) {
    let valid = true;
    for (key of modKey) {
      if (!ev.originalEvent[key + 'Key']) {
        valid = false;
      }
    }
    return (valid === true);
  }
  return this;
};
