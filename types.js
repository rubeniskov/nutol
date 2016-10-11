var hasOwn = Object.prototype.hasOwnProperty,
    toStr = Object.prototype.toString,
    REGEXP_PROPERTY_DESCRIPTOR_CONFENUM = /(configurable|enumerable)/,
    REGEXP_PROPERTY_DESCRIPTOR_GETSETVAL = /(set|get)|(value)/;

var types = module.exports = {
    isPlainObject: function(obj) {
        if (!obj || !types.isObject(obj))
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
    isLikePropertyDescriptor: function isArray(descriptor) {
        var keys = Object.keys(descriptor).join(' ');
        return REGEXP_PROPERTY_DESCRIPTOR_CONFENUM.test(keys) && REGEXP_PROPERTY_DESCRIPTOR_GETSETVAL.test(keys);
    }
}
