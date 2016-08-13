/**=========================================================
 * Module: FormValidationController
 * Input validation with UI Validate
 =========================================================*/

(function() {
    'use strict';


    angular
        .module('app.forms')
        .controller('FormValidationController', FormValidationController);

    function FormValidationController($resource, $state, SweetAlert ) {
        var vm = this;
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
                    console.log(this.newPrescriber);
                    $resource('http://localhost:9000/api/prescribers').save(this.newPrescriber)
                        .$promise
                        .then(function(data){
                            SweetAlert.swal({
                                title: 'Success!',
                                text: 'The prescriber was modified!',
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#A1D490',
                                confirmButtonText: 'Done!',
                                closeOnConfirm: true
                            },  function(){
                                $state.go('app.singleview');
                            });
                    }, function (errResponse) {
                        console.error('error: pennsylvania we got a problem');
                        });

                } else {
                    SweetAlert.swal('Error!', 'Something went wrong while adding this presciber!', 'warning');
                    return false;
                }
            };
        }
    }
})();
