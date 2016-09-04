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
