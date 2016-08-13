/**=========================================================
 * Module: datatable,js
 * Angular Datatable controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('DataTableController', DataTableController);

    DataTableController.$inject = ['$scope', '$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert', '$location'];

    function DataTableController($scope, $resource, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert, $location) {
        var vm = this;
        vm.$scope = $scope;

        activate();

        ////////////////

        function activate() {

            // Ajax

            $resource('http://localhost:9000/api/prescribers').query().$promise.then(function(persons) {
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
                console.log(id);
                console.log(index);

                console.log(vm.persons);

                $resource('http://localhost:9000/api/prescribers/:id').delete({id: id})
                    .$promise
                    .then
                    (function(response) {
                        console.log(response);
                        vm.persons.splice(index, 1);
                    });

            }

        }
    }
})();
