/**=========================================================
 * Module: Modify Prescriber
 * Input validation with UI Validate TO MODIFY PRESCRIBER
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.forms')
        .controller('ModifyPatientFormValidationController', ModifyPatientFormValidationController);

    angular.module('app.forms')
        .factory('patientService', function ($resource) {
            return $resource('http://localhost:9000/api/patients/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        })
        .factory('prescriberService', function ($resource) {
            return $resource('http://localhost:9000/api/prescribers/:id', {
                id: '@param1'
            }, {
                query: {
                    method: 'GET', isArray: true
                }
            });
        })
        .factory('userService', function ($resource) {
            return $resource('http://localhost:9000/api/users/:id', {
                id: '@param1'
            }, {
                query: {
                    method: 'GET', isArray: true
                }
            });
        })
        .factory('PatientNoteResource', function ($resource) {
            return $resource('http://localhost:9000/api/patients/add-notes/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        })
        .factory('PrescriberDeleteNoteResource', function ($resource) {
            return $resource('http://localhost:9000/api/prescribers/delete-prescriber-notes/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        });


    angular.module('app.forms')
        .directive('datepickerPopup', function (){
            return {
                restrict: 'EAC',
                require: 'ngModel',
                link: function(scope, element, attr, controller) {
                    //remove the default formatter from the input directive to prevent conflict
                    controller.$formatters.shift();
                }
            }
        });

    ModifyPatientFormValidationController.$inject = ['$scope', '$stateParams', 'patientService', 'SweetAlert', '$state', '$filter', 'PatientNoteResource', 'PrescriberDeleteNoteResource', 'prescriberService', 'userService'];

    function ModifyPatientFormValidationController($scope, $stateParams, patientService, SweetAlert, $state, $filter, PatientNoteResource, PrescriberDeleteNoteResource, prescriberService, userService) {
        var vm = this;
        vm.$scope = $scope;

        prescriberService.query()
            .$promise
            .then(function (response) {
                vm.prescribers = response;


            }, function (errResponse) {
                //fail
                console.error('error: houston we got a problem', errResponse);
            });

        userService.query()
            .$promise
            .then(function (response) {
                vm.users = response;


            }, function (errResponse) {
                //fail
                console.error('error: houston we got a problem', errResponse);
            });

        patientService.get({id: $stateParams.id})
            .$promise
            .then(function (response) {
                console.log(response);
                vm.$scope.form.person = {
                    prescriber: response.prescriber,
                    name: response.name,
                    lastname: response.lastname,
                    address: response.address,
                    address2: response.address2,
                    city: response.city,
                    state: response.state,
                    postal: response.postal,
                    phone: response.phone,
                    phone2: response.phone,
                    email: response.email,
                    email2: response.email2,
                    birth: response.birth,
                    date: response.date,
                    insuranceName: response.insuranceName,
                    insuranceNumber: response.insuranceNumber,
                    insuranceGroup: response.insuranceGroup,
                    consultant: response.consultant,
                    notes: response.notes,
                    appointments: response.appointments
                };

                vm.person.birth = new Date(vm.person.birth);

                //
                //console.log("test", vm.person.prescriber[0]);
                vm.person.prescriber = vm.person.prescriber[0];
                //console.log(vm.person.prescriber);

                //in case one of the fields is 0
                if (response.address2 == 0) {
                    vm.$scope.form.person.address2 = "";
                }
                if (response.email2 == 0) {
                    vm.$scope.form.person.email = "";
                }


            }, function (errResponse) {
                //fail
                console.error('error: houston we got a problem', errResponse);
            });


        activate();
        activate2();

        ////////////////

        function activate() {

            vm.changeSelectedItem = function(current){
                //console.log("select changed", current._id);

            };

            vm.$scope.target = $stateParams.id;

            vm.submitted = false;
            vm.validateInput = function (name, type) {
                var input = vm.formValidate[name];
                return (input.$dirty || vm.submitted) && input.$error[type];
            };

            // Submit form
            vm.submitForm = function () {
                vm.submitted = true;
                if (vm.formValidate.$valid) {
                    console.log('Trying to update ' + $stateParams.id);

                    console.log(vm.person);

                    patientService.update({id: $stateParams.id}, vm.person)
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
                                $state.go('app.patients');
                            });
                        }, function (errResponse) {
                            //fail
                            console.error('error in patient: wyoming we got a problem', errResponse);
                        });

                } else {
                    console.log('Not valid!!');
                    SweetAlert.swal('Error!', 'Something went wrong while updating the prescriber!', 'warning');
                    return false;
                }
            };


            vm.submitNote = function () {

                console.log("submit note", $stateParams.id);
                vm.submitted = true;
                console.dir(vm.newNote);
                console.log(vm.newNote.text);

                if (vm.formValidate.$valid) {
                    console.log('Submitted to patient!!');
                    PatientNoteResource.update({personId: $stateParams.id}, {text: vm.newNote.text})
                        .$promise
                        .then
                        (function (response) {
                            //all good
                            console.log(response);

                            SweetAlert.swal('Success!', 'Note added', 'success');

                            var note = {};
                            note.text = vm.newNote.text;
                            note.creator = "Current user";
                            note.created_at = "Just now";

                            vm.person.notes.push(note);

                            vm.newNote = {};
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


            vm.deleteNote = function(noteId, index) {
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
                        removePerson($stateParams.id, noteId, index);
                    }
                });
            };

            vm.removePerson = removePerson;

            function removePerson(personId, noteId, index) {

                vm.person.notes.splice(index, 1);
                console.log(vm.person.notes);

                PrescriberDeleteNoteResource.update({ personId: personId }, {noteId: noteId})
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

        function activate2() {

            vm.minDate = new Date('1900-10-20');

            vm.today = function() {
                vm.dt = new Date();
            };
            vm.today();

            vm.clear = function () {
                vm.dt = null;
            };

            // Disable weekend selection
            vm.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

            //vm.toggleMin = function() {
            //    vm.minDate = vm.minDate ? null : new Date();
            //};
            //vm.toggleMin();

            vm.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                vm.opened = true;
            };

            vm.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            vm.initDate = new Date('2020-10-20');
            vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            vm.format = vm.formats[2];
        }
    }
})();

