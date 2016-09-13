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
        .controller('FollowUpController', FollowUpController);

    angular.module('app.forms')
        .factory('FollowUpPatientService', function ($resource) {
            return $resource(globalUri + 'api/patients/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        })
        .factory('FollowUpResource', function ($resource) {
            return $resource(globalUri + 'api/patients/add-followup/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        });



    FollowUpController.$inject = ['$scope', '$stateParams', 'FollowUpPatientService', 'SweetAlert', '$state', '$filter', '$resource', 'FollowUpResource', 'User', '$location', '$cookies', '$timeout', 'Upload'];

    function FollowUpController($scope, $stateParams, FollowUpPatientService, SweetAlert, $state, $filter, $resource, FollowUpResource, User, $location, $cookies, $timeout, Upload) {
        var vm = this;
        vm.$scope = $scope;


        FollowUpPatientService.get({id: $stateParams.id})
            .$promise
            .then(function (response) {
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
        activate2();

        ////////////////

        function activate() {

            vm.submitted = false;
            vm.validateInput = function(name, type) {
                var input = vm.formValidate[name];
                return (input.$dirty || vm.submitted) && input.$error[type];
            };

            // Submit form
            vm.submitForm = function() {
                vm.submitted = true;
                if (vm.formValidate.$valid) {
                    console.log('adding follow up...');
                    console.log(vm.newFollowUp);
                    FollowUpResource.update({personId: $stateParams.id}, {followUp: vm.newFollowUp})
                        .$promise
                        .then(function (response) {
                            //success
                            SweetAlert.swal({
                                title: 'Success!',
                                text: 'New appointment created!',
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#A1D490',
                                confirmButtonText: 'Done!',
                                closeOnConfirm: true
                            },  function(){
                                $state.go('app.expandpat', {id: $stateParams.id});
                            });
                        }, function(errResponse){
                            //fail
                            console.error('error: dakota we got a problem', errResponse);
                        });
                } else {
                    SweetAlert.swal('Error!', 'Something went wrong while adding this follow up!', 'warning');
                    return false;
                }
            };



        }

        function activate2() {
            vm.today = function() {
                vm.dt = new Date();
            };
            vm.today();

            vm.clear = function () {
                vm.dt = null;
            };

            // Disable weekend selection
            vm.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

            vm.toggleMin = function() {
                vm.minDate = vm.minDate ? null : new Date();
            };
            vm.toggleMin();

            vm.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                vm.opened = true;
            };

            vm.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            vm.initDate = new Date('2019-10-20');
            vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            vm.format = vm.formats[0];
        }


    }
})();

