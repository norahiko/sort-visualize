"use strict";

var assert = chai.assert;
var equal = assert.strictEqual;
var deepEqual = assert.deepEqual;


describe('helper', function() {
    it('range', function() {
        deepEqual(helper.range(0, 3), [0, 1, 2]);
        deepEqual(helper.range(1, 6), [1, 2, 3, 4, 5]);
        deepEqual(helper.range(3, 3), []);
    });

    it('shuffle', function() {
        var ary = [1, 2, 3, 4, 5, 6, 7];
        helper.shuffle(ary);
        assert.notDeepEqual(
            ary,
            [1, 2, 3, 4, 5, 6, 7]
        );

        assert.deepEqual(
            ary.sort(function(a, b) { return a > b }),
            [1, 2, 3, 4, 5, 6, 7]
        );
    });

    it('swap', function() {
        var ary = [1, 2, 3, 4];
        helper.swap(ary, 0, 1);
        deepEqual(ary, [2, 1, 3, 4]);

    });

    it('swap invalid', function() {
        var ary = [1, 2, 3, 4];
        assert.throws(function() {
            helper.swap(ary, 0, 4);
        });
    });

    it('insert', function() {
        var ary = [1, 2, 3, 4];
        helper.insert(ary, 3, 0);
        deepEqual(ary, [4, 1, 2, 3]);
    });

    it('insert invalid', function() {
        var ary = [1, 2, 3, 4];
        assert.throws(function() {
            helper.insert(ary, 0, 4);
        });
    });
});


describe('SortAlgorithm', function() {
    function isHighlight(step) {
        return step.type === SortStep.HIGHLIGHT;
    }

    it('bubble sort', function() {
        var ary = [5, 4, 3, 2, 1];
        var sort = new SortAlgorithm(ary);
        sort.sort('bubble');
        deepEqual(sort.values, [1, 2, 3, 4, 5]);
        equal(sort.steps.length, ary.length * (ary.length - 1) / 2);
    });

    it('sorted bubble sort', function() {
        var ary = [1, 2, 3];
        var sort = new SortAlgorithm(ary);
        sort.sort('bubble');
        equal(sort.steps.length, 3);
        assert(sort.steps.every(isHighlight), 'steps are all Highlight');
    });

    it('bogo sort', function() {
        var sort = new SortAlgorithm([5, 4, 3, 2, 1]);
        sort.sort('bogo');

        var values = sort.values.sort(function(a, b) { return a > b });
        deepEqual(values, [1, 2, 3, 4, 5]);
    });

    it('bogo sort 1', function() {
        var sort = new SortAlgorithm([1]);
        sort.sort('bogo');
        equal(sort.steps.length, 1);
        assert(sort.finished, 'bogosort is finished');
    });

    it('selection sort', function() {
        var ary = [3, 2, 4, 1, 5, 6];
        var sort = new SortAlgorithm(ary);
        sort.sort('selection');
        equal(sort.steps.length, (ary.length * (ary.length - 1)) / 2 + ary.length - 1);
        deepEqual(sort.values, [1, 2, 3, 4, 5, 6]);
    });

    it('shaker sort', function() {
        var ary = [3, 4, 7, 1, 2, 6, 8, 5];
        var sort = new SortAlgorithm(ary);
        sort.sort('shaker');
        deepEqual(sort.values, [1, 2, 3, 4, 5, 6, 7, 8]);
        //equal(sort.steps.length, 10);
    });

    it('insertion sort', function() {
        var ary = [5, 4, 3, 2, 1];
        var sort = new SortAlgorithm(ary);
        sort.sort('insertion');
        deepEqual(sort.values, [1, 2, 3, 4, 5]);
        equal(sort.steps.length, 10);
    });

    it('shell sort', function() {
        var ary = [7, 6, 5, 4, 3, 2, 1];
        var sort = new SortAlgorithm(ary);
        sort.sort('shell');
        deepEqual(sort.values, [1, 2, 3, 4, 5, 6, 7]);
        equal(sort.steps.length, 15);
    });

    it('merge sort', function() {
        var ary = [7, 6, 5, 4, 3, 2, 1];
        var sort = new SortAlgorithm(ary);
        sort.sort('merge');
        deepEqual(sort.values, [1, 2, 3, 4, 5, 6, 7]);
        equal(sort.steps.length, 18);
    });
});


describe('ViewModel', function() {
    var testView;
    var sortStub;
    var drawStub;

    beforeEach(function() {
        testView = document.createElement('div');
        sortStub = sinon.stub(window, 'SortAlgorithm');
        drawStub = sinon.stub(graph, 'draw');
    });

    afterEach(function() {
        sortStub.restore();
        drawStub.restore();
    });

    it('called graph.draw', function(done) {
        var indexes = [0, 1];
        sortStub.returns({
            steps: [new SortStep('swap', indexes)],
            finished: true,
            sort: function() {}
        });

        var vm = new ViewModel();
        ko.applyBindings(vm, testView);
        vm.speed(500);
        vm.changed();

        setTimeout(function() {
            assert(drawStub.calledWith(indexes));
            done();
        }, 20);
    });
});
