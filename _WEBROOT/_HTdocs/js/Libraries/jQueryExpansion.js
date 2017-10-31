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
 * To make and element draggable, can specify a handle and a modifier key.
 * @method draggable
 * @param  {jQuery Object}  [handle=this] The handly by which the element can be dragged
 * @param  {String}         [modKey=null]
 * @return {this}
 */
jQuery.fn.draggable = function(handle = this, modKey = null) {

};
