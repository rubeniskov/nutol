var expect = require("chai").expect;
var nutol = require("..");

describe('Nutol', function() {

    describe('isObject', function() {
        it('should return a true', function() {
            expect(nutol.isObject({})).to.be.true;
        });
    });

    describe('isPlainObject', function() {
        it('should return a true', function() {
            expect(nutol.isPlainObject({})).to.be.true;
        });
    });

    describe('isArray', function() {
        it('should return a true', function() {
            expect(nutol.isArray([])).to.be.true;
        });
    });

    describe('empty', function() {
        it('should return a true', function() {
            expect(nutol.empty({}, [])).to.be.true;
        });

        it('should return a false', function() {
            expect(nutol.empty({'foo': 'bar'}, [])).to.be.false;
        });
    });

    describe('extend', function() {
        it('should return a true', function() {
            expect(nutol.extend({'foo': 'bar'}, {'bar': 'foo'})).to.have.property('bar');
        });
    });
});
