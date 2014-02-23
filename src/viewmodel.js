
function ViewModel() {
    this.algorithm = ko.observable('bubble');
    this.size = ko.observable(50);
    this.speed = ko.observable(50);

    this.sort = null;
    this.nums = [];
    this.algorithmList = ['bubble', 'insertion', 'quick', 'bogo'];
    this.sizeList = [5, 10, 50, 100, 200];
    this.speedMin = 1;      // 3 seconds
    this.speedMax = 750;    // 4 milliseconds
    this.intervalId = -1;

    this.changed = ko.computed({
        read: function() {
            this.start(this.algorithm(), this.size());
        },
        owner: this,
        deferEvaluation: true,
    });
}

ViewModel.prototype.start = function(algorithm, size) {
    var vm = this;
    this.nums = helper.range(1, size + 1);
    helper.shuffle(this.nums);
    this.sort = new SortAlgorithm(this.nums.slice());

    clearInterval(this.intervalId);
    this.intervalId = setTimeout(animationFrame, this.getIntervalTime());

    function animationFrame() {
        if(vm.sort.steps.length === 0) {
            if(vm.sort.finished) {
                return;
            } else {
                vm.sort.sort(algorithm);
            }
        }

        var step = vm.sort.steps.pop();
        step.run(vm.nums);
        graph.draw(step.indexes, vm.nums);
        //setTimeout(animationFrame, vm.getIntervalTime());
    }
};

ViewModel.prototype.restart = function() {
    this.start(this.algorithm.peek(), this.size.peek());
};

ViewModel.prototype.getIntervalTime = function() {
    return 3000 / this.speed.peek();
};

