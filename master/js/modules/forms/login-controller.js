(function (){
    'use strict';

    angular.module('app.forms')
        .controller('LoginController', LoginController);

    angular.module('app.forms')
        .factory('userService', function ($resource) {
            return $resource('http://localhost:9000/api/users/login', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        });

    function UserResource($resource) {
        return $resource('http://localhost:9000/api/users/:id/:controller', {
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
                    $http.post('http://localhost:9000/auth/local', { email: email, password: password})
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

