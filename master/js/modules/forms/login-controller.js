(function ($rootScope){
    'use strict';

    console.log(globalUri);

    angular.module('app.forms')
        .controller('LoginController', LoginController);

    angular.module('app.forms')
        .factory('userService', function ($resource) {
            return $resource(globalUri + 'api/users/login', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        });

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

    angular.module('app.forms')
        .factory('User', UserResource);

    LoginController.$inject = ['$rootScope', '$scope', '$http', '$cookies',  '$state', 'userService', 'SweetAlert', 'Auth', 'User'];

    function LoginController($rootScope, $scope, $http, $cookies, $state, userService, SweetAlert, Auth, User) {

        var vm = this;
        vm.$scope = $scope;
        vm.login = {};

        var currentUser = {};

        activate();

        function activate() {

            vm.login.email = "test@example.com";
            vm.login.password = "test";
            // vm.login.email = "";
            // vm.login.password = "";

            vm.submitted = false;
            vm.validateInput = function (name, type) {
                var input = vm.loginForm[name];
                return (input.$dirty || vm.submitted) && input.$error[type];
            };

            vm.submitForm = function () {
                vm.submitted = true;
                var email = vm.login.email;
                var password = vm.login.password;

                if (vm.loginForm.$valid) {
                    $http.post(globalUri + 'auth/local', { email: email, password: password})
                        .then
                        (function(res) {
                            // console.log("res =", res);
                            $cookies.put('token', res.data.token);
                            currentUser = User.get();
                            console.log("curry", currentUser);

                            // $rootScope.role = User.role;
                            return currentUser.$promise;
                        })
                        .then(function () {
                            console.log("curry", currentUser.role);
                            $rootScope.role = currentUser.role;
                            // redirect to dashboard after login
                            $state.go('app.dashboard');
                        })
                        .catch
                        (function (err) {
                            SweetAlert.swal('Error!', err.statusText, 'warning');

                        });
                }

            };
        }

    }

})();

