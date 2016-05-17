const
    hasOwn = Object.prototype.hasOwnProperty,
    toStr = Object.prototype.toString,
    nutol = module.exports = {
        isPlainObject: function(obj) {
            if (!obj || !nutol.isObject(obj))
                return false;
            var hasOwnConstructor = hasOwn.call(obj, 'constructor');
            var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
            if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf)
                return false;
            var key;
            for (key in obj);

            return typeof key === 'undefined' || hasOwn.call(obj, key);
        },
        isObject: function isArray(obj) {
            if (typeof Array.isObject === 'function')
                return Object.isObject(obj);

            return toStr.call(obj) === '[object Object]';
        },
        isArray: function isArray(arr) {
            if (typeof Array.isArray === 'function')
                return Array.isArray(arr);

            return toStr.call(arr) === '[object Array]';
        },
        extend: function() {
            var options, name, src, copy, copyIsArray, clone;
            var target = arguments[0];
            var i = 1;
            var length = arguments.length;
            var deep = false;

            if (typeof target === 'boolean') {
                deep = target;
                target = arguments[1] || {};
                i = 2;
            } else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
                target = {};
            }

            for (; i < length; ++i) {
                options = arguments[i];
                if (options != null) {
                    for (name in options) {
                        src = target[name];
                        copy = options[name];

                        if (target !== copy) {
                            if (deep && copy && (nutol.isPlainObject(copy) || (copyIsArray = nutol.isArray(copy)))) {
                                if (copyIsArray) {
                                    copyIsArray = false;
                                    clone = src && nutol.isArray(src) ? src : [];
                                } else {
                                    clone = src && nutol.isPlainObject(src) ? src : {};
                                }

                                target[name] = extend(deep, clone, copy);

                            } else if (typeof copy !== 'undefined') {
                                target[name] = copy;
                            }
                        }
                    }
                }
            }
            return target;
        }
    }
