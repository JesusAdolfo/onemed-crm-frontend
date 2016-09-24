/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS
 * 
 * Version: 3.3.1
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 * 
 */

// APP START
// ----------------------------------- 
var globalUri = "http://localhost:9000/";
// var globalUri = "https://portal.onemed.us:9001/";
(function() {
    'use strict';

    angular
        .module('angle', [
            'app.core',
            'app.routes',
            'app.sidebar',
            'app.navsearch',
            'app.preloader',
            'app.loadingbar',
            'app.translate',
            'app.settings',
            'app.utils',
            'app.extras',
            'app.tables',
            'app.forms',
            'app.bootstrapui',
            'app.elements',
            'app.charts',
            'custom'
        ]);
})();


(function() {
    'use strict';

    angular
        .module('app.bootstrapui', []);
})();
(function() {
    'use strict';

    angular
        .module('app.charts', []);
})();
(function() {
    'use strict';

    angular
        .module('app.colors', []);
})();
(function() {
    'use strict';

    angular
        .module('app.core', [
            'ngRoute',
            'ngAnimate',
            'ngStorage',
            'ngCookies',
            'pascalprecht.translate',
            'ui.bootstrap',
            'ui.router',
            'oc.lazyLoad',
            'cfp.loadingBar',
            'ngSanitize',
            'ngResource',
            'ui.utils'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.elements', []);
})();
(function() {
    'use strict';

    angular
        .module('app.extras', []);
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload', []);
})();
(function() {
    'use strict';

    angular
        .module('app.forms', ['ngFileUpload'])
        .config(["$httpProvider", function($httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
        }]);
})();


'use strict';

(function() {

    function authInterceptor($rootScope, $q, $cookies, $injector) {
        var state;
        return {
            // Add authorization token to headers
            request(config) {
                config.headers = config.headers || {};
                if ($cookies.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookies.get('token');
                }
                return config;
            },

            // Intercept 401s and redirect you to login
            responseError(response) {
                if (response.status === 401) {
                    (state || (state = $injector.get('$state')))
                        .go('account.login');
                    // remove any stale tokens
                    $cookies.remove('token');
                }
                return $q.reject(response);
            }
        };
    }
    authInterceptor.$inject = ["$rootScope", "$q", "$cookies", "$injector"];

    angular.module('app.forms')
        .factory('authInterceptor', authInterceptor);
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.navsearch', []);
})();
(function() {
    'use strict';

    angular
        .module('app.preloader', []);
})();


(function() {
    'use strict';

    angular
        .module('app.routes', [
            'app.lazyload'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.settings', []);
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.tables', []);
})();

(function() {
    'use strict';

    angular
        .module('app.translate', []);
})();
(function() {
    'use strict';

    angular
        .module('app.utils', [
          'app.colors'
          ]);
})();

/**=========================================================
 * Module: demo-datepicker.js
 * Provides a simple demo for bootstrap datepicker
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('DatepickerDemoCtrl', DatepickerDemoCtrl);



    function DatepickerDemoCtrl() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            vm.today = function() {
                vm.dt = new Date();
            };
            vm.today();

            vm.clear = function () {
                vm.dt = null;
            };

            // Disable weekend selection
            vm.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

            vm.toggleMin = function() {
                vm.minDate = vm.minDate ? null : new Date();
            };
            vm.toggleMin();

            vm.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                vm.opened = true;
            };

            vm.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            vm.initDate = new Date('2019-10-20');
            vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            vm.format = vm.formats[0];
        }
    }
})();


/**=========================================================
 * Module: demo-timepicker.js
 * Provides a simple demo for bootstrap ui timepicker
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('TimepickerDemoCtrl', TimepickerDemoCtrl);

    function TimepickerDemoCtrl() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            vm.mytime = new Date();

            vm.hstep = 1;
            vm.mstep = 15;

            vm.options = {
                hstep: [1, 2, 3],
                mstep: [1, 5, 10, 15, 25, 30]
            };

            vm.ismeridian = true;
            vm.toggleMode = function() {
                vm.ismeridian = ! vm.ismeridian;
            };

            vm.update = function() {
                var d = new Date();
                d.setHours( 14 );
                d.setMinutes( 0 );
                vm.mytime = d;
            };

            vm.changed = function () {
                console.log('Time changed to: ' + vm.mytime);
            };

            vm.clear = function() {
                vm.mytime = null;
            };
        }
    }
})();
/**
 * Created by Adolfo on 8/28/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.charts')
        .service('ChartData', ChartData);

    ChartData.$inject = ['$resource'];
    function ChartData($resource) {
        this.load = load;

        ////////////////

        var opts = {
            get: { method: 'GET', isArray: true }
        };
        function load(source) {
            return $resource(source, {}, opts).get();
        }
    }
})();

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
        .factory('topThreeResource', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/patients/graphs/:action/:id', {}, {

                getTopThree: { method: 'GET', params: { action: "top-three" }, isArray: true },
                getSalesByMonth: { method: 'GET', params: { id: '@param1', action: "sales-month" }, isArray: true },
                getPatientStatus: { method: 'GET', params: { id: '@param1', action: "patient-status" }, isArray: true }

            });
        }])
        .factory('graphConsultantResource', ["$resource", function ($resource) {
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
        }]);

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
                                            ["Dic", 0]
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

/**
 * Created by Adolfo on 8/28/2016.
 */
/**=========================================================
 * Module: flot.js
 * Initializes the Flot chart plugin and handles data refresh
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .directive('flot', flot);

    flot.$inject = ['$http', '$timeout'];
    function flot ($http, $timeout) {

        var directive = {
            restrict: 'EA',
            template: '<div></div>',
            scope: {
                dataset: '=?',
                options: '=',
                series: '=',
                callback: '=',
                src: '='
            },
            link: link
        };
        return directive;

        function link(scope, element, attrs) {
            var height, plot, plotArea, width;
            var heightDefault = 220;

            plot = null;

            width = attrs.width || '100%';
            height = attrs.height || heightDefault;

            plotArea = $(element.children()[0]);
            plotArea.css({
                width: width,
                height: height
            });

            function init() {
                var plotObj;
                if(!scope.dataset || !scope.options) return;
                plotObj = $.plot(plotArea, scope.dataset, scope.options);
                scope.$emit('plotReady', plotObj);
                if (scope.callback) {
                    scope.callback(plotObj, scope);
                }

                return plotObj;
            }

            function onDatasetChanged(dataset) {
                if (plot) {
                    plot.setData(dataset);
                    plot.setupGrid();
                    return plot.draw();
                } else {
                    plot = init();
                    onSerieToggled(scope.series);
                    return plot;
                }
            }
            scope.$watchCollection('dataset', onDatasetChanged, true);

            function onSerieToggled (series) {
                if( !plot || !series ) return;
                var someData = plot.getData();
                for(var sName in series) {
                    angular.forEach(series[sName], toggleFor(sName));
                }

                plot.setData(someData);
                plot.draw();

                function toggleFor(sName) {
                    return function (s, i){
                        if(someData[i] && someData[i][sName])
                            someData[i][sName].show = s;
                    };
                }
            }
            scope.$watch('series', onSerieToggled, true);

            function onSrcChanged(src) {

                if( src ) {

                    $http.get(src)
                        .success(function (data) {

                            $timeout(function(){
                                scope.dataset = data;
                            });

                        }).error(function(){
                        $.error('Flot chart: Bad request.');
                    });

                }
            }
            scope.$watch('src', onSrcChanged);

        }
    }


})();

(function() {
    'use strict';

    angular
        .module('app.colors')
        .constant('APP_COLORS', {
          'primary':                '#5d9cec',
          'success':                '#27c24c',
          'info':                   '#23b7e5',
          'warning':                '#ff902b',
          'danger':                 '#f05050',
          'inverse':                '#131e26',
          'green':                  '#37bc9b',
          'pink':                   '#f532e5',
          'purple':                 '#7266ba',
          'dark':                   '#3a3f51',
          'yellow':                 '#fad732',
          'gray-darker':            '#232735',
          'gray-dark':              '#3a3f51',
          'gray':                   '#dde6e9',
          'gray-light':             '#e4eaec',
          'gray-lighter':           '#edf1f2'
        })
        ;
})();
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.colors')
        .service('Colors', Colors);

    Colors.$inject = ['APP_COLORS'];
    function Colors(APP_COLORS) {
        this.byName = byName;

        ////////////////

        function byName(name) {
          return (APP_COLORS[name] || '#fff');
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfig);

    coreConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$animateProvider'];
    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide, $animateProvider){

      var core = angular.module('app.core');
      // registering components after bootstrap
      core.controller = $controllerProvider.register;
      core.directive  = $compileProvider.directive;
      core.filter     = $filterProvider.register;
      core.factory    = $provide.factory;
      core.service    = $provide.service;
      core.constant   = $provide.constant;
      core.value      = $provide.value;

      // Disables animation on items with class .ng-no-animation
      $animateProvider.classNameFilter(/^((?!(ng-no-animation)).)*$/);

    }

})();
    /**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('APP_MEDIAQUERY', {
          'desktopLG':             1200,
          'desktop':                992,
          'tablet':                 768,
          'mobile':                 480
        })
      ;

})();
(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    angular
        .module('app.core')
        .factory('Auth', function(){
            var user;

            return{
                setUser : function(aUser){
                    user = aUser;
                },
                isLoggedIn : function(){
                    return(user)? user : false;
                }
            }
        });

    appRun.$inject = ['$rootScope', '$state', '$stateParams',  '$window', '$templateCache', 'Colors'];
    
    function appRun($rootScope, $state, $stateParams, $window, $templateCache, Colors) {

      // Set reference to access them from any scope
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.$storage = $window.localStorage;

      // Uncomment this to disable template cache
      /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          if (typeof(toState) !== 'undefined'){
            $templateCache.remove(toState.templateUrl);
          }
      });*/

      // Allows to use branding color with interpolation
      // {{ colorByName('primary') }}
      $rootScope.colorByName = Colors.byName;

      // cancel click event easily
      $rootScope.cancel = function($event) {
        $event.stopPropagation();
      };

      // Hooks Example
      // ----------------------------------- 

      // Hook not found
      $rootScope.$on('$stateNotFound',
        function(event, unfoundState/*, fromState, fromParams*/) {
            console.log(unfoundState.to); // "lazy.state"
            console.log(unfoundState.toParams); // {a:1, b:2}
            console.log(unfoundState.options); // {inherit:false} + default options
        });
      // Hook error
      $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){
          console.log(error);
        });
      // Hook success
      $rootScope.$on('$stateChangeSuccess',
        function(/*event, toState, toParams, fromState, fromParams*/) {
          // display new view from top
          $window.scrollTo(0, 0);
          // Save the route title
          $rootScope.currTitle = $state.current.title;
        });

      // Load a title dynamically
      $rootScope.currTitle = $state.current.title;
      $rootScope.pageTitle = function() {
        var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
        document.title = title;
        return title;
      };      

    }

})();


/**=========================================================
 * Module: demo-dialog.js
 * Demo for multiple ngDialog Usage
 * - ngDialogProvider for default values not supported
 *   using lazy loader. Include plugin in base.js instead.
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.elements')
        .controller('DialogIntroCtrl', DialogIntroCtrl)
        .controller('DialogMainCtrl', DialogMainCtrl);

    DialogIntroCtrl.$inject = ['$scope', 'ngDialog', 'tpl'];
    // Called from the route state. 'tpl' is resolved before
    function DialogIntroCtrl($scope, ngDialog, tpl) {

        activate();

        ////////////////

        function activate() {
            // share with other controllers
            $scope.tpl = tpl;
            // open dialog window
            ngDialog.open({
                template: tpl.path,
                // plain: true,
                className: 'ngdialog-theme-default'
            });
        }
    }

    DialogMainCtrl.$inject = ['$scope', '$rootScope', 'ngDialog'];
    // Loads from view
    function DialogMainCtrl($scope, $rootScope, ngDialog) {

        activate();

        ////////////////

        function activate() {

            $rootScope.jsonData = '{"foo": "bar"}';
            $rootScope.theme = 'ngdialog-theme-default';

            $scope.directivePreCloseCallback = function (value) {
                if(confirm('Close it? MainCtrl.Directive. (Value = ' + value + ')')) {
                    return true;
                }
                return false;
            };

            $scope.preCloseCallbackOnScope = function (value) {
                if(confirm('Close it? MainCtrl.OnScope (Value = ' + value + ')')) {
                    return true;
                }
                return false;
            };

            $scope.open = function () {
                ngDialog.open({ template: 'firstDialogId', controller: 'InsideCtrl', data: {foo: 'some data'} });
            };

            $scope.openDefault = function () {
                ngDialog.open({
                    template: 'firstDialogId',
                    controller: 'InsideCtrl',
                    className: 'ngdialog-theme-default'
                });
            };

            $scope.openDefaultWithPreCloseCallbackInlined = function () {
                ngDialog.open({
                    template: 'firstDialogId',
                    controller: 'InsideCtrl',
                    className: 'ngdialog-theme-default',
                    preCloseCallback: function(value) {
                        if (confirm('Close it?  (Value = ' + value + ')')) {
                            return true;
                        }
                        return false;
                    }
                });
            };

            $scope.openConfirm = function () {
                ngDialog.openConfirm({
                    template: 'modalDialogId',
                    className: 'ngdialog-theme-default'
                }).then(function (value) {
                    console.log('Modal promise resolved. Value: ', value);
                }, function (reason) {
                    console.log('Modal promise rejected. Reason: ', reason);
                });
            };

            $scope.openConfirmWithPreCloseCallbackOnScope = function () {
                ngDialog.openConfirm({
                    template: 'modalDialogId',
                    className: 'ngdialog-theme-default',
                    preCloseCallback: 'preCloseCallbackOnScope',
                    scope: $scope
                }).then(function (value) {
                    console.log('Modal promise resolved. Value: ', value);
                }, function (reason) {
                    console.log('Modal promise rejected. Reason: ', reason);
                });
            };

            $scope.openConfirmWithPreCloseCallbackInlinedWithNestedConfirm = function () {
                ngDialog.openConfirm({
                        template: 'dialogWithNestedConfirmDialogId',
                        className: 'ngdialog-theme-default',
                        preCloseCallback: function(/*value*/) {

                            var nestedConfirmDialog = ngDialog.openConfirm({
                                template:
                                '<p>Are you sure you want to close the parent dialog?</p>' +
                                '<div>' +
                                '<button type="button" class="btn btn-default" ng-click="closeThisDialog(0)">No' +
                                '<button type="button" class="btn btn-primary" ng-click="confirm(1)">Yes' +
                                '</button></div>',
                                plain: true,
                                className: 'ngdialog-theme-default'
                            });

                            return nestedConfirmDialog;
                        },
                        scope: $scope
                    })
                    .then(function(value){
                        console.log('resolved:' + value);
                        // Perform the save here
                    }, function(value){
                        console.log('rejected:' + value);

                    });
            };

            $scope.openInlineController = function (location) {

                $rootScope.locationId = location._id;
                $rootScope.locationName = location.name;
                $rootScope.locationCity = location.city;
                $rootScope.locationState = location.state;
                $rootScope.locationPostal = location.postal;
                $rootScope.locationAddress = location.address;
                $rootScope.locationAddress2 = location.address2;
                $rootScope.phone = location.phone;
                $rootScope.fax = location.fax;
                $rootScope.contact = location.contact;
                $rootScope.contact_position = location.contact_position;
                $rootScope.contact_phone = location.contact_phone;
                $rootScope.date = location.date;
                $rootScope.latitude = location.latitude;
                $rootScope.longitude = location.longitude;
                $rootScope.theme = 'ngdialog-theme-default';

                $rootScope.notes = location.notes;

                ngDialog.open({
                    template: 'withInlineController',
                    controller: ['$rootScope', '$timeout', function ($rootScope, $timeout) {


                    }],
                    className: 'ngdialog-theme-default'
                });
            };

        }

    }


})();
/**=========================================================
 * Module: sweetalert.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.elements')
        .controller('SweetAlertController', SweetAlertController);

    SweetAlertController.$inject = ['SweetAlert'];
    function SweetAlertController(SweetAlert) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            vm.demo1 = function() {
                SweetAlert.swal('Here\'s a message');
            };

            vm.demo2 = function() {
                SweetAlert.swal('Here\'s a message!', 'It\'s pretty, isn\'t it?');
            };

            vm.demo3 = function() {
                SweetAlert.swal('Good job!', 'You clicked the button!', 'success');
            };

            vm.demo4 = function() {
                SweetAlert.swal({
                    title: 'Are you sure?',
                    text: 'Your will not be able to recover this imaginary file!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, delete it!',
                    closeOnConfirm: false
                },  function(){
                    SweetAlert.swal('Booyah!');
                });
            };

            vm.demo5 = function() {
                SweetAlert.swal({
                    title: 'Confirm deletion?',
                    text: 'You will not be able to recover this record!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, confirm deletion!',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function(isConfirm){
                    if (isConfirm) {
                        SweetAlert.swal('Deleted!', 'This record has been deleted', 'success');
                    }
                    // else {
                    //    SweetAlert.swal('Cancelled', 'Your imaginary file is safe :)', 'error');
                    //}
                });
            };

            vm.demo6 = function() {
                SweetAlert.swal({
                    title: 'Sweet!',
                    text: 'Here\'s a custom image.',
                    imageUrl: 'http://oitozero.com/img/avatar.jpg'
                });
            };
        }
    }
})();

/**=========================================================
 * Module: article.js
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.extras')
        .controller('ArticleController', ArticleController);

    function ArticleController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.htmlContent = 'Article content...';

          vm.postDemo = {};
          vm.postDemo.tags = ['coding', 'less'];
          vm.availableTags = ['coding', 'less', 'sass', 'angularjs', 'node', 'expressJS'];
          vm.postDemo.categories = ['JAVASCRIPT','WEB'];
          vm.availableCategories = ['JAVASCRIPT','WEB', 'BOOTSTRAP', 'SERVER', 'HTML5', 'CSS'];

          vm.reviewers = [
            { name: 'Adam',      email: 'adam@email.com',      age: 10 },
            { name: 'Amalie',    email: 'amalie@email.com',    age: 12 },
            { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30 },
            { name: 'Samantha',  email: 'samantha@email.com',  age: 31 },
            { name: 'Estefanía', email: 'estefanía@email.com', age: 16 },
            { name: 'Natasha',   email: 'natasha@email.com',   age: 54 },
            { name: 'Nicole',    email: 'nicole@email.com',    age: 43 },
            { name: 'Adrian',    email: 'adrian@email.com',    age: 21 }
          ];


          vm.alerts = [
            { type: 'info', msg: 'There is an autosaved version of this article that is more recent than the version below. <a href="#" class="text-white">Restore</a>' }
          ];

          vm.closeAlert = function(index) {
            vm.alerts.splice(index, 1);
          };
        }
    }
})();

/**=========================================================
 * Module: calendar-ui.js
 * This script handle the calendar demo with draggable 
 * events and events creations
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.extras')
        .directive('calendar', calendar);

    calendar.$inject = ['$rootScope'];
    function calendar ($rootScope) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element) {
          
          if(!$.fn.fullCalendar) return;
          
          // The element that will display the calendar
          var calendar = element;

          var demoEvents = createDemoEvents();

          initExternalEvents(calendar);

          initCalendar(calendar, demoEvents, $rootScope.app.layout.isRTL);
        }
    }


    // global shared var to know what we are dragging
    var draggingEvent = null;


    /**
     * ExternalEvent object
     * @param jQuery Object elements Set of element as jQuery objects
     */
    function ExternalEvent(elements) {
        
        if (!elements) return;
        
        elements.each(function() {
            var $this = $(this);
            // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
            // it doesn't need to have a start or end
            var calendarEventObject = {
                title: $.trim($this.text()) // use the element's text as the event title
            };

            // store the Event Object in the DOM element so we can get to it later
            $this.data('calendarEventObject', calendarEventObject);

            // make the event draggable using jQuery UI
            $this.draggable({
                zIndex: 1070,
                revert: true, // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });

        });
    }

    /**
     * Invoke full calendar plugin and attach behavior
     * @param  jQuery [calElement] The calendar dom element wrapped into jQuery
     * @param  EventObject [events] An object with the event list to load when the calendar displays
     */
    function initCalendar(calElement, events, isRTL) {

        // check to remove elements from the list
        var removeAfterDrop = $('#remove-after-drop');

        calElement.fullCalendar({
            isRTL: isRTL,
            header: {
                left:   'prev,next today',
                center: 'title',
                right:  'month,agendaWeek,agendaDay'
            },
            buttonIcons: { // note the space at the beginning
                prev:    ' fa fa-caret-left',
                next:    ' fa fa-caret-right'
            },
            buttonText: {
                today: 'today',
                month: 'month',
                week:  'week',
                day:   'day'
            },
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar 
            drop: function(date, allDay) { // this function is called when something is dropped
                
                var $this = $(this),
                    // retrieve the dropped element's stored Event Object
                    originalEventObject = $this.data('calendarEventObject');

                // if something went wrong, abort
                if(!originalEventObject) return;

                // clone the object to avoid multiple events with reference to the same object
                var clonedEventObject = $.extend({}, originalEventObject);

                // assign the reported date
                clonedEventObject.start = date;
                clonedEventObject.allDay = allDay;
                clonedEventObject.backgroundColor = $this.css('background-color');
                clonedEventObject.borderColor = $this.css('border-color');

                // render the event on the calendar
                // the last `true` argument determines if the event "sticks" 
                // (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                calElement.fullCalendar('renderEvent', clonedEventObject, true);
                
                // if necessary remove the element from the list
                if(removeAfterDrop.is(':checked')) {
                  $this.remove();
                }
            },
            eventDragStart: function (event/*, js, ui*/) {
              draggingEvent = event;
            },
            // This array is the events sources
            events: events
        });
    }

    /**
     * Inits the external events panel
     * @param  jQuery [calElement] The calendar dom element wrapped into jQuery
     */
    function initExternalEvents(calElement){
      // Panel with the external events list
      var externalEvents = $('.external-events');

      // init the external events in the panel
      new ExternalEvent(externalEvents.children('div'));

      // External event color is danger-red by default
      var currColor = '#f6504d';
      // Color selector button
      var eventAddBtn = $('.external-event-add-btn');
      // New external event name input
      var eventNameInput = $('.external-event-name');
      // Color switchers
      var eventColorSelector = $('.external-event-color-selector .circle');

      // Trash events Droparea 
      $('.external-events-trash').droppable({
        accept:       '.fc-event',
        activeClass:  'active',
        hoverClass:   'hovered',
        tolerance:    'touch',
        drop: function(event, ui) {
          
          // You can use this function to send an ajax request
          // to remove the event from the repository
          
          if(draggingEvent) {
            var eid = draggingEvent.id || draggingEvent._id;
            // Remove the event
            calElement.fullCalendar('removeEvents', eid);
            // Remove the dom element
            ui.draggable.remove();
            // clear
            draggingEvent = null;
          }
        }
      });

      eventColorSelector.click(function(e) {
          e.preventDefault();
          var $this = $(this);

          // Save color
          currColor = $this.css('background-color');
          // De-select all and select the current one
          eventColorSelector.removeClass('selected');
          $this.addClass('selected');
      });

      eventAddBtn.click(function(e) {
          e.preventDefault();
          
          // Get event name from input
          var val = eventNameInput.val();
          // Dont allow empty values
          if ($.trim(val) === '') return;
          
          // Create new event element
          var newEvent = $('<div/>').css({
                              'background-color': currColor,
                              'border-color':     currColor,
                              'color':            '#fff'
                          })
                          .html(val);

          // Prepends to the external events list
          externalEvents.prepend(newEvent);
          // Initialize the new event element
          new ExternalEvent(newEvent);
          // Clear input
          eventNameInput.val('');
      });
    }

    /**
     * Creates an array of events to display in the first load of the calendar
     * Wrap into this function a request to a source to get via ajax the stored events
     * @return Array The array with the events
     */
    function createDemoEvents() {
      // Date for the calendar events (dummy data)
      var date = new Date();
      var d = date.getDate(),
          m = date.getMonth(),
          y = date.getFullYear();

      return  [
                {
                    title: 'All Day Event',
                    start: new Date(y, m, 1),
                    backgroundColor: '#f56954', //red 
                    borderColor: '#f56954' //red
                },
                {
                    title: 'Long Event',
                    start: new Date(y, m, d - 5),
                    end: new Date(y, m, d - 2),
                    backgroundColor: '#f39c12', //yellow
                    borderColor: '#f39c12' //yellow
                },
                {
                    title: 'Meeting',
                    start: new Date(y, m, d, 10, 30),
                    allDay: false,
                    backgroundColor: '#0073b7', //Blue
                    borderColor: '#0073b7' //Blue
                },
                {
                    title: 'Lunch',
                    start: new Date(y, m, d, 12, 0),
                    end: new Date(y, m, d, 14, 0),
                    allDay: false,
                    backgroundColor: '#00c0ef', //Info (aqua)
                    borderColor: '#00c0ef' //Info (aqua)
                },
                {
                    title: 'Birthday Party',
                    start: new Date(y, m, d + 1, 19, 0),
                    end: new Date(y, m, d + 1, 22, 30),
                    allDay: false,
                    backgroundColor: '#00a65a', //Success (green)
                    borderColor: '#00a65a' //Success (green)
                },
                {
                    title: 'Open Google',
                    start: new Date(y, m, 28),
                    end: new Date(y, m, 29),
                    url: '//google.com/',
                    backgroundColor: '#3c8dbc', //Primary (light-blue)
                    borderColor: '#3c8dbc' //Primary (light-blue)
                }
            ];
    }

})();


