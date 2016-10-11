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
            expect(nutol.empty({
                'foo': 'bar'
            }, [])).to.be.false;
        });
    });

    describe('extend', function() {
        it('should return a true', function() {
            expect(nutol.extend({
                'foo': 'bar'
            }, {
                'bar': 'foo'
            })).to.have.property('bar');
        });

        it('should define property', function() {
            var obj = nutol.extend({}, {
                'foo': {
                    configurable: true,
                    enumerable: true,
                    get: function() {
                        return 'bar'
                    }
                }
            }, {
                get bar() {
                    return 'foo'
                }
            });

            expect(obj).to.have.property('bar');
            expect(obj).to.have.property('foo');
            expect(obj.bar).to.be.equal('foo');
            expect(obj.foo).to.be.equal('bar');

        });
    });

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
    });
});
