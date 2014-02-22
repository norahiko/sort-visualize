
function SortStep(type, indexes) {
    // type = 'swap' | 'highlight' | 'insert'
    this.type = type;
    // アニメーション時にハイライトさせるインデックスの配列
    this.indexes = indexes;
}

SortStep.SWAP = 'swap';
SortStep.HIGHLIGHT = 'highlight';
SortStep.INSERT = 'insert';

function SortAlgorithm(values) {
    this.values = values;
    this.size = values.length;
    this.steps = [];
    this.finished = false;
}


SortAlgorithm.prototype.sort = function(algorithm) {
    this[algorithm]();
    // ボゴソートはソートが完了せずに終了する
    if(algorithm !== 'bogo') {
        this.finished = true;
    }
};

SortAlgorithm.prototype.addStep = function(type, indexes) {
    this.steps.push(new SortStep(type, indexes));
};

SortAlgorithm.prototype.swap = function(a, b) {
    helper.swap(this.values, a, b);
    this.addStep(SortStep.SWAP, [a, b]);
};

SortAlgorithm.prototype.highlight = function(indexes) {
    this.addStep(SortStep.HIGHLIGHT, indexes);
};

SortAlgorithm.prototype.insert = function(from, to) {
    helper.insert(this.values, from, to);
    this.addStep(SortStep.INSERT, [to]);
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

