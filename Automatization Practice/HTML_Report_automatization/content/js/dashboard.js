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

    var data = {"OkPercent": 84.61538461538461, "KoPercent": 15.384615384615385};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.12980769230769232, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5, 500, 1500, "12- Confirm order/index.php-200-0"], "isController": false}, {"data": [0.0, 500, 1500, "5- add to cart/index.php?rand=1654776817671-191"], "isController": false}, {"data": [0.2, 500, 1500, "9- Address cart/index.php?controller=order-196"], "isController": false}, {"data": [0.2, 500, 1500, "6- ingtresed  to cart/index.php-192"], "isController": false}, {"data": [0.0, 500, 1500, "3-Ingresed/index.php?controller=authentication-184"], "isController": false}, {"data": [0.0, 500, 1500, "5- add to cart/index.php?rand=1654776817671-191-0"], "isController": false}, {"data": [0.0, 500, 1500, "2-Sign in/index.php-183"], "isController": false}, {"data": [0.0, 500, 1500, "8- continue cart/index.php-195"], "isController": false}, {"data": [0.0, 500, 1500, "1-Home/index.php-149"], "isController": false}, {"data": [0.1, 500, 1500, "11- Payment/index.php-198"], "isController": false}, {"data": [0.0, 500, 1500, "3-Ingresed/index.php?controller=authentication-184-1"], "isController": false}, {"data": [0.0, 500, 1500, "3-Ingresed/index.php?controller=authentication-184-2"], "isController": false}, {"data": [0.0, 500, 1500, "4-My Store/index.php-187"], "isController": false}, {"data": [0.0, 500, 1500, "5- add to cart/index.php?rand=1654776817671-191-1"], "isController": false}, {"data": [0.0, 500, 1500, "3-Ingresed/index.php?controller=authentication-184-0"], "isController": false}, {"data": [0.3, 500, 1500, "10- Shipping cart/index.php?controller=order&multi-shipping=-197"], "isController": false}, {"data": [0.0, 500, 1500, "12- Confirm order/index.php-200"], "isController": false}, {"data": [0.3333333333333333, 500, 1500, "7- agregate  unid/index.php?rand=1654776857361-194-0"], "isController": false}, {"data": [0.4, 500, 1500, "12- Confirm order/index.php-200-2"], "isController": false}, {"data": [0.0, 500, 1500, "7- agregate  unid/index.php?rand=1654776857361-194"], "isController": false}, {"data": [0.16666666666666666, 500, 1500, "7- agregate  unid/index.php?rand=1654776857361-194-1"], "isController": false}, {"data": [0.7, 500, 1500, "12- Confirm order/index.php-200-1"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 104, 16, 15.384615384615385, 5614.5769230769265, 184, 22568, 3221.0, 12275.5, 17051.5, 22490.550000000003, 0.2614740600133251, 8.131272175797307, 0.18372618606142127], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["12- Confirm order/index.php-200-0", 5, 0, 0.0, 847.2, 559, 1463, 789.0, 1463.0, 1463.0, 1463.0, 0.21765627720703465, 0.12842570575047885, 0.12306932080358697], "isController": false}, {"data": ["5- add to cart/index.php?rand=1654776817671-191", 5, 1, 20.0, 13939.0, 184, 18793, 17278.0, 18793.0, 18793.0, 18793.0, 0.11879024019386566, 7.70440552166734, 0.12500816682901333], "isController": false}, {"data": ["9- Address cart/index.php?controller=order-196", 5, 0, 0.0, 2654.4, 1008, 6785, 2055.0, 6785.0, 6785.0, 6785.0, 0.1296277092191227, 3.3957902591257905, 0.08152367650108887], "isController": false}, {"data": ["6- ingtresed  to cart/index.php-192", 5, 0, 0.0, 3519.4, 1087, 6951, 3058.0, 6951.0, 6951.0, 6951.0, 0.1229256299938537, 3.2206034880147514, 0.052819606637984025], "isController": false}, {"data": ["3-Ingresed/index.php?controller=authentication-184", 5, 5, 100.0, 16659.4, 10937, 22568, 16372.0, 22568.0, 22568.0, 22568.0, 0.08233976681378039, 3.023381148722087, 0.14835631813615704], "isController": false}, {"data": ["5- add to cart/index.php?rand=1654776817671-191-0", 4, 0, 0.0, 6845.5, 6477, 7201, 6852.0, 7201.0, 7201.0, 7201.0, 0.11597564511452596, 0.06948345534937662, 0.07429689765149318], "isController": false}, {"data": ["2-Sign in/index.php-183", 5, 5, 100.0, 9294.2, 184, 14169, 10312.0, 14169.0, 14169.0, 14169.0, 0.18109380659181457, 5.0468226525715325, 0.08913210793190873], "isController": false}, {"data": ["8- continue cart/index.php-195", 5, 0, 0.0, 5115.4, 1807, 7503, 5458.0, 7503.0, 7503.0, 7503.0, 0.1386193512614361, 3.6195082911699474, 0.06281189354033823], "isController": false}, {"data": ["1-Home/index.php-149", 5, 5, 100.0, 11172.2, 9248, 12649, 10987.0, 12649.0, 12649.0, 12649.0, 0.1853018567246044, 6.4311687567171925, 0.10839434783011526], "isController": false}, {"data": ["11- Payment/index.php-198", 5, 0, 0.0, 1925.4, 1415, 2305, 2160.0, 2305.0, 2305.0, 2305.0, 0.3073896471166851, 8.06303456980819, 0.15039278633345632], "isController": false}, {"data": ["3-Ingresed/index.php?controller=authentication-184-1", 5, 0, 0.0, 4153.8, 2381, 6493, 4602.0, 6493.0, 6493.0, 6493.0, 0.11850306922949304, 0.06677370209513427, 0.06654225078804542], "isController": false}, {"data": ["3-Ingresed/index.php?controller=authentication-184-2", 5, 0, 0.0, 6786.4, 3722, 10707, 6701.0, 10707.0, 10707.0, 10707.0, 0.10774468818687238, 3.736846730487437, 0.06260555612420808], "isController": false}, {"data": ["4-My Store/index.php-187", 5, 0, 0.0, 10261.2, 7514, 12150, 10503.0, 12150.0, 12150.0, 12150.0, 0.11843289592117107, 9.519044009664123, 0.05146742059074328], "isController": false}, {"data": ["5- add to cart/index.php?rand=1654776817671-191-1", 4, 0, 0.0, 10532.5, 7602, 11923, 11302.5, 11923.0, 11923.0, 11923.0, 0.11395362087630334, 9.156407131360037, 0.0586460529314569], "isController": false}, {"data": ["3-Ingresed/index.php?controller=authentication-184-0", 5, 0, 0.0, 5718.0, 2752, 7821, 7258.0, 7821.0, 7821.0, 7821.0, 0.11009820760118025, 0.1621153099815035, 0.07257450208085613], "isController": false}, {"data": ["10- Shipping cart/index.php?controller=order&multi-shipping=-197", 5, 0, 0.0, 1527.6, 681, 3288, 1104.0, 3288.0, 3288.0, 3288.0, 0.17564814164266143, 4.569733410033022, 0.11132387102156958], "isController": false}, {"data": ["12- Confirm order/index.php-200", 5, 0, 0.0, 2585.4, 1908, 3523, 2232.0, 3523.0, 3523.0, 3523.0, 0.20754638661740898, 7.4366059290813995, 0.31881881459881284], "isController": false}, {"data": ["7- agregate  unid/index.php?rand=1654776857361-194-0", 3, 0, 0.0, 1292.0, 740, 2236, 900.0, 2236.0, 2236.0, 2236.0, 0.17218619066750845, 0.10363680551569765, 0.12650528396372612], "isController": false}, {"data": ["12- Confirm order/index.php-200-2", 5, 0, 0.0, 1089.6, 695, 1898, 967.0, 1898.0, 1898.0, 1898.0, 0.22078954340722423, 7.656308647222467, 0.10931669776119403], "isController": false}, {"data": ["7- agregate  unid/index.php?rand=1654776857361-194", 5, 0, 0.0, 2971.4, 1734, 5390, 2704.0, 5390.0, 5390.0, 5390.0, 0.1283499332580347, 6.397542259215525, 0.13564482204281753], "isController": false}, {"data": ["7- agregate  unid/index.php?rand=1654776857361-194-1", 3, 0, 0.0, 2062.3333333333335, 1230, 3154, 1803.0, 3154.0, 3154.0, 3154.0, 0.15247001423053466, 12.250360130997155, 0.08099969505997155], "isController": false}, {"data": ["12- Confirm order/index.php-200-1", 5, 0, 0.0, 648.2, 408, 1092, 600.0, 1092.0, 1092.0, 1092.0, 0.22143489813994685, 0.12490312223206378, 0.10531132362710365], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["The operation lasted too long: It took 12,109 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, 6.25, 0.9615384615384616], "isController": false}, {"data": ["The operation lasted too long: It took 10,937 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, 6.25, 0.9615384615384616], "isController": false}, {"data": ["The operation lasted too long: It took 10,987 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, 6.25, 0.9615384615384616], "isController": false}, {"data": ["The operation lasted too long: It took 10,312 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, 6.25, 0.9615384615384616], "isController": false}, {"data": ["The operation lasted too long: It took 22,568 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, 6.25, 0.9615384615384616], "isController": false}, {"data": ["The operation lasted too long: It took 11,733 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, 6.25, 0.9615384615384616], "isController": false}, {"data": ["The operation lasted too long: It took 10,073 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, 6.25, 0.9615384615384616], "isController": false}, {"data": ["The operation lasted too long: It took 9,248 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, 6.25, 0.9615384615384616], "isController": false}, {"data": ["The operation lasted too long: It took 12,649 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, 6.25, 0.9615384615384616], "isController": false}, {"data": ["The operation lasted too long: It took 14,169 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, 6.25, 0.9615384615384616], "isController": false}, {"data": ["508/Loop Detected", 2, 12.5, 1.9230769230769231], "isController": false}, {"data": ["The operation lasted too long: It took 16,372 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, 6.25, 0.9615384615384616], "isController": false}, {"data": ["The operation lasted too long: It took 21,019 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, 6.25, 0.9615384615384616], "isController": false}, {"data": ["The operation lasted too long: It took 10,868 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, 6.25, 0.9615384615384616], "isController": false}, {"data": ["The operation lasted too long: It took 12,401 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, 6.25, 0.9615384615384616], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 104, 16, "508/Loop Detected", 2, "The operation lasted too long: It took 12,109 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, "The operation lasted too long: It took 10,937 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, "The operation lasted too long: It took 10,987 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, "The operation lasted too long: It took 10,312 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["5- add to cart/index.php?rand=1654776817671-191", 5, 1, "508/Loop Detected", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["3-Ingresed/index.php?controller=authentication-184", 5, 5, "The operation lasted too long: It took 10,937 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, "The operation lasted too long: It took 22,568 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, "The operation lasted too long: It took 16,372 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, "The operation lasted too long: It took 21,019 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, "The operation lasted too long: It took 12,401 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1], "isController": false}, {"data": [], "isController": false}, {"data": ["2-Sign in/index.php-183", 5, 5, "The operation lasted too long: It took 10,312 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, "The operation lasted too long: It took 14,169 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, "508/Loop Detected", 1, "The operation lasted too long: It took 11,733 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, "The operation lasted too long: It took 10,073 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1], "isController": false}, {"data": [], "isController": false}, {"data": ["1-Home/index.php-149", 5, 5, "The operation lasted too long: It took 12,109 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, "The operation lasted too long: It took 9,248 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, "The operation lasted too long: It took 10,987 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, "The operation lasted too long: It took 12,649 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1, "The operation lasted too long: It took 10,868 milliseconds, but should not have lasted longer than 1,000 milliseconds.", 1], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
