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

