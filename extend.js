var types = require('./types'),
    HAS_SUPPORT_DEFINE_PROPERTY = !!Object.defineProperty
    propertyDescriptor = function(descriptor) {
        return types.isLikePropertyDescriptor(descriptor) ? descriptor : {
            configurable: true,
            enumerable: true,
            value: descriptor
        };
    },
    setProperty = function(target, name, descriptor) {
        descriptor = propertyDescriptor(descriptor);
        return HAS_SUPPORT_DEFINE_PROPERTY
            ? Object.defineProperty(target, name, descriptor)
            : target[name] = descriptor.value;
    },
    getProperty = function(obj, name) {
        return types.isLikePropertyDescriptor(obj[name])
            ? propertyDescriptor(obj[name])
            : Object.getOwnPropertyDescriptor(obj, name);
    }

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
                        setProperty(target, name, getProperty(sources, name));
                    }
                }
            }
        }
    }
    return target;
}

module.exports.extend = module.exports;
