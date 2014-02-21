"use strict";

var assert = chai.assert;
var equal = assert.strictEqual;
var deepEqual = assert.deepEqual;


describe('first test', function() {
    it('it', function() {
        assert(true);
    });
});


describe('helper', function() {
    it('range', function() {
        deepEqual(helper.range(0, 3), [0, 1, 2]);
        deepEqual(helper.range(1, 6), [1, 2, 3, 4, 5]);
        deepEqual(helper.range(3, 3), []);
    });

    it('shuffle', function() {
        var ary = [1, 2, 3, 4, 5];
        helper.shuffle(ary);
        assert.notDeepEqual(
            ary,
            [1, 2, 3, 4, 5]
        );

        assert.deepEqual(
            ary.sort(function(a, b) { return a > b }),
            [1, 2, 3, 4, 5]
        );
    });
});
