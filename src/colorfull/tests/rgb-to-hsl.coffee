rgbaToHsla = (rgba) ->
  [r, g, b] = rgba.map (c) ->
    return c / 255
  a = rgba[3]
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

console.log rgbaToHsla([63, 230, 25, 1])

  # r /= 255, g /= 255, b /= 255;
  #   var max = Math.max(r, g, b), min = Math.min(r, g, b);
  #   var h, s, l = (max + min) / 2;

  #   if(max == min){
  #       h = s = 0; // achromatic
  #   }else{
  #       var d = max - min;
  #       s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  #       switch(max){
  #           case r: h = (g - b) / d + (g < b ? 6 : 0); break;
  #           case g: h = (b - r) / d + 2; break;
  #           case b: h = (r - g) / d + 4; break;
  #       }
  #       h /= 6;
  #   }

  #   return [h, s, l];