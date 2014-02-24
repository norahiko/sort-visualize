var graph = {};

(function() {
    var canvas;
    var ctx;
    var width;
    var height;

    var bgColor = '#eee';
    var barColor = '#999';
    var highlightColor = '#69f';

    graph.init = function(c) {
        canvas = c;
        ctx = canvas.getContext('2d');
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
    };

    graph.draw = function(highlightIndexes, values) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);
        var idx1 = highlightIndexes[0];
        var idx2 = highlightIndexes[1];

        var size = values.length;
        var barWidth = (width - size + 1) / size;
        var barHeightUnit = height / size;

        var x = 0;
        var h = 0;
        ctx.fillStyle = barColor;
        for(var i = 0; i < values.length; i++) {
            h = values[i] * barHeightUnit;
            if(i === idx1 || i === idx2) {
                ctx.fillStyle = highlightColor;
                ctx.fillRect(x, height- h, barWidth, h);
                ctx.fillStyle = barColor;
            } else {
                ctx.fillRect(x, height- h, barWidth, h);
            }
            x = x + barWidth + 1;
        }
    };
})();
