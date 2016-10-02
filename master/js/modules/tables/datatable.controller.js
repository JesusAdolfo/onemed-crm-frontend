/**=========================================================
 * Module: datatable,js
 * Angular Datatable controller
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.tables')
        .controller('DataTableController', DataTableController);

    angular.module('app.tables')
        .factory('prescriberTableResource', function ($resource) {
            return $resource(globalUri + 'api/prescribers/list/:action/:id', {}, {

                getSomePrescribers: { method: 'GET', params: { id: '@param1', action: "get-prescribers"}, isArray: true },
                getAllPrescribers: { method: 'GET', params: { id: '@param1', action: "get-all-prescribers"}, isArray: true }

            });
        });

    DataTableController.$inject = ['$rootScope', '$scope', '$compile', '$resource', 'DTOptionsBuilder', 'DTColumnBuilder', 'SweetAlert', 'User', 'prescriberTableResource', '$http', '$q'];

    function DataTableController($rootScope, $scope, $compile, $resource, DTOptionsBuilder, DTColumnBuilder, SweetAlert, User, prescriberTableResource, $http, $q) {
        var vm = this;
        vm.$scope = $scope;
        vm.locationSum = 0;
        vm.appointmentSum = 0;

        var prescribersUri = "";
        var datosUser = {};

        // async.waterfall([
        //     myFirstFunction,
        //     mySecondFunction
        // ], function (err, result) {
        //     // result now equals 'done'
        //     console.log($rootScope.loggedUserId);
        //     // activate("http://localhost:9000/api/prescribers/list/get-prescribers/5793a8289fcbd12c17d0ae39");
        // });
        // function myFirstFunction(callback) {
        //
        //
        //
        //     User.get({})
        //         .$promise
        //         .then
        //         (function (successResponse) {
        //                 var datosUser = successResponse;
        //                 if (datosUser.role == 'user') {
        //                     prescribersUri = globalUri + 'api/prescribers/list/get-prescribers/' + datosUser._id;
        //                     console.log("normal user", prescribersUri);
        //                 } else if (datosUser.role == 'admin') {
        //                     console.log("le admin", prescribersUri);
        //                     prescribersUri = globalUri + 'api/prescribers/list/get-all-prescribers/' + datosUser._id;
        //                 }
        //
        //                 console.log("paso 1 --", prescribersUri);
        //                 callback(null, prescribersUri);
        //         }, function (errorResponse) {
        //                 // failure callback
        //                 console.log("error");
        //                 console.log(errorResponse);
        //         });
        // }
        // function mySecondFunction(arg1, callback) {
        //     // arg1 now equals 'one' and arg2 now equals 'two'
        //     console.log("paso2:", arg1);
        //
        //     callback(null, 'three');
        // }

        activate();

        ////////////////

        function activate() {

            vm.message = '';
            // vm.edit = edit;
            vm.delete = deleteRow;
            vm.dtInstance = {};
            vm.personsArray = {};

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
                            prescriberTableResource.getSomePrescribers({ id: userData._id })
                                .$promise
                                .then(function (persons) {
                                    vm.persons = persons;
                                    vm.persons.count = persons.length;

                                    var locationSum = 1;
                                    var appointmentSum = 0;

                                    angular.forEach(vm.persons, function (item, index) {
                                        locationSum += Number(item.locations.length);
                                        appointmentSum += Number(item.appointments.length);
                                    });

                                    vm.locationSum = locationSum;
                                    vm.appointmentSum = appointmentSum;

                                });



                        }else if (vm.userData.role == 'admin'){
                            vm.dataLoading = true;
                            prescriberTableResource.getAllPrescribers({ id: userData._id })
                                .$promise
                                .then(function (persons) {
                                    vm.persons = persons;
                                    vm.persons.count = persons.length;

                                    var locationSum = 0;
                                    var appointmentSum = 0;

                                    angular.forEach(vm.persons, function (item, index) {

                                        locationSum += Number(item.locations.length);
                                        appointmentSum += Number(item.appointments.length);
                                    });

                                    vm.locationSum = locationSum;
                                    vm.appointmentSum = appointmentSum;

                                }).finally(function(){
                                    vm.dataLoading = false;
                            });

                        }

                    },
                    function (errorResponse) {
                        // failure callback
                        userData = "nada";
                        console.log(errorResponse);
                    });




            vm.delete = deleteRow;
            function deleteRow (person) {
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
                        vm.dtInstance.reloadData();
                        SweetAlert.swal('Deleted!', 'This record has been deleted', 'success');
                        console.log("remove person with id", person);
                        removePerson(person);
                    }
                });
            };




            //ask for prescribers to the server
            //by using datatables and http
            vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
                var defer = $q.defer();
                var prescribersUri = "";

                if ($rootScope.role == 'user') {
                    prescribersUri = globalUri + 'api/prescribers/list/get-prescribers/' + $rootScope.thisUser;
                    // console.log("normal user", prescribersUri);
                } else if ($rootScope.role == 'admin') {
                    console.log("le admin", prescribersUri);
                    prescribersUri = globalUri + 'api/prescribers/list/get-all-prescribers/' + $rootScope.thisUser;
                }


                $http.get(prescribersUri).then(function(result) {
                    defer.resolve(result.data);
                });
                // $http.get('server/datatable.json').then(function(result) {
                //     defer.resolve(result.data);
                // });
                return defer.promise;
            }).withPaginationType('full_numbers')
                .withOption('createdRow', createdRow);
            vm.dtColumns = [
                DTColumnBuilder.newColumn('npi').withTitle('NPI #').withOption('defaultContent', ''),
                DTColumnBuilder.newColumn('name').withTitle('First name').withOption('defaultContent', ''),
                DTColumnBuilder.newColumn('middle').withTitle('Middle name').withOption('defaultContent', ''),
                DTColumnBuilder.newColumn('lastname').withTitle('Last name').withOption('defaultContent', ''),
                DTColumnBuilder.newColumn('state').withTitle('State').withOption('defaultContent', ''),
                DTColumnBuilder.newColumn(null).withTitle('Actions').renderWith(actionsHtml)
            ];

            function createdRow(row, data, dataIndex) {
                // Recompiling so we can bind Angular directive to the DT
                $compile(angular.element(row).contents())($scope);
            }
            function actionsHtml(data, type, full, meta) {
                vm.personsArray[data._id] = data;

                //esta linea imprime cada record
                // console.log(data);
                return '<button class="btn btn-info" ui-sref="app.expanddoc({id: \'' + data._id + '\'})">' +
                    '   <i class="fa fa-expand"></i>' +
                    '</button>&nbsp;' +
                    '<button class="btn btn-warning" ui-sref="app.moddoc({id: \'' + data._id + '\'})">' +
                    '   <i class="fa fa-edit"></i>' +
                    '</button>&nbsp;' +
                    '<button class="btn btn-danger" ng-click="table1.delete(\'' + data._id + '\')">' +
                    '   <i class="fa fa-trash-o"></i>' +
                    '</button>';
            }




            vm.removePerson = removePerson;
            // function removePerson(id, index) {
            function removePerson(id) {
                // console.log(id);
                // console.log(index);
                // console.log(vm.persons);

                $resource(globalUri + 'api/prescribers/:id').delete({id: id})
                    .$promise
                    .then
                    (function (response) {
                        console.log(response);
                        //vm.persons.splice(index, 1);
                    });

            }

        }
    }
})();
