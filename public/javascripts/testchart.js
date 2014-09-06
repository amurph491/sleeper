$(document).ready(function() {

    var pathname = window.location.pathname;
    console.log(pathname);

    var options = {
        chart: {
            renderTo: 'container_temp',
            type: 'spline'
        },
        series: [{}]
    };

    $.getJSON('/m/53fbf603f2426e0000f3e131/s', function(result) {
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

    $.getJSON('/m/53fbf603f2426e0000f3e131/s', function(result) {
        console.log(result);
                
       var data = result.measurements.map(function(json){
                        return json.sound;});
        data = data.map(Number);
        options.series[0].data = data;

        var chart = new Highcharts.Chart(options);
    });

});