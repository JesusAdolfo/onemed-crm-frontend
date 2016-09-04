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
        .factory('PatientNoteResource', function ($resource) {
            return $resource('http://localhost:9000/api/patients/add-notes/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        })
        .factory('PatientDeleteNoteResource', function ($resource) {
            return $resource('http://localhost:9000/api/patients/delete-notes/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        })
        .factory('DeleteCondResource', function ($resource) {
            return $resource('http://localhost:9000/api/patients/delete-cond/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        })
        .factory('DeleteSystemsResource', function ($resource) {
            return $resource('http://localhost:9000/api/patients/delete-system/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        })
        .factory('DeleteFileResource', function ($resource) {
            return $resource('http://localhost:9000/api/patients/delete-file/:personId', {
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

    ModifyPatientFormValidationController.$inject = ['$scope', '$stateParams', 'patientService', 'SweetAlert', '$state', 'PatientNoteResource', 'PatientDeleteNoteResource', 'prescriberService', '$resource', 'DeleteCondResource', 'User', '$location', '$cookies', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'DeleteSystemsResource', 'DeleteFileResource'];

    function ModifyPatientFormValidationController($scope, $stateParams, patientService, SweetAlert, $state, PatientNoteResource, PatientDeleteNoteResource, prescriberService, $resource, DeleteCondResource, User, $location, $cookies, DTOptionsBuilder, DTColumnDefBuilder, DeleteSystemsResource, DeleteFileResource) {
        var vm = this;
        vm.$scope = $scope;

        prescriberService.query()
            .$promise
            .then(function (response) {

                vm.prescribers = [];
                angular.forEach(response, function (value, index) {

                    var singlePrescriber = value;

                    singlePrescriber.name = value.name + " " + value.lastname +"  (NPI: "+ value.npi +")";
                    vm.prescribers.push(singlePrescriber);
                });


            }, function (errResponse) {
                //fail
                console.error('error: houston we got a problem', errResponse);
            });

        $resource('http://localhost:9000/api/users/all').query().$promise.then(function(consultants) {

            vm.consultants = [];
            angular.forEach(consultants, function (value, index) {

                var singleConsultant = value;
                if(angular.isUndefined(value.lastname))
                    value.lastname = "";

                singleConsultant.name = value.name + " " + value.lastname;
                vm.consultants.push(singleConsultant);
            });


            vm.consultants.count = consultants.length;

        });

        patientService.get({id: $stateParams.id})
            .$promise
            .then(function (response) {
                vm.$scope.form.person = {
                    prescriber: response.prescriber,
                    name: response.name,
                    conditions: response.conditions,
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
                    insurancePhone: response.insurancePhone,
                    dmeName: response.dmeName,
                    dmeEmail: response.dmeEmail,
                    dmePerson: response.dmePerson,
                    dmePhone: response.dmePhone,
                    consultant: response.consultant,
                    notes: response.notes,
                    appointments: response.appointments,
                    sales: response.sales,
                    notes2: response.notes2,
                    files: response.files
                };

                vm.sumSales = 0;
                vm.numSales = 0;
                angular.forEach(vm.person.sales, function (value) {
                    vm.sumSales += value.amount;
                    vm.numSales += 1;
                });

                vm.selectedConsultant = vm.person.consultant;
                vm.selectedPrescriber = vm.person.prescriber;

                prescriberService.get({ id: vm.person.prescriber })
                    .$promise
                    .then(function (response) {


                        vm.prescriberName = response.name + " " + response.lastname + "  (NPI:" + response.npi + ")" ;
                        vm.prescriberId = response._id;


                    }, function (errResponse) {
                        //fail
                        console.error('error: houston we got a problem', errResponse);
                    });


                User.get({id: vm.person.consultant})
                    .$promise
                    .then(function (person) {

                        // in case the lastname is undefined
                        if(person.lastname == "" || angular.isUndefined(person.lastname))
                            vm.person.consultant = person.name;
                        else
                            vm.person.consultant = person.name +" "+ person.lastname;
                    });

                vm.person.birth = new Date(vm.person.birth);

                vm.person.prescriber = vm.person.prescriber[0];

                //in case one of the fields is 0
                if (response.address2 == 0) {
                    vm.$scope.form.person.address2 = "";
                }
                if (response.email2 == 0) {
                    vm.$scope.form.person.email2 = "";
                }


            }, function (errResponse) {
                //fail
                console.error('error: houston we got a problem', errResponse);
            });


        activate();
        activate2();

        ////////////////

        function activate() {

            vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
            vm.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3).notSortable()
            ];

            vm.systemDtOptions = DTOptionsBuilder
                .newOptions()
                .withDisplayLength(4)
                .withOption('order', [[ 0, 'desc' ]])
                .withOption("lengthMenu", [ [4], ["4"] ]);


            vm.changeSelectedItem = function(current){
                //console.log("select changed", current._id);

            };

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
                    console.log('Trying to update ' + $stateParams.id);

                    vm.person.consultant = vm.selectedConsultant;
                    vm.person.prescriber = vm.selectedPrescriber;

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
                            SweetAlert.swal('Error!', 'Fill in the prescriber and consultant!', 'warning');
                            console.error('error in patient: wyoming we got a problem', errResponse);
                        });

                } else {
                    console.log('Not valid!!');
                    SweetAlert.swal('Error!', 'Something went wrong while deleting this entry!', 'warning');
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
                    console.log('Submitted to patient!!');
                    PatientNoteResource.update({personId: $stateParams.id}, {text: vm.newNote.text, creator: creator})
                        .$promise
                        .then
                        (function (response) {
                            //all good

                            SweetAlert.swal('Success!', 'Note added', 'success');

                            var note = {};
                            note.text = vm.newNote.text;
                            note.creator = creator;
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
                    title: 'Confirm note deletion?',
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
                        removeNote($stateParams.id, noteId, index);
                    }
                });
            };


            function removeNote(personId, noteId, index) {

                vm.person.notes.splice(index, 1);

                PatientDeleteNoteResource.update({ personId: personId }, {noteId: noteId})
                    .$promise
                    .then
                    (function(response) {
                        //all good
                        console.log(response);

                        SweetAlert.swal('Deleted!', 'This record has been deleted', 'success');
                    }, function(errResponse){
                        //fail
                        SweetAlert.swal('Error!', 'Something went wrong while deleting this note!', 'warning');
                        console.error('error: Alaska we got a problem', errResponse);
                    });

            }

            vm.deleteCond = function(condId, index) {
                SweetAlert.swal({
                    title: 'Confirm condition deletion?',
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
                        removeCond($stateParams.id, condId, index);
                    }
                });
            };

            function removeCond(personId, condId, index) {

                vm.person.conditions.splice(index, 1);
                console.log(vm.person.conditions);

                DeleteCondResource.update({ personId: personId }, {condId: condId})
                    .$promise
                    .then
                    (function(response) {
                        //all good
                        console.log(response);

                        SweetAlert.swal('Deleted!', 'This record has been deleted', 'success');
                    }, function(errResponse){
                        //fail
                        SweetAlert.swal('Error!', 'Something went wrong while deleting this condition!', 'warning');
                        console.error('error: Alaska we got a problem', errResponse);
                    });

            }


            vm.deleteSystem = function(saleId, index) {
                SweetAlert.swal({
                    title: 'Confirm note deletion?',
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
                        removeSystem($stateParams.id, saleId, index);
                    }
                });
            };

            function removeSystem(personId, saleId, index) {

                vm.person.sales.splice(index, 1);
                console.log(vm.person.sales);

                DeleteSystemsResource.update({ personId: personId }, {saleId: saleId})
                    .$promise
                    .then
                    (function(response) {
                        //all good
                        console.log(response);
                        SweetAlert.swal('Deleted!', 'This record has been deleted', 'success');
                    }, function(errResponse){
                        //fail
                        SweetAlert.swal('Error!', 'Something went wrong while deleting this system!', 'warning');
                        console.error('error: Alaska we got a problem', errResponse);
                    });

            }


            vm.deleteFile = function(fileId, index) {
                SweetAlert.swal({
                    title: 'Confirm file deletion?',
                    text: 'Your will not be able to recover this file!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, confirm deletion!',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function(isConfirm){
                    if (isConfirm) {
                        removeFile($stateParams.id, fileId, index);
                    }
                });
            };

            function removeFile(personId, fileId, index) {

                vm.person.files.splice(index, 1);
                console.log(vm.person.files);

                DeleteFileResource.update({ personId: personId }, {fileId: fileId})
                    .$promise
                    .then
                    (function(response) {
                        //all good
                        console.log(response);
                        SweetAlert.swal('Deleted!', 'This record has been deleted', 'success');
                    }, function(errResponse){
                        //fail
                        SweetAlert.swal('Error!', 'Something went wrong while deleting this file!', 'warning');
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

