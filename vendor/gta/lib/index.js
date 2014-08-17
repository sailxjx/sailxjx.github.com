(function(root, factory) {
  'use strict';
  var gta;
  gta = factory();
  if (typeof module === 'object' && typeof module.exports === 'object') {
    return module.exports = gta;
  } else if (typeof define === 'function' && define.amd) {
    return define(['jquery'], function() {
      return gta;
    });
  } else {
    return root.Gta = gta;
  }
})(this, function() {
  'use strict';
  var Provider, Providers, account, checkScript, element, getScript, gta, name, provider, providers, removeElement, slice;
  slice = Array.prototype.slice;
  removeElement = function(el) {
    return el.parentNode.removeChild(el);
  };
  checkScript = function(script, key) {
    script.onerror = function() {
      window[key] = null;
      return removeElement(script);
    };
    return script.onload = function() {
      return removeElement(script);
    };
  };
  getScript = function(src) {
    var script, scripts;
    script = document.createElement('script');
    scripts = document.getElementsByTagName('script')[0];
    script.async = 1;
    script.src = src;
    scripts.parentNode.insertBefore(script, scripts);
    return script;
  };
  gta = {
    pageview: function() {
      var provider, _i, _len;
      for (_i = 0, _len = providers.length; _i < _len; _i++) {
        provider = providers[_i];
        provider.pageview.apply(provider, arguments);
      }
      return this;
    },
    event: function() {
      var provider, _i, _len;
      for (_i = 0, _len = providers.length; _i < _len; _i++) {
        provider = providers[_i];
        provider.event.apply(provider, arguments);
      }
      return this;
    },
    delegateEvents: function() {
      if (!window.jQuery) {
        return;
      }
      return $(document).off('.gta').on('click.gta', '[data-gta="event"]', (function(_this) {
        return function(e) {
          var $target, action, category, label, useMixpanel, value;
          $target = $(e.currentTarget);
          category = $target.data('category') || $target[0].tagName;
          label = $target.data('label') || $target[0].className;
          action = $target.data('action') || e.type;
          value = $target.data('value') || $target.html();
          useMixpanel = !!$target.data('useMixpanel');
          return _this.event(category, action, label, value, useMixpanel);
        };
      })(this));
    }
  };
  Providers = {
    google: function(account) {
      var script;
      if (!account) {
        return;
      }
      window.GoogleAnalyticsObject = '_ga';
      window._ga = function() {
        return _ga.q.push(arguments);
      };
      _ga.q = [];
      _ga.l = 1 * new Date();
      _ga('create', account);
      _ga('send', 'pageview');
      script = getScript('//www.google-analytics.com/analytics.js');
      checkScript(script, '_ga');
      return {
        name: 'google',
        pageview: function() {
          var args, data;
          if (!window._ga) {
            return;
          }
          args = slice.call(arguments);
          data = typeof args[0] === 'object' ? args[0] : args.join('_');
          return window._ga('send', 'pageview', data);
        },
        event: function() {
          if (!window._ga) {
            return;
          }
          return window._ga('send', 'events', slice.call(arguments));
        }
      };
    },
    baidu: function(account) {
      var script;
      if (!account) {
        return;
      }
      window._hmt = [];
      script = getScript("//hm.baidu.com/hm.js?" + account);
      checkScript(script, '_hmt');
      return {
        name: 'baidu',
        pageview: function() {
          var args, data, key, val, _ref;
          if (!window._hmt) {
            return;
          }
          args = slice.call(arguments);
          if (typeof args[0] === 'object') {
            data = args[0].page;
            if (!data) {
              data = [];
              _ref = args[0];
              for (key in _ref) {
                val = _ref[key];
                data.push(val);
              }
              data = data.join('_');
            }
          } else {
            data = args.join('_');
          }
          return window._hmt.push(['_trackPageview', data]);
        },
        event: function() {
          var args, data;
          if (!window._hmt) {
            return;
          }
          args = slice.call(arguments);
          data = ['_trackEvent'].concat(args);
          return window._hmt.push(data);
        }
      };
    },
    mixpanel: function(account) {
      var lib_name, script;
      if (!account) {
        return;
      }
      lib_name = 'mixpanel';
      window.mixpanel = [];
      mixpanel._i = [];
      mixpanel.init = function(token, config, name) {
        var fn, functions, target, _i, _len, _set_and_defer;
        target = mixpanel;
        if (name != null) {
          target = mixpanel[name] = [];
        } else {
          name = lib_name;
        }
        target.people || (target.people = []);
        target.toString = function(no_stub) {
          var str;
          str = lib_name;
          if (name !== lib_name) {
            str += '.' + name;
          }
          if (!no_stub) {
            str += ' (stub)';
          }
          return str;
        };
        target.people.toString = function() {
          return target.toString(1) + '.people (stub)';
        };
        _set_and_defer = function(target, fn) {
          var split;
          split = fn.split('.');
          if (split.length === 2) {
            target = target[split[0]];
            fn = split[1];
          }
          return target[fn] = function() {
            return target.push([fn].concat(slice.call(arguments)));
          };
        };
        functions = 'disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user'.split(' ');
        for (_i = 0, _len = functions.length; _i < _len; _i++) {
          fn = functions[_i];
          _set_and_defer(target, fn);
        }
        return mixpanel._i.push([token, config, name]);
      };
      mixpanel.__SV = 1.2;
      mixpanel.init(account);
      script = getScript('//cdn.mxpnl.com/libs/mixpanel-2.2.min.js');
      checkScript(script, lib_name);
      return {
        name: 'mixpanel',
        pageview: function() {},
        event: function(category, action, label, value, useMixpanel) {
          if (useMixpanel == null) {
            useMixpanel = false;
          }
          if (!(window.mixpanel && useMixpanel)) {
            return;
          }
          return window.mixpanel.track(arguments[2]);
        }
      };
    }
  };
  element = document.getElementById('gta-main');
  providers = gta.providers = [];
  if (!element) {
    return gta;
  }
  for (name in Providers) {
    Provider = Providers[name];
    account = element.getAttribute("data-" + name);
    if (account && (provider = Provider(account))) {
      providers.push(provider);
    }
  }
  gta.delegateEvents();
  removeElement(element);
  return gta;
});
