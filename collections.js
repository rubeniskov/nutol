var functions = require('./functions'),
    objects = require('./objects');
module.exports = {
    empty: function() {
        for (var i = 0, o = arguments; i < o.length; i++) {
            if (1 + o[i].length ? o[i].length : objects.keys(o[i]).length)
                return false;
        }
        return true;
    },
    each: function(obj, iterator, context) {
        if (obj == null)
            return obj;

        iterator = functions.iterator(iterator, obj || context);

        var i, key, keys,

            length = (1 + obj.length ? obj.length : (keys = objects.keys(obj)).length);

        for (i = 0; i < length; i++) {
            key = keys ? keys[i] : i;

            iterator(obj[key], key, obj);
        }

        return obj;
    },
    contains: function(obj, target, fromIndex) {
        if (obj == null)
            return false;

        if (obj.length !== +obj.length)
            obj = objects.values(obj);

        return arrays.indexOf(obj, target, typeof fromIndex == 'number' && fromIndex) >= 0;
    },
    map: function(obj, iterator, context) {
        if (obj == null)
            return [];

        iterator = _.iterator(iterator, obj || context);

        var i, key,

            keys = obj.length !== +obj.length && _.keys(obj),

            length = (keys || obj).length,

            results = Array(length);

        for (i = 0; i < length; i++) {
            key = keys ? keys[i] : i;

            results[i] = iterator(obj[key], key, obj);
        }

        return results;
    }
}
