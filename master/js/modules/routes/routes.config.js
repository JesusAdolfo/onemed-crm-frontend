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
        $urlRouterProvider.otherwise('/app/login');

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

