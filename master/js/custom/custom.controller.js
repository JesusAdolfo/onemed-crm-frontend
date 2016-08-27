
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('custom')
        .controller('UserController', UserController);

    // angular
    //     .module('app.forms')
    //     .factory('UserService', function ($resource) {
    //         return $resource('http://localhost:9000/api/users/:id/:controller', {
    //             id: '@_id'
    //         }, {
    //             changePassword: {
    //                 method: 'PUT',
    //                 params: {
    //                     controller: 'password'
    //                 }
    //             },
    //             get: {
    //                 method: 'GET',
    //                 params: {
    //                     id: 'me'
    //                 }
    //             }
    //         });
    //     });


    UserController.$inject = ['$rootScope', '$scope', '$cookies', '$state', '$location', 'User'];


    function UserController($rootScope, $scope, $cookies, $state, $location, User) {

        var vm = this;
        vm.$scope = $scope;
        vm.currentUser = {};

        $rootScope.$$listeners.$stateChangeStart = [];

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {



            if(toState.authenticate && !$cookies.get('token')){
                console.log("ROUTE DENIED");
                $state.transitionTo('app.login');
                event.preventDefault();
            }else if ($cookies.get('token')){
                vm.currentUser = User.get();
            }

        });






        if ($cookies.get('token') && $location.path() !== 'app/login') {
            vm.currentUser = User.get();
        }
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
                $state.go('app.login');
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
