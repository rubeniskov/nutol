var extend = require('./extend');

module.exports = extend({},
    require('./extend'),
    require('./types'),
    require('./collections'));
