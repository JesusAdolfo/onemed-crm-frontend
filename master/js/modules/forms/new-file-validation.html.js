/**
 * Created by Adolfo on 8/17/2016.
 */
/**=========================================================
 * Module: Modify Prescriber
 * Input validation with UI Validate TO MODIFY PRESCRIBER
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.forms')
        .controller('FilesController', FilesController);

    angular.module('app.forms')
        .factory('FilesPatientService', function ($resource) {
            return $resource(globalUri + 'api/patients/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        })
        .factory('FileResource', function ($resource) {
            return $resource(globalUri + 'api/patients/add-file/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        })
        .directive("fileread", [function () {
            return {
                scope: {
                    fileread: "="
                },
                link: function (scope, element, attributes) {
                    element.bind("change", function (changeEvent) {
                        var reader = new FileReader();
                        reader.onload = function (loadEvent) {
                            scope.$apply(function () {
                                scope.fileread = loadEvent.target.result;
                            });
                        }
                        reader.readAsDataURL(changeEvent.target.files[0]);
                    });
                }
            }
        }]);



    FilesController.$inject = ['$scope', '$stateParams', 'FilesPatientService', 'SweetAlert', '$state', '$filter', '$resource', 'FileResource', 'User', '$location', '$cookies', '$timeout', 'Upload'];

    function FilesController($scope, $stateParams, FilesPatientService, SweetAlert, $state, $filter, $resource, FileResource, User, $location, $cookies, $timeout, Upload) {
        var vm = this;
        vm.$scope = $scope;


        FilesPatientService.get({id: $stateParams.id})
            .$promise
            .then(function (response) {
                vm.$scope.form.person = {
                    name: response.name,
                    lastname: response.lastname,
                    birth: response.birth,
                    date: response.date
                };


            }, function (errResponse) {
                //fail
                console.error('error: houston we got a problem', errResponse);
            });


        activate();

        ////////////////

        function activate() {

            vm.uploadPic = function(file) {
                file.upload = Upload.upload({
                    url: globalUri + 'api/patients/uploads/'+ $stateParams.id,
                    method: 'PUT',
                    data: {description: vm.description, file: file},
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0){
                        vm.errorMsg = response.status + ': ' + response.data;

                    }


                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    SweetAlert.swal('Success!', 'File added', 'success');
                    $state.go('app.expandpat', {id: $stateParams.id});
                });
            };

            vm.changeSelectedItem = function(current){
                // console.log("select changed");

            };

            vm.$scope.target = $stateParams.id;

            if ($cookies.get('token') && $location.path() !== 'app/login') {
                vm.currentUser = User.get();
            }

            vm.submitted = false;
            vm.submitted = false;
            vm.validateInput = function (name, type) {
                var input = vm.formValidate[name];
                return (input.$dirty || vm.submitted) && input.$error[type];
            };




            vm.submitFile = function () {

                if (vm.currentUser.lastname == "" || angular.isUndefined(vm.currentUser.lastname))
                    var creator = vm.currentUser.name;
                else
                    var creator = vm.currentUser.name +" "+ vm.currentUser.lastname;

                console.log("submit cond", $stateParams.id);
                vm.submitted = true;
                // console.dir(vm.newNote);
                
                


                if (vm.formValidate.$valid) {
                    console.log('Submitted new file!!');
                    console.dir(vm.newFile);
                    FileResource.update({personId: $stateParams.id}, {description: vm.newFile.description, file: vm.newFile.testFile})
                        .$promise
                        .then
                        (function (response) {
                            //all good
                            console.log(response);

                            SweetAlert.swal('Success!', 'File added', 'success');
                            $state.go('app.expandpat', {id: $stateParams.id});

                        }, function (errResponse) {
                            //fail
                            SweetAlert.swal('Error!', 'Something went wrong while adding a file!', 'warning');
                            console.error('error: Alaska we got a problem', errResponse);
                        });
                } else {
                    console.log("form is invalid");
                    return false;
                }


            };

        }


    }
})();
