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
        }).factory('UpdateFollowUp', function ($resource) {
            return $resource(globalUri + 'api/patients/update-followup/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }).factory('followUpDateResource', function ($resource) {
            return $resource(globalUri + 'api/patients/date/:id/:date',
                {date: '@param1'},
                {getSomeFolllowUps: { method: 'GET', isArray: true }}
                );
    }).factory('patientsTableResource', function ($resource) {
        return $resource(globalUri + 'api/patients/list/:action/:id', {}, {

            getSomeUsers: { method: 'GET', params: { id: '@param1', action: "get-users"}, isArray: true },
            getAllUsers: { method: 'GET', params: { id: '@param1', action: "get-all-users"}, isArray: true }

        });
    });

    PatientsFollowDataTableController.$inject = ['$rootScope', '$scope', '$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert', 'FollowUpPrescriberService', 'DeleteFollowUp', 'UpdateFollowUp', '$stateParams', 'followUpDateResource', 'patientsTableResource'];

    function PatientsFollowDataTableController($rootScope, $scope, $resource, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert, FollowUpPrescriberService, DeleteFollowUp, UpdateFollowUp, $stateParams, followUpDateResource, patientsTableResource) {
        var vm = this;
        vm.$scope = $scope;

        activate();

        ////////////////

        function activate() {

            // Ajax
            patientsTableResource.getSomeUsers({ id: $rootScope.thisUser })
                .$promise
                .then(function (persons) {

                    var appointmentSum = 0;
                    var noteSum = 0;
                    console.log(persons);
                    vm.followUps = [];
                    angular.forEach(persons, function (value, index) {
                        console.log(value);
                        var patientName = value.name + " " + value.lastname;
                        var patiendId = value._id;

                        if(value.followUp.length > 0){

                            angular.forEach(value.followUp, function (valor, indice) {

                                var newObject = {
                                    id: value.followUp[indice]._id,
                                    patientId: patiendId,
                                    name: patientName,
                                    text: value.followUp[indice].text,
                                    date: value.followUp[indice].date,
                                    status: value.followUp[indice].status
                                };
                                vm.followUps.push(newObject);

                            });
                        }
                    });

                    vm.persons = persons;
                    vm.persons.count = persons.length;
                    $rootScope.followUpSum = vm.followUps.length;
                    vm.noteSum = noteSum;

                });

            function followUpByDates(selectedDate){
                console.log("getting follow by date");
                followUpDateResource.getSomeFolllowUps({date: selectedDate, id: $rootScope.thisUser})
                    .$promise
                    .then(function (persons) {



                        vm.followUps = [];
                        angular.forEach(persons, function (value, index) {


                            var patientName = value.name + " " + value.lastname;
                            var patiendId = value._id;
                            // console.log(patientName);



                                    // console.log(value.followUp);

                                    var newObject = {
                                        id: value.followUp._id,
                                        patientId: patiendId,
                                        name: patientName,
                                        text: value.followUp.text,
                                        date: value.followUp.date,
                                        status: value.followUp.status
                                    };
                                    vm.followUps.push(newObject);



                        });

                    });
            }



            vm.todayOnly = function(){
                followUpByDates("today");
            };
            vm.weekOnly = function(){
                followUpByDates("week");
            };
            vm.monthOnly = function(){
                followUpByDates("month");
            };
            vm.all = function(){
                followUpByDates("all");
            };


            vm.processFollowUp = function (item) {
                SweetAlert.swal({
                    title: 'Follow-up finished?',
                    text: 'Do you want to finalize this follow-up?',
                    type: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#A1D490',
                    confirmButtonText: 'Yes, confirm!',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function (isConfirm) {
                    if (isConfirm) {
                        SweetAlert.swal('Confirmed!', 'This follow up has been processed', 'success');
                        updateFollowUp(item);
                    }
                });
            };

            function updateFollowUp(item) {

                UpdateFollowUp.update({ personId: item.patientId }, {followUpId: item.id})
                    .$promise
                    .then
                    (function(response) {
                        //all good
                        //$rootScope.followUpSum -= 1;
                        SweetAlert.swal('Confirmed!', 'This follow up has been processed', 'success');

                        if(vm.followUps[vm.followUps.indexOf(item)].status == "PENDING"){
                            vm.followUps[vm.followUps.indexOf(item)].status = "PROCESSED";
                        }else if(vm.followUps[vm.followUps.indexOf(item)].status == "PROCESSED"){
                            vm.followUps[vm.followUps.indexOf(item)].status = "PENDING";
                        }
                    }, function(errResponse){
                        //fail
                        SweetAlert.swal('Error!', 'Something went wrong while updating this follow up!', 'warning');
                        console.error('error: Chicago we got a problem', errResponse);
                    });

            }

            vm.deleteFollowUps = function (item) {
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
                        removeFollowUp(item);
                    }
                });
            };


            vm.dtOptions = DTOptionsBuilder
                .newOptions()
                .withDisplayLength(5)
                .withOption('order', [[ 0, 'desc' ]])
                .withOption("lengthMenu", [ [5], ["5"] ]);


            function removeFollowUp(item) {

                vm.followUps.splice(vm.followUps.indexOf(item), 1);

                console.log(item);
                DeleteFollowUp.update({ personId: item.patientId }, {followUpId: item.id})
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
