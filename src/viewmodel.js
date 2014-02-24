
function ViewModel() {
    this.algorithm = ko.observable('Bubble');
    this.size = ko.observable(50);
    this.speed = ko.observable(9);

    this.sort = null;
    this.nums = [];
    this.algorithmList = ['Bubble', 'Selection', 'Shaker', 'Insertion', 'Shell', 'Merge', 'Quick', 'Bogo'];
    this.sizeList = [5, 10, 50, 100, 150];
    this.speedMin = 1;      // 2 seconds
    this.speedMax = 22;     // 4 milliseconds
    this.intervalId = -1;

    graph.init(helper.getCanvas('graph-canvas'));

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
    this.intervalId = setTimeout(animationFrame, 0);

    function animationFrame() {
        if(vm.sort.steps.length === 0) {
            if(vm.sort.finished) {
                graph.draw([-1, -1], vm.nums);
                return;
            } else {
                vm.sort.sort(algorithm.toLowerCase());
                console.log(vm.sort.steps.length);
            }
        }

        var step = vm.sort.steps.pop();
        step.run(vm.nums);
        graph.draw(step.indexes, vm.nums);
        vm.intervalId = setTimeout(animationFrame, vm.getIntervalTime());
    }
};

ViewModel.prototype.restart = function() {
    this.start(this.algorithm.peek(), this.size.peek());
};

ViewModel.prototype.getIntervalTime = function() {
    var speed = parseInt(this.speed.peek(), 10);
    return 2000 / speed / speed | 0;
};

