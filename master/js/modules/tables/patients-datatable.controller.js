/**=========================================================
 * Module: datatable,js
 * Angular Datatable controller
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.tables')
        .controller('PatientsDataTableController', PatientsDataTableController);


    angular.module('app.tables')
        .factory('prescriberService', function ($resource) {
            return $resource('http://localhost:9000/api/prescribers/:id', {
                id: '@param1'
            }, {
                query: {
                    method: 'GET', isArray: true
                },
                get: {
                    method: 'GET', isArray: false
                }
            });
        });

    PatientsDataTableController.$inject = ['$scope', '$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert', 'prescriberService'];

    function PatientsDataTableController($scope, $resource, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert, prescriberService) {
        var vm = this;
        vm.$scope = $scope;

        activate();

        ////////////////

        function activate() {

            // Ajax

            $resource('http://localhost:9000/api/patients').query()
                .$promise
                .then(function (persons) {

                    var appointmentSum = 0;
                    var noteSum = 0;


                    angular.forEach(persons, function (value, index) {

                        prescriberService.get({id: value.prescriber})
                            .$promise
                            .then(function (person) {
                                vm.persons[index].prescriberName = person.name + " " + person.lastname;
                            });

                        appointmentSum += Number(value.appointments.length);
                        noteSum += Number(value.notes.length);

                    });

                    vm.persons = persons;
                    vm.persons.count = persons.length;
                    vm.appointmentSum = appointmentSum;
                    vm.noteSum = noteSum;

                });

            vm.delete = function (id, index) {
                SweetAlert.swal({
                    title: 'Confirm deletion?',
                    text: 'Your will not be able to recover this record!',
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
                        removePerson(id, index);
                    }
                });
            };


            vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
            vm.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3).notSortable()
            ];

            vm.removePerson = removePerson;

            function removePerson(id, index) {

                $resource('http://localhost:9000/api/patients/:id').delete({id: id})
                    .$promise
                    .then
                    (function (response) {
                        vm.persons.splice(index, 1);
                    });

            }

        }
    }
})();
