var expect = require("chai").expect;
var nutol = require("..");

describe('Arrays', function() {

    var array;
    beforeEach(function() {
        array = [
            1, 2, 3, 4, 4, 5,
            'foo', false, true, 0,
            false, false, 'true', 0,
            undefined, null, undefined,
            'bar', 3, 4, function foo(){},
            function bar(){}, new Object()
          ]
    })
    describe('unique', function() {

        it('should return a unique array values', function() {
            var unarr = nutol.unique(array);
            expect(unarr).to.have.deep.property('[0]', 1);
            expect(unarr).to.have.deep.property('[3]', 'foo');
        });

    });

});
