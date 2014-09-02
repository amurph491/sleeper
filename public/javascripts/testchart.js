$(document).ready(function() {

    var options = {
        chart: {
            renderTo: 'container_temp',
            type: 'spline'
        },
        series: [{}]
    };

    $.getJSON('/m/serve/53fbf603f2426e0000f3e131', function(result) {
        console.log(result);
                
       var data = result.measurements.map(function(json){
                        return json.temp;});
        data = data.map(Number);
        options.series[0].data = data;

        var chart = new Highcharts.Chart(options);
    });

});

$(document).ready(function() {

    var options = {
        chart: {
            renderTo: 'container_sound',
            type: 'spline'
        },
        series: [{}]
    };

    $.getJSON('/m/serve/53fbf603f2426e0000f3e131', function(result) {
        console.log(result);
                
       var data = result.measurements.map(function(json){
                        return json.sound;});
        data = data.map(Number);
        options.series[0].data = data;

        var chart = new Highcharts.Chart(options);
    });

});