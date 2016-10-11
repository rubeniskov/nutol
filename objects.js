var BUG_HAS_ENUM = !({
        'toString': null
    }).propertyIsEnumerable('toString'),
    NON_ENUM_PROPS = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];

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
    }
}
