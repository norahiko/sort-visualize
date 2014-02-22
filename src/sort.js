
function SortAlgorithm(values) {
    this.values = values;
    this.size = values.length;
    this.steps = [];
    this.finished = false; 
}

SortAlgorithm.SWAP = 'swap';
SortAlgorithm.HIGHLIGHT = 'highlight';
SortAlgorithm.INSERT = 'insert';

SortAlgorithm.prototype.sort = function(algorithm) {
    this[algorithm]();
    if(algorithm !== 'bogo') {
        this.finished = true;
    }
};

SortAlgorithm.prototype.swap = function(a, b) {
    helper.swap(this.values, a, b);
    this.steps.push({
        type: SortAlgorithm.SWAP,
        indexes: [a, b],
    });
};

SortAlgorithm.prototype.highlight = function(a, b) {
    this.steps.push({
        type: SortAlgorithm.HIGHLIGHT,
        indexes: [a, b],
    });
};

SortAlgorithm.prototype.compare = function(a, b) {
    if(this.values[b] < this.values[a]) {
        this.swap(a, b);
    } else {
        this.highlight(a, b);
    }
};

SortAlgorithm.prototype.insert = function(from, to) {
    helper.insert(this.values, from, to);
    this.steps.push({
        type: SortAlgorithm.INSERT,
        indexes: [to],
    });
};


SortAlgorithm.prototype.bubble = function bubbleSort() {
    for(var i = this.size - 1; 0 < i; i--) {
        for(var k = 0; k < i; k++) {
            this.compare(k, k + 1);
        }
    }
};

SortAlgorithm.prototype.bogo = function bogoSort() {
    for(var i = 0; i < this.size; i++) {
        var rnd = (Math.random() * (this.size - i) | 0) + i;
        this.swap(i, rnd);
    }

    for(i = 0; i < this.size - 1; i++) {
        this.compare(i, i + 1);
        if(this.values[i + 1] < this.values[i]) {
            return;
        }
    }
    this.finished = true;
};

