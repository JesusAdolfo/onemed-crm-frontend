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
        })
        .factory('patientsTableResource', function ($resource) {
            return $resource('http://localhost:9000/api/patients/list/:action/:id', {}, {

                getSomeUsers: { method: 'GET', params: { id: '@param1', action: "get-users"}, isArray: true },
                getAllUsers: { method: 'GET', params: { id: '@param1', action: "get-all-users"}, isArray: true }

            });
        });

    PatientsDataTableController.$inject = ['User', '$scope', '$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert', 'prescriberService', 'patientsTableResource'];

    function PatientsDataTableController(User, $scope, $resource, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert, prescriberService, patientsTableResource) {
        var vm = this;
        vm.$scope = $scope;

        activate();

        ////////////////

        function activate() {

            // Ajax
            var userData = {};
            User.get({})
                .$promise
                .then
                (function (successResponse) {
                        // success callback
                        userData = successResponse;
                        vm.userData = successResponse;


                        if(vm.userData.role == 'user'){
                            console.log("it is NOT an admin");


                            patientsTableResource.getSomeUsers({ id: userData._id })
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


                        }else if (vm.userData.role == 'admin'){
                            console.log("it is an admin");
                            patientsTableResource.getAllUsers({ id: userData._id })
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
                        }

                        // userStatsResource.getStats({ id: userData._id })
                        //     .$promise
                        //     .then(function (response) {
                        //
                        //
                        //         console.log(response);
                        //
                        //
                        //
                        //
                        //     }, function (errResponse) {
                        //         //fail
                        //         console.error('error: houston we got a problem', errResponse);
                        //     });

                    },
                    function (errorResponse) {
                        // failure callback
                        userData = "nada";
                        console.log(errorResponse);
                    });



            vm.delete = function (id, index) {
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
                }, function (isConfirm) {
                    if (isConfirm) {
                        SweetAlert.swal('Deleted!', 'This record has been deleted', 'success');
                        removePerson(id, index);
                    }
                });
            };


            // vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
            // vm.dtColumnDefs = [
            //     DTColumnDefBuilder.newColumnDef(0),
            //     DTColumnDefBuilder.newColumnDef(1),
            //     DTColumnDefBuilder.newColumnDef(2),
            //     DTColumnDefBuilder.newColumnDef(3).notSortable()
            // ];

            vm.dtOptions = DTOptionsBuilder
                .newOptions()
                .withDisplayLength(5)
                .withOption('order', [[ 0, 'desc' ]])
                .withOption("lengthMenu", [ [5], ["5"] ]);



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
