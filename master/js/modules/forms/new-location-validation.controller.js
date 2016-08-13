/**=========================================================
 * Module: LocationFormValidationController
 * Input validation with UI Validate for NEW LOCATIONS
 =========================================================*/


(function() {
    'use strict';

    angular.module('app.forms')
        .factory('prescriberService', function($resource) {
            return $resource('http://localhost:9000/api/prescribers/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        });

    angular
        .module('app.forms')
        .controller('LocationFormValidationController', LocationFormValidationController);

    function LocationFormValidationController($scope, $location, $stateParams, prescriberService, SweetAlert, $state) {
        var vm = this;
        vm.$scope = $scope;
        vm.locations = [];

        prescriberService.get({ id: $stateParams.id })
            .$promise
            .then(function(response){
                console.log(response);
                vm.$scope.form.title = {
                    name: response.name,
                    lastname: response.lastname,
                    npi: response.npi
                };
            vm.locations = response.locations;
                console.log(vm.locations);

            }, function(errResponse){
                //fail
                console.error('error: manila we got a problem', errResponse);
            });

        activate();

        ////////////////

        function activate() {

            vm.submitted = false;
            vm.validateInput = function(name, type) {
                var input = vm.formValidate[name];
                return (input.$dirty || vm.submitted) && input.$error[type];
            };

            // Submit form
            vm.submitForm = function() {
                vm.submitted = true;
                if (vm.formValidate.$valid) {
                    console.log('Submitted!!');
                    console.log(this.newLocation);
                    vm.locations.push(this.newLocation);
                    console.log(vm.locations);
                    prescriberService.update({id: $stateParams.id}, {locations: vm.locations})
                        .$promise
                        .then(function (response) {
                            //success
                            SweetAlert.swal({
                                title: 'Success!',
                                text: 'The new location was added!',
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#A1D490',
                                confirmButtonText: 'Done!',
                                closeOnConfirm: true
                            },  function(){
                                $state.go('app.expanddoc', {id: $stateParams.id});
                            });
                        }, function(errResponse){
                            //fail
                            console.error('error: dakota we got a problem', errResponse);
                        });




                } else {
                        SweetAlert.swal('Error!', 'Something went wrong while adding this location!', 'warning');
                    return false;
                }
            };
        }
    }
})();
