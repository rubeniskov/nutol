var extend = require('./extend');

module.exports = extend({},
    require('./extend'),
    require('./types'),
    require('./collections'),
    require('./objects'),
    require('./arrays'),
    require('./functions'));
