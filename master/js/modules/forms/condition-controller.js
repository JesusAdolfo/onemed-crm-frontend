/**
 * Created by Adolfo on 8/17/2016.
 */
/**=========================================================
 * Module: Modify Prescriber
 * Input validation with UI Validate TO MODIFY PRESCRIBER
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.forms')
        .controller('ConditionController', ConditionController);

    angular.module('app.forms')
        .factory('patientService', function ($resource) {
            return $resource(globalUri + 'api/patients/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        })
        .factory('ConditionResource', function ($resource) {
            return $resource(globalUri + 'api/patients/add-cond/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        });



    ConditionController.$inject = ['$scope', '$stateParams', 'patientService', 'SweetAlert', '$state', '$filter', '$resource', 'ConditionResource', 'User', '$location', '$cookies'];

    function ConditionController($scope, $stateParams, patientService, SweetAlert, $state, $filter, $resource, ConditionResource, User, $location, $cookies) {
        var vm = this;
        vm.$scope = $scope;


        patientService.get({id: $stateParams.id})
            .$promise
            .then(function (response) {
                console.log(response);
                vm.$scope.form.person = {
                    name: response.name,
                    lastname: response.lastname,
                    birth: response.birth,
                    date: response.date
                };


            }, function (errResponse) {
                //fail
                console.error('error: houston we got a problem', errResponse);
            });


        activate();

        ////////////////

        function activate() {

            vm.changeSelectedItem = function(current){
                // console.log("select changed");

            };

            vm.$scope.target = $stateParams.id;

            if ($cookies.get('token') && $location.path() !== 'app/login') {
                vm.currentUser = User.get();
            }

            vm.submitted = false;
            vm.submitted = false;
            vm.validateInput = function (name, type) {
                var input = vm.formValidate[name];
                return (input.$dirty || vm.submitted) && input.$error[type];
            };




            vm.submitCond = function () {

                if (vm.currentUser.lastname == "" || angular.isUndefined(vm.currentUser.lastname))
                    var creator = vm.currentUser.name;
                else
                    var creator = vm.currentUser.name +" "+ vm.currentUser.lastname;

                console.log("submit cond", $stateParams.id);
                vm.submitted = true;
                // console.dir(vm.newNote);
                var condition = "";
                if(vm.newCondition.text == "Other"){
                    condition = vm.newCondition.other;
                }else{
                    condition = vm.newCondition.text;
                }
                console.log(vm.newCondition.text);

                if (vm.formValidate.$valid) {
                    console.log('Submitted new condition!!');
                    ConditionResource.update({personId: $stateParams.id}, {text: condition, creator: creator})
                        .$promise
                        .then
                        (function (response) {
                            //all good
                            console.log(response);

                            SweetAlert.swal('Success!', 'Condition added', 'success');
                            $state.go('app.expandpat', {id: $stateParams.id});

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

        }


    }
})();