(function() {
    'use strict';

    angular
        .module('app.extras')
        .service('LoadTreeService', LoadTreeService);

    LoadTreeService.$inject = ['$resource'];
    function LoadTreeService($resource) {
        // Loads the list of files to populate the treeview
        return $resource('server/editor/filetree.json');
    }

})();
/**=========================================================
 * Module: code-editor.js
 * Codemirror code editor controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.extras')
        .controller('CodeEditorController', CodeEditorController);

    CodeEditorController.$inject = ['$rootScope', '$scope', '$http', '$ocLazyLoad', 'filetree'];
    function CodeEditorController($rootScope, $scope, $http, $ocLazyLoad, filetree) {
        var vm = this;

        layout();
        activate();

        ////////////////
        /*jshint -W106*/
        function layout() {
          // Setup the layout mode 
          $rootScope.app.useFullLayout = true;
          $rootScope.app.hiddenFooter = true;
          $rootScope.app.layout.isCollapsed = true;
          
          // Restore layout for demo
          $scope.$on('$destroy', function(){
              $rootScope.app.useFullLayout = false;
              $rootScope.app.hiddenFooter = false;
          });

        }

        function activate() {

          // Set the tree data into the scope
          vm.filetree_data = filetree;

          // Available themes
          vm.editorThemes = ['3024-day','3024-night','ambiance-mobile','ambiance','base16-dark','base16-light','blackboard','cobalt','eclipse','elegant','erlang-dark','lesser-dark','mbo','mdn-like','midnight','monokai','neat','neo','night','paraiso-dark','paraiso-light','pastel-on-dark','rubyblue','solarized','the-matrix','tomorrow-night-eighties','twilight','vibrant-ink','xq-dark','xq-light'];

          vm.editorOpts = {
            mode: 'javascript',
            lineNumbers: true,
            matchBrackets: true,
            theme: 'mbo',
            viewportMargin: Infinity
          };

          vm.refreshEditor = 0;

          // Load dinamically the stylesheet for the selected theme
          // You can use ozLazyLoad to load also the mode js based 
          // on the file extension that is loaded (see handle_filetree)
          vm.loadTheme = function() {
            var BASE = 'vendor/codemirror/theme/';
            $ocLazyLoad.load(BASE + vm.editorOpts.theme + '.css');
            vm.refreshEditor = !vm.refreshEditor;
          };
          // load default theme
          vm.loadTheme(vm.editorOpts.theme);
          // Add some initial text
          vm.code = '// Open a file from the left menu \n' +
                        '// It will be requested to the server and loaded into the editor\n' +
                        '// Also try adding a New File from the toolbar\n';


          // Tree

          var selectedBranch;
          vm.handle_filetree = function(branch) {
            
            selectedBranch = branch;

            var basePath = 'server/editor/';
            var isFolder = !!branch.children.length;

            console.log('You selected: ' + branch.label + ' - isFolder? ' + isFolder);

            if ( ! isFolder ) {

              $http
                .get( basePath + branch.path )
                .success(function(response){
                  
                  console.log('Loaded.. ' + branch.path);
                  // set the new code into the editor
                  vm.code = response;
                  
                  vm.editorOpts.mode = detectMode(branch.path);
                  console.log( 'Mode is: ' + vm.editorOpts.mode);

                });
            }
          };

          function detectMode(file) {
            var ext = file.split('.');
            ext = ext ? ext[ext.length - 1] : '';
            switch (ext) {
              case 'html':  return 'htmlmixed';
              case 'css':   return 'css';
              default:      return 'javascript';
            }
          }

          var tree;
          tree = vm.filetree = {};

          // Adds a new branch to the tree
          vm.new_filetree = function() {
            var b;
            b = tree.get_selected_branch();

            // if we select a leaf -> select the parent folder
            if ( b && b.children.length === 0 ) {
              b = tree.get_parent_branch(b);
            }
            
            return tree.add_branch(b, {
              'label': 'another.html',
              'path': 'source/another.html'
            });
          };
        }
    }
})();


(function() {
    'use strict';

    angular
        .module('app.extras')
        .controller('TodoController', TodoController);

    TodoController.$inject = ['$filter'];
    function TodoController($filter) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
           vm.items = [
            {
              todo: {title: 'Meeting with Mark at 7am.', description: 'Pellentesque convallis mauris eu elit imperdiet quis eleifend quam aliquet. '},
              complete: true
            },
            {
              todo: {title: 'Call Sonya. Talk about the new project.', description: ''},
              complete: false
            },
            {
              todo: {title: 'Find a new place for vacations', description: ''},
              complete: false
            }
            ];
          
          vm.editingTodo = false;
          vm.todo = {};

          vm.addTodo = function() {
            
            if( vm.todo.title === '' ) return;
            if( !vm.todo.description ) vm.todo.description = '';
            
            if( vm.editingTodo ) {
              vm.todo = {};
              vm.editingTodo = false;
            }
            else {
              vm.items.push({todo: angular.copy(vm.todo), complete: false});
              vm.todo.title = '';
              vm.todo.description = '';
            }
          };
          
          vm.editTodo = function(index, $event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.todo = vm.items[index].todo;
            vm.editingTodo = true;
          };

          vm.removeTodo = function(index/*, $event*/) {
            vm.items.splice(index, 1);
          };
          
          vm.clearAll = function() {
            vm.items = [];
          };

          vm.totalCompleted = function() {
            return $filter('filter')(vm.items, function(item){
              return item.complete;
            }).length;
          };

          vm.totalPending = function() {
            return $filter('filter')(vm.items, function(item){
              return !item.complete;
            }).length;
          };

        }
    }
})();

/**=========================================================
 * Module: word-cloud.js
 * Controller for jqCloud
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.extras')
        .controller('WordCloudController', WordCloudController);

    function WordCloudController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.words = [
              {
                text: 'Lorem',
                weight: 13
                //link: 'http://themicon.co'
              }, {
                text: 'Ipsum',
                weight: 10.5
              }, {
                text: 'Dolor',
                weight: 9.4
              }, {
                text: 'Sit',
                weight: 8
              }, {
                text: 'Amet',
                weight: 6.2
              }, {
                text: 'Consectetur',
                weight: 5
              }, {
                text: 'Adipiscing',
                weight: 5
              }, {
                text: 'Sit',
                weight: 8
              }, {
                text: 'Amet',
                weight: 6.2
              }, {
                text: 'Consectetur',
                weight: 5
              }, {
                text: 'Adipiscing',
                weight: 5
              }
          ];
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .config(lazyloadConfig);

    lazyloadConfig.$inject = ['$ocLazyLoadProvider', 'APP_REQUIRES'];
    function lazyloadConfig($ocLazyLoadProvider, APP_REQUIRES){

      // Lazy Load modules configuration
      $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: APP_REQUIRES.modules
      });

    }
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
          // jQuery based and standalone scripts
          scripts: {
            'modernizr':          ['vendor/modernizr/modernizr.custom.js'],
            'icons':              ['vendor/fontawesome/css/font-awesome.min.css',
                                   'vendor/simple-line-icons/css/simple-line-icons.css'],
              // jquery core and widgets
              'jquery-ui':          ['vendor/jquery-ui/ui/core.js',
                  'vendor/jquery-ui/ui/widget.js'],
              // loads only jquery required modules and touch support
              'jquery-ui-widgets':  ['vendor/jquery-ui/ui/core.js',
                  'vendor/jquery-ui/ui/widget.js',
                  'vendor/jquery-ui/ui/mouse.js',
                  'vendor/jquery-ui/ui/draggable.js',
                  'vendor/jquery-ui/ui/droppable.js',
                  'vendor/jquery-ui/ui/sortable.js',
                  'vendor/jqueryui-touch-punch/jquery.ui.touch-punch.min.js'],
              'moment' :            ['vendor/moment/min/moment-with-locales.min.js'],
              'fullcalendar':       ['vendor/fullcalendar/dist/fullcalendar.min.js',
                                    'vendor/fullcalendar/dist/fullcalendar.css'],
              'gcal':               ['vendor/fullcalendar/dist/gcal.js'],
              'inputmask':          ['vendor/jquery.inputmask/dist/jquery.inputmask.bundle.js'],
              'loadGoogleMapsJS':   ['vendor/load-google-maps/load-google-maps.js'],
              'flot-chart':         ['vendor/flot/jquery.flot.js'],
              'flot-chart-plugins': ['vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
                  'vendor/flot/jquery.flot.resize.js',
                  'vendor/flot/jquery.flot.pie.js',
                  'vendor/flot/jquery.flot.time.js',
                  'vendor/flot/jquery.flot.categories.js',
                  'vendor/flot-spline/js/jquery.flot.spline.min.js'],
          },
          // Angular based script (use the right module name)
          modules: [
              {name: 'ui.map', files: [
                  'vendor/angular-ui-map/ui-map.js']},
             {name: 'datatables', files: [
                 'vendor/datatables/media/css/jquery.dataTables.css',
                 'vendor/datatables/media/js/jquery.dataTables.js',
                 'vendor/angular-datatables/dist/angular-datatables.js'], serie: true},
              {name: 'localytics.directives', files: [
                  'vendor/chosen/chosen.jquery.js',
                  'vendor/chosen/chosen.css',
                  'vendor/angular-chosen-localytics/dist/angular-chosen.min.js'],
                  serie: true},
              {name: 'ui.select',files:
                  ['vendor/angular-ui-select/dist/select.min.js',
                  'vendor/angular-ui-select/dist/select.min.css']},
              {name: 'oitozero.ngSweetAlert',     files: ['vendor/sweetalert/dist/sweetalert.css',
                  'vendor/sweetalert/dist/sweetalert.min.js',
                  'vendor/ngSweetAlert/SweetAlert.js']},
              {name: 'ngDialog',                  files: ['vendor/ng-dialog/js/ngDialog.min.js',
                  'vendor/ng-dialog/css/ngDialog.min.css',
                  'vendor/ng-dialog/css/ngDialog-theme-default.min.css'] },
              {name: 'angular-upload',
                  files: ['vendor/angular-file-upload/dist/angular-file-upload.min.js']
              }
          ]
        })
        ;

})();

/**
 * Created by Adolfo on 8/17/2016.
 */
