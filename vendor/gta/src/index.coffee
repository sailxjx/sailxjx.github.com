;((root, factory) ->
  'use strict';

  gta = factory()
  if typeof module is 'object' and typeof module.exports is 'object'
    module.exports = gta
  else if typeof define is 'function' and define.amd
    define(['jquery'], -> gta)
  else
    root.Gta = gta

)(this, ->
  'use strict';

  slice = Array.prototype.slice

  removeElement = (el) ->
    el.parentNode.removeChild(el)

  checkScript = (script, key) ->
    script.onerror = ->
      window[key] = null
      removeElement(script)
    script.onload = ->
      removeElement(script)

  getScript = (src) ->
    script = document.createElement('script')
    scripts = document.getElementsByTagName('script')[0]
    script.async = 1
    script.src = src
    scripts.parentNode.insertBefore(script, scripts)
    return script

  gta = {
    pageview: ->
      for provider in providers
        provider.pageview.apply(provider, arguments)
      return this

    event: ->
      for provider in providers
        provider.event.apply(provider, arguments)
      return this

    delegateEvents: ->
      return unless window.jQuery
      $(document).off('.gta').on('click.gta', '[data-gta="event"]', (e) =>
        $target = $(e.currentTarget)
        category = $target.data('category') or $target[0].tagName
        label = $target.data('label') or $target[0].className
        action = $target.data('action') or e.type
        value = $target.data('value') or $target.html()
        useMixpanel = !!$target.data('useMixpanel')
        @event(category, action, label, value, useMixpanel)
      )

  }

  Providers = {
    google: (account) ->
      return unless account
      window.GoogleAnalyticsObject = '_ga';
      window._ga = ->
        _ga.q.push(arguments)

      _ga.q = []
      _ga.l = 1 * new Date()
      _ga('create', account)
      _ga('send', 'pageview')
      script = getScript('//www.google-analytics.com/analytics.js')
      checkScript(script, '_ga')

      return {
        name: 'google'
        pageview: ->
          return unless window._ga
          args = slice.call(arguments)
          data = if typeof args[0] is 'object' then args[0] else args.join('_')
          window._ga('send', 'pageview', data)

        event: ->
          return unless window._ga
          window._ga('send', 'events', slice.call(arguments))
      }

    baidu: (account) ->
      return unless account
      window._hmt = []
      script = getScript("//hm.baidu.com/hm.js?#{account}")
      checkScript(script, '_hmt')

      return {
        name: 'baidu'
        pageview: ->
          return unless window._hmt
          args = slice.call(arguments)
          if typeof args[0] == 'object'
            data = args[0].page
            unless data
              data = []
              for key, val of args[0]
                data.push(val)
              data = data.join('_')
          else
            data = args.join('_')
          window._hmt.push(['_trackPageview', data])

        event: ->
          return unless window._hmt
          args = slice.call(arguments)
          data = ['_trackEvent'].concat(args)
          window._hmt.push(data)
      }

    mixpanel: (account) ->
      return unless account
      lib_name = 'mixpanel';
      window.mixpanel = [];
      mixpanel._i = [];

      mixpanel.init = (token, config, name) ->
        # support multiple mixpanel instances
        target = mixpanel
        if name?
          target = mixpanel[name] = []
        else
          name = lib_name;

        # Pass in current people object if it exists
        target.people or= []

        target.toString = (no_stub) ->
          str = lib_name
          str += '.' + name if name isnt lib_name
          str += ' (stub)' unless no_stub
          return str

        target.people.toString = ->
          target.toString(1) + '.people (stub)'

        _set_and_defer = (target, fn) ->
          split = fn.split('.')
          if split.length is 2
            target = target[split[0]]
            fn = split[1]

          target[fn] = ->
            target.push([fn].concat(slice.call(arguments)))

        functions = 'disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user'.split(' ')

        for fn in functions
          _set_and_defer(target, fn)

        mixpanel._i.push([token, config, name])

      mixpanel.__SV = 1.2
      mixpanel.init(account)
      script = getScript('//cdn.mxpnl.com/libs/mixpanel-2.2.min.js')
      checkScript(script, lib_name)

      return {
        name: 'mixpanel'
        pageview: ->
          # Mixpanel does not support pageview

        event: (category, action, label, value, useMixpanel=false)->
          return unless window.mixpanel and useMixpanel
          window.mixpanel.track(arguments[2])
      }

  }

  element = document.getElementById('gta-main')
  providers = gta.providers = []

  return gta unless element

  for name, Provider of Providers
    account = element.getAttribute("data-#{name}")
    if account and provider = Provider(account)
      providers.push(provider)

  gta.delegateEvents()
  removeElement(element)
  return gta

)
