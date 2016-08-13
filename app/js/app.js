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
        .module('app.forms', []);
})();

(function() {
    'use strict';

    angular
        .module('app.lazyload', []);
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
                    text: 'Your will not be able to recover this record!',
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
                    $resource('http://localhost:9000/api/prescribers').save(this.newPrescriber)
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

(function (){
    'use strict';

    angular.module('app.forms')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['Auth', '$state'];

    function LoginController(Auth, $state) {

        var vm = this;
        vm.$scope = $scope;

        vm.subMitNote = function () {
          console.log("Trying to log in....");
            vm.submitted = true;
        };

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
            return $resource('http://localhost:9000/api/patients/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }])
        .factory('prescriberService', ["$resource", function ($resource) {
            return $resource('http://localhost:9000/api/prescribers/:id', {
                id: '@param1'
            }, {
                query: {
                    method: 'GET', isArray: true
                }
            });
        }])
        .factory('userService', ["$resource", function ($resource) {
            return $resource('http://localhost:9000/api/users/:id', {
                id: '@param1'
            }, {
                query: {
                    method: 'GET', isArray: true
                }
            });
        }])
        .factory('PatientNoteResource', ["$resource", function ($resource) {
            return $resource('http://localhost:9000/api/patients/add-notes/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }])
        .factory('PrescriberDeleteNoteResource', ["$resource", function ($resource) {
            return $resource('http://localhost:9000/api/prescribers/delete-prescriber-notes/:personId', {
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

    ModifyPatientFormValidationController.$inject = ['$scope', '$stateParams', 'patientService', 'SweetAlert', '$state', '$filter', 'PatientNoteResource', 'PrescriberDeleteNoteResource', 'prescriberService', 'userService'];

    function ModifyPatientFormValidationController($scope, $stateParams, patientService, SweetAlert, $state, $filter, PatientNoteResource, PrescriberDeleteNoteResource, prescriberService, userService) {
        var vm = this;
        vm.$scope = $scope;

        prescriberService.query()
            .$promise
            .then(function (response) {
                vm.prescribers = response;


            }, function (errResponse) {
                //fail
                console.error('error: houston we got a problem', errResponse);
            });

        userService.query()
            .$promise
            .then(function (response) {
                vm.users = response;


            }, function (errResponse) {
                //fail
                console.error('error: houston we got a problem', errResponse);
            });

        patientService.get({id: $stateParams.id})
            .$promise
            .then(function (response) {
                console.log(response);
                vm.$scope.form.person = {
                    prescriber: response.prescriber,
                    name: response.name,
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
                    consultant: response.consultant,
                    notes: response.notes,
                    appointments: response.appointments
                };

                vm.person.birth = new Date(vm.person.birth);

                //
                //console.log("test", vm.person.prescriber[0]);
                vm.person.prescriber = vm.person.prescriber[0];
                //console.log(vm.person.prescriber);

                //in case one of the fields is 0
                if (response.address2 == 0) {
                    vm.$scope.form.person.address2 = "";
                }
                if (response.email2 == 0) {
                    vm.$scope.form.person.email = "";
                }


            }, function (errResponse) {
                //fail
                console.error('error: houston we got a problem', errResponse);
            });


        activate();
        activate2();

        ////////////////

        function activate() {

            vm.changeSelectedItem = function(current){
                //console.log("select changed", current._id);

            };

            vm.$scope.target = $stateParams.id;

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

                    console.log(vm.person);

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
                            console.error('error in patient: wyoming we got a problem', errResponse);
                        });

                } else {
                    console.log('Not valid!!');
                    SweetAlert.swal('Error!', 'Something went wrong while updating the prescriber!', 'warning');
                    return false;
                }
            };


            vm.submitNote = function () {

                console.log("submit note", $stateParams.id);
                vm.submitted = true;
                console.dir(vm.newNote);
                console.log(vm.newNote.text);

                if (vm.formValidate.$valid) {
                    console.log('Submitted to patient!!');
                    PatientNoteResource.update({personId: $stateParams.id}, {text: vm.newNote.text})
                        .$promise
                        .then
                        (function (response) {
                            //all good
                            console.log(response);

                            SweetAlert.swal('Success!', 'Note added', 'success');

                            var note = {};
                            note.text = vm.newNote.text;
                            note.creator = "Current user";
                            note.created_at = "Just now";

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


            vm.deleteNote = function(noteId, index) {
                SweetAlert.swal({
                    title: 'Confirm deletion?',
                    text: 'Your will not be able to recover this record!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, confirm deletion!',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function(isConfirm){
                    if (isConfirm) {
                        removePerson($stateParams.id, noteId, index);
                    }
                });
            };

            vm.removePerson = removePerson;

            function removePerson(personId, noteId, index) {

                vm.person.notes.splice(index, 1);
                console.log(vm.person.notes);

                PrescriberDeleteNoteResource.update({ personId: personId }, {noteId: noteId})
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
        .factory('prescriberService', ["$resource", function ($resource) {
            return $resource('http://localhost:9000/api/prescribers/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }])
        .factory('PrescriberNoteResource', ["$resource", function ($resource) {
            return $resource('http://localhost:9000/api/prescribers/add-notes/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }])
        .factory('PrescriberDeleteNoteResource', ["$resource", function ($resource) {
            return $resource('http://localhost:9000/api/prescribers/delete-prescriber-notes/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }]);

    ModifyFormValidationController.$inject = ['$scope', '$stateParams', 'prescriberService', 'SweetAlert', '$state', 'PrescriberNoteResource', 'PrescriberDeleteNoteResource'];

    function ModifyFormValidationController($scope, $stateParams, prescriberService, SweetAlert, $state, PrescriberNoteResource, PrescriberDeleteNoteResource) {
        var vm = this;
        vm.$scope = $scope;

        prescriberService.get({id: $stateParams.id})
            .$promise
            .then(function (response) {
                console.log(response);
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

                    prescriberService.update({id: $stateParams.id}, vm.person)
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

                console.log("submit note", $stateParams.id);
                vm.submitted = true;
                console.dir(vm.newNote);
                console.log(vm.newNote.text);

                if (vm.formValidate.$valid) {
                    console.log('Submitted note to prescriber!!');
                    PrescriberNoteResource.update({personId: $stateParams.id}, {text: vm.newNote.text})
                        .$promise
                        .then
                        (function (response) {
                            //all good
                            console.log(response);

                            SweetAlert.swal('Success!', 'Note added', 'success');

                            var note = {};
                            note.text = vm.newNote.text;
                            note.creator = "Current user";
                            note.created_at = "Just now";

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


            vm.deleteNote = function(noteId, index) {
                SweetAlert.swal({
                    title: 'Confirm deletion?',
                    text: 'Your will not be able to recover this record!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, confirm deletion!',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function(isConfirm){
                    if (isConfirm) {
                        removePerson($stateParams.id, noteId, index);
                    }
                });
            };

            vm.removePerson = removePerson;

            function removePerson(personId, noteId, index) {

                //Removes the location from the Angular DOM
                vm.person.notes.splice(index, 1);
                console.log(vm.person.notes);
                //vm.person.locations = vm.locations;
                //console.log(vm.prescriber);

                PrescriberDeleteNoteResource.update({ personId: personId }, {noteId: noteId})
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
            return $resource('http://localhost:9000/api/prescribers/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }])
        .factory('AppointmentCreationService', ["$resource", function($resource) {
            return $resource('http://localhost:9000/api/prescribers/add-app/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }]);


    AppointmentFormValidationController.$inject = ['$scope', '$stateParams', 'SweetAlert', '$state', 'prescriberService', 'AppointmentCreationService'];


    function AppointmentFormValidationController($scope, $stateParams, SweetAlert, $state, prescriberService, AppointmentCreationService) {
        var vm = this;
        vm.$scope = $scope;
        vm.locations = [];

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
                            SweetAlert.swal('Success!', 'New appointment created!', 'success');

                            $state.go('app.expanddoc', {id: $stateParams.id});


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

/**=========================================================
 * Module: LocationFormValidationController
 * Input validation with UI Validate for NEW LOCATIONS
 =========================================================*/


(function() {
    'use strict';

    angular.module('app.forms')
        .factory('prescriberService', ["$resource", function($resource) {
            return $resource('http://localhost:9000/api/prescribers/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }]);

    angular
        .module('app.forms')
        .controller('LocationFormValidationController', LocationFormValidationController);

    function LocationFormValidationController($scope, $location, $stateParams, prescriberService, SweetAlert, $state) {
        var vm = this;
        vm.$scope = $scope;
        vm.locations = [];

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
                    prescriberService.update({id: $stateParams.id}, {locations: vm.locations})
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
    LocationFormValidationController.$inject = ["$scope", "$location", "$stateParams", "prescriberService", "SweetAlert", "$state"];
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
        .factory('prescriberService', ["$resource", function($resource) {
            return $resource('http://localhost:9000/api/prescribers/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }])
        .factory('PatientAppointmentFormValidationController', ["$resource", function($resource) {
            return $resource('http://localhost:9000/api/patients/add-app/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }]);


    PatientAppointmentFormValidationController.$inject = ['$scope', '$stateParams', 'SweetAlert', '$state', 'prescriberService', 'PatientAppointmentFormValidationController'];


    function PatientAppointmentFormValidationController($scope, $stateParams, SweetAlert, $state, prescriberService, PatientAppointmentFormValidationController) {
        var vm = this;
        vm.$scope = $scope;
        vm.locations = [];

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
                    PatientAppointmentFormValidationController.update({id: $stateParams.id}, {appointments: vm.newAppointment})
                        .$promise
                        .then(function (response) {
                            //success
                            SweetAlert.swal('Success!', 'New appointment created!', 'success');

                            $state.go('app.expanddoc', {id: $stateParams.id});


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
            return $resource('http://localhost:9000/api/prescribers/:id', {
                id: '@param1'
            }, {
                query: {
                    method: 'GET', isArray: true
                }
            });
        }]);

    PatientFormValidationController.$inject = ['$scope', '$resource', '$state', 'SweetAlert', 'prescriberService'];
    function PatientFormValidationController($scope, $resource, $state, SweetAlert, prescriberService ) {
        var vm = this;
        vm.$scope = $scope;

        $resource('http://localhost:9000/api/prescribers').query().$promise.then(function(persons) {
            vm.persons = persons;
            vm.persons.count = persons.length;

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
                    $resource('http://localhost:9000/api/patients').save(this.newPatient)
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
              'loadGoogleMapsJS':   ['vendor/load-google-maps/load-google-maps.js']
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
                  'vendor/ng-dialog/css/ngDialog-theme-default.min.css'] }
          ]
        })
        ;

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
        $urlRouterProvider.otherwise('/app/singleview');

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
            .state('app.login', {
                url: '/login',
                title: 'Login',
                templateUrl: helper.basepath('login.html'),
                controller: 'LoginController',
                controllerAs: 'vm',
                resolve: helper.resolveFor('datatables', 'oitozero.ngSweetAlert')
            })
          .state('app.singleview', {
              url: '/singleview',
              title: 'Single View',
              templateUrl: helper.basepath('singleview.html'),
              resolve: helper.resolveFor('datatables', 'oitozero.ngSweetAlert')
          })
          .state('app.submenu', {
              url: '/submenu',
              title: 'Submenu',
              templateUrl: helper.basepath('submenu.html')
          })
            .state('app.dashboard', {
                url: '/dashboard',
                title: 'Dashboard',
                templateUrl: helper.basepath('dashboard.html'),
                resolve: helper.resolveFor('jquery-ui', 'jquery-ui-widgets', 'moment', 'fullcalendar', 'datatables')
            })
            .state('app.patients', {
                url: '/patients',
                title: 'Patients',
                templateUrl: helper.basepath('patients.html'),
                resolve: helper.resolveFor('datatables', 'oitozero.ngSweetAlert')
            })
            .state('app.salesmen', {
                url: '/salesmen',
                title: 'Salesmen',
                templateUrl: helper.basepath('salesmen.html')
            })
            .state('app.reports', {
                url: '/reports',
                title: 'Reports',
                templateUrl: helper.basepath('reports.html')
            })
            .state('app.newdoc', {
                url: '/newdoctor',
                title: 'New Prescriber',
                templateUrl: helper.basepath('newdoctor.html'),
                resolve: helper.resolveFor('ui.select','inputmask','localytics.directives')
            })
            .state('app.moddoc', {
                url: '/moddoctor/:id',
                title: 'Modify Prescriber',
                templateUrl: helper.basepath('modifydoctor.html'),
                resolve: helper.resolveFor('ui.select','inputmask','localytics.directives')
            })
            .state('app.expanddoc', {
                url: '/expanddoc/:id',
                title: 'Prescriber Detail',
                templateUrl: helper.basepath('prescriberdetail.html'),
                resolve: helper.resolveFor('ui.select','inputmask','localytics.directives', 'ngDialog', 'oitozero.ngSweetAlert', 'datatables')
            })
            .state('app.newlocation', {
                url: '/newlocation/:id',
                title: 'New Location',
                templateUrl: helper.basepath('newlocation.html'),
                resolve: helper.resolveFor('ui.select','inputmask','localytics.directives', 'oitozero.ngSweetAlert')
            })
            .state('app.newappointment', {
                url: '/newappointment/:id',
                title: 'New Appointment',
                templateUrl: helper.basepath('newappointment.html'),
                resolve: helper.resolveFor('ui.select','inputmask','localytics.directives', 'oitozero.ngSweetAlert')
            })
            .state('app.newpat', {
                url: '/newpatient',
                title: 'New Patient',
                templateUrl: helper.basepath('newpatient.html'),
                resolve: helper.resolveFor('ui.select','inputmask','localytics.directives', 'oitozero.ngSweetAlert')
            })
            .state('app.modpat', {
                url: '/modpat/:id',
                title: 'Modify Patient',
                templateUrl: helper.basepath('modifypatient.html'),
                resolve: helper.resolveFor('ui.select','inputmask','localytics.directives', 'oitozero.ngSweetAlert')
            })
            .state('app.expandpat', {
                url: '/expandpat/:id',
                title: 'Patient Detail',
                templateUrl: helper.basepath('patientdetail.html'),
                resolve: helper.resolveFor('ui.select','inputmask','localytics.directives', 'ngDialog', 'oitozero.ngSweetAlert', 'datatables')
            })
            .state('app.newpatappointment', {
                url: '/newpatappointment/:id',
                title: 'New Patient Appointment',
                templateUrl: helper.basepath('newpatappointment.html'),
                resolve: helper.resolveFor('ui.select','inputmask','localytics.directives', 'oitozero.ngSweetAlert')
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
        name: 'Angle',
        description: 'Angular Bootstrap Admin Template',
        year: ((new Date()).getFullYear()),
        layout: {
          isFixed: true,
          isCollapsed: false,
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
        viewAnimation: 'ng-fadeInUp'
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
            return $resource('http://localhost:9000/api/prescribers/:PersonId', {
                PersonId: '@param1'
            }, {
                update: {
                    method:'PUT', params: {PersonId: '@param1'}
                }
            });
        }])
        .factory('AppointmentDeletionService', ["$resource", function($resource) {
            return $resource('http://localhost:9000/api/prescribers/remove-app/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }]);

    AppointmentsDataTableController.$inject = ['$scope', '$stateParams', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert', 'PrescriberResource', 'AppointmentDeletionService'];

    function AppointmentsDataTableController($scope, $stateParams, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert, PrescriberResource, AppointmentDeletionService) {
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

                }, function(errResponse){
                    //fail
                    console.error('error: houston we got a problem', errResponse);
                });

            vm.delete = function(appointmentId ,index) {
                SweetAlert.swal({
                    title: 'Confirm deletion?',
                    text: 'Your will not be able to recover this record!',
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

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('DataTableController', DataTableController);

    DataTableController.$inject = ['$scope', '$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert', '$location'];

    function DataTableController($scope, $resource, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert, $location) {
        var vm = this;
        vm.$scope = $scope;

        activate();

        ////////////////

        function activate() {

            // Ajax

            $resource('http://localhost:9000/api/prescribers').query().$promise.then(function(persons) {
                vm.persons = persons;
                vm.persons.count = persons.length;

            });



            vm.delete = function(id,index) {
                SweetAlert.swal({
                    title: 'Confirm deletion?',
                    text: 'Your will not be able to recover this record!',
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
                console.log(id);
                console.log(index);

                console.log(vm.persons);

                $resource('http://localhost:9000/api/prescribers/:id').delete({id: id})
                    .$promise
                    .then
                    (function(response) {
                        console.log(response);
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

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('LocationsDataTableController', LocationsDataTableController);


    angular.module('app.tables')
        .factory('PrescriberResource', ["$resource", function($resource) {
            return $resource('http://localhost:9000/api/prescribers/:PersonId', {
                PersonId: '@param1'
            }, {
                update: {
                    method:'PUT', params: {PersonId: '@param1'}
                }
            });
        }])
    .factory('PrescriberUpdatedResource', ["$resource", function($resource) {
        return $resource('http://localhost:9000/api/prescribers/update-locations/:personId', {
            personId: '@param1'
        }, {
            update: {
                method:'PUT'
            }
        });
    }])
    .factory('NoteResource', ["$resource", function($resource) {
        return $resource('http://localhost:9000/api/prescribers/update-notes/:personId', {
            personId: '@param1'
        }, {
            update: {
                method:'PUT'
            }
        });
    }])
    .factory('DeleteNoteResource', ["$resource", function($resource) {
        return $resource('http://localhost:9000/api/prescribers/delete-notes/:personId', {
            personId: '@param1'
        }, {
            update: {
                method:'PUT'
            }
        });
    }]);

    LocationsDataTableController.$inject = ['$rootScope', '$scope', '$stateParams', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert', 'PrescriberResource', 'PrescriberUpdatedResource', 'NoteResource', 'DeleteNoteResource'];

    function LocationsDataTableController($rootScope, $scope, $stateParams, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert, PrescriberResource, PrescriberUpdatedResource, NoteResource, DeleteNoteResource) {
        var vm = this;
        vm.$scope = $scope;
        activate();

        ////////////////

        function activate() {
            vm.$scope.target = $stateParams.id;

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
                    text: 'Your will not be able to recover this record!',
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


            vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
            vm.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3).notSortable()
            ];

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

                vm.submitted = true;
                console.log("Agregar nota a " + locationId);
                console.dir(vm.newNote);
                console.log(vm.newNote.text);

                if (vm.formValidate.$valid) {
                    console.log('Submitted!!');
                    NoteResource.update({ personId: $stateParams.id }, {text: vm.newNote.text, locationId: locationId})
                        .$promise
                        .then
                        (function(response) {
                            //all good
                            console.log(response);

                            SweetAlert.swal('Success!', 'Note added', 'success');

                            var note = {};
                            note.text = vm.newNote.text;
                            note.creator = "Current user";
                            note.created_at  = "Just now";

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

            vm.deleteNote = function (locationId ,noteId, index) {
                SweetAlert.swal({
                    title: 'Confirm deletion?',
                    text: 'Your will not be able to recover this record!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, confirm deletion!',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function(isConfirm){
                    if (isConfirm) {
                        console.log("delete dat note son");
                        console.log("index", index);



                        DeleteNoteResource.update({ personId: $stateParams.id }, {locationId: locationId, noteId: noteId})
                            .$promise
                            .then
                            (function(response) {
                                //all good
                                console.log(response);

                                SweetAlert.swal('Success!', 'Note deleted', 'success');
                                $rootScope.notes.splice(index, 1);
                            }, function(errResponse){
                                //fail
                                SweetAlert.swal('Error!', 'Something went wrong while adding a note!', 'warning');
                                console.error('error: Alaska we got a problem', errResponse);
                            });

                        SweetAlert.swal('Success!', 'Note added', 'success');
                    }
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
        .controller('PatientsDataTableController', PatientsDataTableController);


    angular.module('app.tables')
        .factory('prescriberService', ["$resource", function ($resource) {
            return $resource('http://localhost:9000/api/prescribers/:id', {
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

    PatientsDataTableController.$inject = ['$scope', '$window', '$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert', 'prescriberService'];

    function PatientsDataTableController($scope, $window, $resource, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert, prescriberService) {
        var vm = this;
        vm.$scope = $scope;

        activate();

        ////////////////

        function activate() {

            // Ajax

            $resource('http://localhost:9000/api/patients').query()
                .$promise
                .then(function(persons) {


                angular.forEach(persons, function(value, index){

                    prescriberService.get({id: value.prescriber})
                        .$promise
                        .then(function (person) {
                            vm.persons[index].prescriberName = person.name + " " + person.lastname ;
                        });

                });

                vm.persons = persons;
                vm.persons.count = persons.length;

            });

            vm.delete = function(id,index) {
                SweetAlert.swal({
                    title: 'Confirm deletion?',
                    text: 'Your will not be able to recover this record!',
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

                $resource('http://localhost:9000/api/patients/:id').delete({id: id})
                    .$promise
                    .then
                    (function(response) {
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
        .controller('Controller', Controller);

    Controller.$inject = ['$log'];
    function Controller($log) {
        // for controllerAs syntax
        // var vm = this;

        activate();

        ////////////////

        function activate() {
          $log.log('I\'m a line from custom.js');
        }
    }
})();
