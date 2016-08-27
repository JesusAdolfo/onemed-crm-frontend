/**
 * Created by Adolfo on 8/17/2016.
 */
/**=========================================================
 * Module: datatable,js
 * Angular Datatable controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('ConsultantsDataTableController', ConsultantsDataTableController);


    angular.module('app.tables')
        .factory('userService', function ($resource) {
            return $resource('http://localhost:9000/api/users/all', {
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

    ConsultantsDataTableController.$inject = ['$scope', '$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert', 'userService'];

    function ConsultantsDataTableController($scope, $resource, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert, userService) {
        var vm = this;
        vm.$scope = $scope;

        activate();

        ////////////////

        function activate() {

            // Ajax

            userService.query()
                .$promise
                .then(function(persons) {

                    vm.persons = persons;
                    vm.persons.count = persons.length;

                });

            vm.delete = function(id,index) {
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
                }, function(isConfirm){
                    if (isConfirm) {
                        SweetAlert.swal('Deleted!', 'This record has been deleted', 'success');
                        removePerson(id,index);
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
                    (function(response) {
                        vm.persons.splice(index, 1);
                    });

            }

        }
    }
})();
