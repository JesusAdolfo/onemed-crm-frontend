/**=========================================================
 * Module: Modify Prescriber
 * Input validation with UI Validate TO MODIFY PRESCRIBER
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.forms')
        .controller('ModifyFormValidationController', ModifyFormValidationController);

    angular.module('app.forms')
        .factory('ModifyPrescriberService', function ($resource) {
            return $resource(globalUri + 'api/prescribers/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        })
        .factory('PrescriberNoteResource', function ($resource) {
            return $resource(globalUri + 'api/prescribers/add-notes/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            })
        })
        .factory('PrescriberDeleteNoteResource', function ($resource) {
            return $resource(globalUri + 'api/prescribers/delete-prescriber-notes/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            })
        });

    ModifyFormValidationController.$inject = ['$scope', '$resource', '$stateParams', 'ModifyPrescriberService', 'SweetAlert', '$state', 'PrescriberNoteResource', 'PrescriberDeleteNoteResource', 'User', '$location', '$cookies'];

    function ModifyFormValidationController($scope, $resource, $stateParams, ModifyPrescriberService, SweetAlert, $state, PrescriberNoteResource, PrescriberDeleteNoteResource, User, $location, $cookies) {
        var vm = this;
        vm.$scope = $scope;

        $resource(globalUri + 'api/users/all').query().$promise.then(function(consultants) {
            vm.consultants = consultants;
            vm.consultants.count = consultants.length;

        });



        ModifyPrescriberService.get({id: $stateParams.id})
            .$promise
            .then(function (response) {
                vm.$scope.form.person = {
                    name: response.name,
                    middle: response.middle,
                    lastname: response.lastname,
                    address: response.address,
                    address2: response.address2,
                    city: response.city,
                    state: response.state,
                    postal: response.postal,
                    phone: response.phone,
                    fax: response.fax,
                    npi: response.npi,
                    location: response.location,
                    locations: response.locations,
                    consultant: response.consultant,
                    notes: response.notes,
                    appointments: response.appointments
                };


                User.get({id: vm.person.consultant})
                    .$promise
                    .then(function (person) {

                        // in case the lastname is undefined
                        if(person.lastname == "" || angular.isUndefined(person.lastname))
                            vm.person.consultant = person.name;
                        else
                            vm.person.consultant = person.name +" "+ person.lastname;
                    });


                //in case one of the fields is 0
                if (response.address2 == 0) {
                    vm.$scope.form.person.address2 = "";
                }
                if (response.fax == 0) {
                    vm.$scope.form.person.fax = "";
                }


            }, function (errResponse) {
                //fail
                console.error('error: houston we got a problem', errResponse);
            });


        activate();

        ////////////////

        function activate() {

            vm.$scope.target = $stateParams.id;

            if ($cookies.get('token') && $location.path() !== 'app/login') {
                vm.currentUser = User.get();
            }

            vm.submitted = false;
            vm.validateInput = function (name, type) {
                var input = vm.formValidate[name];
                return (input.$dirty || vm.submitted) && input.$error[type];
            };

            // Submit form
            vm.submitForm = function () {
                vm.submitted = true;
                if (vm.formValidate.$valid) {
                    console.log('Trying to update the prescriber ' + $stateParams.id);

                    ModifyPrescriberService.update({id: $stateParams.id}, vm.person)
                        .$promise
                        .then(function (response) {
                            SweetAlert.swal({
                                title: 'Success!',
                                text: 'The prescriber was modified!',
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#A1D490',
                                confirmButtonText: 'Done!',
                                closeOnConfirm: true
                            }, function () {
                                $state.go('app.singleview');
                            });
                        }, function (errResponse) {
                            //fail
                            console.error('error: wyoming we got a problem', errResponse);
                        });

                } else {
                    console.log('Not valid!!');
                    SweetAlert.swal('Error!', 'Something went wrong while updating the prescriber!', 'warning');
                    return false;
                }
            };


            vm.submitNote = function () {
                if (vm.currentUser.lastname == "" || angular.isUndefined(vm.currentUser.lastname))
                    var creator = vm.currentUser.name;
                else
                    var creator = vm.currentUser.name +" "+ vm.currentUser.lastname;



                console.log("submit note", $stateParams.id);
                vm.submitted = true;
                console.dir(vm.newNote);
                console.log(vm.newNote.text);

                if (vm.formValidate.$valid) {
                    console.log('Submitted note to prescriber!!');
                    PrescriberNoteResource.update({personId: $stateParams.id}, {text: vm.newNote.text, creator: creator })
                        .$promise
                        .then
                        (function (response) {
                            //all good
                            console.log(response);

                            SweetAlert.swal('Success!', 'Note added', 'success');

                            var note = {};
                            note.text = vm.newNote.text;
                            note.creator = creator;
                            var myDate = new Date();
                            note.created_at = myDate.toISOString();

                            vm.person.notes.push(note);

                            vm.newNote.text = "";
                            vm.formValidate.$setPristine();
                            vm.formValidate.$setUntouched();


                        }, function (errResponse) {
                            //fail
                            SweetAlert.swal('Error!', 'Something went wrong while adding a note!', 'warning');
                            console.error('error: Alaska we got a problem', errResponse);
                        });
                } else {
                    console.log("form is invalid");
                    return false;
                }


            };


            vm.deleteNote = function(item) {
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
                        removePerson(item);
                    }
                });
            };

            vm.removePerson = removePerson;

            function removePerson(item) {

                //Removes the location from the Angular DOM
                // console.log("index is", vm.person.notes.indexOf(item));
                // console.log("item is", item);

                PrescriberDeleteNoteResource.update({ personId: $stateParams.id }, {noteId: item._id})
                    .$promise
                    .then
                    (function(response) {
                        //all good
                        console.log(response);
                        vm.person.notes.splice(vm.person.notes.indexOf(item), 1);
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

