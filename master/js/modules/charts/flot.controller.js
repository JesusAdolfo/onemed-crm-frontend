/**=========================================================
 * Module: flot-chart.js
 * Setup options and data for flot chart directive
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .controller('FlotChartController', FlotChartController);


    angular.module('app.tables')
        .factory('topThreeResource', function ($resource) {
            return $resource(globalUri + 'api/patients/graphs/:action/:id', {}, {

                getTopThree: { method: 'GET', params: { action: "top-three" }, isArray: true },
                getSalesByMonth: { method: 'GET', params: { id: '@param1', action: "sales-month" }, isArray: true },
                getPatientStatus: { method: 'GET', params: { id: '@param1', action: "patient-status" }, isArray: true }

            });
        })
        .factory('graphConsultantResource', function ($resource) {
            return $resource(globalUri + 'api/users/:id', {
                id: '@param1'
            }, {
                query: {
                    method: 'GET', isArray: true
                },
                get: {
                    method: 'GET', isArray: false
                }
            });
        });

    FlotChartController.$inject = ['$rootScope', '$scope', 'ChartData', '$timeout', '$resource', 'topThreeResource', 'graphConsultantResource', 'User'];
    function FlotChartController($rootScope, $scope, ChartData, $timeout, $resource, topThreeResource, graphConsultantResource, User) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            $resource(globalUri + 'api/patients').query()
                .$promise
                .then(function (persons) {

                    var appointmentSum = 0;
                    var noteSum = 0;


                    vm.donutData = [
                        {
                            "label": "MANUAL MVP-700 SYSTEM",
                            "color": "#4acab4",
                            "data": 0
                        }, {
                            "label": "INTRODUCTORY BATTERY SYSTEM",
                            "color": "#ffea88",
                            "data": 0
                        }, {
                            "label": "BATTERY STANDARD SYSTEM",
                            "color": "#ff8153",
                            "data": 0
                        }, {
                            "label": "DELUXE BATTERY SYSTEM",
                            "color": "#878bb6",
                            "data": 0
                        }, {
                            "label": "FLEXIBLE URETEROSCOPE",
                            "color": "#b2d767",
                            "data": 0
                        }
                    ];
                    angular.forEach(persons, function (value, index) {

                        if(value.sales.length > 0){
                            angular.forEach(value.sales, function (valor, indice) {

                                switch(valor.description){
                                    case "MANUAL MVP-700 SYSTEM":
                                        vm.donutData[0].data += 1;
                                        break;
                                    case "INTRODUCTORY BATTERY SYSTEM":
                                        vm.donutData[1].data += 1;
                                        break;
                                    case "BATTERY STANDARD SYSTEM":
                                        vm.donutData[2].data += 1;
                                        break;
                                    case "DELUXE BATTERY SYSTEM":
                                        vm.donutData[3].data += 1;
                                        break;
                                    case "FLEXIBLE URETEROSCOPE":
                                        vm.donutData[4].data += 1;
                                        break;
                                    default:
                                        console.log("error creating graph");
                                }
                            })
                        }




                    });

                    vm.persons = persons;



                });


            // BAR
            // -----------------------------------
            vm.barData = [];

            async.waterfall([
                function(callback) {


                    //first step
                    vm.barData = ChartData.load('server/chart/bar.json');

                    var userData = {};
                    User.get({})
                        .$promise
                        .then
                        (function (successResponse) {
                                // success callback
                                userData = successResponse;
                                vm.userData = successResponse;



                                topThreeResource.getSalesByMonth({id: userData._id})
                                    .$promise
                                    .then(function (response) {

                                        var datos = [
                                            ["Jan", 0],
                                            ["Feb", 0],
                                            ["Mar", 0],
                                            ["Apr", 0],
                                            ["May", 0],
                                            ["Jun", 0],
                                            ["Jul", 0],
                                            ["Aug", 0],
                                            ["Sep", 0],
                                            ["Oct", 0],
                                            ["Nov", 0],
                                            ["Dec", 0]
                                        ];
                                        var meses = {
                                            1 : "Jan",
                                            2 : "Feb",
                                            3 : "Mar",
                                            4 : "Apr",
                                            5 : "May",
                                            6 : "Jun",
                                            7 : "Jul",
                                            8 : "Aug",
                                            9 : "Sep",
                                            10 : "Oct",
                                            11 : "Nov",
                                            12 : "Dec"
                                        };
                                        for (var i=1; i <= 12; i++){
                                            datos[i] = [meses[i], 0];
                                        }

                                        angular.forEach(response, function (value, index) {

                                            switch(value._id){
                                                case 1:
                                                    datos[1] = ["Jan", value.data];
                                                    break;
                                                case 2:
                                                    datos[2] = ["Feb", value.data];
                                                    break;
                                                case 3:
                                                    datos[3] = ["Mar", value.data];
                                                    break;
                                                case 4:
                                                    datos[4] = ["Apr", value.data];
                                                    break;
                                                case 5:
                                                    datos[5] = ["May", value.data];
                                                    break;
                                                case 6:
                                                    datos[6] = ["Jun", value.data];
                                                    break;
                                                case 7:
                                                    datos[7] = ["Jul", value.data];
                                                    break;
                                                case 8:
                                                    datos[8] = ["Aug", value.data];
                                                    break;
                                                case 9:
                                                    datos[9] = ["Sep", value.data];
                                                    break;
                                                case 10:
                                                    datos[10] = ["Oct", value.data];
                                                    break;
                                                case 11:
                                                    datos[11] = ["Nov", value.data];
                                                    break;
                                                case 12:
                                                    datos[12] = ["Dec", value.data];
                                                    break;
                                                default:
                                                    alert("error loading bar chart");
                                            }

                                            // datos.label = "Sales in USD";
                                            // datos.color = "#adadad";

                                            var legend = [{
                                                "label": "Sales in USD",
                                                "color": "#249BD3",
                                                "data": datos
                                            }];

                                            vm.barData = legend;


                                        });




                                    }, function (errResponse) {
                                        //fail
                                        console.error('error: houston we got a problem', errResponse);
                                    });



                            },
                            function (errorResponse) {
                                // failure callback
                                userData = "nada";
                                console.log(errorResponse);
                            });




                    callback(null, vm.barData, 'two');
                },
                function(arg1, arg2, callback) {
                    // second step
                    vm.barOptions = {
                        series: {
                            bars: {
                                align: 'center',
                                lineWidth: 4,
                                show: true,
                                barWidth: 0.6,
                                fill: 0.5
                            }
                        },
                        grid: {
                            borderColor: '#eee',
                            borderWidth: 1,
                            hoverable: true,
                            backgroundColor: '#fcfcfc'
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: function (label, x, y) { return x + ' : ' + y; }
                        },
                        xaxis: {
                            tickColor: '#fcfcfc',
                            mode: 'categories'
                        },
                        yaxis: {
                            position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                            tickColor: '#eee',
                            min: 0,
                            tickDecimals: 0,
                        },
                        shadowSize: 0
                    };

                    callback(null, arg1);
                }
            ], function (err, result) {
                //final step of the waterfall


            });




            // BAR STACKED
            // -----------------------------------

            async.waterfall([
                function(callback) {

                    //first step
                    vm.barStackeData = ChartData.load('server/chart/barstacked.json');

                    var userData = {};
                    User.get({})
                        .$promise
                        .then
                        (function (successResponse) {
                                // success callback
                                userData = successResponse;
                                vm.userData2 = successResponse;

                                topThreeResource.getPatientStatus({id: userData._id})
                                    .$promise
                                    .then(function (response) {

                                        var datos = [
                                                ["Jan", 0],
                                                ["Feb", 0],
                                                ["Mar", 0],
                                                ["Apr", 0],
                                                ["May", 0],
                                                ["Jun", 0],
                                                ["Jul", 0],
                                                ["Aug", 0],
                                                ["Sep", 0],
                                                ["Oct", 0],
                                                ["Nov", 0],
                                                ["Dec", 0]
                                        ];

                                        var meses = {
                                            1 : "Jan",
                                            2 : "Feb",
                                            3 : "Mar",
                                            4 : "Apr",
                                            5 : "May",
                                            6 : "Jun",
                                            7 : "Jul",
                                            8 : "Aug",
                                            9 : "Sep",
                                            10 : "Oct",
                                            11 : "Nov",
                                            12 : "Dec"
                                        };
                                        for (var i=1; i <= 12; i++){
                                            datos[i] = [meses[i], 0];
                                        }

                                        angular.forEach(response, function (value, index) {


                                            switch(value._id){
                                                case 1:
                                                    datos[1] = ["Jan", value.data];
                                                    break;
                                                case 2:
                                                    datos[2] = ["Feb", value.data];
                                                    break;
                                                case 3:
                                                    datos[3] = ["Mar", value.data];
                                                    break;
                                                case 4:
                                                    datos[4] = ["Apr", value.data];
                                                    break;
                                                case 5:
                                                    datos[5] = ["May", value.data];
                                                    break;
                                                case 6:
                                                    datos[6] = ["Jun", value.data];
                                                    break;
                                                case 7:
                                                    datos[7] = ["Jul", value.data];
                                                    break;
                                                case 8:
                                                    datos[8] = ["Aug", value.data];
                                                    break;
                                                case 9:
                                                    datos[9] = ["Sep", value.data];
                                                    break;
                                                case 10:
                                                    datos[10] = ["Oct", value.data];
                                                    break;
                                                case 11:
                                                    datos[11] = ["Nov", value.data];
                                                    break;
                                                case 12:
                                                    datos[12] = ["Dec", value.data];
                                                    break;
                                                default:
                                                    alert("error loading bar chart");
                                            }

                                            // datos.label = "Sales in USD";
                                            // datos.color = "#adadad";

                                            var zero = [{
                                                "label": "Pending follow-ups",
                                                "color": "#ff8153",
                                                "data": datos
                                            }];


                                            vm.barStackeData = zero;


                                        });




                                    }, function (errResponse) {
                                        //fail
                                        console.error('error: genova we got a problem', errResponse);
                                    });






                            },
                            function (errorResponse) {
                                // failure callback
                                userData = "nada";
                                console.log(errorResponse);
                            });






                    callback(null, vm.barStackeData, 'two');
                },
                function(arg1, arg2, callback) {
                    // second step
                    vm.barStackedOptions = {
                        series: {
                            stack: true,
                            bars: {
                                align: 'center',
                                lineWidth: 4,
                                show: true,
                                barWidth: 0.6,
                                fill: 0.9
                            }
                        },
                        grid: {
                            borderColor: '#eee',
                            borderWidth: 1,
                            hoverable: true,
                            backgroundColor: '#fcfcfc'
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: function (label, x, y) { return x + ' : ' + y; }
                        },
                        xaxis: {
                            tickColor: '#fcfcfc',
                            mode: 'categories'
                        },
                        yaxis: {
                            min: 0,
                            tickDecimals: 0,
                            position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                            tickColor: '#eee'
                        },
                        shadowSize: 0
                    };


                    callback(null, arg1);
                }
            ], function (err, result) {
                //final step of the waterfall


            });






            // PIE
            // -----------------------------------

            // Direct data temporarily added until fix: https://github.com/flot/flot/pull/1462





            async.waterfall([
                function(callback) {

                    vm.pieData = ChartData.load('server/chart/pie.json');
                    topThreeResource.getTopThree({})
                        .$promise
                        .then(function (response) {


                            vm.pieData = response;


                            // for (var i=0;i<vm.pieData.length;i++){
                            //     vm.pieData[i].label = vm.pieData[i].label.name;
                            // }
                            angular.forEach(response, function (value, index) {




                                if(angular.isUndefined(value.label[0].lastname))
                                    vm.pieData[index].label = value.label[0].name;
                                else
                                    vm.pieData[index].label = value.label[0].name +" "+ value.label[0].lastname;

                            });


                        }, function (errResponse) {
                            //fail
                            console.error('error: houston we got a problem', errResponse);
                        });
                    callback(null, vm.pieData, 'two');
                },
                function(arg1, arg2, callback) {
                    // arg1 now equals 'one' and arg2 now equals 'two'
                    vm.pieOptions = {
                        series: {
                            pie: {
                                show: true,
                                radius: 1,
                                innerRadius: 0,
                                label: {
                                    show: true,
                                    radius: 0.8,
                                    formatter: function (label, series) {
                                        return '<div class="flot-pie-label">' +
                                            series.data[0][1] + '$ -- ' +  label +  '</div>';
                                    },
                                    background: {
                                        opacity: 0.8,
                                        color: '#222'
                                    }
                                }
                            },

                        },
                        grid: {
                            hoverable: true
                        }
                    };
                    callback(null, arg1);
                }
            ], function (err, result) {
                //final step of the waterfall

            });








            // DONUT
            // -----------------------------------

            // Direct data temporarily added until fix: https://github.com/flot/flot/pull/1462
            // ChartData.load('server/chart/donut.json');

            vm.donutOptions = {
                series: {
                    pie: {
                        show: true,
                        radius: 1,
                        innerRadius: 0.6, // This makes the donut shape
                        label: {
                            show: true,
                            radius: 0.8,
                            formatter: function (label, series) {
                                return '<div class="flot-pie-label">' +
                                    //label + ' : ' +
                                    label +
                                    '</br>' +
                                   (series.percent).toFixed(2) +
                                    '%</div>';

                            },
                            background: {
                                opacity: 0.8,
                                color: '#222'
                            }
                        }
                    },
                },
                grid: {
                    hoverable: true
                }
            };



            // PANEL REFRESH EVENTS
            // -----------------------------------

            $scope.$on('panel-refresh', function(event, id) {

                console.log('Simulating chart refresh during 3s on #'+id);

                // Instead of timeout you can request a chart data
                $timeout(function(){

                    // directive listen for to remove the spinner
                    // after we end up to perform own operations
                    $scope.$broadcast('removeSpinner', id);

                    console.log('Refreshed #' + id);

                }, 3000);

            });


            // PANEL DISMISS EVENTS
            // -----------------------------------

            // Before remove panel
            $scope.$on('panel-remove', function(event, id, deferred){

                console.log('Panel #' + id + ' removing');

                // Here is obligatory to call the resolve() if we pretend to remove the panel finally
                // Not calling resolve() will NOT remove the panel
                // It's up to your app to decide if panel should be removed or not
                deferred.resolve();

            });

            // Panel removed ( only if above was resolved() )
            $scope.$on('panel-removed', function(event, id){

                console.log('Panel #' + id + ' removed');

            });

        }
    }
})();
