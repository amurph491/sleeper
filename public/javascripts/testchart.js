$(document).ready(function() {

    var pathname = window.location.pathname;
    var nid = pathname.slice(3,27);

    var options_t = {
        chart: {
            renderTo: 'container_temp',
            type: 'spline'
        },
        series: [{}]
    };

    var options_s = {
        chart: {
            renderTo: 'container_sound',
            type: 'spline'
        },
        series: [{}]
    };


    // Get data into array for temperature
    var data_t = ldoc.measurements.map(function(json){
                        return json.temp;});
    data_t = data_t.map(Number);
    options_t.series[0].data = data_t;
    var chart_t = new Highcharts.Chart(options_t);

    // Get data into array for sound
    var data_s = ldoc.measurements.map(function(json){
                        return json.sound;});
    data_s = data_s.map(Number);
    options_s.series[0].data = data_s;
    var chart_s = new Highcharts.Chart(options_s);

});
