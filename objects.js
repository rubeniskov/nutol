var types = require('./types');

var BUG_HAS_ENUM = !({
        'toString': null
    }).propertyIsEnumerable('toString'),
    NON_ENUM_PROPS = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
    HAS_SUPPORT_DEFINE_PROPERTY = !!Object.defineProperty;

var self = module.exports = {
    keys: function(obj) {
        var keys = [];
        if (obj == null || typeof obj !== 'object')
            return keys;

        if (Object.keys)
            return Object.keys(obj);

        var keys = [];
        for (var prop in obj)
            if (Object.hasOwnProperty.call(obj, prop))
                keys.push(prop);

            // Ahem, IE < 9.
        if (BUG_HAS_ENUM)
            for (var i = 0; i < NON_ENUM_PROPS.length; i++) {
                if (natives.hasOwnProperty.call(obj, NON_ENUM_PROPS[i]))
                    keys.push(NON_ENUM_PROPS[i]);
            };

        return keys;
    },
    values: function(obj) {
        var keys = self.keys(obj),
            i = 0,
            length = keys.length,
            values = Array(length);

        for (; i < length; i++)
            values[i] = obj[keys[i]];

        return values;
    },
    pairs: function(obj) {
        var i,

            keys = _.keys(obj),

            length = keys.length

        pairs = Array(length);

        for (i = 0; i < length; i++) {
            pairs[i] = [keys[i], obj[keys[i]]];
        }
        return pairs;
    },
    // value: function(obj, key, val) {
    //     if (key != null)
    //         return self.value(obj)(key, val);
    //
    //     return function(key, val) {
    //         var keys = key instanceof Array ? key : ('' + key).split(/\./);
    //
    //         key = keys.shift();
    //
    //         return key == null ? void 0 : keys.length > 0 ? self.value(obj[key], keys, val) : (val != null ? obj[key] = val : obj[key])
    //     }
    // },
    // property: function(key, obj) {
    //     if (obj != null)
    //         return self.property(key)(obj);
    //
    //     return function(obj) {
    //         return obj == null ? void 0 : self.value(obj, key);
    //     };
    // },
    matches: function(attrs, obj) {
        if (obj)
            return self.matches(attrs)(obj);

        var pairs = self.pairs(attrs),

            length = pairs.length;

        return function(obj) {
            if (obj == null)
                return !length;

            obj = new Object(obj);

            for (var i = 0; i < length; i++) {
                var pair = pairs[i],
                    key = pair[0];

                if (pair[1] !== obj[key] || !(key in obj)) return false;
            }
            return true;
        };
    },
    has: function(obj, key) {
        return obj != null && Object.hasOwnProperty.call(obj, key);
    },
    descriptor: function(descriptor) {
        return types.isLikePropertyDescriptor(descriptor) ? descriptor : {
            configurable: true,
            enumerable: true,
            value: descriptor
        };
    },
    property: function(target, name, descriptor) {
        if (descriptor) {
            descriptor = self.descriptor(descriptor);
            return HAS_SUPPORT_DEFINE_PROPERTY ?
                Object.defineProperty(target, name, descriptor) :
                target[name] = descriptor.value;
        } else {
            return types.isLikePropertyDescriptor(target[name]) ?
                self.descriptor(target[name]) :
                Object.getOwnPropertyDescriptor(target, name);
        }

    }
}
