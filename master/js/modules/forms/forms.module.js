(function() {
    'use strict';

    angular
        .module('app.forms', ['ngFileUpload'])
        .config(function($httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
        });
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
                        .go('app.login');
                    // remove any stale tokens
                    $cookies.remove('token');
                }
                return $q.reject(response);
            }
        };
    }

    angular.module('app.forms')
        .factory('authInterceptor', authInterceptor);
})();