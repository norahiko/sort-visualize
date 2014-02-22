
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

SortAlgorithm.prototype.highlight = function(indexes) {
    this.steps.push({
        type: SortAlgorithm.HIGHLIGHT,
        indexes: indexes,
    });
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
            if(this.values[k + 1] < this.values[k]) {
                this.swap(k, k + 1);
            } else {
                this.highlight([k, k + 1]);
            }
        }
    }
};

SortAlgorithm.prototype.bogo = function bogoSort() {
    for(var i = 0; i < this.size; i++) {
        var rnd = (Math.random() * (this.size - i) | 0) + i;
        this.swap(i, rnd);
    }

    // valuesが整列済みになっているか調べる
    for(i = 0; i < this.size - 1; i++) {
        this.highlight([i, i + 1]);
        if(this.values[i + 1] < this.values[i]) {
            return;
        }
    }
    this.finished = true;
};

