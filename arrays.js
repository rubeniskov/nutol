var functions = require('./functions'),
    collections = require('./collections');

var self = module.exports = {
    indexOf: function(array, iterator) {
        iterator = functions.iterator(iterator, array);
        for (var i = array.length; i--;) {
            if (iterator(array[i], i, array) === false)
                return i;
        }
        return -1;
    },
    findIndex: function(array, iterator, dir, context) {
        dir = dir === -1 ? -1 : 1;
        iterator = functions.iterator(iterator, context);
        var length = array && array.length || 0;
        var index = dir > 0 ? 0 : length - 1;
        for (; index >= 0 && index < length; index += dir) {
            if (iterator(array[index], index, array)) return index;
        };
        return -1;
    },
    filter: function(array, iterator, copy) {
        copy = copy == true ? [].concat(array) : array;
        iterator = functions.iterator(iterator, copy);
        for (var i = copy.length; i--;) {
            if (iterator(copy[i], i, copy) === false)
                copy.splice(i, 1);
        }
        return copy;
    },
    merge: function(first, second) {
        var len = +second.length,
            j = 0,
            i = first.length;

        for (; j < len; j++)
            first[i++] = second[j];
        first.length = i;
        return first;
    },
    unique: function(array, iterator, matches, check) {
        check = check || function(va, vb) {
            return va === vb;
        };
        matches = matches || 1;
        iterator = functions.iterator(iterator, array);
        for (var i = array.length, m = 1; i-- && (m = 1);) {
            self.filter(array, function(v, j) {
                return !(check(iterator(array[i], i), iterator(v, j)) && m++ > matches);
            });
        }
        return array;
    },
    sortBy: function(array, fields) {
        return (function(fields) {
            return utils.array.sort(array, function(value, index, list) {
                return fields.map(function(field) {
                    return field(value, index, list);
                }).join('-');
            });
        })((fields || []).map(function(field) {
            return functions.iterator(field, array);
        }))
    },
    sort: function(array, iterator, alpha) {
        iterator = functions.iterator(iterator, array);
        return collection.pluck(
            collection.map(array, function(value, index, list) {
                return {
                    value: value,
                    index: index,
                    criteria: iterator(value, index, list)
                };
            }).sort((function(chunkify) {
                return function(left, right) {
                    var a = chunkify(left.criteria),
                        b = chunkify(right.criteria);

                    for (x = 0; a[x] && b[x]; x++) {
                        if (a[x] !== b[x]) {
                            var c = Number(a[x]),
                                d = Number(b[x]);
                            if (c == a[x] && d == b[x]) {
                                return c - d;
                            } else return (a[x] > b[x]) ? 1 : -1;
                        }
                    }

                    return a.length - b.length;
                }
            }(function(t) {
                var tz = [],
                    x = 0,
                    y = -1,
                    n = 0,
                    i, j;
                while (i = (j = t.toString().charAt(x++)).charCodeAt(0)) {
                    var m = (i == 46 || (i >= 48 && i <= 57));
                    if (m !== n) {
                        tz[++y] = "";
                        n = m;
                    }
                    tz[y] += j;
                }
                return tz;
            }))), 'value');
    }
}
