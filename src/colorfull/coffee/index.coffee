class Colorfull
  constructor: ->
    @canvas = document.getElementById('canvas')
    @interval = 30
    @timer = null
    @color = 0
  init: ->
    @resize()
    @ctx = @canvas.getContext('2d')
    return this
  roll: =>
    @timer = setInterval (=>
      grd = @ctx.createRadialGradient(@canvas.width / 2,
      @canvas.height / 2, 0, @canvas.width / 2,
      @canvas.height / 2, (@canvas.width + @canvas.height) / 2);
      grd.addColorStop(0, "hsla(#{@color % 360}, 100%, 50%, 1)");
      grd.addColorStop(1, "hsla(#{@color % 360}, 20%, 50%, 1)");
      @ctx.fillStyle = grd;
      @ctx.fillRect(0, 0, @canvas.width, @canvas.height)
      @color += 1
      ), @interval
  stop: =>
    clearInterval(@timer) if @timer?
  resize: =>
    @canvas.height = document.height
    @canvas.width = document.width
  showColor: (e) =>
    pixel = @ctx.getImageData(e.clientX, e.clientY, 1, 1)
    return pixel.data

toRgba = (data) ->
  [r, g, b, a] = data
  return "rgba(#{r}, #{g}, #{b}, #{Number((r / 255).toFixed(2))})"

toHsla = (data) ->
  [r, g, b] = data.map (c) ->
    return c / 255
  a = data[3]
  max = Math.max(r, g, b)
  min = Math.min(r, g, b)
  l = (max + min) / 2
  if max == min
    h = s = 0
  else
    d = max - min
    s = if l > 0.5 then d / (2 - max - min) else d / (max + min)
    switch max
      when r then h = (g - b) / d + (if g < b then 6 else 0)
      when g then h = (b - r) / d + 2
      when b then h = (r - g) / d + 4
      else break
    h /= 6
  return "hsla(#{Math.round(h * 360)}, #{Math.round(s * 100)}%, #{Math.round(l * 100)}%, #{a})"

toHex = (data) ->
  [r, g, b, a] = data
  toFullHex = (str) ->
    return ('00' + str.toString(16)).substr(-2)
  return "##{toFullHex(r)}#{toFullHex(g)}#{toFullHex(b)}"

colorfull = new Colorfull()
colorfull.init().roll()
$('#canvas').bind 'mousemove', (e) ->
  colorData = colorfull.showColor(e)
  data = [colorData[0], colorData[1], colorData[2], colorData[3]]
  if data?
    rgba = toRgba(data)
    $('#c-hex').val(toHex(data))
    $('#c-rgba').val(rgba)
    $('#c-hsla').val(toHsla(data))
    $('.color-preview').css({
      'background': rgba
      })

$('.joke').fadeOut(10000);

