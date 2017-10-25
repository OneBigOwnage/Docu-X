/**
 * Check if given variable is empty. Will return true for the following:
 * - Null;
 * - undefined variable;
 * - empty string ("");
 * - 0;
 * - false;
 *
 * @method empty
 * @param  {any} variable Variable to be tested on emptyness.
 * @return {Boolean}      Returns TRUE for empty values, else returns FALSE.
 */
function empty(val) {
  return !(typeof(val) !== 'undefined' && val);
}


(function($) {
    $.fn.draggable = function(opt) {

        opt = $.extend({handle:"",cursor:"move"}, opt);

        if(opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }

        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
            if(opt.handle === "") {
                var $drag = $(this).addClass('is_dragging');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('is_dragging');
            }
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
                $('.is_dragging').offset({
                    top:e.pageY + pos_y - drg_h,
                    left:e.pageX + pos_x - drg_w
                }).on("mouseup", function() {
                    $(this).removeClass('is_dragging').css('z-index', z_idx);
                });
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
            if(opt.handle === "") {
                $(this).removeClass('is_dragging');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('is_dragging');
            }
        });

    }
})(jQuery);


function isJSON(StringToTest) {
  try {
    return (JSON.parse(StringToTest) && !!StringToTest);
  } catch (e) {
    return false;
  }
}
