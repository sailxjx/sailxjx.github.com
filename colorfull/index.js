(function($) {

  $.fn.colorfull = (function($) {

    function colorfull() {

      if (this.prop('tagName') !== 'CANVAS') {
        throw this.selector + " is not a canvas";
      }

      var $window = $(window),
          $canvas = this,
          domCanvas = $canvas[0],
          ctx,
          animateTiming,
          duration = 5;  // seconds for every loop
          lastDegree = 0;

      var resize = function() {
        // it will not work if only change the css height/width of canvas
        domCanvas.height = $window.height();
        domCanvas.width = $window.width();
      };

      var pos = function() {
        var width = $canvas.width(),
            height = $canvas.height(),
            x1, y1, x2, y2, frames = duration * 1000 / 30;
        lastDegree = typeof lastDegree === 'undefined' ? 0 : (lastDegree + Math.PI * 2 / frames) % (Math.PI * 2);
        x1 = width * (1 + Math.cos(lastDegree)) / 2;
        y1 = height * (1 + Math.sin(lastDegree)) / 2;
        x2 = width * (1 + Math.cos(lastDegree + Math.PI)) / 2;
        y2 = height * (1 + Math.sin(lastDegree + Math.PI)) / 2;
        return [x1, y1, x2, y2];
      };

      var draw = function() {
        clean();
        coordinates = pos();
        var grd = ctx.createLinearGradient(coordinates[0], coordinates[1], coordinates[2], coordinates[3]);

        grd.addColorStop(0,"#F800FF");
        grd.addColorStop(1,"#32FFC6");

        ctx.fillStyle=grd;
        ctx.fillRect(0, 0, $canvas.width(), $canvas.height());

      };

      var clean = function() {
        ctx.clearRect(0, 0, $canvas.width(), $canvas.height());
      };

      var init = function() {
        if (animateTiming) {
          clearInterval(animateTiming);
        }
        resize();
        ctx = $canvas[0].getContext('2d');
        draw();
        animateTiming = setInterval(draw, 30);
        return animateTiming;
      };

      init();

      $window.bind('resize', function(e) {
        init();
      });

    }
    return colorfull;
  })(jQuery);

  var $canvas = $('#cf-canvas');
  $canvas.colorfull();
  $('#copyleft').fadeOut(10000);

})(jQuery);