/**=========================================================
 * Module: Modify Prescriber
 * Input validation with UI Validate TO MODIFY PRESCRIBER
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.forms')
        .controller('ConditionController', ConditionController);

    angular.module('app.forms')
        .factory('patientService', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/patients/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }])
        .factory('ConditionResource', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/patients/add-cond/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }]);



    ConditionController.$inject = ['$scope', '$stateParams', 'patientService', 'SweetAlert', '$state', '$filter', '$resource', 'ConditionResource', 'User', '$location', '$cookies'];

    function ConditionController($scope, $stateParams, patientService, SweetAlert, $state, $filter, $resource, ConditionResource, User, $location, $cookies) {
        var vm = this;
        vm.$scope = $scope;


        patientService.get({id: $stateParams.id})
            .$promise
            .then(function (response) {
                console.log(response);
                vm.$scope.form.person = {
                    name: response.name,
                    lastname: response.lastname,
                    birth: response.birth,
                    date: response.date
                };


            }, function (errResponse) {
                //fail
                console.error('error: houston we got a problem', errResponse);
            });


        activate();

        ////////////////

        function activate() {

            vm.changeSelectedItem = function(current){
                // console.log("select changed");

            };

            vm.$scope.target = $stateParams.id;

            if ($cookies.get('token') && $location.path() !== 'app/login') {
                vm.currentUser = User.get();
            }

            vm.submitted = false;
            vm.submitted = false;
            vm.validateInput = function (name, type) {
                var input = vm.formValidate[name];
                return (input.$dirty || vm.submitted) && input.$error[type];
            };




            vm.submitCond = function () {

                if (vm.currentUser.lastname == "" || angular.isUndefined(vm.currentUser.lastname))
                    var creator = vm.currentUser.name;
                else
                    var creator = vm.currentUser.name +" "+ vm.currentUser.lastname;

                console.log("submit cond", $stateParams.id);
                vm.submitted = true;
                // console.dir(vm.newNote);
                var condition = "";
                if(vm.newCondition.text == "Other"){
                    condition = vm.newCondition.other;
                }else{
                    condition = vm.newCondition.text;
                }
                console.log(vm.newCondition.text);

                if (vm.formValidate.$valid) {
                    console.log('Submitted new condition!!');
                    ConditionResource.update({personId: $stateParams.id}, {text: condition, creator: creator})
                        .$promise
                        .then
                        (function (response) {
                            //all good
                            console.log(response);

                            SweetAlert.swal('Success!', 'Condition added', 'success');
                            $state.go('app.expandpat', {id: $stateParams.id});

                        }, function (errResponse) {
                            //fail
                            SweetAlert.swal('Error!', 'Something went wrong while adding a note!', 'warning');
                            console.error('error: Alaska we got a problem', errResponse);
                        });
                } else {
                    console.log("form is invalid");
                    return false;
                }


            };

        }


    }
})();


/**
 * Created by Adolfo on 8/17/2016.
 */
/**=========================================================
 * Module: Modify Prescriber
 * Input validation with UI Validate TO MODIFY PRESCRIBER
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.forms')
        .controller('FollowUpController', FollowUpController);

    angular.module('app.forms')
        .factory('FollowUpPatientService', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/patients/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }])
        .factory('FollowUpResource', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/patients/add-followup/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }]);



    FollowUpController.$inject = ['$scope', '$stateParams', 'FollowUpPatientService', 'SweetAlert', '$state', '$filter', '$resource', 'FollowUpResource', 'User', '$location', '$cookies', '$timeout', 'Upload'];

    function FollowUpController($scope, $stateParams, FollowUpPatientService, SweetAlert, $state, $filter, $resource, FollowUpResource, User, $location, $cookies, $timeout, Upload) {
        var vm = this;
        vm.$scope = $scope;


        FollowUpPatientService.get({id: $stateParams.id})
            .$promise
            .then(function (response) {
                vm.$scope.form.person = {
                    name: response.name,
                    lastname: response.lastname,
                    birth: response.birth,
                    date: response.date
                };


            }, function (errResponse) {
                //fail
                console.error('error: houston we got a problem', errResponse);
            });


        activate();
        activate2();

        ////////////////

        function activate() {

            vm.submitted = false;
            vm.validateInput = function(name, type) {
                var input = vm.formValidate[name];
                return (input.$dirty || vm.submitted) && input.$error[type];
            };

            // Submit form
            vm.submitForm = function() {
                vm.submitted = true;
                if (vm.formValidate.$valid) {
                    console.log('adding follow up...');
                    console.log(vm.newFollowUp);
                    FollowUpResource.update({personId: $stateParams.id}, {followUp: vm.newFollowUp})
                        .$promise
                        .then(function (response) {
                            //success
                            SweetAlert.swal({
                                title: 'Success!',
                                text: 'New appointment created!',
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#A1D490',
                                confirmButtonText: 'Done!',
                                closeOnConfirm: true
                            },  function(){
                                $state.go('app.expandpat', {id: $stateParams.id});
                            });
                        }, function(errResponse){
                            //fail
                            console.error('error: dakota we got a problem', errResponse);
                        });
                } else {
                    SweetAlert.swal('Error!', 'Something went wrong while adding this follow up!', 'warning');
                    return false;
                }
            };



        }

        function activate2() {
            vm.today = function() {
                vm.dt = new Date();
            };
            vm.today();

            vm.clear = function () {
                vm.dt = null;
            };

            // Disable weekend selection
            vm.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

            vm.toggleMin = function() {
                vm.minDate = vm.minDate ? null : new Date();
            };
            vm.toggleMin();

            vm.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                vm.opened = true;
            };

            vm.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            vm.initDate = new Date('2019-10-20');
            vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            vm.format = vm.formats[0];
        }


    }
})();


/**=========================================================
 * Module: FormValidationController
 * Input validation with UI Validate
 =========================================================*/

(function() {
    'use strict';


    angular
        .module('app.forms')
        .controller('FormValidationController', FormValidationController);

    function FormValidationController($resource, $state, SweetAlert ) {
        var vm = this;
        activate();

        $resource(globalUri + 'api/users/all').query().$promise.then(function(consultants) {
            vm.consultants = consultants;
            vm.consultants.count = consultants.length;

        });

        ////////////////

        function activate() {

            vm.submitted = false;
            vm.validateInput = function(name, type) {
                var input = vm.formValidate[name];
                return (input.$dirty || vm.submitted) && input.$error[type];
            };

            // Submit form
            vm.submitForm = function() {
                vm.submitted = true;
                if (vm.formValidate.$valid) {
                    console.log('Submitted!!');
                    console.log(this.newPrescriber);
                    $resource(globalUri + 'api/prescribers').save(this.newPrescriber)
                        .$promise
                        .then(function(data){
                            SweetAlert.swal({
                                title: 'Success!',
                                text: 'The prescriber was modified!',
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#A1D490',
                                confirmButtonText: 'Done!',
                                closeOnConfirm: true
                            },  function(){
                                $state.go('app.singleview');
                            });
                    }, function (errResponse) {
                        console.error('error: pennsylvania we got a problem');
                        });

                } else {
                    SweetAlert.swal('Error!', 'Something went wrong while adding this presciber!', 'warning');
                    return false;
                }
            };
        }
    }
    FormValidationController.$inject = ["$resource", "$state", "SweetAlert"];
})();

