(async () => {

    const topology = await fetch(
      'https://code.highcharts.com/mapdata/custom/world.topo.json'
    ).then(response => response.json());
  
    Highcharts.getJSON('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/world-population-density.json', function (data) {
  
      // Prevent logarithmic errors in color calulcation
      data.forEach(function (p) {
        p.value = (p.value < 1 ? 1 : p.value);
        p.name = p.name;
      });
  
      // Initialize the chart
      Highcharts.mapChart('container', {
        chart: {
          map: topology
        },
  
        title: {
          text: 'Zoom in on country by double click'
        },
  
        mapNavigation: {
          enabled: true,
          enableDoubleClickZoomTo: true
        },
  
        colorAxis: {
          min: 1,
          max: 1000,
          type: 'logarithmic'
        },
  
        series: [{
          data: data,
          joinBy: ['iso-a3', 'code3'],
          name: 'irina', //'irina',  
          states: {
            hover: {
              color: '#123456'
            }
          },
          tooltip: {
            valueSuffix: '' //'anaaremere' // km²'
          }
        }]
      });
    });
  
  })();