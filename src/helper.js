var helper = {
    range: function(min, max) {
        var res = [];
        for(var i = min; i < max; i++) {
            res.push(i);
        }
        return res;
    },

    shuffle: function(ary) {
        ary.forEach(function(elem, i) {
            var rnd = Math.random() * (i + 1) | 0;
            ary[i] = ary[rnd];
            ary[rnd] = elem;
        });
    },
};
