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
        .controller('SystemController', SystemController);

    angular.module('app.forms')
        .factory('systemPatientService', function ($resource) {
            return $resource('http://localhost:9000/api/patients/:id', {
                id: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        })
        .factory('SystemsResource', function ($resource) {
            return $resource('http://localhost:9000/api/patients/add-system/:personId', {
                personId: '@param1'
            }, {
                update: {
                    method: 'PUT'
                }
            });
});



    SystemController.$inject = ['$scope', '$stateParams', 'systemPatientService', 'SweetAlert', '$state', '$filter', '$resource', 'SystemsResource', 'User', '$location', '$cookies', '$sanitize'];

    function SystemController($scope, $stateParams, systemPatientService, SweetAlert, $state, $filter, $resource, SystemsResource, User, $location, $cookies, $sanitize) {
        var vm = this;
        vm.$scope = $scope;


        systemPatientService.get({id: $stateParams.id})
            .$promise
            .then(function (response) {
                console.log(response);
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

            vm.changeSelectedItem = function(current){
                //console.log("select changed", current._id);

            };

            vm.$scope.target = $stateParams.id;

            if ($cookies.get('token') && $location.path() !== 'app/login') {
                vm.currentUser = User.get();
            }


            vm.submitted = false;
            vm.system = {};
            var finalPrice = 0;
            var initialPrice = 0;

            vm.discount = 0;
            vm.buttons = ["None", "5%", "10%", "15%", "20%"];

            vm.products = [
                {
                    id: '1',
                    value: '150',
                    label: 'MANUAL MVP-700 SYSTEM ------- $150.00',
                    name: 'MANUAL MVP-700 SYSTEM'
                }, {
                    id: '2',
                    value: '250',
                    label: 'INTRODUCTORY BATTERY SYSTEM ------- $250.00',
                    name: 'INTRODUCTORY BATTERY SYSTEM'
                },{
                    id: '3',
                    value: '350',
                    label: 'BATTERY STANDARD SYSTEM ------- $350.00',
                    name: 'BATTERY STANDARD SYSTEM'
                },{
                    id: '4',
                    value: '500',
                    label: 'DELUXE BATTERY SYSTEM ------- $500.00',
                    name: 'DELUXE BATTERY SYSTEM'
                },{
                    id: '5',
                    value: '6000',
                    label: 'FLEXIBLE URETEROSCOPE ------- $6,000.00',
                    name: 'FLEXIBLE URETEROSCOPE'
                }];


            vm.resetDiscount = function () {
                var selectedProduct = $filter('filter')(vm.products, {id: vm.system.id })[0];
                initialPrice = selectedProduct.value;
                finalPrice = initialPrice;
                vm.system.finalPrice = finalPrice;
            };

            vm.updatePrice = function (buttonValue) {
                console.log("Discount:", buttonValue);



                console.log("System ID:", vm.system.id);
                var selectedProduct = $filter('filter')(vm.products, {id: vm.system.id })[0];

                console.log("System Name:", selectedProduct.label);
                console.log("System Price:", selectedProduct.value);

                vm.discount = buttonValue;



                var initialPrice = selectedProduct.value;


                switch(buttonValue){
                    case "None":
                        console.log("0");
                        finalPrice = initialPrice;
                        break;
                    case "5%":
                        console.log("5");
                        finalPrice = Number(  initialPrice - (initialPrice * 0.05)  );
                        break;
                    case "10%":
                        console.log("10");
                        finalPrice = Number(  initialPrice - (initialPrice * 0.1)  );
                        break;
                    case "15%":
                        console.log("15");
                        finalPrice = Number(  initialPrice - (initialPrice * 0.15)  );
                        break;
                    case "20%":
                        console.log("20");
                        finalPrice = Number(  initialPrice - (initialPrice * 0.2)  );
                        break;
                    default:
                        SweetAlert.swal('Error!', 'Something went wrong!', 'warning');

                }

                vm.system.finalPrice = finalPrice;

            };



            vm.submitCond = function () {

                console.log(parseInt(finalPrice));
                var selectedProduct = $filter('filter')(vm.products, {id: vm.system.id })[0];
                console.log(selectedProduct.name);

                console.log("patient", $stateParams.id);

                // if (vm.currentUser.lastname == "" || angular.isUndefined(vm.currentUser.lastname))
                //     var creator = vm.currentUser.name;
                // else
                //     var creator = vm.currentUser.name +" "+ vm.currentUser.lastname;

                vm.submitted = true;

                if (vm.formValidate.$valid) {
                    console.log('Submitted new condition!!');
                    SystemsResource.update({personId: $stateParams.id}, {amount: parseInt(finalPrice), description: selectedProduct.name })
                        .$promise
                        .then
                        (function (response) {
                            //all good
                            console.log(response);

                            SweetAlert.swal('Success!', 'System added', 'success');
                            $state.go('app.expandpat', {id: $stateParams.id});

                        }, function (errResponse) {
                            //fail
                            SweetAlert.swal('Error!', 'Something went wrong while adding a system!', 'warning');
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

