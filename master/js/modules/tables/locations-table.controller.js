/**=========================================================
 * Module: datatable,js
 * Angular Datatable controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('LocationsDataTableController', LocationsDataTableController);


    angular.module('app.tables')
        .factory('PrescriberResource', function($resource) {
            return $resource(globalUri + 'api/prescribers/:PersonId', {
                PersonId: '@param1'
            }, {
                update: {
                    method:'PUT', params: {PersonId: '@param1'}
                }
            });
        })
    .factory('PrescriberUpdatedResource', function($resource) {
        return $resource(globalUri + 'api/prescribers/update-locations/:personId', {
            personId: '@param1'
        }, {
            update: {
                method:'PUT'
            }
        });
    })
    .factory('NoteResource', function($resource) {
        return $resource(globalUri + 'api/prescribers/update-notes/:personId', {
            personId: '@param1'
        }, {
            update: {
                method:'PUT'
            }
        });
    })
    .factory('DeleteNoteResource', function($resource) {
        return $resource(globalUri + 'api/prescribers/delete-notes/:personId', {
            personId: '@param1'
        }, {
            update: {
                method:'PUT'
            }
        });
    });

    LocationsDataTableController.$inject = ['$rootScope', '$scope', '$stateParams', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert', 'PrescriberResource', 'PrescriberUpdatedResource', 'NoteResource', 'DeleteNoteResource', 'User', '$location', '$cookies'];

    function LocationsDataTableController($rootScope, $scope, $stateParams, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert, PrescriberResource, PrescriberUpdatedResource, NoteResource, DeleteNoteResource, User, $location, $cookies) {
        var vm = this;
        vm.$scope = $scope;
        activate();

        ////////////////

        function activate() {
            vm.$scope.target = $stateParams.id;

            if ($cookies.get('token') && $location.path() !== 'app/login') {
                vm.currentUser = User.get();
            }

            PrescriberResource.get({ PersonId: $stateParams.id })
                .$promise
                .then(function(response){
                    vm.locations = response.locations;

                    vm.prescriber = response;

                }, function(errResponse){
                    //fail
                    console.error('error: houston we got a problem', errResponse);
                });

            vm.delete = function(locationId ,index) {
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
                        removePerson($stateParams.id, locationId, index);
                    }
                });
            };


            // vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
            // vm.dtColumnDefs = [
            //     DTColumnDefBuilder.newColumnDef(0),
            //     DTColumnDefBuilder.newColumnDef(1),
            //     DTColumnDefBuilder.newColumnDef(2).notSortable()
            // ];

            vm.dtOptions = DTOptionsBuilder
                    .newOptions()
                .withDisplayLength(3)
                .withOption('order', [[ 0, 'desc' ]])
                .withOption("lengthMenu", [ [3], ["3"] ]);


            vm.removePerson = removePerson;

            function removePerson(personId, locationId, index) {

                //Removes the location from the Angular DOM
                vm.locations.splice(index, 1);
                console.log(vm.locations);
                vm.prescriber.locations = vm.locations;
                console.log(vm.prescriber);

                PrescriberUpdatedResource.update({ personId: personId }, {locationId: locationId})
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

            function closeDialog() {
                console.log("The dialog was closed");
            }


            //
            vm.submitted = false;
            vm.validateInput = function(name, type) {
                var input = vm.formValidate[name];
                return (input.$dirty || vm.submitted) && input.$error[type];
            };

            vm.submitForm = function (locationId) {

                if (vm.currentUser.lastname == "" || angular.isUndefined(vm.currentUser.lastname))
                    var creator = vm.currentUser.name;
                else
                    var creator = vm.currentUser.name +" "+ vm.currentUser.lastname;

                vm.submitted = true;
                console.log("Agregar nota a " + locationId);
                console.dir(vm.newNote);
                console.log(vm.newNote.text);

                if (vm.formValidate.$valid) {
                    console.log('Submitted!!');
                    NoteResource.update({ personId: $stateParams.id }, {text: vm.newNote.text, creator: creator, locationId: locationId})
                        .$promise
                        .then
                        (function(response) {
                            //all good
                            console.log(response);

                            SweetAlert.swal('Success!', 'Note added', 'success');

                            var note = {};
                            note.text = vm.newNote.text;
                            note.creator = creator;
                            note.created_at  = "Just now";

                            $rootScope.notes.push(note);


                            vm.newNote = {};
                            vm.formValidate.$setPristine();
                            vm.formValidate.$setUntouched();

                        }, function(errResponse){
                            //fail
                            SweetAlert.swal('Error!', 'Something went wrong while adding a note!', 'warning');
                            console.error('error: Alaska we got a problem', errResponse);
                        });
                } else {
                    console.log("form is invalid");
                    return false;
                }
            };

            vm.deleteNote = function (locationId ,noteId, index) {
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
                        console.log("delete dat note son");
                        console.log("index", index);



                        DeleteNoteResource.update({ personId: $stateParams.id }, {locationId: locationId, noteId: noteId})
                            .$promise
                            .then
                            (function(response) {
                                //all good
                                console.log(response);

                                SweetAlert.swal('Success!', 'Note deleted', 'success');
                                $rootScope.notes.splice(index, 1);
                            }, function(errResponse){
                                //fail
                                SweetAlert.swal('Error!', 'Something went wrong while adding a note!', 'warning');
                                console.error('error: Alaska we got a problem', errResponse);
                            });

                        SweetAlert.swal('Success!', 'Note added', 'success');
                    }
                });

            }


        }
    }
})();