(function ($rootScope){
    'use strict';

    console.log(globalUri);

    angular.module('app.forms')
        .controller('LoginController', LoginController);

    angular.module('app.forms')
        .factory('userService', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/users/login', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }]);

    function UserResource($resource, $rootScope) {

        return $resource(globalUri + 'api/users/:id/:controller', {
            id: '@_id'
        }, {
            changePassword: {
                method: 'PUT',
                params: {
                    controller: 'password'
                }
            },
            get: {
                method: 'GET',
                params: {
                    id: 'me'
                }
            }
        });
    }
    UserResource.$inject = ["$resource", "$rootScope"];

    angular.module('app.forms')
        .factory('User', UserResource);

    LoginController.$inject = ['$scope', '$http', '$cookies',  '$state', 'userService', 'SweetAlert', 'Auth', 'User'];

    function LoginController($scope, $http, $cookies, $state, userService, SweetAlert, Auth, User) {

        var vm = this;
        vm.$scope = $scope;
        vm.login = {};

        var currentUser = {};

        activate();

        function activate() {

            console.log("activated");

            vm.login.email = "test@example.com";
            vm.login.password = "test";

            vm.submitted = false;
            vm.validateInput = function (name, type) {
                var input = vm.loginForm[name];
                return (input.$dirty || vm.submitted) && input.$error[type];
            };

            vm.submitForm = function () {
                vm.submitted = true;
                console.log("FU");

                var email = vm.login.email;
                var password = vm.login.password;

                if (vm.loginForm.$valid) {
                    console.log("Trying to log in....");
                    $http.post(globalUri + 'auth/local', { email: email, password: password})
                        .then
                        (function(res) {
                            console.log("res =", res);
                            // Auth.setUser(res.data.token);
                            $cookies.put('token', res.data.token);
                            currentUser = User.get();
                            return currentUser.$promise;
                        })
                        .then(function () {
                            // redirect to dashboard after login
                            $state.go('app.dashboard');
                        })
                        .catch
                        (function (err) {
                            console.log(err);
                            console.log(err.statusText);
                            SweetAlert.swal('Error!', err.statusText, 'warning');

                        });
                }

            };
        }

    }

})();


/**=========================================================
 * Module: Modify Prescriber
 * Input validation with UI Validate TO MODIFY PRESCRIBER
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.forms')
        .controller('ModifyPatientFormValidationController', ModifyPatientFormValidationController);

    angular.module('app.forms')
        .factory('patientService', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/patients/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }])
        .factory('prescriberService', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/prescribers/:id', {
                id: '@param1'
            }, {
                query: {
                    method: 'GET', isArray: true
                }
            });
        }])
        .factory('PatientNoteResource', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/patients/add-notes/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }])
        .factory('PatientDeleteNoteResource', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/patients/delete-notes/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }])
        .factory('DeleteCondResource', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/patients/delete-cond/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }])
        .factory('DeleteSystemsResource', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/patients/delete-system/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }])
        .factory('DeleteFileResource', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/patients/delete-file/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }]);


    angular.module('app.forms')
        .directive('datepickerPopup', function (){
            return {
                restrict: 'EAC',
                require: 'ngModel',
                link: function(scope, element, attr, controller) {
                    //remove the default formatter from the input directive to prevent conflict
                    controller.$formatters.shift();
                }
            }
        });

    ModifyPatientFormValidationController.$inject = ['$scope', '$rootScope', '$stateParams', 'patientService', 'SweetAlert', '$state', 'PatientNoteResource', 'PatientDeleteNoteResource', 'prescriberService', '$resource', 'DeleteCondResource', 'User', '$location', '$cookies', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'DeleteSystemsResource', 'DeleteFileResource'];

    function ModifyPatientFormValidationController($scope, $rootScope, $stateParams, patientService, SweetAlert, $state, PatientNoteResource, PatientDeleteNoteResource, prescriberService, $resource, DeleteCondResource, User, $location, $cookies, DTOptionsBuilder, DTColumnDefBuilder, DeleteSystemsResource, DeleteFileResource) {
        var vm = this;
        vm.$scope = $scope;

        prescriberService.query()
            .$promise
            .then(function (response) {

                vm.prescribers = [];
                angular.forEach(response, function (value, index) {

                    var singlePrescriber = value;

                    singlePrescriber.name = value.name + " " + value.lastname +"  (NPI: "+ value.npi +")";
                    vm.prescribers.push(singlePrescriber);
                });


            }, function (errResponse) {
                //fail
                console.error('error: houston we got a problem', errResponse);
            });

        $resource(globalUri + 'api/users/all').query().$promise.then(function(consultants) {

            vm.consultants = [];
            angular.forEach(consultants, function (value, index) {

                var singleConsultant = value;
                if(angular.isUndefined(value.lastname))
                    value.lastname = "";

                singleConsultant.name = value.name + " " + value.lastname;
                vm.consultants.push(singleConsultant);
            });


            vm.consultants.count = consultants.length;

        });

        patientService.get({id: $stateParams.id})
            .$promise
            .then(function (response) {
                vm.$scope.form.person = {
                    prescriber: response.prescriber,
                    name: response.name,
                    conditions: response.conditions,
                    middle: response.middle,
                    lastname: response.lastname,
                    address: response.address,
                    address2: response.address2,
                    city: response.city,
                    state: response.state,
                    postal: response.postal,
                    phone: response.phone,
                    phone2: response.phone,
                    email: response.email,
                    email2: response.email2,
                    birth: response.birth,
                    date: response.date,
                    insuranceName: response.insuranceName,
                    insuranceNumber: response.insuranceNumber,
                    insuranceGroup: response.insuranceGroup,
                    insurancePhone: response.insurancePhone,
                    dmeName: response.dmeName,
                    dmeEmail: response.dmeEmail,
                    dmePerson: response.dmePerson,
                    dmePhone: response.dmePhone,
                    consultant: response.consultant,
                    notes: response.notes,
                    appointments: response.appointments,
                    sales: response.sales,
                    notes2: response.notes2,
                    files: response.files
                };

                vm.sumSales = 0;
                vm.numSales = 0;
                angular.forEach(vm.person.sales, function (value) {
                    vm.sumSales += value.amount;
                    vm.numSales += 1;
                });

                vm.selectedConsultant = vm.person.consultant;
                vm.selectedPrescriber = vm.person.prescriber;

                prescriberService.get({ id: vm.person.prescriber })
                    .$promise
                    .then(function (response) {


                        vm.prescriberName = response.name + " " + response.lastname + "  (NPI:" + response.npi + ")" ;
                        vm.prescriberId = response._id;


                    }, function (errResponse) {
                        //fail
                        console.error('error: houston we got a problem', errResponse);
                    });


                User.get({id: vm.person.consultant})
                    .$promise
                    .then(function (person) {

                        // in case the lastname is undefined
                        if(person.lastname == "" || angular.isUndefined(person.lastname))
                            vm.person.consultant = person.name;
                        else
                            vm.person.consultant = person.name +" "+ person.lastname;
                    });

                vm.person.birth = new Date(vm.person.birth);

                vm.person.prescriber = vm.person.prescriber[0];

                //in case one of the fields is 0
                if (response.address2 == 0) {
                    vm.$scope.form.person.address2 = "";
                }
                if (response.email2 == 0) {
                    vm.$scope.form.person.email2 = "";
                }


            }, function (errResponse) {
                //fail
                console.error('error: houston we got a problem', errResponse);
            });


        activate();
        activate2();

        ////////////////

        function activate() {

            vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
            vm.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3).notSortable()
            ];

            vm.systemDtOptions = DTOptionsBuilder
                .newOptions()
                .withDisplayLength(4)
                .withOption('order', [[ 0, 'desc' ]])
                .withOption("lengthMenu", [ [4], ["4"] ]);


            vm.changeSelectedItem = function(current){
                //console.log("select changed", current._id);

            };

            vm.$scope.target = $stateParams.id;

            if ($cookies.get('token') && $location.path() !== 'app/login') {
                vm.currentUser = User.get();
            }

            vm.submitted = false;
            vm.validateInput = function (name, type) {
                var input = vm.formValidate[name];
                return (input.$dirty || vm.submitted) && input.$error[type];
            };


            // Submit form
            vm.submitForm = function () {

                vm.submitted = true;
                if (vm.formValidate.$valid) {
                    console.log('Trying to update ' + $stateParams.id);

                    vm.person.consultant = vm.selectedConsultant;
                    vm.person.prescriber = vm.selectedPrescriber;

                    patientService.update({id: $stateParams.id}, vm.person)
                        .$promise
                        .then(function (response) {
                            SweetAlert.swal({
                                title: 'Success!',
                                text: 'The prescriber was modified!',
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#A1D490',
                                confirmButtonText: 'Done!',
                                closeOnConfirm: true
                            }, function () {
                                $state.go('app.patients');
                            });
                        }, function (errResponse) {
                            //fail
                            SweetAlert.swal('Error!', 'Fill in the prescriber and consultant!', 'warning');
                            console.error('error in patient: wyoming we got a problem', errResponse);
                        });

                } else {
                    console.log('Not valid!!');
                    SweetAlert.swal('Error!', 'Something went wrong while deleting this entry!', 'warning');
                    return false;
                }
            };


            vm.submitNote = function () {

                if (vm.currentUser.lastname == "" || angular.isUndefined(vm.currentUser.lastname))
                    var creator = vm.currentUser.name;
                else
                    var creator = vm.currentUser.name +" "+ vm.currentUser.lastname;

                console.log("submit note", $stateParams.id);
                vm.submitted = true;
                console.dir(vm.newNote);
                console.log(vm.newNote.text);

                if (vm.formValidate.$valid) {
                    console.log('Submitted to patient!!');
                    PatientNoteResource.update({personId: $stateParams.id}, {text: vm.newNote.text, creator: creator})
                        .$promise
                        .then
                        (function (response) {
                            //all good

                            SweetAlert.swal('Success!', 'Note added', 'success');

                            var note = {};
                            note.text = vm.newNote.text;
                            note.creator = creator;
                            var myDate = new Date();
                            note.created_at = myDate.toISOString();

                            vm.person.notes.push(note);

                            vm.newNote = {};
                            vm.formValidate.$setPristine();
                            vm.formValidate.$setUntouched();

                        }, function (errResponse) {
                            //fail
                            SweetAlert.swal('Error!', 'Something went wrong while adding a note!', 'warning');
                            console.error('error: Alaska we got a problem', errResponse);
                        });
                } else {
                    console.log("form is invalid");
                    return false;
                }


            };


            vm.deleteNote = function(item) {
                SweetAlert.swal({
                    title: 'Confirm note deletion?',
                    text: 'You will not be able to recover this record!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, confirm deletion!',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function(isConfirm){
                    if (isConfirm) {
                        removeNote(item);
                    }
                });
            };


            function removeNote(item) {

                PatientDeleteNoteResource.update({ personId: $stateParams.id }, {noteId: item._id})
                    .$promise
                    .then
                    (function(response) {
                        //all good
                        console.log(response);
                        vm.person.notes.splice(vm.person.notes.indexOf(item), 1);
                        SweetAlert.swal('Deleted!', 'This record has been deleted', 'success');
                    }, function(errResponse){
                        //fail
                        SweetAlert.swal('Error!', 'Something went wrong while deleting this note!', 'warning');
                        console.error('error: Alaska we got a problem', errResponse);
                    });

            }

            vm.deleteCond = function(condId, index) {
                SweetAlert.swal({
                    title: 'Confirm condition deletion?',
                    text: 'You will not be able to recover this record!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, confirm deletion!',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function(isConfirm){
                    if (isConfirm) {
                        removeCond($stateParams.id, condId, index);
                    }
                });
            };

            function removeCond(personId, condId, index) {

                vm.person.conditions.splice(index, 1);
                console.log(vm.person.conditions);

                DeleteCondResource.update({ personId: personId }, {condId: condId})
                    .$promise
                    .then
                    (function(response) {
                        //all good
                        console.log(response);

                        SweetAlert.swal('Deleted!', 'This record has been deleted', 'success');
                    }, function(errResponse){
                        //fail
                        SweetAlert.swal('Error!', 'Something went wrong while deleting this condition!', 'warning');
                        console.error('error: Alaska we got a problem', errResponse);
                    });

            }


            vm.deleteSystem = function(saleId, index) {
                SweetAlert.swal({
                    title: 'Confirm note deletion?',
                    text: 'You will not be able to recover this record!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, confirm deletion!',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function(isConfirm){
                    if (isConfirm) {
                        removeSystem($stateParams.id, saleId, index);
                    }
                });
            };

            function removeSystem(personId, saleId, index) {

                vm.person.sales.splice(index, 1);
                console.log(vm.person.sales);

                DeleteSystemsResource.update({ personId: personId }, {saleId: saleId})
                    .$promise
                    .then
                    (function(response) {
                        //all good
                        console.log(response);
                        SweetAlert.swal('Deleted!', 'This record has been deleted', 'success');
                    }, function(errResponse){
                        //fail
                        SweetAlert.swal('Error!', 'Something went wrong while deleting this system!', 'warning');
                        console.error('error: Alaska we got a problem', errResponse);
                    });

            }


            vm.deleteFile = function(fileId, index) {
                SweetAlert.swal({
                    title: 'Confirm file deletion?',
                    text: 'Your will not be able to recover this file!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, confirm deletion!',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function(isConfirm){
                    if (isConfirm) {
                        removeFile($stateParams.id, fileId, index);
                    }
                });
            };

            function removeFile(personId, fileId, index) {

                vm.person.files.splice(index, 1);
                console.log(vm.person.files);

                DeleteFileResource.update({ personId: personId }, {fileId: fileId})
                    .$promise
                    .then
                    (function(response) {
                        //all good
                        console.log(response);
                        SweetAlert.swal('Deleted!', 'This record has been deleted', 'success');
                    }, function(errResponse){
                        //fail
                        SweetAlert.swal('Error!', 'Something went wrong while deleting this file!', 'warning');
                        console.error('error: Alaska we got a problem', errResponse);
                    });

            }

        }

        function activate2() {

            vm.minDate = new Date('1900-10-20');

            vm.today = function() {
                vm.dt = new Date();
            };
            vm.today();

            vm.clear = function () {
                vm.dt = null;
            };

            // Disable weekend selection
            vm.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

            //vm.toggleMin = function() {
            //    vm.minDate = vm.minDate ? null : new Date();
            //};
            //vm.toggleMin();

            vm.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                vm.opened = true;
            };

            vm.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            vm.initDate = new Date('2020-10-20');
            vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            vm.format = vm.formats[2];
        }
    }
})();


/**=========================================================
 * Module: Modify Prescriber
 * Input validation with UI Validate TO MODIFY PRESCRIBER
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.forms')
        .controller('ModifyFormValidationController', ModifyFormValidationController);

    angular.module('app.forms')
        .factory('ModifyPrescriberService', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/prescribers/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }])
        .factory('PrescriberNoteResource', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/prescribers/add-notes/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            })
        }])
        .factory('PrescriberDeleteNoteResource', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/prescribers/delete-prescriber-notes/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            })
        }]);

    ModifyFormValidationController.$inject = ['$scope', '$resource', '$stateParams', 'ModifyPrescriberService', 'SweetAlert', '$state', 'PrescriberNoteResource', 'PrescriberDeleteNoteResource', 'User', '$location', '$cookies'];

    function ModifyFormValidationController($scope, $resource, $stateParams, ModifyPrescriberService, SweetAlert, $state, PrescriberNoteResource, PrescriberDeleteNoteResource, User, $location, $cookies) {
        var vm = this;
        vm.$scope = $scope;

        $resource(globalUri + 'api/users/all').query().$promise.then(function(consultants) {
            vm.consultants = consultants;
            vm.consultants.count = consultants.length;

        });



        ModifyPrescriberService.get({id: $stateParams.id})
            .$promise
            .then(function (response) {
                vm.$scope.form.person = {
                    name: response.name,
                    middle: response.middle,
                    lastname: response.lastname,
                    address: response.address,
                    address2: response.address2,
                    city: response.city,
                    state: response.state,
                    postal: response.postal,
                    phone: response.phone,
                    fax: response.fax,
                    npi: response.npi,
                    location: response.location,
                    locations: response.locations,
                    consultant: response.consultant,
                    notes: response.notes,
                    appointments: response.appointments
                };


                User.get({id: vm.person.consultant})
                    .$promise
                    .then(function (person) {

                        // in case the lastname is undefined
                        if(person.lastname == "" || angular.isUndefined(person.lastname))
                            vm.person.consultant = person.name;
                        else
                            vm.person.consultant = person.name +" "+ person.lastname;
                    });


                //in case one of the fields is 0
                if (response.address2 == 0) {
                    vm.$scope.form.person.address2 = "";
                }
                if (response.fax == 0) {
                    vm.$scope.form.person.fax = "";
                }


            }, function (errResponse) {
                //fail
                console.error('error: houston we got a problem', errResponse);
            });


        activate();

        ////////////////

        function activate() {

            vm.$scope.target = $stateParams.id;

            if ($cookies.get('token') && $location.path() !== 'app/login') {
                vm.currentUser = User.get();
            }

            vm.submitted = false;
            vm.validateInput = function (name, type) {
                var input = vm.formValidate[name];
                return (input.$dirty || vm.submitted) && input.$error[type];
            };

            // Submit form
            vm.submitForm = function () {
                vm.submitted = true;
                if (vm.formValidate.$valid) {
                    console.log('Trying to update the prescriber ' + $stateParams.id);

                    ModifyPrescriberService.update({id: $stateParams.id}, vm.person)
                        .$promise
                        .then(function (response) {
                            SweetAlert.swal({
                                title: 'Success!',
                                text: 'The prescriber was modified!',
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#A1D490',
                                confirmButtonText: 'Done!',
                                closeOnConfirm: true
                            }, function () {
                                $state.go('app.singleview');
                            });
                        }, function (errResponse) {
                            //fail
                            console.error('error: wyoming we got a problem', errResponse);
                        });

                } else {
                    console.log('Not valid!!');
                    SweetAlert.swal('Error!', 'Something went wrong while updating the prescriber!', 'warning');
                    return false;
                }
            };


            vm.submitNote = function () {
                if (vm.currentUser.lastname == "" || angular.isUndefined(vm.currentUser.lastname))
                    var creator = vm.currentUser.name;
                else
                    var creator = vm.currentUser.name +" "+ vm.currentUser.lastname;



                console.log("submit note", $stateParams.id);
                vm.submitted = true;
                console.dir(vm.newNote);
                console.log(vm.newNote.text);

                if (vm.formValidate.$valid) {
                    console.log('Submitted note to prescriber!!');
                    PrescriberNoteResource.update({personId: $stateParams.id}, {text: vm.newNote.text, creator: creator })
                        .$promise
                        .then
                        (function (response) {
                            //all good
                            console.log(response);

                            SweetAlert.swal('Success!', 'Note added', 'success');

                            var note = {};
                            note.text = vm.newNote.text;
                            note.creator = creator;
                            var myDate = new Date();
                            note.created_at = myDate.toISOString();

                            vm.person.notes.push(note);

                            vm.newNote.text = "";
                            vm.formValidate.$setPristine();
                            vm.formValidate.$setUntouched();


                        }, function (errResponse) {
                            //fail
                            SweetAlert.swal('Error!', 'Something went wrong while adding a note!', 'warning');
                            console.error('error: Alaska we got a problem', errResponse);
                        });
                } else {
                    console.log("form is invalid");
                    return false;
                }


            };


            vm.deleteNote = function(item) {
                SweetAlert.swal({
                    title: 'Confirm deletion?',
                    text: 'You will not be able to recover this record!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, confirm deletion!',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function(isConfirm){
                    if (isConfirm) {
                        removePerson(item);
                    }
                });
            };

            vm.removePerson = removePerson;

            function removePerson(item) {

                //Removes the location from the Angular DOM
                // console.log("index is", vm.person.notes.indexOf(item));
                // console.log("item is", item);

                PrescriberDeleteNoteResource.update({ personId: $stateParams.id }, {noteId: item._id})
                    .$promise
                    .then
                    (function(response) {
                        //all good
                        console.log(response);
                        vm.person.notes.splice(vm.person.notes.indexOf(item), 1);
                        SweetAlert.swal('Deleted!', 'This record has been deleted', 'success');
                    }, function(errResponse){
                        //fail
                        SweetAlert.swal('Error!', 'Something went wrong while updating the prescriber!', 'warning');
                        console.error('error: Alaska we got a problem', errResponse);
                    });

            }
        }
    }
})();


/**
 * Created by Adolfo on 8/8/2016.
 */
/**=========================================================
 * Module: AppointmentFormValidationController
 * Input validation with UI Validate for NEW Appointments
 =========================================================*/


(function() {
    'use strict';


    angular
        .module('app.forms')
        .controller('AppointmentFormValidationController', AppointmentFormValidationController);

    angular.module('app.forms')
        .factory('prescriberService', ["$resource", function($resource) {
            return $resource(globalUri + 'api/prescribers/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }])
        .factory('AppointmentCreationService', ["$resource", function($resource) {
            return $resource(globalUri + 'api/prescribers/add-app/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }]);


    AppointmentFormValidationController.$inject = ['$scope', '$resource', '$stateParams', 'SweetAlert', '$state', 'prescriberService', 'AppointmentCreationService'];


    function AppointmentFormValidationController($scope, $resource, $stateParams, SweetAlert, $state, prescriberService, AppointmentCreationService) {
        var vm = this;
        vm.$scope = $scope;
        vm.locations = [];

        $resource(globalUri + 'api/users/all').query().$promise.then(function(consultants) {
            vm.consultants = consultants;
            vm.consultants.count = consultants.length;

        });

        prescriberService.get({ id: $stateParams.id })
            .$promise
            .then(function(response){
                console.log(response);
                vm.$scope.form.title = {
                    name: response.name,
                    lastname: response.lastname,
                    npi: response.npi
                };
                vm.locations = response.locations;
                console.log(vm.locations);

            }, function(errResponse){
                //fail
                console.error('error: manila we got a problem', errResponse);
            });

        activate();
        activate2();
        activate3();

        ////////////////

        function activate() {

            vm.submitted = false;
            vm.validateInput = function(name, type) {
                var input = vm.formValidate[name];
                return (input.$dirty || vm.submitted) && input.$error[type];
            };

            // Submit form
            vm.submitForm = function() {
                vm.submitted = true;
                if (vm.formValidate.$valid) {
                    console.log('SU SU Submitted!!');
                    console.log(this.newAppointment);
                    console.log(vm.newAppointment);
                    AppointmentCreationService.update({id: $stateParams.id}, {appointments: vm.newAppointment})
                        .$promise
                        .then(function (response) {
                            //success
                            SweetAlert.swal({
                                title: 'Success!',
                                text: 'New appointment created!',
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#A1D490',
                                confirmButtonText: 'Done!',
                                closeOnConfirm: true
                            },  function(){
                                $state.go('app.expanddoc', {id: $stateParams.id});
                            });
                        }, function(errResponse){
                            //fail
                            console.error('error: dakota we got a problem', errResponse);
                        });
                } else {
                    SweetAlert.swal('Error!', 'Something went wrong while adding this location!', 'warning');
                    return false;
                }
            };
        }

        function activate2() {
            vm.today = function() {
                vm.dt = new Date();
            };
            vm.today();

            vm.clear = function () {
                vm.dt = null;
            };

            // Disable weekend selection
            vm.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

            vm.toggleMin = function() {
                vm.minDate = vm.minDate ? null : new Date();
            };
            vm.toggleMin();

            vm.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                vm.opened = true;
            };

            vm.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            vm.initDate = new Date('2019-10-20');
            vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            vm.format = vm.formats[0];
        }

        function activate3() {
            vm.mytime = new Date();

            vm.hstep = 1;
            vm.mstep = 15;

            vm.options = {
                hstep: [1, 2, 3],
                mstep: [1, 5, 10, 15, 25, 30]
            };

            vm.ismeridian = true;
            vm.toggleMode = function() {
                vm.ismeridian = ! vm.ismeridian;
            };

            vm.update = function() {
                var d = new Date();
                d.setHours( 14 );
                d.setMinutes( 0 );
                vm.mytime = d;
            };

            vm.changed = function () {
                console.log('Time changed to: ' + vm.mytime);
            };

            vm.clear = function() {
                vm.mytime = null;
            };
        }
    }
})();

/**
 * Created by Adolfo on 8/17/2016.
 */
/**=========================================================
 * Module: Modify Prescriber
 * Input validation with UI Validate TO MODIFY PRESCRIBER
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.forms')
        .controller('FilesController', FilesController);

    angular.module('app.forms')
        .factory('FilesPatientService', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/patients/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }])
        .factory('FileResource', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/patients/add-file/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }])
        .directive("fileread", [function () {
            return {
                scope: {
                    fileread: "="
                },
                link: function (scope, element, attributes) {
                    element.bind("change", function (changeEvent) {
                        var reader = new FileReader();
                        reader.onload = function (loadEvent) {
                            scope.$apply(function () {
                                scope.fileread = loadEvent.target.result;
                            });
                        }
                        reader.readAsDataURL(changeEvent.target.files[0]);
                    });
                }
            }
        }]);



    FilesController.$inject = ['$scope', '$stateParams', 'FilesPatientService', 'SweetAlert', '$state', '$filter', '$resource', 'FileResource', 'User', '$location', '$cookies', '$timeout', 'Upload'];

    function FilesController($scope, $stateParams, FilesPatientService, SweetAlert, $state, $filter, $resource, FileResource, User, $location, $cookies, $timeout, Upload) {
        var vm = this;
        vm.$scope = $scope;


        FilesPatientService.get({id: $stateParams.id})
            .$promise
            .then(function (response) {
                vm.$scope.form.person = {
                    name: response.name,
                    lastname: response.lastname,
                    birth: response.birth,
                    date: response.date
                };


            }, function (errResponse) {
                //fail
                console.error('error: houston we got a problem', errResponse);
            });


        activate();

        ////////////////

        function activate() {

            vm.uploadPic = function(file) {
                file.upload = Upload.upload({
                    url: globalUri + 'api/patients/uploads/'+ $stateParams.id,
                    method: 'PUT',
                    data: {description: vm.description, file: file},
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0){
                        vm.errorMsg = response.status + ': ' + response.data;

                    }


                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    SweetAlert.swal('Success!', 'File added', 'success');
                    $state.go('app.expandpat', {id: $stateParams.id});
                });
            };

            vm.changeSelectedItem = function(current){
                // console.log("select changed");

            };

            vm.$scope.target = $stateParams.id;

            if ($cookies.get('token') && $location.path() !== 'app/login') {
                vm.currentUser = User.get();
            }

            vm.submitted = false;
            vm.submitted = false;
            vm.validateInput = function (name, type) {
                var input = vm.formValidate[name];
                return (input.$dirty || vm.submitted) && input.$error[type];
            };




            vm.submitFile = function () {

                if (vm.currentUser.lastname == "" || angular.isUndefined(vm.currentUser.lastname))
                    var creator = vm.currentUser.name;
                else
                    var creator = vm.currentUser.name +" "+ vm.currentUser.lastname;

                console.log("submit cond", $stateParams.id);
                vm.submitted = true;
                // console.dir(vm.newNote);
                
                


                if (vm.formValidate.$valid) {
                    console.log('Submitted new file!!');
                    console.dir(vm.newFile);
                    FileResource.update({personId: $stateParams.id}, {description: vm.newFile.description, file: vm.newFile.testFile})
                        .$promise
                        .then
                        (function (response) {
                            //all good
                            console.log(response);

                            SweetAlert.swal('Success!', 'File added', 'success');
                            $state.go('app.expandpat', {id: $stateParams.id});

                        }, function (errResponse) {
                            //fail
                            SweetAlert.swal('Error!', 'Something went wrong while adding a file!', 'warning');
                            console.error('error: Alaska we got a problem', errResponse);
                        });
                } else {
                    console.log("form is invalid");
                    return false;
                }


            };

        }


    }
})();

/**=========================================================
 * Module: LocationFormValidationController
 * Input validation with UI Validate for NEW LOCATIONS
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('app.forms')
        .controller('LocationFormValidationController', LocationFormValidationController);

    angular.module('app.forms')
        .factory('newLocationPrescriberService', ["$resource", function($resource) {
            return $resource(globalUri + 'api/prescribers/:id', {id: '@param1'},
                {
                update: {method: 'PUT'}
            })
        }]);

    LocationFormValidationController.$inject = ['$scope', '$stateParams', 'newLocationPrescriberService', 'SweetAlert', '$state'];

    function LocationFormValidationController($scope, $stateParams, newLocationPrescriberService, SweetAlert, $state) {
        var vm = this;
        vm.$scope = $scope;
        vm.locations = [];

        newLocationPrescriberService.get({ id: $stateParams.id })
            .$promise
            .then(function(response){
                console.log(response);
                vm.$scope.form.title = {
                    name: response.name,
                    lastname: response.lastname,
                    npi: response.npi
                };
            vm.locations = response.locations;
                console.log(vm.locations);

            }, function(errResponse){
                //fail
                console.error('error: manila we got a problem', errResponse);
            });

        activate();

        ////////////////

        function activate() {

            vm.submitted = false;
            vm.validateInput = function(name, type) {
                var input = vm.formValidate[name];
                return (input.$dirty || vm.submitted) && input.$error[type];
            };

            // Submit form
            vm.submitForm = function() {
                vm.submitted = true;
                if (vm.formValidate.$valid) {
                    console.log('Submitted!!');
                    console.log(this.newLocation);
                    vm.locations.push(this.newLocation);
                    console.log(vm.locations);
                    newLocationPrescriberService.update({id: $stateParams.id}, {locations: vm.locations})
                        .$promise
                        .then(function (response) {
                            //success
                            SweetAlert.swal({
                                title: 'Success!',
                                text: 'The new location was added!',
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#A1D490',
                                confirmButtonText: 'Done!',
                                closeOnConfirm: true
                            },  function(){
                                $state.go('app.expanddoc', {id: $stateParams.id});
                            });
                        }, function(errResponse){
                            //fail
                            console.error('error: dakota we got a problem', errResponse);
                        });




                } else {
                        SweetAlert.swal('Error!', 'Something went wrong while adding this location!', 'warning');
                    return false;
                }
            };
        }
    }
})();

/**
 * Created by Adolfo on 8/8/2016.
 */
/**=========================================================
 * Module: AppointmentFormValidationController
 * Input validation with UI Validate for NEW Appointments
 =========================================================*/


(function() {
    'use strict';


    angular
        .module('app.forms')
        .controller('PatientAppointmentFormValidationController', PatientAppointmentFormValidationController);

    angular.module('app.forms')
        .factory('patientService', ["$resource", function($resource) {
            return $resource(globalUri + 'api/patients/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }])
        .factory('PatientAppointmentFormValidationController', ["$resource", function($resource) {
            return $resource(globalUri + 'api/patients/add-app/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }]);


    PatientAppointmentFormValidationController.$inject = ['$scope', '$stateParams', 'SweetAlert', '$state', 'patientService', 'PatientAppointmentFormValidationController'];


    function PatientAppointmentFormValidationController($scope, $stateParams, SweetAlert, $state, patientService, PatientAppointmentFormValidationController) {
        var vm = this;
        vm.$scope = $scope;
        vm.locations = [];

        patientService.get({ id: $stateParams.id })
            .$promise
            .then(function(response){
                console.log(response);
                vm.$scope.form.title = {
                    name: response.name,
                    lastname: response.lastname,
                    date: response.date,
                    birth: response.birth
                };
                vm.locations = response.locations;
                console.log(vm.locations);

            }, function(errResponse){
                //fail
                console.error('error: manila we got a problem', errResponse);
            });

        activate();
        activate2();
        activate3();

        ////////////////

        function activate() {

            vm.submitted = false;
            vm.validateInput = function(name, type) {
                var input = vm.formValidate[name];
                return (input.$dirty || vm.submitted) && input.$error[type];
            };

            // Submit form
            vm.submitForm = function() {
                vm.submitted = true;
                if (vm.formValidate.$valid) {
                    console.log('SU SU Submitted!!');
                    console.log(this.newAppointment);
                    console.log(vm.newAppointment);
                    PatientAppointmentFormValidationController.update({id: $stateParams.id}, {appointments: vm.newAppointment})
                        .$promise
                        .then(function (response) {
                            //success
                            SweetAlert.swal('Success!', 'New appointment created!', 'success');

                            $state.go('app.expandpat', {id: $stateParams.id});


                        }, function(errResponse){
                            //fail
                            SweetAlert.swal('Error!', 'Something went wrong while creating an appointment!', 'warning');

                            console.error('error: Milwaukee we got a problem', errResponse);
                        });
                } else {
                    SweetAlert.swal('Error!', 'Something went wrong', 'warning');
                    return false;
                }
            };
        }

        function activate2() {
            vm.today = function() {
                vm.dt = new Date();
            };
            vm.today();

            vm.clear = function () {
                vm.dt = null;
            };

            // Disable weekend selection
            vm.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

            vm.toggleMin = function() {
                vm.minDate = vm.minDate ? null : new Date();
            };
            vm.toggleMin();

            vm.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                vm.opened = true;
            };

            vm.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            vm.initDate = new Date('2019-10-20');
            vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            vm.format = vm.formats[0];
        }

        function activate3() {
            vm.mytime = new Date();

            vm.hstep = 1;
            vm.mstep = 15;

            vm.options = {
                hstep: [1, 2, 3],
                mstep: [1, 5, 10, 15, 25, 30]
            };

            vm.ismeridian = true;
            vm.toggleMode = function() {
                vm.ismeridian = ! vm.ismeridian;
            };

            vm.update = function() {
                var d = new Date();
                d.setHours( 14 );
                d.setMinutes( 0 );
                vm.mytime = d;
            };

            vm.changed = function () {
                console.log('Time changed to: ' + vm.mytime);
            };

            vm.clear = function() {
                vm.mytime = null;
            };
        }
    }
})();

/**
 * Created by Adolfo on 8/9/2016.
 */
/**=========================================================
 * Module: FormValidationController
 * Input validation with UI Validate
 =========================================================*/

(function() {
    'use strict';


    angular
        .module('app.forms')
        .controller('PatientFormValidationController', PatientFormValidationController);
    angular.module('app.forms')
        .factory('prescriberService', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/prescribers/:id', {
                id: '@param1'
            }, {
                query: {
                    method: 'GET', isArray: true
                }
            });
        }])
        .factory('userService', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/users/all', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }]);

    PatientFormValidationController.$inject = ['$scope', '$resource', '$state', 'SweetAlert', 'prescriberService', 'userService'];
    function PatientFormValidationController($scope, $resource, $state, SweetAlert, prescriberService, userService ) {
        var vm = this;
        vm.$scope = $scope;

        $resource(globalUri + 'api/prescribers').query().$promise.then(function(persons) {
            vm.persons = persons;
            vm.persons.count = persons.length;

        });

        $resource(globalUri + 'api/users/all').query().$promise.then(function(consultants) {
            vm.consultants = consultants;
            vm.consultants.count = consultants.length;

        });



        prescriberService.query()
            .$promise
            .then(function (response) {
                console.log(response);
                vm.prescribers = response;


            }, function (errResponse) {
                //fail
                console.error('error: houston we got a problem', errResponse);
            });
        activate();
        activate2();

        ////////////////

        function activate() {

            vm.submitted = false;
            vm.validateInput = function(name, type) {
                var input = vm.formValidate[name];
                return (input.$dirty || vm.submitted) && input.$error[type];
            };

            // Submit form
            vm.submitForm = function() {
                vm.submitted = true;
                if (vm.formValidate.$valid) {
                    console.log('Submitted!!');
                    console.log(this.newPatient);
                    $resource(globalUri + 'api/patients').save(this.newPatient)
                        .$promise
                        .then(function(data){
                            SweetAlert.swal({
                                title: 'Success!',
                                text: 'The patient was saved!',
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#A1D490',
                                confirmButtonText: 'Done!',
                                closeOnConfirm: true
                            },  function(){
                                $state.go('app.patients');
                            });
                        }, function (errResponse) {
                            console.error('error: Washington we got a problem');
                        });

                } else {
                    SweetAlert.swal('Error!', 'Something went wrong while adding this presciber!', 'warning');
                    return false;
                }
            };
        }

        function activate2() {

            vm.minDate = new Date('1900-10-20');

            vm.today = function() {
                vm.dt = new Date();
            };
            vm.today();

            vm.clear = function () {
                vm.dt = null;
            };

            // Disable weekend selection
            vm.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

            //vm.toggleMin = function() {
            //    vm.minDate = vm.minDate ? null : new Date();
            //};
            //vm.toggleMin();

            vm.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                vm.opened = true;
            };

            vm.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            vm.initDate = new Date('2020-10-20');
            vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            vm.format = vm.formats[0];
        }
    }
})();

/**
 * Created by Adolfo on 8/17/2016.
 */
/**=========================================================
 * Module: Modify Prescriber
 * Input validation with UI Validate TO MODIFY PRESCRIBER
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.forms')
        .controller('SystemController', SystemController);

    angular.module('app.forms')
        .factory('systemPatientService', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/patients/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }])
        .factory('SystemsResource', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/patients/add-system/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
}]);



    SystemController.$inject = ['$scope', '$stateParams', 'systemPatientService', 'SweetAlert', '$state', '$filter', '$resource', 'SystemsResource', 'User', '$location', '$cookies', '$sanitize', 'DTOptionsBuilder'];

    function SystemController($scope, $stateParams, systemPatientService, SweetAlert, $state, $filter, $resource, SystemsResource, User, $location, $cookies, $sanitize, DTOptionsBuilder) {
        var vm = this;
        vm.$scope = $scope;


        systemPatientService.get({id: $stateParams.id})
            .$promise
            .then(function (response) {
                console.log(response);
                vm.$scope.form.person = {
                    name: response.name,
                    lastname: response.lastname,
                    birth: response.birth,
                    date: response.date
                };


            }, function (errResponse) {
                //fail
                console.error('error: houston we got a problem', errResponse);
            });


        activate();

        ////////////////

        function activate() {

            vm.changeSelectedItem = function(current){
                //console.log("select changed", current._id);

            };

            vm.$scope.target = $stateParams.id;

            if ($cookies.get('token') && $location.path() !== 'app/login') {
                vm.currentUser = User.get();
            }


            vm.submitted = false;
            vm.system = {};
            var finalPrice = 0;
            var initialPrice = 0;

            vm.discount = 0;
            vm.buttons = ["None", "5%", "10%", "15%", "20%"];

            vm.products = [
                {
                    id: '1',
                    value: '150',
                    label: 'MANUAL MVP-700 SYSTEM ------- $150.00',
                    name: 'MANUAL MVP-700 SYSTEM'
                }, {
                    id: '2',
                    value: '250',
                    label: 'INTRODUCTORY BATTERY SYSTEM ------- $250.00',
                    name: 'INTRODUCTORY BATTERY SYSTEM'
                },{
                    id: '3',
                    value: '350',
                    label: 'BATTERY STANDARD SYSTEM ------- $350.00',
                    name: 'BATTERY STANDARD SYSTEM'
                },{
                    id: '4',
                    value: '500',
                    label: 'DELUXE BATTERY SYSTEM ------- $500.00',
                    name: 'DELUXE BATTERY SYSTEM'
                },{
                    id: '5',
                    value: '6000',
                    label: 'FLEXIBLE URETEROSCOPE ------- $6,000.00',
                    name: 'FLEXIBLE URETEROSCOPE'
                }];


            vm.resetDiscount = function () {
                var selectedProduct = $filter('filter')(vm.products, {id: vm.system.id })[0];
                initialPrice = selectedProduct.value;
                finalPrice = initialPrice;
                vm.system.finalPrice = finalPrice;
            };

            vm.updatePrice = function (buttonValue) {
                console.log("Discount:", buttonValue);



                console.log("System ID:", vm.system.id);
                var selectedProduct = $filter('filter')(vm.products, {id: vm.system.id })[0];

                console.log("System Name:", selectedProduct.label);
                console.log("System Price:", selectedProduct.value);

                vm.discount = buttonValue;



                var initialPrice = selectedProduct.value;


                switch(buttonValue){
                    case "None":
                        console.log("0");
                        finalPrice = initialPrice;
                        break;
                    case "5%":
                        console.log("5");
                        finalPrice = Number(  initialPrice - (initialPrice * 0.05)  );
                        break;
                    case "10%":
                        console.log("10");
                        finalPrice = Number(  initialPrice - (initialPrice * 0.1)  );
                        break;
                    case "15%":
                        console.log("15");
                        finalPrice = Number(  initialPrice - (initialPrice * 0.15)  );
                        break;
                    case "20%":
                        console.log("20");
                        finalPrice = Number(  initialPrice - (initialPrice * 0.2)  );
                        break;
                    default:
                        SweetAlert.swal('Error!', 'Something went wrong!', 'warning');

                }

                vm.system.finalPrice = finalPrice;

            };



            vm.submitCond = function () {

                console.log(parseInt(finalPrice));
                var selectedProduct = $filter('filter')(vm.products, {id: vm.system.id })[0];
                console.log(selectedProduct.name);

                console.log("patient", $stateParams.id);

                // if (vm.currentUser.lastname == "" || angular.isUndefined(vm.currentUser.lastname))
                //     var creator = vm.currentUser.name;
                // else
                //     var creator = vm.currentUser.name +" "+ vm.currentUser.lastname;

                vm.submitted = true;

                if (vm.formValidate.$valid) {
                    console.log('Submitted new condition!!');
                    SystemsResource.update({personId: $stateParams.id}, {amount: parseInt(finalPrice), description: selectedProduct.name })
                        .$promise
                        .then
                        (function (response) {
                            //all good
                            console.log(response);

                            SweetAlert.swal('Success!', 'System added', 'success');
                            $state.go('app.expandpat', {id: $stateParams.id});

                        }, function (errResponse) {
                            //fail
                            SweetAlert.swal('Error!', 'Something went wrong while adding a system!', 'warning');
                            console.error('error: Alaska we got a problem', errResponse);
                        });
                } else {
                    console.log("form is invalid");
                    return false;
                }


            };

        }


    }
})();


(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .config(loadingbarConfig)
        ;
    loadingbarConfig.$inject = ['cfpLoadingBarProvider'];
    function loadingbarConfig(cfpLoadingBarProvider){
      cfpLoadingBarProvider.includeBar = true;
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 500;
      cfpLoadingBarProvider.parentSelector = '.wrapper > section';
    }
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .run(loadingbarRun)
        ;
    loadingbarRun.$inject = ['$rootScope', '$timeout', 'cfpLoadingBar'];
    function loadingbarRun($rootScope, $timeout, cfpLoadingBar){

      // Loading bar transition
      // ----------------------------------- 
      var thBar;
      $rootScope.$on('$stateChangeStart', function() {
          if($('.wrapper > section').length) // check if bar container exists
            thBar = $timeout(function() {
              cfpLoadingBar.start();
            }, 0); // sets a latency Threshold
      });
      $rootScope.$on('$stateChangeSuccess', function(event) {
          event.targetScope.$watch('$viewContentLoaded', function () {
            $timeout.cancel(thBar);
            cfpLoadingBar.complete();
          });
      });

    }

})();
/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .directive('searchOpen', searchOpen)
        .directive('searchDismiss', searchDismiss);

    //
    // directives definition
    // 
    
    function searchOpen () {
        var directive = {
            controller: searchOpenController,
            restrict: 'A'
        };
        return directive;

    }

    function searchDismiss () {
        var directive = {
            controller: searchDismissController,
            restrict: 'A'
        };
        return directive;
        
    }

    //
    // Contrller definition
    // 
    
    searchOpenController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchOpenController ($scope, $element, NavSearch) {
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.toggle);
    }

    searchDismissController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchDismissController ($scope, $element, NavSearch) {
      
      var inputSelector = '.navbar-form input[type="text"]';

      $(inputSelector)
        .on('click', function (e) { e.stopPropagation(); })
        .on('keyup', function(e) {
          if (e.keyCode === 27) // ESC
            NavSearch.dismiss();
        });
        
      // click anywhere closes the search
      $(document).on('click', NavSearch.dismiss);
      // dismissable options
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.dismiss);
    }

})();


/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/
 
(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .service('NavSearch', NavSearch);

    function NavSearch() {
        this.toggle = toggle;
        this.dismiss = dismiss;

        ////////////////

        var navbarFormSelector = 'form.navbar-form';

        function toggle() {
          var navbarForm = $(navbarFormSelector);

          navbarForm.toggleClass('open');
          
          var isOpen = navbarForm.hasClass('open');
          
          navbarForm.find('input')[isOpen ? 'focus' : 'blur']();
        }

        function dismiss() {
          $(navbarFormSelector)
            .removeClass('open') // Close control
            .find('input[type="text"]').blur() // remove focus
            .val('') // Empty input
            ;
        }        
    }
})();

(function() {
    'use strict';

    angular
        .module('app.preloader')
        .directive('preloader', preloader);

    preloader.$inject = ['$animate', '$timeout', '$q'];
    function preloader ($animate, $timeout, $q) {

        var directive = {
            restrict: 'EAC',
            template: 
              '<div class="preloader-progress">' +
                  '<div class="preloader-progress-bar" ' +
                       'ng-style="{width: loadCounter + \'%\'}"></div>' +
              '</div>'
            ,
            link: link
        };
        return directive;

        ///////

        function link(scope, el) {

          scope.loadCounter = 0;

          var counter  = 0,
              timeout;

          // disables scrollbar
          angular.element('body').css('overflow', 'hidden');
          // ensure class is present for styling
          el.addClass('preloader');

          appReady().then(endCounter);

          timeout = $timeout(startCounter);

          ///////

          function startCounter() {

            var remaining = 100 - counter;
            counter = counter + (0.015 * Math.pow(1 - Math.sqrt(remaining), 2));

            scope.loadCounter = parseInt(counter, 10);

            timeout = $timeout(startCounter, 20);
          }

          function endCounter() {

            $timeout.cancel(timeout);

            scope.loadCounter = 100;

            $timeout(function(){
              // animate preloader hiding
              $animate.addClass(el, 'preloader-hidden');
              // retore scrollbar
              angular.element('body').css('overflow', '');
            }, 300);
          }

          function appReady() {
            var deferred = $q.defer();
            var viewsLoaded = 0;
            // if this doesn't sync with the real app ready
            // a custom event must be used instead
            var off = scope.$on('$viewContentLoaded', function () {
              viewsLoaded ++;
              // we know there are at least two views to be loaded 
              // before the app is ready (1-index.html 2-app*.html)
              if ( viewsLoaded === 2) {
                // with resolve this fires only once
                $timeout(function(){
                  deferred.resolve();
                }, 3000);

                off();
              }

            });

            return deferred.promise;
          }

        } //link
    }

})();
/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.routes')
        .provider('RouteHelpers', RouteHelpersProvider)
        ;

    RouteHelpersProvider.$inject = ['APP_REQUIRES'];
    function RouteHelpersProvider(APP_REQUIRES) {

      /* jshint validthis:true */
      return {
        // provider access level
        basepath: basepath,
        resolveFor: resolveFor,
        // controller access level
        $get: function() {
          return {
            basepath: basepath,
            resolveFor: resolveFor
          };
        }
      };

      // Set here the base of the relative path
      // for all app views
      function basepath(uri) {
        return 'app/views/' + uri;
      }

      // Generates a resolve object by passing script names
      // previously configured in constant.APP_REQUIRES
      function resolveFor() {
        var _args = arguments;
        return {
          deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
            // Creates a promise chain for each argument
            var promise = $q.when(1); // empty promise
            for(var i=0, len=_args.length; i < len; i ++){
              promise = andThen(_args[i]);
            }
            return promise;

            // creates promise to chain dynamically
            function andThen(_arg) {
              // also support a function that returns a promise
              if(typeof _arg === 'function')
                  return promise.then(_arg);
              else
                  return promise.then(function() {
                    // if is a module, pass the name. If not, pass the array
                    var whatToLoad = getRequired(_arg);
                    // simple error check
                    if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                    // finally, return a promise
                    return $ocLL.load( whatToLoad );
                  });
            }
            // check and returns required data
            // analyze module items with the form [name: '', files: []]
            // and also simple array of script files (for not angular js)
            function getRequired(name) {
              if (APP_REQUIRES.modules)
                  for(var m in APP_REQUIRES.modules)
                      if(APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name)
                          return APP_REQUIRES.modules[m];
              return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
            }

          }]};
      } // resolveFor

    }


})();


/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper){
        
        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to dashboard
        $urlRouterProvider.otherwise('/account/login');

        // 
        // Application Routes
        // -----------------------------------   
        $stateProvider
          .state('app', {
              url: '/app',
              abstract: true,
              templateUrl: helper.basepath('app.html'),
              resolve: helper.resolveFor('modernizr', 'icons', 'datatables')
          })
            .state('account', {
                url: '/account',
                abstract: true,
                templateUrl: helper.basepath('account/app.html')
            })
            .state('account.login', {
                url: '/login',
                title: 'Login',
                templateUrl: helper.basepath('account/login.html'),
                controller: 'LoginController',
                controllerAs: 'form',
                resolve: helper.resolveFor('modernizr', 'icons', 'datatables', 'oitozero.ngSweetAlert')
            })
          .state('app.singleview', {
              url: '/singleview',
              title: 'Single View',
              templateUrl: helper.basepath('singleview.html'),
              resolve: helper.resolveFor('datatables', 'oitozero.ngSweetAlert'),
              authenticate: true
          })
          .state('app.submenu', {
              url: '/submenu',
              title: 'Submenu',
              templateUrl: helper.basepath('submenu.html'),
              authenticate: true
          })
            .state('app.dashboard', {
                url: '/dashboard',
                title: 'Dashboard',
                templateUrl: helper.basepath('dashboard.html'),
                resolve: helper.resolveFor('oitozero.ngSweetAlert', 'datatables', 'flot-chart','flot-chart-plugins'),
                authenticate: true
            })
            .state('app.patients', {
                url: '/patients',
                title: 'Patients',
                templateUrl: helper.basepath('patients.html'),
                resolve: helper.resolveFor('datatables', 'oitozero.ngSweetAlert'),
                authenticate: true
            })
            .state('app.salesmen', {
                url: '/salesmen',
                title: 'Salesmen',
                templateUrl: helper.basepath('salesmen.html'),
                resolve: helper.resolveFor('datatables', 'oitozero.ngSweetAlert'),
                authenticate: true
            })
            .state('app.reports', {
                url: '/reports',
                title: 'Reports',
                templateUrl: helper.basepath('reports.html'),
                resolve: helper.resolveFor('flot-chart','flot-chart-plugins'),
                authenticate: true
            })
            .state('app.calendar', {
                url: '/calendar',
                title: 'Calendar',
                templateUrl: helper.basepath('calendar.html'),
                authenticate: true
            })
            .state('app.newdoc', {
                url: '/newdoctor',
                title: 'New Prescriber',
                templateUrl: helper.basepath('newdoctor.html'),
                resolve: helper.resolveFor('ui.select','inputmask','localytics.directives', 'oitozero.ngSweetAlert'),
                authenticate: true
            })
            .state('app.moddoc', {
                url: '/moddoctor/:id',
                title: 'Modify Prescriber',
                templateUrl: helper.basepath('modifydoctor.html'),
                resolve: helper.resolveFor('ui.select','inputmask','localytics.directives', 'oitozero.ngSweetAlert'),
                authenticate: true
            })
            .state('app.expanddoc', {
                url: '/expanddoc/:id',
                title: 'Prescriber Detail',
                templateUrl: helper.basepath('prescriberdetail.html'),
                resolve: helper.resolveFor('ui.select','inputmask','localytics.directives', 'ngDialog', 'oitozero.ngSweetAlert', 'datatables'),
                authenticate: true
            })
            .state('app.newlocation', {
                url: '/newlocation/:id',
                title: 'New Location',
                templateUrl: helper.basepath('newlocation.html'),
                resolve: helper.resolveFor('ui.select','inputmask','localytics.directives', 'oitozero.ngSweetAlert'),
                authenticate: true
            })
            .state('app.newappointment', {
                url: '/newappointment/:id',
                title: 'New Appointment',
                templateUrl: helper.basepath('newappointment.html'),
                resolve: helper.resolveFor('ui.select','inputmask','localytics.directives', 'oitozero.ngSweetAlert'),
                authenticate: true
            })
            .state('app.newpat', {
                url: '/newpatient',
                title: 'New Patient',
                templateUrl: helper.basepath('newpatient.html'),
                resolve: helper.resolveFor('ui.select','inputmask','localytics.directives', 'oitozero.ngSweetAlert'),
                authenticate: true
            })
            .state('app.modpat', {
                url: '/modpat/:id',
                title: 'Modify Patient',
                templateUrl: helper.basepath('modifypatient.html'),
                resolve: helper.resolveFor('ui.select','inputmask','localytics.directives', 'oitozero.ngSweetAlert'),
                authenticate: true
            })
            .state('app.expandpat', {
                url: '/expandpat/:id',
                title: 'Patient Detail',
                templateUrl: helper.basepath('patientdetail.html'),
                resolve: helper.resolveFor('ui.select','inputmask','localytics.directives', 'ngDialog', 'oitozero.ngSweetAlert', 'datatables'),
                authenticate: true
            })
            .state('app.newpatappointment', {
                url: '/newpatappointment/:id',
                title: 'New Patient Appointment',
                templateUrl: helper.basepath('newpatappointment.html'),
                resolve: helper.resolveFor('ui.select','inputmask','localytics.directives', 'oitozero.ngSweetAlert'),
                authenticate: true
            })
            .state('app.followup', {
                url: '/followup/:id',
                title: 'New Follow Up',
                templateUrl: helper.basepath('followup.html'),
                resolve: helper.resolveFor('ui.select','inputmask','localytics.directives', 'oitozero.ngSweetAlert'),
                authenticate: true
            })
            .state('app.newcond', {
                url: '/newcond/:id',
                title: 'New Condition',
                templateUrl: helper.basepath('new-condition.html'),
                resolve: helper.resolveFor('ui.select','inputmask','localytics.directives', 'oitozero.ngSweetAlert'),
                authenticate: true
            })
            .state('app.newsystem', {
                url: '/newsystem/:id',
                title: 'New System',
                templateUrl: helper.basepath('new-system.html'),
                resolve: helper.resolveFor('ui.select','inputmask','localytics.directives', 'oitozero.ngSweetAlert'),
                authenticate: true
            })
            .state('app.newfile', {
                url: '/newfile/:id',
                title: 'New System',
                templateUrl: helper.basepath('new-file.html'),
                resolve: helper.resolveFor('ui.select','inputmask','localytics.directives', 'oitozero.ngSweetAlert', 'angular-upload'),
                authenticate: true
            })




          // 
          // CUSTOM RESOLVES
          //   Add your own resolves properties
          //   following this object extend
          //   method
          // ----------------------------------- 
          // .state('app.someroute', {
          //   url: '/some_url',
          //   templateUrl: 'path_to_template.html',
          //   controller: 'someController',
          //   resolve: angular.extend(
          //     helper.resolveFor(), {
          //     // YOUR RESOLVES GO HERE
          //     }
          //   )
          // })
          ;

        // $urlRouterProvider.otherwise("/login");

    } // routesConfig

})();


(function() {
    'use strict';

    angular
        .module('app.settings')
        .run(settingsRun);

    settingsRun.$inject = ['$rootScope', '$localStorage'];

    function settingsRun($rootScope, $localStorage){

      // Global Settings
      // -----------------------------------
      $rootScope.app = {
        name: 'onemed',
        description: 'crm',
        year: ((new Date()).getFullYear()),
        layout: {
          isFixed: true,
          isCollapsed: true,
          isBoxed: false,
          isRTL: false,
          horizontal: false,
          isFloat: false,
          asideHover: false,
          theme: null,
          asideScrollbar: false
        },
        useFullLayout: false,
        hiddenFooter: false,
        offsidebarOpen: false,
        asideToggled: false,
        viewAnimation: 'ng-fadeInUp',
        uri: 'http://localhost:9000'
      };

      // Setup the layout mode
      $rootScope.app.layout.horizontal = ( $rootScope.$stateParams.layout === 'app-h') ;

      // Restore layout settings [*** UNCOMMENT TO ENABLE ***]
      // if( angular.isDefined($localStorage.layout) )
      //   $rootScope.app.layout = $localStorage.layout;
      // else
      //   $localStorage.layout = $rootScope.app.layout;
      //
      // $rootScope.$watch('app.layout', function () {
      //   $localStorage.layout = $rootScope.app.layout;
      // }, true);

      // Close submenu when sidebar change from collapsed to normal
      $rootScope.$watch('app.layout.isCollapsed', function(newValue) {
        if( newValue === false )
          $rootScope.$broadcast('closeSidebarMenu');
      });

    }

})();

/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$rootScope', '$scope', '$state', 'SidebarLoader', 'Utils'];
    function SidebarController($rootScope, $scope, $state, SidebarLoader,  Utils) {

        activate();

        ////////////////

        function activate() {
          var collapseList = [];

          // demo: when switch from collapse to hover, close all items
          $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
            if ( newVal === false && oldVal === true) {
              closeAllBut(-1);
            }
          });


          // Load menu from json file
          // ----------------------------------- 

          SidebarLoader.getMenu(sidebarReady);
          
          function sidebarReady(items) {
            $scope.menuItems = items;
          }

          // Handle sidebar and collapse items
          // ----------------------------------
          
          $scope.getMenuItemPropClasses = function(item) {
            return (item.heading ? 'nav-heading' : '') +
                   (isActive(item) ? ' active' : '') ;
          };

          $scope.addCollapse = function($index, item) {
            collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
          };

          $scope.isCollapse = function($index) {
            return (collapseList[$index]);
          };

          $scope.toggleCollapse = function($index, isParentItem) {

            // collapsed sidebar doesn't toggle drodopwn
            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;

            // make sure the item index exists
            if( angular.isDefined( collapseList[$index] ) ) {
              if ( ! $scope.lastEventFromChild ) {
                collapseList[$index] = !collapseList[$index];
                closeAllBut($index);
              }
            }
            else if ( isParentItem ) {
              closeAllBut(-1);
            }
            
            $scope.lastEventFromChild = isChild($index);

            return true;
          
          };

          // Controller helpers
          // ----------------------------------- 

            // Check item and children active state
            function isActive(item) {

              if(!item) return;

              if( !item.sref || item.sref === '#') {
                var foundActive = false;
                angular.forEach(item.submenu, function(value) {
                  if(isActive(value)) foundActive = true;
                });
                return foundActive;
              }
              else
                return $state.is(item.sref) || $state.includes(item.sref);
            }

            function closeAllBut(index) {
              index += '';
              for(var i in collapseList) {
                if(index < 0 || index.indexOf(i) < 0)
                  collapseList[i] = true;
              }
            }

            function isChild($index) {
              /*jshint -W018*/
              return (typeof $index === 'string') && !($index.indexOf('-') < 0);
            }
        
        } // activate
    }

})();

