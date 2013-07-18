# ColorConverter

class ColorConverter
  constructor: (colorDesc)->
    @colorDesc = colorDesc
    @regex = {
      'rgba': /rgba?\(([0-9\.\,\ ]+)\)/
      'hsla': /hsla?\(([0-9\.\,\ \%]+)\)/
      'hex': /\#([a-zA-Z0-9]{6})/
    }
    @matches = null
    @type = null
    @_match()
  toRgba: ->
    if @type then @["_#{@type}ToRgba"].call(this) else null
  toHsla: ->
    if @type then @["_#{@type}ToHsla"].call(this) else null
  toHex: ->
    if @type then @["_#{@type}ToHex"].call(this) else null
  _match: ->
    for type of @regex
      if @matches = @colorDesc.match(@regex[type])
        @type = type
        return @matches
    return null
  _rgbaToRgba: ->
    [r, g, b, a] = @matches[1].split(',').map (v) ->
      return v.trim()
    a = if a? then a else 1
    return "rgba(#{r},#{g},#{b},#{a})"
  _hslaToRgba: ->
    [h, s, l, a] = @matches[1].split(',').map (v) ->
      if '%' in v then return parseFloat(v.trim()) / 100 else return parseFloat(v.trim())
    h /= 360
    a = if a? then a else 1
    if s == 0
      r = g = b = l
    else
      hue2rgb = (p, q, t) ->
        if t < 0 then t += 1
        if t > 1 then t -= 1
        if t < 1/6 then return p + (q - p) * 6 * t
        if t < 1/2 then return q;
        if t < 2/3 then return p + (q - p) * (2/3 - t) * 6
        return p
      q = if l < 0.5 then l * (1 + s) else l + s - l * s
      p = 2 * l - q
      r = hue2rgb(p, q, h + 1/3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1/3)
    return "rgba(#{Math.round(r*255)},#{Math.round(g*255)},#{Math.round(b*255)},1)"
  _hexToRgba: ->
    hex = @matches[1]
    r = parseInt(hex[0..1], 16)
    g = parseInt(hex[2..3], 16)
    b = parseInt(hex[4..5], 16)
    return "rgba(#{r},#{g},#{b},1)"
  _rgbaToHsla: ->
    rgba = @matches[1].split(',')
    [r, g, b] = rgba.map (v) ->
      return v.trim() / 255
    a = if rgba[3]? then rgba[3] else 1
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
    return "hsla(#{Math.round(h * 360)},#{Math.round(s * 100)}%,#{Math.round(l * 100)}%,#{a})"
  _hslaToHsla: ->
    [h, s, l, a] = @matches[1].split(',').map (v) ->
      if '%' in v then return parseFloat(v.trim()) / 100 else return parseFloat(v.trim())
    a = if a? then a else 1
    return "hsla(#{h},#{s * 100}%,#{l * 100}%,#{a})"
  _hexToHsla: ->
    @colorDesc = @_hexToRgba()
    @_match()
    return @_rgbaToHsla()
  _rgbaToHex: ->
    [r, g, b, a] = @matches[1].split(',')[0..2].map (v) ->
      return ('00' + Number(v.trim()).toString(16)).substr(-2)
    return "##{r}#{g}#{b}"
  _hslaToHex: ->
    @colorDesc = @_hslaToRgba()
    @_match()
    return @_rgbaToHex()
  _hexToHex: ->
    return @colorDesc

# Colorfull

class Colorfull
  constructor: ->
    @canvas = document.getElementById('canvas')
    @interval = 30
    @timer = null
    @colorDesc = null
    @running = false
    @hsla = [0, '100%', '50%', 1]
  init: ->
    @resize()
    @ctx = @canvas.getContext('2d')
    return this
  roll: =>
    @timer = setInterval(@draw, @interval)
    @running = true
    return this
  draw: =>
    grd = @ctx.createRadialGradient(@canvas.width / 2,
    @canvas.height / 2, 0, @canvas.width / 2,
    @canvas.height / 2, (@canvas.width + @canvas.height) / 2);
    grd.addColorStop(0, "hsla(#{@hsla[0]}, #{@hsla[1]}, #{@hsla[2]}, #{@hsla[3]})");
    grd.addColorStop(1, "hsla(#{@hsla[0]}, #{(parseInt(@hsla[1]) + 20) % 100}%, #{@hsla[2]}, #{@hsla[3]})");
    console.log "hsla(#{@hsla[0]}, #{@hsla[1]}, #{@hsla[2]}, #{@hsla[3]})"
    console.log "hsla(#{@hsla[0]}, #{(parseInt(@hsla[1]) + 20) % 100}%, #{@hsla[2]}, #{@hsla[3]})"
    @ctx.fillStyle = grd;
    @ctx.fillRect(0, 0, @canvas.width, @canvas.height)
    @hsla[0] = (@hsla[0] + 1) % 360
  stop: =>
    clearInterval(@timer) if @timer?
    @running = false
    return this
  toggle: =>
    if @running then @stop() else @roll()
    return this
  resize: =>
    @canvas.height = document.height
    @canvas.width = document.width
  showColor: (e) =>
    pixel = @ctx.getImageData(e.clientX, e.clientY, 1, 1)
    return pixel.data
  setColor: (colorDesc) =>
    colorConverter = new ColorConverter(colorDesc)
    hsla = colorConverter.toHsla()
    if hsla? && matches = hsla.match(/hsla?\(([0-9\.\,\ \%]+)\)/)
      @hsla = matches[1].split(',').map (v) ->
        return v.trim()
      @draw()
    return this

# color actions

colorfull = new Colorfull()
colorfull.init().roll()

colorPick = (e)->
  colorData = colorfull.showColor(e)
  data = [colorData[0], colorData[1], colorData[2], colorData[3]]
  if data?
    rgbaDesc = "rgba(#{data[0]},#{data[1]},#{data[2]},#{data[3]/255})"
    colorConverter = new ColorConverter(rgbaDesc)
    rgba = colorConverter.toRgba()
    $('#c-hex').val(colorConverter.toHex())
    $('#c-rgba').val(rgba)
    $('#c-hsla').val(colorConverter.toHsla())
    $('.color-preview').css({
      'background': rgba
      })

mouse =
  move: false
  bindMove: =>
    return false if mouse.move
    $('#canvas').bind('mousemove', colorPick)
    mouse.move = true
  unbindMove: =>
    return false until mouse.move
    $('#canvas').unbind('mousemove')
    mouse.move = false

mouse.bindMove()
$('#canvas').bind 'click', (e) ->
  mouse.unbindMove()
  colorPick(e)

# joke line
$('.joke').fadeOut(10000);

# shortcuts

$(document).bind 'keydown', 'shift+/', (e) ->  # ?
  $shortcut = $('.shortcut')
  $shortcut.fadeToggle(300)

$(document).bind 'keydown', 's', (e) ->
  colorfull.toggle()

$(document).bind 'keydown', 'm', (e) ->
  mouse.bindMove()

# color inputs
$('.color-input').bind 'keyup', (e) ->
  key = e.keyCode || e.which
  if key == 13
    e.preventDefault()
    colorConverter = new ColorConverter($(this).val())
    rgba = colorConverter.toRgba()
    if rgba?
      # refill inputs
      $('#c-hex').val(colorConverter.toHex())
      $('#c-rgba').val(rgba)
      $('#c-hsla').val(colorConverter.toHsla())
      $('.color-preview').css({
        'background': rgba
        })
      # stop mouse movement event
      mouse.unbindMove()
      # reload canvas and stop animation
      colorfull.stop()
      colorfull.setColor(rgba)



