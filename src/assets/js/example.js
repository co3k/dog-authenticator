'use strict';

var _ = require('lodash');

document.addEventListener('DOMContentLoaded', function () {
    var lock = document.getElementById('lock');
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    navigator.getUserMedia({audio: true}, function (stream) {
        document.getElementById('audio').src = URL.createObjectURL(stream);

        var context = new AudioContext();

        var analyser = context.createAnalyser();
        context.createMediaStreamSource(stream).connect(analyser);

        var frequency = new Uint8Array(analyser.frequencyBinCount);

        var process = function () {
            var date = new Date();
            analyser.getByteFrequencyData(frequency);

            var count = _.filter(frequency, function (n) { return n > 0; }).length;
            var avg = _.sum(frequency) / count;
            if (avg > 50 && count > 400 && count < 600) {
                lock.submit();
                return;
            }

            var summary = 'count: ' + count + ' / avg:' + avg;
            console.log(summary);

            setTimeout(process, 1000);
        };

        process();
    }, function (e) {
        console.error(e);
    });
});
