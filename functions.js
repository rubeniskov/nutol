var REGEXP_LTRIM = /^[\s\uFEFF\xA0]+/g;

var self = module.exports = {
    noop: function(val) {
        return val != null ? function() {
            return val
        } : function() {};
    },
    negate: function(fn, args) {
        return function() {
            return !fn.apply(this, arguments);
        };
    },
    lambda: function(exp) {
        return exp instanceof Function ? exp : new Function('x', 'y', 'return (' + exp + ')');
    },
    prepare: function(fn, context, args) {
        switch (args) {
            case context === void 0:
                return fn;
            case 1:
                return function(a) {
                    return fn.call(context, a);
                };
            case 2:
                return function(a, b) {
                    return fn.call(context, a, b);
                };
            case 3:
                return function(a, b, c) {
                    return fn.call(context, a, b, c);
                };
            case 4:
                return function(a, b, c, d) {
                    return fn.call(context, a, b, c, d)
                };
            case 5:
                return function(a, b, c, d, e) {
                    return fn.call(context, a, b, c, d, e)
                };
            default:
                return function() {
                    return fn.apply(context, arguments);
                };
        };
    },
    iterator: function(value, context) {
        var type = typeof(value);

        if (value == null)
            return function(value) {
                return value
            };

        if (type === 'function')
            return self.prepare(value, context, 3);

        if (type === 'object')
            return self.matches(value);

        return self.property(value);
    },
    bind: function(fn, context) {
        if (Function.prototype.bind && fn.bind === Function.prototype.bind)
            return Function.prototype.bind.apply(fn, slice.call(arguments, 1));

        if (!typeof fn == 'function')
            throw new TypeError('Bind must be called on a function');

        var args = slice.call(arguments, 2);
    },
    throttle: function(fn, wait, options) {
        options = options ? options : {};

        var context, args, result,
            timeout = null,
            previous = 0;

        later = function() {
            previous = options.leading === false ? 0 : self.now(); // TODO
            timeout = null;
            result = fn.apply(context, args);

            if (!timeout)
                context = args = null;
        };

        return function() {
            var now = self.now(); // TODO

            if (!previous && options.leading === false)
                previous = now;

            var remaining = wait - (now - previous);

            context = this;
            args = arguments;

            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);

                    timeout = null;
                }
                previous = now;
                result = fn.apply(context, args);

                if (!timeout) context = args = null;

            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }

            return result;
        };
    },
    thread: function(fn, delay, context) {
        return new(function() {
            (this.launch = function(d) {
                this._thd = setTimeout(context ? self.prepare(fn, context, Infinity) : fn, d || delay);
            })(0)

            this.kill = function() {
                clearTimeout(this._thd);
            }
        })()
    },
    interval: function(fn, delay, context) {
        return new(function() {
            this.start = function(d) {
                this._int = setInterval(context ? self.prepare(fn, context, Infinity) : fn, d || delay);
            }

            this.stop = function() {
                clearInterval(this._int);
            }

            this.start(0);
        })();
    }
}
