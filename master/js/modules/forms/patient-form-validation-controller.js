/**
 * Created by Adolfo on 8/9/2016.
 */
/**=========================================================
 * Module: FormValidationController
 * Input validation with UI Validate
 =========================================================*/

(function() {
    'use strict';


    angular
        .module('app.forms')
        .controller('PatientFormValidationController', PatientFormValidationController);
    angular.module('app.forms')
        .factory('prescriberService', function ($resource) {
            return $resource(globalUri + 'api/prescribers/:id', {
                id: '@param1'
            }, {
                query: {
                    method: 'GET', isArray: true
                }
            });
        })
        .factory('userService', function ($resource) {
            return $resource(globalUri + 'api/users/all', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        });

    PatientFormValidationController.$inject = ['$scope', '$resource', '$state', 'SweetAlert', 'prescriberService', 'userService'];
    function PatientFormValidationController($scope, $resource, $state, SweetAlert, prescriberService, userService ) {
        var vm = this;
        vm.$scope = $scope;

        $resource(globalUri + 'api/prescribers').query().$promise.then(function(persons) {
            vm.persons = persons;
            vm.persons.count = persons.length;

        });

        $resource(globalUri + 'api/users/all').query().$promise.then(function(consultants) {
            vm.consultants = consultants;
            vm.consultants.count = consultants.length;

        });



        prescriberService.query()
            .$promise
            .then(function (response) {
                console.log(response);
                vm.prescribers = response;


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
                    console.log('Submitted!!');
                    console.log(this.newPatient);
                    $resource(globalUri + 'api/patients').save(this.newPatient)
                        .$promise
                        .then(function(data){
                            SweetAlert.swal({
                                title: 'Success!',
                                text: 'The patient was saved!',
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#A1D490',
                                confirmButtonText: 'Done!',
                                closeOnConfirm: true
                            },  function(){
                                $state.go('app.patients');
                            });
                        }, function (errResponse) {
                            console.error('error: Washington we got a problem');
                        });

                } else {
                    SweetAlert.swal('Error!', 'Something went wrong while adding this presciber!', 'warning');
                    return false;
                }
            };
        }

        function activate2() {

            vm.minDate = new Date('1900-10-20');

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

            //vm.toggleMin = function() {
            //    vm.minDate = vm.minDate ? null : new Date();
            //};
            //vm.toggleMin();

            vm.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                vm.opened = true;
            };

            vm.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            vm.initDate = new Date('2020-10-20');
            vm.formats = ['dd-MMMM-yyyy', 'MM/dd/yyyy', 'dd.MM.yyyy', 'shortDate'];
            vm.format = vm.formats[1];
        }
    }
})();
