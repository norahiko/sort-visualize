
function SortStep(type, indexes) {
    // type = 'swap' | 'highlight' | 'insert'
    this.type = type;
    // アニメーション時にハイライトさせるインデックスの配列
    this.indexes = indexes;
}

SortStep.prototype.run = function(ary) {
    if(this.type === SortStep.SWAP) {
        helper.swap(ary, this.indexes[0], this.indexes[1]);
    } else if(this.type === SortStep.INSERT) {
        helper.insert(ary, this.indexes[0], this.indexes[1]);
    }
};

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
    this.steps.reverse();
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
    this.addStep(SortStep.INSERT, [to, -1]);
};

SortAlgorithm.prototype.bubble = function bubbleSort() {
    for(var i = this.size - 1; 0 < i; i--) {
        for(var k = 0; k < i; k++) {
            if(this.values[k] > this.values[k + 1]) {
                this.swap(k, k + 1);
            } else {
                this.highlight([k, k + 1]);
            }
        }
    }
};

SortAlgorithm.prototype.select = function selectSort() {
    for(var i = 0; i < this.size - 1; i++) {
        var min = i;
        for(var k = i + 1; k < this.size; k++) {
            this.highlight([min, k]);
            if(this.values[k] < this.values[min]) {
                min = k;
            }
        }
        this.swap(i, min);
    }
};

SortAlgorithm.prototype.insertion = function insertionSort() {
    for(var i = 1; i < this.size; i++) {
        for(var k = i; 0 < k; k--) {
            if(this.values[k - 1] > this.values[k]) {
                this.swap(k - 1, k);
            } else {
                this.highlight([k - 1, k]);
                break;
            }
        }
    }
};

SortAlgorithm.prototype.shell = function shellSort() {
    var gap = 1;
    while(gap < this.size) {
        gap = gap * 3 + 1;
    }

    while(1 < gap) {
        gap = gap / 3 | 0;
        for(var i = gap; i < this.size; i++) {
            for(var k = i; 0 < k; k -= gap) {
                if(this.values[k - gap] > this.values[k]) {
                    this.swap(k - gap, k);
                } else {
                    this.highlight([k - gap, k]);
                    break;
                }
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
        if(this.values[i] > this.values[i + 1]) {
            return;
        }
    }
    this.finished = true;
};

