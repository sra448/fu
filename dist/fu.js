(function() {
  var __slice = [].slice;

  define(function(require) {
    var fu;
    fu = {};
    fu.compose = function() {
      var fs, lastFuncIndex;
      fs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      lastFuncIndex = fs.length - 1;
      return function() {
        var args, i, __, _i, _len;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        for (i = _i = 0, _len = fs.length; _i < _len; i = ++_i) {
          __ = fs[i];
          args = [fu.apply(fs[lastFuncIndex - i], args)];
        }
        return args[0];
      };
    };
    fu.curry = function() {
      var args, f;
      f = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return function() {
        var moreArgs;
        moreArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return f.apply(this, args.concat(moreArgs));
      };
    };
    fu.autoCurry = function(f, numArgs) {
      if (numArgs == null) {
        numArgs = f.length;
      }
      return function() {
        var newArgs;
        newArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        if (newArgs.length < numArgs) {
          if (numArgs - newArgs.length > 0) {
            return fu.autoCurry(fu.curry.apply(this, [f].concat(newArgs)), numArgs - newArgs.length);
          } else {
            return fu.curry.apply(this, [f].concat(newArgs));
          }
        } else {
          return f.apply(this, newArgs);
        }
      };
    };
    fu.bind = fu.autoCurry(function(c, f) {
      return f.bind(c);
    });
    fu.toArray = function() {
      var xs;
      xs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return xs;
    };
    fu.first = function(xs) {
      return xs != null ? xs[0] : void 0;
    };
    fu.last = function(xs) {
      return xs != null ? xs[xs.length - 1] : void 0;
    };
    fu.rest = function(xs) {
      return xs != null ? xs.splice(1) : void 0;
    };
    fu.push = function(value, xs) {
      if (xs == null) {
        xs = [];
      }
      xs.push(value);
      return xs;
    };
    fu.join = fu.autoCurry(function(delimiter, xs) {
      return xs.join(delimiter);
    });
    fu.split = fu.autoCurry(function(delimiter, xs) {
      return xs.split(delimiter);
    });
    fu.splitWith = fu.autoCurry(function(f, xs) {
      var res, x, _i, _len;
      res = [];
      for (_i = 0, _len = xs.length; _i < _len; _i++) {
        x = xs[_i];
        if ((f(x)) || res.length === 0) {
          res.push([]);
        }
        (_.last(res)).push(x);
      }
      return res;
    });
    fu.map = fu.autoCurry(function(f, xs) {
      var x, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = xs.length; _i < _len; _i++) {
        x = xs[_i];
        _results.push(f(x));
      }
      return _results;
    });
    fu.reduce = fu.autoCurry(function(f, init, xs) {
      var i, x, _i, _len;
      for (i = _i = 0, _len = xs.length; _i < _len; i = ++_i) {
        x = xs[i];
        init = f(init, x, i);
      }
      return init;
    });
    fu.find = fu.autoCurry(function(f, xs) {
      var i, x, _i, _len;
      for (i = _i = 0, _len = xs.length; _i < _len; i = ++_i) {
        x = xs[i];
        if (f(x, i)) {
          return x;
        }
      }
    });
    fu.findR = fu.autoCurry(function(xs, f) {
      var i, x, _i, _len;
      for (i = _i = 0, _len = xs.length; _i < _len; i = ++_i) {
        x = xs[i];
        if (f(x, i)) {
          return x;
        }
      }
    });
    fu.filter = fu.autoCurry(function(f, xs) {
      var i, x, _i, _len, _results;
      _results = [];
      for (i = _i = 0, _len = xs.length; _i < _len; i = ++_i) {
        x = xs[i];
        if (f(x, i)) {
          _results.push(x);
        }
      }
      return _results;
    });
    fu.any = fu.autoCurry(function(f, xs) {
      var i, x;
      if ((function() {
        var _i, _len, _results;
        _results = [];
        for (i = _i = 0, _len = xs.length; _i < _len; i = ++_i) {
          x = xs[i];
          if (f(x, i)) {
            _results.push(f(x));
          }
        }
        return _results;
      })()) {
        return true;
      }
      return false;
    });
    fu.all = fu.autoCurry(function(f, xs) {
      return (fu.filter(f, xs)).length === xs.length;
    });
    fu.contains = fu.autoCurry(function(a, xs) {
      var x;
      if ((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = xs.length; _i < _len; _i++) {
          x = xs[_i];
          _results.push(a === x);
        }
        return _results;
      })()) {
        return true;
      }
      return false;
    });
    fu.pluck = fu.autoCurry(function(key, xs) {
      var x, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = xs.length; _i < _len; _i++) {
        x = xs[_i];
        _results.push(x[key]);
      }
      return _results;
    });
    fu.addProperty = fu.autoCurry(function(obj, key, value) {
      obj[key] = value;
      return obj;
    });
    fu.min = fu.autoCurry(function(a, b) {
      if (a > b) {
        return b;
      } else {
        return a;
      }
    });
    fu.max = fu.autoCurry(function(a, b) {
      if (a > b) {
        return a;
      } else {
        return b;
      }
    });
    return fu;
  });

}).call(this);
