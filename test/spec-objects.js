var expect = require("chai").expect;
var nutol = require("..");

describe('Objects', function() {
    describe('objects', function() {
        it('should return property keys', function() {
            var obj = {
                'foo': 'bar'
            };

            expect(obj).to.have.property('foo');
            expect(nutol.keys(obj)).that.is.an('array');
            expect(nutol.keys(obj)).to.include.members(['foo']);
        });

        it('should return property values', function() {
            var obj = {
                'foo': 'bar'
            };
            expect(obj).to.have.property('foo');
            expect(nutol.values(obj)).that.is.an('array');
            expect(nutol.values(obj)).to.include.members(['bar']);
        });

        it('should return property descriptor', function() {
            var obj = {
                'foo': 'bar'
            };

            // console.log(nutol.property(obj, 'foo', 'jur'));
            // console.log(nutol.property(obj, 'foo'));
            // expect(obj).to.have.property('foo');
            // expect(nutol.values(obj)).that.is.an('array');
            // expect(nutol.values(obj)).to.include.members(['bar']);
        });
    });
});
