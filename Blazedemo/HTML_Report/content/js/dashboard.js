/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 67.5, "KoPercent": 32.5};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.58125, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.8, 500, 1500, "3-Seleccionar Vuelo"], "isController": false}, {"data": [0.325, 500, 1500, "4-Llenar Formulario Datos Personales"], "isController": false}, {"data": [0.25, 500, 1500, "1-Home Blazedemo"], "isController": false}, {"data": [0.95, 500, 1500, "2-Seleccionar Ciudades"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 80, 26, 32.5, 504.5375000000001, 253, 1877, 545.5, 741.9000000000001, 856.5500000000001, 1877.0, 0.6907568104304278, 1.0461272422613652, 0.3836938220437767], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["3-Seleccionar Vuelo", 20, 3, 15.0, 371.3499999999999, 255, 636, 283.5, 629.4, 635.7, 636.0, 0.3382892711557653, 0.5744310397320749, 0.19887709105055731], "isController": false}, {"data": ["4-Llenar Formulario Datos Personales", 20, 12, 60.0, 606.05, 273, 915, 626.5, 855.1, 912.15, 915.0, 0.31682164525480383, 0.4647439388058992, 0.22901502130625565], "isController": false}, {"data": ["1-Home Blazedemo", 20, 10, 50.0, 716.8499999999999, 562, 1877, 603.0, 1373.2000000000014, 1855.1999999999998, 1877.0, 0.737164129593454, 1.0433320049021415, 0.28003598282407577], "isController": false}, {"data": ["2-Seleccionar Ciudades", 20, 1, 5.0, 323.90000000000003, 253, 713, 283.5, 459.5000000000002, 700.8499999999998, 713.0, 0.45061283345349673, 0.6658200660711067, 0.23938806777217014], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["The operation lasted too long: It took 642 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, 3.8461538461538463, 1.25], "isController": false}, {"data": ["The operation lasted too long: It took 603 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, 3.8461538461538463, 1.25], "isController": false}, {"data": ["The operation lasted too long: It took 829 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, 3.8461538461538463, 1.25], "isController": false}, {"data": ["The operation lasted too long: It took 681 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, 3.8461538461538463, 1.25], "isController": false}, {"data": ["The operation lasted too long: It took 621 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, 3.8461538461538463, 1.25], "isController": false}, {"data": ["The operation lasted too long: It took 732 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, 3.8461538461538463, 1.25], "isController": false}, {"data": ["The operation lasted too long: It took 858 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, 3.8461538461538463, 1.25], "isController": false}, {"data": ["The operation lasted too long: It took 1,441 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, 3.8461538461538463, 1.25], "isController": false}, {"data": ["The operation lasted too long: It took 637 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, 3.8461538461538463, 1.25], "isController": false}, {"data": ["The operation lasted too long: It took 790 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, 3.8461538461538463, 1.25], "isController": false}, {"data": ["The operation lasted too long: It took 682 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, 3.8461538461538463, 1.25], "isController": false}, {"data": ["The operation lasted too long: It took 632 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, 3.8461538461538463, 1.25], "isController": false}, {"data": ["The operation lasted too long: It took 616 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, 3.8461538461538463, 1.25], "isController": false}, {"data": ["The operation lasted too long: It took 743 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, 3.8461538461538463, 1.25], "isController": false}, {"data": ["The operation lasted too long: It took 624 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, 3.8461538461538463, 1.25], "isController": false}, {"data": ["The operation lasted too long: It took 651 milliseconds, but should not have lasted longer than 600 milliseconds.", 2, 7.6923076923076925, 2.5], "isController": false}, {"data": ["The operation lasted too long: It took 1,877 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, 3.8461538461538463, 1.25], "isController": false}, {"data": ["The operation lasted too long: It took 713 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, 3.8461538461538463, 1.25], "isController": false}, {"data": ["The operation lasted too long: It took 647 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, 3.8461538461538463, 1.25], "isController": false}, {"data": ["The operation lasted too long: It took 630 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, 3.8461538461538463, 1.25], "isController": false}, {"data": ["The operation lasted too long: It took 915 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, 3.8461538461538463, 1.25], "isController": false}, {"data": ["The operation lasted too long: It took 763 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, 3.8461538461538463, 1.25], "isController": false}, {"data": ["The operation lasted too long: It took 657 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, 3.8461538461538463, 1.25], "isController": false}, {"data": ["The operation lasted too long: It took 641 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, 3.8461538461538463, 1.25], "isController": false}, {"data": ["The operation lasted too long: It took 636 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, 3.8461538461538463, 1.25], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 80, 26, "The operation lasted too long: It took 651 milliseconds, but should not have lasted longer than 600 milliseconds.", 2, "The operation lasted too long: It took 642 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, "The operation lasted too long: It took 603 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, "The operation lasted too long: It took 829 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, "The operation lasted too long: It took 681 milliseconds, but should not have lasted longer than 600 milliseconds.", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["3-Seleccionar Vuelo", 20, 3, "The operation lasted too long: It took 630 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, "The operation lasted too long: It took 636 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, "The operation lasted too long: It took 624 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, null, null, null, null], "isController": false}, {"data": ["4-Llenar Formulario Datos Personales", 20, 12, "The operation lasted too long: It took 651 milliseconds, but should not have lasted longer than 600 milliseconds.", 2, "The operation lasted too long: It took 603 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, "The operation lasted too long: It took 829 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, "The operation lasted too long: It took 681 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, "The operation lasted too long: It took 621 milliseconds, but should not have lasted longer than 600 milliseconds.", 1], "isController": false}, {"data": ["1-Home Blazedemo", 20, 10, "The operation lasted too long: It took 1,441 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, "The operation lasted too long: It took 637 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, "The operation lasted too long: It took 642 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, "The operation lasted too long: It took 1,877 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, "The operation lasted too long: It took 682 milliseconds, but should not have lasted longer than 600 milliseconds.", 1], "isController": false}, {"data": ["2-Seleccionar Ciudades", 20, 1, "The operation lasted too long: It took 713 milliseconds, but should not have lasted longer than 600 milliseconds.", 1, null, null, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
