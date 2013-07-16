(function($) {

  function hexToRGB(hex) {
    if (hex[0] === '#') {
      hex = hex.substr(1);
    }
    var rgb = [0, 2, 4].map(function(i) {
      return parseInt(hex.substr(i, 2), 16);
    });
    return rgb;
  }

  $.fn.ive = (function($) {

    function ive() {
      if(this.prop('tagName') !== 'CANVAS') {
        throw this.selector + ' is not a canvas';
      }

      var $window = $(window),
          $canvas = this,
          canvas = $canvas[0],
          ctx = canvas.getContext('2d'),
          img = document.getElementById('xp-wallpaper'),
          colorStart = hexToRGB($('#xp-color-start').val()),
          colorEnd = hexToRGB($('#xp-color-end').val());

      var colorRanges = colorStart.map(function(v, i) {
        return colorEnd[i] - v;
      });

      function draw() {
        clean();
        canvas.height = $window.height();
        canvas.width = $window.width();
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        transition();
      }

      function transition() {
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for(var i = 0; i < imgData.data.length; i += 4) {
          for(var n = 0; n < 3; n ++) {
            imgData.data[i + n] = imgData.data[i + n] / 255 * colorRanges[n] + colorStart[n];
          }
        }
        ctx.putImageData(imgData, 0, 0);
      }

      function clean() {
        ctx.clearRect(0, 0, $canvas.width(), $canvas.height());
      }

      draw();

    }

    return ive;

  })(jQuery);

  $('#xp-wallpaper').ready(function() {
    $('#xp-canvas').ive();
  });

  var colorTimer;

  $('.ctrl-color').bind('change', function() {
    clearTimeout(colorTimer);
    colorTimer = setTimeout(function() {
      $('#xp-canvas').ive();
    }, 300);
  });

})(jQuery);