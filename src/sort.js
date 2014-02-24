
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
        this.indexes[0] = -1;
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

SortAlgorithm.prototype.highlight = function(a, b) {
    this.addStep(SortStep.HIGHLIGHT, [a, b]);
};

SortAlgorithm.prototype.insert = function(from, to) {
    helper.insert(this.values, from, to);
    this.addStep(SortStep.INSERT, [from, to]);
};

SortAlgorithm.prototype.bubble = function bubbleSort() {
    for(var i = this.size - 1; 0 < i; i--) {
        for(var k = 0; k < i; k++) {
            if(this.values[k] > this.values[k + 1]) {
                this.swap(k, k + 1);
            } else {
                this.highlight(k, k + 1);
            }
        }
    }
};

SortAlgorithm.prototype.selection = function selectionSort() {
    for(var i = 0; i < this.size - 1; i++) {
        var min = i;
        for(var k = i + 1; k < this.size; k++) {
            this.highlight(min, k);
            if(this.values[k] < this.values[min]) {
                min = k;
            }
        }
        this.swap(i, min);
    }
};

SortAlgorithm.prototype.shaker = function shakerSort() {
    var left = 0;
    var right = this.size - 1;
    var incr = 1;
    var i = 0;
    var next;
    var lastSwapped = 0;

    var count = 0;
    while(left < right) {
        next = i + incr;
        if((incr === 1 && this.values[i] > this.values[next]) || (incr === -1 && this.values[next] > this.values[i])) {
            this.swap(i, next);
            lastSwapped = i;
        } else {
            this.highlight(i, next);
        }

        if(next === right) {
            i = right = lastSwapped;
            incr = -incr;
        } else if(next === left) {
            i = left = lastSwapped;
            incr = -incr;
        } else {
            i = next;
        }
    }
};

SortAlgorithm.prototype.insertion = function insertionSort() {
    for(var i = 1; i < this.size; i++) {
        for(var k = i; 0 < k; k--) {
            if(this.values[k - 1] > this.values[k]) {
                this.swap(k - 1, k);
            } else {
                this.highlight(k - 1, k);
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
                    this.highlight(k - gap, k);
                    break;
                }
            }
        }
    }
};

SortAlgorithm.prototype.merge = function mergeSort() {
    this.mergeSortImpl(0, this.size - 1);
};

SortAlgorithm.prototype.mergeSortImpl = function(left, right) {
    if(right <= left) {
        return;
    }
    var middle = (left + right) / 2 | 0;
    this.mergeSortImpl(left, middle);
    this.mergeSortImpl(middle + 1, right);

    var l = left;
    var m = middle + 1;
    while(l < m && m <= right) {
        this.highlight(l, m);
        if(this.values[l] >= this.values[m]) {
            this.insert(m, l);
            m++;
        }
        l++;
    }
};

SortAlgorithm.prototype.quick = function quickSort() {
    this.quickSortImpl(0, this.size - 1);
};

SortAlgorithm.prototype.quickSortImpl = function(left, right) {
    var values = this.values;
    var middle = (left + right) / 2 | 0;
    var pivot = helper.median3(values[left], values[middle], values[right]);
    var l = left;
    var r = right;
    while(true) {
        while(values[l] < pivot) {
            this.highlight(l, r);
            l++;
        }
        while(pivot < values[r]) {
            this.highlight(l, r);
            r--;
        }
        if(r <= l) {
            break;
        }
        this.swap(l, r);
        l++;
        r--;
    }

    if(left < l - 1) {
        this.quickSortImpl(left, l - 1);
    }
    if(r + 1 < right) {
        this.quickSortImpl(r + 1, right);
    }
};

SortAlgorithm.prototype.bogo = function bogoSort() {
    for(var i = 0; i < this.size; i++) {
        var rnd = (Math.random() * (this.size - i) | 0) + i;
        this.swap(i, rnd);
    }

    // valuesが整列済みになっているか調べる
    for(i = 0; i < this.size - 1; i++) {
        this.highlight(i, i + 1);
        if(this.values[i] > this.values[i + 1]) {
            return;
        }
    }
    this.finished = true;
};