/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sidebar', sidebar);

    sidebar.$inject = ['$rootScope', '$timeout', '$window', 'Utils'];
    function sidebar ($rootScope, $timeout, $window, Utils) {
        var $win = angular.element($window);
        var directive = {
            // bindToController: true,
            // controller: Controller,
            // controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            template: '<nav class="sidebar" ng-transclude></nav>',
            transclude: true,
            replace: true
            // scope: {}
        };
        return directive;

        function link(scope, element, attrs) {

          var currentState = $rootScope.$state.current.name;
          var $sidebar = element;

          var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
          var subNav = $();

          $sidebar.on( eventName, '.nav > li', function() {

            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

              subNav.trigger('mouseleave');
              subNav = toggleMenuItem( $(this), $sidebar);

              // Used to detect click and touch events outside the sidebar          
              sidebarAddBackdrop();

            }

          });

          scope.$on('closeSidebarMenu', function() {
            removeFloatingNav();
          });

          // Normalize state when resize to mobile
          $win.on('resize', function() {
            if( ! Utils.isMobile() )
          	asideToggleOff();
          });

          // Adjustment on route changes
          $rootScope.$on('$stateChangeStart', function(event, toState) {
            currentState = toState.name;
            // Hide sidebar automatically on mobile
            asideToggleOff();

            $rootScope.$broadcast('closeSidebarMenu');
          });

      	  // Autoclose when click outside the sidebar
          if ( angular.isDefined(attrs.sidebarAnyclickClose) ) {
            
            var wrapper = $('.wrapper');
            var sbclickEvent = 'click.sidebar';
            
            $rootScope.$watch('app.asideToggled', watchExternalClicks);

          }

          //////

          function watchExternalClicks(newVal) {
            // if sidebar becomes visible
            if ( newVal === true ) {
              $timeout(function(){ // render after current digest cycle
                wrapper.on(sbclickEvent, function(e){
                  // if not child of sidebar
                  if( ! $(e.target).parents('.aside').length ) {
                    asideToggleOff();
                  }
                });
              });
            }
            else {
              // dettach event
              wrapper.off(sbclickEvent);
            }
          }

          function asideToggleOff() {
            $rootScope.app.asideToggled = false;
            if(!scope.$$phase) scope.$apply(); // anti-pattern but sometimes necessary
      	  }
        }
        
        ///////

        function sidebarAddBackdrop() {
          var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
          $backdrop.insertAfter('.aside-inner').on('click mouseenter', function () {
            removeFloatingNav();
          });
        }

        // Open the collapse sidebar submenu items when on touch devices 
        // - desktop only opens on hover
        function toggleTouchItem($element){
          $element
            .siblings('li')
            .removeClass('open')
            .end()
            .toggleClass('open');
        }

        // Handles hover to open items under collapsed menu
        // ----------------------------------- 
        function toggleMenuItem($listItem, $sidebar) {

          removeFloatingNav();

          var ul = $listItem.children('ul');
          
          if( !ul.length ) return $();
          if( $listItem.hasClass('open') ) {
            toggleTouchItem($listItem);
            return $();
          }

          var $aside = $('.aside');
          var $asideInner = $('.aside-inner'); // for top offset calculation
          // float aside uses extra padding on aside
          var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
          var subNav = ul.clone().appendTo( $aside );
          
          toggleTouchItem($listItem);

          var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
          var vwHeight = $win.height();

          subNav
            .addClass('nav-floating')
            .css({
              position: $rootScope.app.layout.isFixed ? 'fixed' : 'absolute',
              top:      itemTop,
              bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
            });

          subNav.on('mouseleave', function() {
            toggleTouchItem($listItem);
            subNav.remove();
          });

          return subNav;
        }

        function removeFloatingNav() {
          $('.dropdown-backdrop').remove();
          $('.sidebar-subnav.nav-floating').remove();
          $('.sidebar li.open').removeClass('open');
        }
    }


})();


