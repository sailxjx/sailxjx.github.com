(function($) {

  var $canvas = $('#colorfull-canvas');

  $.fn.colorfull = (function($) {
    function colorfull() {
      if (this.prop('tagName') !== 'CANVAS') {
        throw this.selector + " is not a canvas";
      }
      var $canvas = this,
          $window = $(window),
          ctx = $canvas[0].getContext('2d');

      this.height($window.height()).width($window.width());

      ctx.fillstyle="#333";
      ctx.fillRect(0, 0, $canvas.width(), $canvas.height());
    }
    return colorfull;
  })(jQuery);

  $canvas.colorfull();

  // draw = function() {
  //   $canvas.height($window.height());
  //   ctx.fillStyle="#333";
  //   ctx.fillRect(0, 0, $canvas.width(), $canvas.height());
  // };

  // draw();

  // $(window).bind('resize', function(e) {
  //   draw();
  // });

})(jQuery);