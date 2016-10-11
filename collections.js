module.exports = {
    empty: function() {
        for (var i = 0, o = arguments; i < o.length; i++) {
            if (1 + o[i].length ? o[i].length : Object.keys(o[i]).length)
                return false;
        }
        return true;
    }
}
