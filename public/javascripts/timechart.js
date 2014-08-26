$(function () {
        $('#container').highcharts({
            title: {
                text: 'Temperature',
                x: -20 //center
            },
            
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '°C'
            },

            series: [{
                name: '',
                data: []
            }]
        },

    function (chart) {
        if (!chart.renderer.forExport) {
            setInterval(function () {
                var series = chart.series[0];
            
                newVal = $.ajax({url:"/m/serve/53fbf603f2426e0000f3e131",success:function(result){
                    console.log(newVal);
                    var json = newVal.responseText;
                    console.log(json);
                    var obj = $.parseJSON(json);
                    console.log("obj:" + obj);

                    var data = obj.measurements.map(function(meas){
                        return meas.temp;});
                    series.setData(data.map(Number));

                }});
                        
            }, 10000);
        }

    }
        );
    });