(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .service('SidebarLoader', SidebarLoader);

    SidebarLoader.$inject = ['$http'];
    function SidebarLoader($http) {
        this.getMenu = getMenu;

        ////////////////

        function getMenu(onReady, onError) {
          var menuJson = 'server/sidebar-menu.json',
              menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
            
          onError = onError || function() { alert('Failure loading menu'); };

          $http
            .get(menuURL)
            .success(onReady)
            .error(onError);
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    UserBlockController.$inject = ['$rootScope', '$scope'];
    function UserBlockController($rootScope, $scope) {

        activate();

        ////////////////

        function activate() {
          $rootScope.user = {
            name:     'John',
            job:      'ng-developer',
            picture:  'app/img/user/02.jpg'
          };

          // Hides/show user avatar on sidebar
          $rootScope.toggleUserBlock = function(){
            $rootScope.$broadcast('toggleUserBlock');
          };

          $rootScope.userBlockVisible = true;

          var detach = $rootScope.$on('toggleUserBlock', function(/*event, args*/) {

            $rootScope.userBlockVisible = ! $rootScope.userBlockVisible;

          });

          $scope.$on('$destroy', detach);
        }
    }
})();

/**
 * Created by Adolfo on 8/8/2016.
 */
/**=========================================================
 * Module: datatable,js
 * Angular Datatable controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('AppointmentsDataTableController', AppointmentsDataTableController);


    angular.module('app.tables')
        .factory('PrescriberResource', ["$resource", function($resource) {
            return $resource(globalUri + 'api/prescribers/:PersonId', {
                PersonId: '@param1'
            }, {
                update: {
                    method:'PUT', params: {PersonId: '@param1'}
                }
            });
        }])
        .factory('PrescriberAppointmentDeletionService', ["$resource", function($resource) {
            return $resource(globalUri + 'api/prescribers/remove-app/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }]);

    AppointmentsDataTableController.$inject = ['$scope', '$stateParams', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert', 'PrescriberResource', 'PrescriberAppointmentDeletionService', 'User'];

    function AppointmentsDataTableController($scope, $stateParams, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert, PrescriberResource, PrescriberAppointmentDeletionService, User) {
        var vm = this;
        vm.$scope = $scope;
        activate();

        ////////////////

        function activate() {
            vm.$scope.target = $stateParams.id;

            PrescriberResource.get({ PersonId: $stateParams.id })
                .$promise
                .then(function(response){
                    vm.appointments = response.appointments;
                    vm.prescriber = response;

                    angular.forEach(response.appointments, function (value, index) {

                        User.get({id: value.consultant})
                            .$promise
                            .then(function (person) {
                                vm.appointments[index].consultantName = person.name + " " + person.lastname;
                            });


                    });


                }, function(errResponse){
                    //fail
                    console.error('error: houston we got a problem', errResponse);
                });

            vm.delete = function(appointmentId ,index) {
                SweetAlert.swal({
                    title: 'Confirm deletion?',
                    text: 'You will not be able to recover this record!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, confirm deletion!',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function(isConfirm){
                    if (isConfirm) {
                        removePerson($stateParams.id, appointmentId, index);
                    }
                });
            };

            vm.dtOptions = DTOptionsBuilder
                .newOptions()
                .withDisplayLength(3)
                .withOption('order', [[ 0, 'desc' ]])
                .withOption("lengthMenu", [ [3], ["3"] ]);


            vm.removePerson = removePerson;

            function removePerson(personId, appointmentId, index) {

                //Removes the location from the Angular DOM
                console.log("deleting the appointment");
                vm.appointments.splice(index, 1);

                PrescriberAppointmentDeletionService.update({ id: personId }, {appointmentId: appointmentId})
                    .$promise
                    .then
                    (function(response) {
                        //all good
                        console.log(response);

                        SweetAlert.swal('Deleted!', 'This record has been deleted', 'success');
                    }, function(errResponse){
                        //fail
                        SweetAlert.swal('Error!', 'Something went wrong while updating the prescriber!', 'warning');
                        console.error('error: Alaska we got a problem', errResponse);
                    });

            }

        }
    }
})();

/**
 * Created by Adolfo on 8/17/2016.
 */
/**=========================================================
 * Module: datatable,js
 * Angular Datatable controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('ConsultantsDataTableController', ConsultantsDataTableController);


    angular.module('app.tables')
        .factory('userService', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/users/all', {
                id: '@param1'
            }, {
                query: {
                    method: 'GET', isArray: true
                },
                get: {
                    method: 'GET', isArray: false
                }
            });
        }]);

    ConsultantsDataTableController.$inject = ['$scope', '$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert', 'userService'];

    function ConsultantsDataTableController($scope, $resource, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert, userService) {
        var vm = this;
        vm.$scope = $scope;

        activate();

        ////////////////

        function activate() {

            // Ajax

            userService.query()
                .$promise
                .then(function(persons) {

                    vm.persons = persons;
                    vm.persons.count = persons.length;

                });

            vm.delete = function(id,index) {
                SweetAlert.swal({
                    title: 'Confirm deletion?',
                    text: 'You will not be able to recover this record!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, confirm deletion!',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function(isConfirm){
                    if (isConfirm) {
                        SweetAlert.swal('Deleted!', 'This record has been deleted', 'success');
                        removePerson(id,index);
                    }
                });
            };


            vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
            vm.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3).notSortable()
            ];

            vm.removePerson = removePerson;

            function removePerson(id, index) {

                $resource(globalUri + 'api/patients/:id').delete({id: id})
                    .$promise
                    .then
                    (function(response) {
                        vm.persons.splice(index, 1);
                    });

            }

        }
    }
})();

/**=========================================================
 * Module: datatable,js
 * Angular Datatable controller
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.tables')
        .controller('DataTableController', DataTableController);

    angular.module('app.tables')
        .factory('prescriberTableResource', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/prescribers/list/:action/:id', {}, {

                getSomePrescribers: { method: 'GET', params: { id: '@param1', action: "get-prescribers"}, isArray: true },
                getAllPrescribers: { method: 'GET', params: { id: '@param1', action: "get-all-prescribers"}, isArray: true }

            });
        }]);

    DataTableController.$inject = ['$rootScope', '$scope', '$compile', '$resource', 'DTOptionsBuilder', 'DTColumnBuilder', 'SweetAlert', 'User', 'prescriberTableResource', '$http', '$q'];

    function DataTableController($rootScope, $scope, $compile, $resource, DTOptionsBuilder, DTColumnBuilder, SweetAlert, User, prescriberTableResource, $http, $q) {
        var vm = this;
        vm.$scope = $scope;
        vm.locationSum = 0;
        vm.appointmentSum = 0;

        var prescribersUri = "";
        var datosUser = {};

        // async.waterfall([
        //     myFirstFunction,
        //     mySecondFunction
        // ], function (err, result) {
        //     // result now equals 'done'
        //     console.log($rootScope.loggedUserId);
        //     // activate("http://localhost:9000/api/prescribers/list/get-prescribers/5793a8289fcbd12c17d0ae39");
        // });
        // function myFirstFunction(callback) {
        //
        //
        //
        //     User.get({})
        //         .$promise
        //         .then
        //         (function (successResponse) {
        //                 var datosUser = successResponse;
        //                 if (datosUser.role == 'user') {
        //                     prescribersUri = globalUri + 'api/prescribers/list/get-prescribers/' + datosUser._id;
        //                     console.log("normal user", prescribersUri);
        //                 } else if (datosUser.role == 'admin') {
        //                     console.log("le admin", prescribersUri);
        //                     prescribersUri = globalUri + 'api/prescribers/list/get-all-prescribers/' + datosUser._id;
        //                 }
        //
        //                 console.log("paso 1 --", prescribersUri);
        //                 callback(null, prescribersUri);
        //         }, function (errorResponse) {
        //                 // failure callback
        //                 console.log("error");
        //                 console.log(errorResponse);
        //         });
        // }
        // function mySecondFunction(arg1, callback) {
        //     // arg1 now equals 'one' and arg2 now equals 'two'
        //     console.log("paso2:", arg1);
        //
        //     callback(null, 'three');
        // }

        activate();

        ////////////////

        function activate() {

            vm.message = '';
            // vm.edit = edit;
            vm.delete = deleteRow;
            vm.dtInstance = {};
            vm.personsArray = {};

            // Ajax
            var userData = {};
            User.get({})
                .$promise
                .then
                (function (successResponse) {
                        // success callback
                        userData = successResponse;
                        vm.userData = successResponse;


                        if(vm.userData.role == 'user'){
                            prescriberTableResource.getSomePrescribers({ id: userData._id })
                                .$promise
                                .then(function (persons) {
                                    vm.persons = persons;
                                    vm.persons.count = persons.length;

                                    var locationSum = 1;
                                    var appointmentSum = 0;

                                    angular.forEach(vm.persons, function (item, index) {
                                        locationSum += Number(item.locations.length);
                                        appointmentSum += Number(item.appointments.length);
                                    });

                                    vm.locationSum = locationSum;
                                    vm.appointmentSum = appointmentSum;

                                });



                        }else if (vm.userData.role == 'admin'){
                            vm.dataLoading = true;
                            prescriberTableResource.getAllPrescribers({ id: userData._id })
                                .$promise
                                .then(function (persons) {
                                    vm.persons = persons;
                                    vm.persons.count = persons.length;

                                    var locationSum = 0;
                                    var appointmentSum = 0;

                                    angular.forEach(vm.persons, function (item, index) {

                                        locationSum += Number(item.locations.length) + 1;
                                        appointmentSum += Number(item.appointments.length);
                                    });

                                    // console.log("Total locations", locationSum);
                                    // console.log("Total appointments", appointmentSum);

                                    vm.locationSum = locationSum;
                                    vm.appointmentSum = appointmentSum;

                                }).finally(function(){
                                    vm.dataLoading = false;
                            });

                        }

                    },
                    function (errorResponse) {
                        // failure callback
                        userData = "nada";
                        console.log(errorResponse);
                    });




            vm.delete = deleteRow;
            function deleteRow (person) {
                SweetAlert.swal({
                    title: 'Confirm deletion?',
                    text: 'You will not be able to recover this record!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, confirm deletion!',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function (isConfirm) {
                    if (isConfirm) {
                        vm.dtInstance.reloadData();
                        SweetAlert.swal('Deleted!', 'This record has been deleted', 'success');
                        console.log("remove person with id", person);
                        removePerson(person);
                    }
                });
            };




            //ask for prescribers to the server
            //by using datatables and http
            vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
                var defer = $q.defer();
                var prescribersUri = "";

                if ($rootScope.role == 'user') {
                    prescribersUri = globalUri + 'api/prescribers/list/get-prescribers/' + $rootScope.thisUser;
                    // console.log("normal user", prescribersUri);
                } else if ($rootScope.role == 'admin') {
                    // console.log("le admin", prescribersUri);
                    prescribersUri = globalUri + 'api/prescribers/list/get-all-prescribers/' + $rootScope.thisUser;
                }


                $http.get(prescribersUri).then(function(result) {
                    defer.resolve(result.data);
                });
                // $http.get('server/datatable.json').then(function(result) {
                //     defer.resolve(result.data);
                // });
                return defer.promise;
            }).withPaginationType('full_numbers')
                .withOption('createdRow', createdRow);
            vm.dtColumns = [
                DTColumnBuilder.newColumn('npi').withTitle('NPI #'),
                DTColumnBuilder.newColumn('name').withTitle('First name'),
                DTColumnBuilder.newColumn('lastname').withTitle('Last name'),
                DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
                    .renderWith(actionsHtml)
            ];

            function createdRow(row, data, dataIndex) {
                // Recompiling so we can bind Angular directive to the DT
                $compile(angular.element(row).contents())($scope);
            }
            function actionsHtml(data, type, full, meta) {
                vm.personsArray[data._id] = data;
                // console.log(data);
                return '<button class="btn btn-info" ui-sref="app.expanddoc({id: \'' + data._id + '\'})">' +
                    '   <i class="fa fa-expand"></i>' +
                    '</button>&nbsp;' +
                    '<button class="btn btn-warning" ui-sref="app.moddoc({id: \'' + data._id + '\'})">' +
                    '   <i class="fa fa-edit"></i>' +
                    '</button>&nbsp;' +
                    '<button class="btn btn-danger" ng-click="table1.delete(\'' + data._id + '\')">' +
                    '   <i class="fa fa-trash-o"></i>' +
                    '</button>';
            }




            vm.removePerson = removePerson;
            // function removePerson(id, index) {
            function removePerson(id) {
                // console.log(id);
                // console.log(index);
                // console.log(vm.persons);

                $resource(globalUri + 'api/prescribers/:id').delete({id: id})
                    .$promise
                    .then
                    (function (response) {
                        console.log(response);
                        //vm.persons.splice(index, 1);
                    });

            }

        }
    }
})();

/**=========================================================
 * Module: datatable,js
 * Angular Datatable controller
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.tables')
        .controller('PatientsFollowDataTableController', PatientsFollowDataTableController);


    angular.module('app.tables')
        .factory('FollowUpPrescriberService', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/prescribers/:id', {
                id: '@param1'
            }, {
                query: {
                    method: 'GET', isArray: true
                },
                get: {
                    method: 'GET', isArray: false
                }
            });
        }])
        .factory('DeleteFollowUp', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/patients/delete-followup/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }]);

    PatientsFollowDataTableController.$inject = ['$rootScope', '$scope', '$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert', 'FollowUpPrescriberService', 'DeleteFollowUp', '$stateParams'];

    function PatientsFollowDataTableController($rootScope, $scope, $resource, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert, FollowUpPrescriberService, DeleteFollowUp, $stateParams) {
        var vm = this;
        vm.$scope = $scope;

        activate();

        ////////////////

        function activate() {

            // Ajax

            $resource(globalUri + 'api/patients').query()
                .$promise
                .then(function (persons) {

                    var appointmentSum = 0;
                    var noteSum = 0;


                    angular.forEach(persons, function (value, index) {

                        FollowUpPrescriberService.get({id: value.prescriber})
                            .$promise
                            .then(function (person) {
                                vm.persons[index].prescriberName = person.name + " " + person.lastname;
                            });

                        vm.appointmentSum += Number(value.appointments.length);
                        noteSum += Number(value.notes.length);

                    });

                    vm.followUps = [];
                    angular.forEach(persons, function (value, index) {

                        var patientName = value.name + " " + value.lastname;
                        var patiendId = value._id;


                        if(value.followUp.length > 0){

                            angular.forEach(value.followUp, function (valor, indice) {

                                console.log(value.followUp);

                                var newObject = {
                                    patientId: patiendId,
                                    name: patientName,
                                    text: value.followUp[indice].text,
                                    date: value.followUp[indice].date,
                                    status: value.followUp[indice].status
                                };
                                vm.followUps.push(newObject);

                            });


                            //console.log(value.followUp);

                        }


                    });

                    vm.persons = persons;
                    vm.persons.count = persons.length;
                    $rootScope.followUpSum = vm.followUps.length;
                    vm.noteSum = noteSum;

                });

            vm.deleteFollowUps = function (patientId, followUpId, index) {
                SweetAlert.swal({
                    title: 'Confirm follow up deletion?',
                    text: 'You will not be able to recover this record!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, confirm deletion!',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function (isConfirm) {
                    if (isConfirm) {
                        SweetAlert.swal('Deleted!', 'This record has been deleted', 'success');
                        removeFollowUp(patientId, followUpId, index);
                    }
                });
            };


            vm.dtOptions = DTOptionsBuilder
                .newOptions()
                .withDisplayLength(5)
                .withOption('order', [[ 0, 'desc' ]])
                .withOption("lengthMenu", [ [5], ["5"] ]);


            function removeFollowUp(personId, followUpId, index) {

                vm.followUps.splice(index, 1);

                console.log($stateParams.id);

                DeleteFollowUp.update({ personId: personId }, {followUpId: followUpId})
                    .$promise
                    .then
                    (function(response) {
                        //all good
                        //console.log(response);
                        $rootScope.followUpSum -= 1;
                        SweetAlert.swal('Deleted!', 'This record has been deleted', 'success');
                    }, function(errResponse){
                        //fail
                        SweetAlert.swal('Error!', 'Something went wrong while deleting this follow up!', 'warning');
                        console.error('error: Alaska we got a problem', errResponse);
                    });

            }

        }
    }
})();

/**=========================================================
 * Module: datatable,js
 * Angular Datatable controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('LocationsDataTableController', LocationsDataTableController);


    angular.module('app.tables')
        .factory('PrescriberResource', ["$resource", function($resource) {
            return $resource(globalUri + 'api/prescribers/:PersonId', {
                PersonId: '@param1'
            }, {
                update: {
                    method:'PUT', params: {PersonId: '@param1'}
                }
            });
        }])
    .factory('PrescriberUpdatedResource', ["$resource", function($resource) {
        return $resource(globalUri + 'api/prescribers/update-locations/:personId', {
            personId: '@param1'
        }, {
            update: {
                method:'PUT'
            }
        });
    }])
    .factory('NoteResource', ["$resource", function($resource) {
        return $resource(globalUri + 'api/prescribers/update-notes/:personId', {
            personId: '@param1'
        }, {
            update: {
                method:'PUT'
            }
        });
    }])
    .factory('DeleteNoteResource', ["$resource", function($resource) {
        return $resource(globalUri + 'api/prescribers/delete-notes/:personId', {
            personId: '@param1'
        }, {
            update: {
                method:'PUT'
            }
        });
    }]);

    LocationsDataTableController.$inject = ['$rootScope', '$scope', '$stateParams', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert', 'PrescriberResource', 'PrescriberUpdatedResource', 'NoteResource', 'DeleteNoteResource', 'User', '$location', '$cookies'];

    function LocationsDataTableController($rootScope, $scope, $stateParams, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert, PrescriberResource, PrescriberUpdatedResource, NoteResource, DeleteNoteResource, User, $location, $cookies) {
        var vm = this;
        vm.$scope = $scope;
        activate();

        ////////////////

        function activate() {
            vm.$scope.target = $stateParams.id;

            if ($cookies.get('token') && $location.path() !== 'app/login') {
                vm.currentUser = User.get();
            }

            PrescriberResource.get({ PersonId: $stateParams.id })
                .$promise
                .then(function(response){
                    vm.locations = response.locations;

                    vm.prescriber = response;

                }, function(errResponse){
                    //fail
                    console.error('error: houston we got a problem', errResponse);
                });

            vm.delete = function(locationId ,index) {
                SweetAlert.swal({
                    title: 'Confirm deletion?',
                    text: 'You will not be able to recover this record!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, confirm deletion!',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function(isConfirm){
                    if (isConfirm) {
                        removePerson($stateParams.id, locationId, index);
                    }
                });
            };


            // vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
            // vm.dtColumnDefs = [
            //     DTColumnDefBuilder.newColumnDef(0),
            //     DTColumnDefBuilder.newColumnDef(1),
            //     DTColumnDefBuilder.newColumnDef(2).notSortable()
            // ];

            vm.dtOptions = DTOptionsBuilder
                    .newOptions()
                .withDisplayLength(3)
                .withOption('order', [[ 0, 'desc' ]])
                .withOption("lengthMenu", [ [3], ["3"] ]);


            vm.removePerson = removePerson;

            function removePerson(personId, locationId, index) {

                //Removes the location from the Angular DOM
                vm.locations.splice(index, 1);
                console.log(vm.locations);
                vm.prescriber.locations = vm.locations;
                console.log(vm.prescriber);

                PrescriberUpdatedResource.update({ personId: personId }, {locationId: locationId})
                    .$promise
                    .then
                    (function(response) {
                        //all good
                        console.log(response);

                        SweetAlert.swal('Deleted!', 'This record has been deleted', 'success');
                    }, function(errResponse){
                        //fail
                        SweetAlert.swal('Error!', 'Something went wrong while updating the prescriber!', 'warning');
                        console.error('error: Alaska we got a problem', errResponse);
                    });

            }

            function closeDialog() {
                console.log("The dialog was closed");
            }


            //
            vm.submitted = false;
            vm.validateInput = function(name, type) {
                var input = vm.formValidate[name];
                return (input.$dirty || vm.submitted) && input.$error[type];
            };

            vm.submitForm = function (locationId) {

                if (vm.currentUser.lastname == "" || angular.isUndefined(vm.currentUser.lastname))
                    var creator = vm.currentUser.name;
                else
                    var creator = vm.currentUser.name +" "+ vm.currentUser.lastname;

                vm.submitted = true;
                console.log("Agregar nota a " + locationId);
                console.dir(vm.newNote);
                console.log(vm.newNote.text);

                if (vm.formValidate.$valid) {
                    console.log('Submitted!!');
                    NoteResource.update({ personId: $stateParams.id }, {text: vm.newNote.text, creator: creator, locationId: locationId})
                        .$promise
                        .then
                        (function(response) {
                            //all good
                            console.log(response);

                            SweetAlert.swal('Success!', 'Note added', 'success');

                            var note = {};
                            note.text = vm.newNote.text;
                            note.creator = creator;
                            var myDate = new Date();
                            note.created_at = myDate.toISOString();

                            $rootScope.notes.push(note);


                            vm.newNote = {};
                            vm.formValidate.$setPristine();
                            vm.formValidate.$setUntouched();

                        }, function(errResponse){
                            //fail
                            SweetAlert.swal('Error!', 'Something went wrong while adding a note!', 'warning');
                            console.error('error: Alaska we got a problem', errResponse);
                        });
                } else {
                    console.log("form is invalid");
                    return false;
                }
            };

            vm.deleteNote = function (locationId , item) {
                SweetAlert.swal({
                    title: 'Confirm deletion?',
                    text: 'You will not be able to recover this record!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, confirm deletion!',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function(isConfirm){
                    if (isConfirm) {
                        console.log("delete dat note son-->", locationId);
                        console.log("item -->", item);

                        $rootScope.notes.splice($rootScope.notes.indexOf(item), 1);


                        DeleteNoteResource.update({ personId: $stateParams.id }, {locationId: locationId, noteId: item._id})
                            .$promise
                            .then
                            (function(response) {
                                //all good
                                console.log(response);

                                SweetAlert.swal('Success!', 'Note deleted', 'success');
                            }, function(errResponse){
                                //fail
                                SweetAlert.swal('Error!', 'Something went wrong while adding a note!', 'warning');
                                console.error('error: Alaska we got a problem', errResponse);
                            });


                    }
                });

            }


        }
    }
})();

/**
 * Created by Adolfo on 8/8/2016.
 */
/**=========================================================
 * Module: datatable,js
 * Angular Datatable controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('PatientAppointmentsDataTableController', PatientAppointmentsDataTableController);


    angular.module('app.tables')
        .factory('PatientResource', ["$resource", function($resource) {
            return $resource(globalUri + 'api/patients/:PersonId', {
                PersonId: '@param1'
            }, {
                update: {
                    method:'PUT', params: {PersonId: '@param1'}
                }
            });
        }])
        .factory('AppointmentDeletionService', ["$resource", function($resource) {
            return $resource(globalUri + 'api/patients/remove-app/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }]);

    PatientAppointmentsDataTableController.$inject = ['$scope', '$stateParams', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert', 'PatientResource', 'AppointmentDeletionService'];

    function PatientAppointmentsDataTableController($scope, $stateParams, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert, PatientResource, AppointmentDeletionService) {
        var vm = this;
        vm.$scope = $scope;
        activate();

        ////////////////

        function activate() {
            vm.$scope.target = $stateParams.id;

            PatientResource.get({ PersonId: $stateParams.id })
                .$promise
                .then(function(response){
                    vm.appointments = response.appointments;

                    vm.prescriber = response;

                }, function(errResponse){
                    //fail
                    console.error('error: houston we got a problem', errResponse);
                });

            vm.delete = function(appointmentId ,index) {
                SweetAlert.swal({
                    title: 'Confirm deletion?',
                    text: 'You will not be able to recover this record!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, confirm deletion!',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function(isConfirm){
                    if (isConfirm) {
                        removePerson($stateParams.id, appointmentId, index);
                    }
                });
            };


            vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
            vm.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3).notSortable()
            ];

            vm.removePerson = removePerson;

            function removePerson(personId, appointmentId, index) {

                //Removes the location from the Angular DOM
                console.log("deleting the appointment");
                vm.appointments.splice(index, 1);

                AppointmentDeletionService.update({ id: personId }, {appointmentId: appointmentId})
                    .$promise
                    .then
                    (function(response) {
                        //all good
                        console.log(response);

                        SweetAlert.swal('Deleted!', 'This record has been deleted', 'success');
                    }, function(errResponse){
                        //fail
                        SweetAlert.swal('Error!', 'Something went wrong while updating the prescriber!', 'warning');
                        console.error('error: Alaska we got a problem', errResponse);
                    });

            }

        }
    }
})();

/**=========================================================
 * Module: datatable,js
 * Angular Datatable controller
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.tables')
        .controller('PatientsDataTableController', PatientsDataTableController);


    angular.module('app.tables')
        .factory('prescriberService', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/prescribers/:id', {
                id: '@param1'
            }, {
                query: {
                    method: 'GET', isArray: true
                },
                get: {
                    method: 'GET', isArray: false
                }
            });
        }])
        .factory('patientsTableResource', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/patients/list/:action/:id', {}, {

                getSomeUsers: { method: 'GET', params: { id: '@param1', action: "get-users"}, isArray: true },
                getAllUsers: { method: 'GET', params: { id: '@param1', action: "get-all-users"}, isArray: true }

            });
        }]);

    PatientsDataTableController.$inject = ['User', '$scope', '$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert', 'prescriberService', 'patientsTableResource'];

    function PatientsDataTableController(User, $scope, $resource, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert, prescriberService, patientsTableResource) {
        var vm = this;
        vm.$scope = $scope;

        activate();

        ////////////////

        function activate() {

            // Ajax
            var userData = {};
            User.get({})
                .$promise
                .then
                (function (successResponse) {
                        // success callback
                        userData = successResponse;
                        vm.userData = successResponse;


                        if(vm.userData.role == 'user'){
                            console.log("it is NOT an admin");


                            patientsTableResource.getSomeUsers({ id: userData._id })
                                .$promise
                                .then(function (persons) {

                                    var appointmentSum = 0;
                                    var followUps = 0;


                                    angular.forEach(persons, function (value, index) {

                                        prescriberService.get({id: value.prescriber})
                                            .$promise
                                            .then(function (person) {
                                                vm.persons[index].prescriberName = person.name + " " + person.lastname;
                                            });

                                        appointmentSum += Number(value.appointments.length);
                                        followUps += Number(value.followUp.length);

                                    });

                                    vm.persons = persons;
                                    vm.persons.count = persons.length;
                                    vm.appointmentSum = appointmentSum;
                                    vm.followUps = followUps;

                                });


                        }else if (vm.userData.role == 'admin'){
                            console.log("it is an admin");
                            patientsTableResource.getAllUsers({ id: userData._id })
                                .$promise
                                .then(function (persons) {

                                    var appointmentSum = 0;
                                    var followUps = 0;


                                    angular.forEach(persons, function (value, index) {

                                        prescriberService.get({id: value.prescriber})
                                            .$promise
                                            .then(function (person) {
                                                vm.persons[index].prescriberName = person.name + " " + person.lastname;
                                            });

                                        appointmentSum += Number(value.appointments.length);
                                        followUps += Number(value.notes.length);

                                    });

                                    vm.persons = persons;
                                    vm.persons.count = persons.length;
                                    vm.appointmentSum = appointmentSum;
                                    vm.followUps = followUps;

                                });
                        }

                        // userStatsResource.getStats({ id: userData._id })
                        //     .$promise
                        //     .then(function (response) {
                        //
                        //
                        //         console.log(response);
                        //
                        //
                        //
                        //
                        //     }, function (errResponse) {
                        //         //fail
                        //         console.error('error: houston we got a problem', errResponse);
                        //     });

                    },
                    function (errorResponse) {
                        // failure callback
                        userData = "nada";
                        console.log(errorResponse);
                    });



            vm.delete = function (id, index) {
                SweetAlert.swal({
                    title: 'Confirm deletion?',
                    text: 'You will not be able to recover this record!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, confirm deletion!',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function (isConfirm) {
                    if (isConfirm) {
                        SweetAlert.swal('Deleted!', 'This record has been deleted', 'success');
                        removePerson(id, index);
                    }
                });
            };




            vm.dtOptions = DTOptionsBuilder
                .newOptions()
                .withDisplayLength(5)
                .withOption('order', [[ 0, 'desc' ]])
                .withOption("lengthMenu", [ [5], ["5"] ]);



            vm.removePerson = removePerson;

            function removePerson(id, index) {

                $resource(globalUri + 'api/patients/:id').delete({id: id})
                    .$promise
                    .then
                    (function (response) {
                        vm.persons.splice(index, 1);
                    });

            }

        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.translate')
        .config(translateConfig)
        ;
    translateConfig.$inject = ['$translateProvider'];
    function translateConfig($translateProvider){

      $translateProvider.useStaticFilesLoader({
          prefix : 'app/i18n/',
          suffix : '.json'
      });

      $translateProvider.preferredLanguage('en');
      $translateProvider.useLocalStorage();
      $translateProvider.usePostCompiling(true);
      $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

    }
})();
(function() {
    'use strict';

    angular
        .module('app.translate')
        .run(translateRun)
        ;
    translateRun.$inject = ['$rootScope', '$translate'];
    
    function translateRun($rootScope, $translate){

      // Internationalization
      // ----------------------

      $rootScope.language = {
        // Handles language dropdown
        listIsOpen: false,
        // list of available languages
        available: {
          'en':       'English',
          'es_AR':    'Español'
        },
        // display always the current ui language
        init: function () {
          var proposedLanguage = $translate.proposedLanguage() || $translate.use();
          var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
          $rootScope.language.selected = $rootScope.language.available[ (proposedLanguage || preferredLanguage) ];
        },
        set: function (localeId) {
          // Set the new idiom
          $translate.use(localeId);
          // save a reference for the current language
          $rootScope.language.selected = $rootScope.language.available[localeId];
          // finally toggle dropdown
          $rootScope.language.listIsOpen = ! $rootScope.language.listIsOpen;
        }
      };

      $rootScope.language.init();

    }
})();
/**=========================================================
 * Module: animate-enabled.js
 * Enable or disables ngAnimate for element with directive
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('animateEnabled', animateEnabled);

    animateEnabled.$inject = ['$animate'];
    function animateEnabled ($animate) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          scope.$watch(function () {
            return scope.$eval(attrs.animateEnabled, scope);
          }, function (newValue) {
            $animate.enabled(!!newValue, element);
          });
        }
    }

})();

/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Browser', Browser);

    Browser.$inject = ['$window'];
    function Browser($window) {
      return $window.jQBrowser;
    }

})();

/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('resetKey', resetKey);

    resetKey.$inject = ['$state', '$localStorage'];
    function resetKey ($state, $localStorage) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
              resetKey: '@'
            }
        };
        return directive;

        function link(scope, element) {
          element.on('click', function (e) {
              e.preventDefault();

              if(scope.resetKey) {
                delete $localStorage[scope.resetKey];
                $state.go($state.current, {}, {reload: true});
              }
              else {
                $.error('No storage key specified for reset.');
              }
          });
        }
    }

})();

/**=========================================================
 * Module: fullscreen.js
 * Toggle the fullscreen mode on/off
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('toggleFullscreen', toggleFullscreen);

    toggleFullscreen.$inject = ['Browser'];
    function toggleFullscreen (Browser) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          // Not supported under IE
          if( Browser.msie ) {
            element.addClass('hide');
          }
          else {
            element.on('click', function (e) {
                e.preventDefault();

                if (screenfull.enabled) {
                  
                  screenfull.toggle();
                  
                  // Switch icon indicator
                  if(screenfull.isFullscreen)
                    $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
                  else
                    $(this).children('em').removeClass('fa-compress').addClass('fa-expand');

                } else {
                  $.error('Fullscreen not enabled');
                }

            });
          }
        }
    }


})();

/**=========================================================
 * Module: load-css.js
 * Request and load into the current page a css file
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('loadCss', loadCss);

    function loadCss () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          element.on('click', function (e) {
              if(element.is('a')) e.preventDefault();
              var uri = attrs.loadCss,
                  link;

              if(uri) {
                link = createLink(uri);
                if ( !link ) {
                  $.error('Error creating stylesheet link element.');
                }
              }
              else {
                $.error('No stylesheet location defined.');
              }

          });
        }
        
        function createLink(uri) {
          var linkId = 'autoloaded-stylesheet',
              oldLink = $('#'+linkId).attr('id', linkId + '-old');

          $('head').append($('<link/>').attr({
            'id':   linkId,
            'rel':  'stylesheet',
            'href': uri
          }));

          if( oldLink.length ) {
            oldLink.remove();
          }

          return $('#'+linkId);
        }
    }

})();

/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('now', now);

    now.$inject = ['dateFilter', '$interval'];
    function now (dateFilter, $interval) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
          var format = attrs.format;

          function updateTime() {
            var dt = dateFilter(new Date(), format);
            element.text(dt);
          }

          updateTime();
          var intervalPromise = $interval(updateTime, 1000);

          scope.$on('$destroy', function(){
            $interval.cancel(intervalPromise);
          });

        }
    }

})();

/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('checkAll', checkAll);

    function checkAll () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          element.on('change', function() {
            var $this = $(this),
                index= $this.index() + 1,
                checkbox = $this.find('input[type="checkbox"]'),
                table = $this.parents('table');
            // Make sure to affect only the correct checkbox column
            table.find('tbody > tr > td:nth-child('+index+') input[type="checkbox"]')
              .prop('checked', checkbox[0].checked);

          });
        }
    }

})();

/**=========================================================
 * Module: trigger-resize.js
 * Triggers a window resize event from any element
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('triggerResize', triggerResize);

    triggerResize.$inject = ['$window', '$timeout'];
    function triggerResize ($window, $timeout) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attributes) {
          element.on('click', function(){
            $timeout(function(){
              // all IE friendly dispatchEvent
              var evt = document.createEvent('UIEvents');
              evt.initUIEvent('resize', true, false, $window, 0);
              $window.dispatchEvent(evt);
              // modern dispatchEvent way
              // $window.dispatchEvent(new Event('resize'));
            }, attributes.triggerResize || 300);
          });
        }
    }

})();

/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Utils', Utils);

    Utils.$inject = ['$window', 'APP_MEDIAQUERY'];
    function Utils($window, APP_MEDIAQUERY) {

        var $html = angular.element('html'),
            $win  = angular.element($window),
            $body = angular.element('body');

        return {
          // DETECTION
          support: {
            transition: (function() {
                    var transitionEnd = (function() {

                        var element = document.body || document.documentElement,
                            transEndEventNames = {
                                WebkitTransition: 'webkitTransitionEnd',
                                MozTransition: 'transitionend',
                                OTransition: 'oTransitionEnd otransitionend',
                                transition: 'transitionend'
                            }, name;

                        for (name in transEndEventNames) {
                            if (element.style[name] !== undefined) return transEndEventNames[name];
                        }
                    }());

                    return transitionEnd && { end: transitionEnd };
                })(),
            animation: (function() {

                var animationEnd = (function() {

                    var element = document.body || document.documentElement,
                        animEndEventNames = {
                            WebkitAnimation: 'webkitAnimationEnd',
                            MozAnimation: 'animationend',
                            OAnimation: 'oAnimationEnd oanimationend',
                            animation: 'animationend'
                        }, name;

                    for (name in animEndEventNames) {
                        if (element.style[name] !== undefined) return animEndEventNames[name];
                    }
                }());

                return animationEnd && { end: animationEnd };
            })(),
            requestAnimationFrame: window.requestAnimationFrame ||
                                   window.webkitRequestAnimationFrame ||
                                   window.mozRequestAnimationFrame ||
                                   window.msRequestAnimationFrame ||
                                   window.oRequestAnimationFrame ||
                                   function(callback){ window.setTimeout(callback, 1000/60); },
            /*jshint -W069*/
            touch: (
                ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
                (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
                (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
                (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
                false
            ),
            mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
          },
          // UTILITIES
          isInView: function(element, options) {
              /*jshint -W106*/
              var $element = $(element);

              if (!$element.is(':visible')) {
                  return false;
              }

              var window_left = $win.scrollLeft(),
                  window_top  = $win.scrollTop(),
                  offset      = $element.offset(),
                  left        = offset.left,
                  top         = offset.top;

              options = $.extend({topoffset:0, leftoffset:0}, options);

              if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
                  left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
                return true;
              } else {
                return false;
              }
          },
          
          langdirection: $html.attr('dir') === 'rtl' ? 'right' : 'left',

          isTouch: function () {
            return $html.hasClass('touch');
          },

          isSidebarCollapsed: function () {
            return $body.hasClass('aside-collapsed');
          },

          isSidebarToggled: function () {
            return $body.hasClass('aside-toggled');
          },

          isMobile: function () {
            return $win.width() < APP_MEDIAQUERY.tablet;
          }

        };
    }
})();

