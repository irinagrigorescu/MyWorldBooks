google.charts.load('current', {
    'packages':['geochart'],
  });
google.charts.setOnLoadCallback(drawRegionsMap);

function getData() {
    // Create dictionary of countries
    // e.g. France: 1
    var countriesDictionary = {};

    for (var i = 0; i < myBooks.length; i++) {
        var countryName = myBooks[i]['country'];

        if (countryName in countriesDictionary) {
            countriesDictionary[countryName] = countriesDictionary[countryName] + 1;
        } else {
            countriesDictionary[countryName] = 1;
        }
    }

    // Transform dictionary into list
    var countriesMap = [['Country', 'Books']];
    for(var key in countriesDictionary) {
        var value = countriesDictionary[key];
        countriesMap.push([key, value])
    }

    //console.log(countriesMap)
    return [countriesDictionary, countriesMap];
}

function getTop5Countries(myDict) {
    console.log(myDict)
    const top5 = Object
        .entries(myDict) // create Array of Arrays with [key, value]
        .sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
        .slice(0, 5); // return only the first 3 elements of the intermediate result
        //.map(([n])=> n); // and map that to an array with only the name

    //console.log(top5);

    return top5
}

function drawRegionsMap() {
    // Get data about what I read
    var dataOnBooks = getData();
    var myCountriesDictionary = dataOnBooks[0];
    var myCountriesMap = dataOnBooks[1];
    // turn my data into google data
    var data = google.visualization.arrayToDataTable(myCountriesMap);

    // Get top 5 countries
    myTopCountries = getTop5Countries(myCountriesDictionary)

    // Change text in text box
    for (var i = 1; i <= 5; i++) {
        var nDotsText = "<span class='dot hvrClr2'></span> ";
        var nDots = myTopCountries[i-1][1] > 5 ? 5 : myTopCountries[i-1][1];

        nDotsText = nDotsText.repeat(nDots);
        document.getElementById("country" + i).innerHTML = myTopCountries[i-1][0] + "  " + nDotsText; 
    }
    
    var options = { backgroundColor: '#f5f2f7',
                    //legend: 'none',
                    datalessRegionColor: '#D8DDEF9',
                    markerOpacity: 0.2,
                    // colorAxis: {colors: ['#7293A0', '#534D56']},
                    // colorAxis: {colors: ['#A0A4B8', '#3A2449']},
                    // colorAxis: {colors: ['#AABBFF', '#FEEEB9', '#FFBBAA']},
                    // colorAxis: {colors: ['#AABBFF', '#FEEEB9', '#534D56']},
                    // colorAxis: {colors: ['#FEEEB9', '#FB5607', '#7293A0', '#3A2449']},
                    colorAxis: {colors: ['#0a9396', '#94d2bd', '#e9d8a6', '#ee9b00', '#b56576']},
                                         //'#bb3e03', '#ae2012', '#9b2226']},
                    chartArea: {left: 0, top: 0, width: '100%', height: '100%'},
                    displayMode: 'regions',
                    magnifyingGlass: {enable: true, zoomFactor: 7.5},
                    tooltip: {textStyle: {color: '#7293A0'}, showColorCode: true}}

    var container = document.getElementById('mapcanvas');
    var chart = new google.visualization.GeoChart(container);
    chart.draw(data, options);

    // function myClickHandler(){
    //     var selection = chart.getSelection();
    //     var message = '';
    //     for (var i = 0; i < selection.length; i++) {
    //         var item = selection[i];
    //         if (item.row != null && item.column != null) {
    //             message += '{row:' + item.row + ',column:' + item.column + '}';
    //         } else if (item.row != null) {
    //             message += '{row:' + item.row + '}';
    //         } else if (item.column != null) {
    //             message += '{column:' + item.column + '}';
    //         }
    //     }
    //     if (message == '') {
    //         message = 'nothing';
    //     }
    //     alert('You selected ' + message);
    // }

    // google.visualization.events.addListener(chart, 'select', myClickHandler);

}