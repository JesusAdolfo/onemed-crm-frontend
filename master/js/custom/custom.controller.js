
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

    angular.module('app.forms')
        .factory('userStatsResource', function ($resource) {
            return $resource('http://localhost:9000/api/patients/stats/:action/:id', {}, {

                getStats: { method: 'GET', params: { id: '@param1', action: "get-stats" }, isArray: true }

            });
        });


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

                   $rootScope.loggedUserId = userData._id;

                    userStatsResource.getStats({ id: userData._id })
                        .$promise
                        .then(function (response) {


                            console.log(response);

                            $rootScope.money = response[0].total;
                            $rootScope.sales = response[0].qty;



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
