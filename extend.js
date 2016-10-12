var types = require('./types'),
    objects = require('./objects');

module.exports = function extend() {
    var sources, name, src, copy, lpd, copyIsArray, clone;
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
        sources = arguments[i];
        if (sources != null) {
            for (name in sources) {
                src = target[name];
                copy = sources[name];
                lpd = types.isLikePropertyDescriptor(copy);
                if (target !== copy) {
                    if (deep && copy && ((!lpd && types.isPlainObject(copy)) || (copyIsArray = types.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && types.isArray(src) ? src : [];
                        } else {
                            clone = src && types.isPlainObject(src) ? src : {};
                        }
                        target[name] = extend(deep, clone, copy);
                    } else if (typeof copy !== 'undefined') {
                        objects.property(target, name, objects.property(sources, name));
                    }
                }
            }
        }
    }
    return target;
}

module.exports.extend = module.exports;
