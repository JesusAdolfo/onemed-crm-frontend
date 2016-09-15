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