(function() {
    'use strict';

    angular
        .module('custom', [
            // request the the entire framework
            //'angle',
            //// or just modules
            //'app.core',
            //'app.sidebar'
            ///*...*/
        ]);
})();

// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('custom')
        .controller('UserController', UserController);


    angular.module('app.forms')
        .factory('userStatsResource', ["$resource", function ($resource) {
            return $resource(globalUri + 'api/patients/stats/:action/:id', {}, {

                getStats: { method: 'GET', params: { id: '@param1', action: "get-stats" }, isArray: true }

            });
        }]);
    angular.module('app.forms')
        .run(["$rootScope", "User", function ($rootScope, User) {
            $rootScope.globalUri = globalUri;
            var userData = {};

            User.get({})
                .$promise
                .then
                (function (successResponse) {
                        // success callback
                        userData = successResponse;
                        $rootScope.thisUser = userData._id;
                        $rootScope.role = userData.role;
                        // userStatsResource.getStats({ id: userData._id })
                        //     .$promise
                        //     .then(function (response) {
                        //
                        //
                        //
                        //
                        //     }, function (errResponse) {
                        //         //fail
                        //         console.error('error: houston we got a problem', errResponse);
                        //     });

                    },
                    function (errorResponse) {
                        // failure callback
                        userData = "nada";
                        console.log(errorResponse);
                    });
        }]);


    UserController.$inject = ['$rootScope', '$scope', '$cookies', '$state', '$location', 'User', 'userStatsResource'];


    function UserController($rootScope, $scope, $cookies, $state, $location, User, userStatsResource) {

        var vm = this;
        vm.$scope = $scope;
        vm.currentUser = {};

        $rootScope.$$listeners.$stateChangeStart = [];

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {



            if(toState.authenticate && !$cookies.get('token')){
                console.log("ROUTE DENIED");
                $state.transitionTo('account.login');
                event.preventDefault();
            }else if ($cookies.get('token')){
                vm.currentUser = User.get();
            }

        });


        var userData = {};


        User.get({})
            .$promise
            .then
            (function (successResponse) {
                    // success callback
                    userData = successResponse;
                    vm.userData = successResponse;



                    userStatsResource.getStats({ id: userData._id })
                        .$promise
                        .then(function (response) {

                            if (angular.isDefined(response[0])){
                                $rootScope.money = response[0].total;
                                $rootScope.sales = response[0].qty;
                            }else{
                                $rootScope.money = 0;
                                $rootScope.sales = 0;
                            }

                            $rootScope.loggedUserId = userData._id;


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

        // if ($cookies.get('token') && $location.path() !== 'app/login') {
        //     async.waterfall([
        //         function(callback) {
        //
        //
        //
        //             console.log("primer paso");
        //             callback(null, "probando", userData);
        //         },
        //         function(arg1, arg2, callback) {
        //
        //             console.log("segundo paso", arg1);
        //             console.log(arg1._id);
        //             console.log(arg1.name);
        //             console.log(arg1['name']);
        //
        //             callback(null, arg1);
        //         }
        //     ], function (err, result) {
        //
        //         console.log("final", result);
        //
        //     });
        // }












        activate();

        ////////////////

        function activate() {

            if ($cookies.get('token') && $location.path() !== 'app/login') {
                vm.currentUser = User.get();
            }


            //logs out the user and clears the user object
            vm.logout = function () {
                $cookies.remove('token');
                vm.currentUser = {};
                $state.go('account.login');
            };


            vm.getToken = function() {
                return $cookies.get('token');
            };

            vm.loggedIn = function () {
                if ( $cookies.get('token') && $location.path() !== '/app/login' ){
                    // console.log("Si estas logeado");
                    return true;
                } else{
                    // console.log("No estas logeado");
                    return false;
                }


            };
        }
    }
})();
