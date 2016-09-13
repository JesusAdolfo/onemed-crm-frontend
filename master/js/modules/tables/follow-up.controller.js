/**=========================================================
 * Module: datatable,js
 * Angular Datatable controller
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.tables')
        .controller('PatientsFollowDataTableController', PatientsFollowDataTableController);


    angular.module('app.tables')
        .factory('FollowUpPrescriberService', function ($resource) {
            return $resource(globalUri + 'api/prescribers/:id', {
                id: '@param1'
            }, {
                query: {
                    method: 'GET', isArray: true
                },
                get: {
                    method: 'GET', isArray: false
                }
            });
        })
        .factory('DeleteFollowUp', function ($resource) {
            return $resource(globalUri + 'api/patients/delete-followup/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        });

    PatientsFollowDataTableController.$inject = ['$rootScope', '$scope', '$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert', 'FollowUpPrescriberService', 'DeleteFollowUp', '$stateParams'];

    function PatientsFollowDataTableController($rootScope, $scope, $resource, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert, FollowUpPrescriberService, DeleteFollowUp, $stateParams) {
        var vm = this;
        vm.$scope = $scope;

        activate();

        ////////////////

        function activate() {

            // Ajax

            $resource(globalUri + 'api/patients').query()
                .$promise
                .then(function (persons) {

                    var appointmentSum = 0;
                    var noteSum = 0;


                    angular.forEach(persons, function (value, index) {

                        FollowUpPrescriberService.get({id: value.prescriber})
                            .$promise
                            .then(function (person) {
                                vm.persons[index].prescriberName = person.name + " " + person.lastname;
                            });

                        vm.appointmentSum += Number(value.appointments.length);
                        noteSum += Number(value.notes.length);

                    });

                    vm.followUps = [];
                    angular.forEach(persons, function (value, index) {

                        var patientName = value.name + " " + value.lastname;
                        var patiendId = value._id;


                        if(value.followUp.length > 0){

                            angular.forEach(value.followUp, function (valor, indice) {

                                console.log(value.followUp);

                                var newObject = {
                                    patientId: patiendId,
                                    name: patientName,
                                    text: value.followUp[indice].text,
                                    date: value.followUp[indice].date,
                                    status: value.followUp[indice].status
                                };
                                vm.followUps.push(newObject);

                            });


                            //console.log(value.followUp);

                        }


                    });

                    vm.persons = persons;
                    vm.persons.count = persons.length;
                    $rootScope.followUpSum = vm.followUps.length;
                    vm.noteSum = noteSum;

                });

            vm.deleteFollowUps = function (patientId, followUpId, index) {
                SweetAlert.swal({
                    title: 'Confirm follow up deletion?',
                    text: 'You will not be able to recover this record!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, confirm deletion!',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function (isConfirm) {
                    if (isConfirm) {
                        SweetAlert.swal('Deleted!', 'This record has been deleted', 'success');
                        removeFollowUp(patientId, followUpId, index);
                    }
                });
            };


            vm.dtOptions = DTOptionsBuilder
                .newOptions()
                .withDisplayLength(5)
                .withOption('order', [[ 0, 'desc' ]])
                .withOption("lengthMenu", [ [5], ["5"] ]);


            function removeFollowUp(personId, followUpId, index) {

                vm.followUps.splice(index, 1);

                console.log($stateParams.id);

                DeleteFollowUp.update({ personId: personId }, {followUpId: followUpId})
                    .$promise
                    .then
                    (function(response) {
                        //all good
                        //console.log(response);
                        $rootScope.followUpSum -= 1;
                        SweetAlert.swal('Deleted!', 'This record has been deleted', 'success');
                    }, function(errResponse){
                        //fail
                        SweetAlert.swal('Error!', 'Something went wrong while deleting this follow up!', 'warning');
                        console.error('error: Alaska we got a problem', errResponse);
                    });

            }

        }
    }
})();
