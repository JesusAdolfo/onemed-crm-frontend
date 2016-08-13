/**
 * Created by Adolfo on 8/8/2016.
 */
/**=========================================================
 * Module: AppointmentFormValidationController
 * Input validation with UI Validate for NEW Appointments
 =========================================================*/


(function() {
    'use strict';


    angular
        .module('app.forms')
        .controller('AppointmentFormValidationController', AppointmentFormValidationController);

    angular.module('app.forms')
        .factory('prescriberService', function($resource) {
            return $resource('http://localhost:9000/api/prescribers/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        })
        .factory('AppointmentCreationService', function($resource) {
            return $resource('http://localhost:9000/api/prescribers/add-app/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        });


    AppointmentFormValidationController.$inject = ['$scope', '$stateParams', 'SweetAlert', '$state', 'prescriberService', 'AppointmentCreationService'];


    function AppointmentFormValidationController($scope, $stateParams, SweetAlert, $state, prescriberService, AppointmentCreationService) {
        var vm = this;
        vm.$scope = $scope;
        vm.locations = [];

        prescriberService.get({ id: $stateParams.id })
            .$promise
            .then(function(response){
                console.log(response);
                vm.$scope.form.title = {
                    name: response.name,
                    lastname: response.lastname,
                    npi: response.npi
                };
                vm.locations = response.locations;
                console.log(vm.locations);

            }, function(errResponse){
                //fail
                console.error('error: manila we got a problem', errResponse);
            });

        activate();
        activate2();
        activate3();

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
                    console.log('SU SU Submitted!!');
                    console.log(this.newAppointment);
                    console.log(vm.newAppointment);
                    AppointmentCreationService.update({id: $stateParams.id}, {appointments: vm.newAppointment})
                        .$promise
                        .then(function (response) {
                            //success
                            SweetAlert.swal('Success!', 'New appointment created!', 'success');

                            $state.go('app.expanddoc', {id: $stateParams.id});


                        }, function(errResponse){
                            //fail
                            SweetAlert.swal('Error!', 'Something went wrong while creating an appointment!', 'warning');

                            console.error('error: Milwaukee we got a problem', errResponse);
                        });
                } else {
                    SweetAlert.swal('Error!', 'Something went wrong', 'warning');
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

        function activate3() {
            vm.mytime = new Date();

            vm.hstep = 1;
            vm.mstep = 15;

            vm.options = {
                hstep: [1, 2, 3],
                mstep: [1, 5, 10, 15, 25, 30]
            };

            vm.ismeridian = true;
            vm.toggleMode = function() {
                vm.ismeridian = ! vm.ismeridian;
            };

            vm.update = function() {
                var d = new Date();
                d.setHours( 14 );
                d.setMinutes( 0 );
                vm.mytime = d;
            };

            vm.changed = function () {
                console.log('Time changed to: ' + vm.mytime);
            };

            vm.clear = function() {
                vm.mytime = null;
            };
        }
    }
})();
