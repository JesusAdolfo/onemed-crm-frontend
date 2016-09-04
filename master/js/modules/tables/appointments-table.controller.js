/**
 * Created by Adolfo on 8/8/2016.
 */
/**=========================================================
 * Module: datatable,js
 * Angular Datatable controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('AppointmentsDataTableController', AppointmentsDataTableController);


    angular.module('app.tables')
        .factory('PrescriberResource', function($resource) {
            return $resource('http://localhost:9000/api/prescribers/:PersonId', {
                PersonId: '@param1'
            }, {
                update: {
                    method:'PUT', params: {PersonId: '@param1'}
                }
            });
        })
        .factory('PrescriberAppointmentDeletionService', function($resource) {
            return $resource('http://localhost:9000/api/prescribers/remove-app/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        });

    AppointmentsDataTableController.$inject = ['$scope', '$stateParams', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert', 'PrescriberResource', 'PrescriberAppointmentDeletionService', 'User'];

    function AppointmentsDataTableController($scope, $stateParams, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert, PrescriberResource, PrescriberAppointmentDeletionService, User) {
        var vm = this;
        vm.$scope = $scope;
        activate();

        ////////////////

        function activate() {
            vm.$scope.target = $stateParams.id;

            PrescriberResource.get({ PersonId: $stateParams.id })
                .$promise
                .then(function(response){
                    vm.appointments = response.appointments;
                    vm.prescriber = response;

                    angular.forEach(response.appointments, function (value, index) {

                        User.get({id: value.consultant})
                            .$promise
                            .then(function (person) {
                                vm.appointments[index].consultantName = person.name + " " + person.lastname;
                            });


                    });


                }, function(errResponse){
                    //fail
                    console.error('error: houston we got a problem', errResponse);
                });

            vm.delete = function(appointmentId ,index) {
                SweetAlert.swal({
                    title: 'Confirm deletion?',
                    text: 'You will not be able to recover this record!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, confirm deletion!',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function(isConfirm){
                    if (isConfirm) {
                        removePerson($stateParams.id, appointmentId, index);
                    }
                });
            };

            vm.dtOptions = DTOptionsBuilder
                .newOptions()
                .withDisplayLength(3)
                .withOption('order', [[ 0, 'desc' ]])
                .withOption("lengthMenu", [ [3], ["3"] ]);


            vm.removePerson = removePerson;

            function removePerson(personId, appointmentId, index) {

                //Removes the location from the Angular DOM
                console.log("deleting the appointment");
                vm.appointments.splice(index, 1);

                PrescriberAppointmentDeletionService.update({ id: personId }, {appointmentId: appointmentId})
                    .$promise
                    .then
                    (function(response) {
                        //all good
                        console.log(response);

                        SweetAlert.swal('Deleted!', 'This record has been deleted', 'success');
                    }, function(errResponse){
                        //fail
                        SweetAlert.swal('Error!', 'Something went wrong while updating the prescriber!', 'warning');
                        console.error('error: Alaska we got a problem', errResponse);
                    });

            }

        }
    }
})();
