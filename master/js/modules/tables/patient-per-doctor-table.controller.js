/**=========================================================
 * Module: datatable,js
 * Angular Datatable controller
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.tables')
        .controller('PatientPerDoctorDataTableController', PatientPerDoctorDataTableController);


    angular.module('app.tables')
        .factory('patientsPerDoctorTableResource', function ($resource) {
            return $resource(globalUri + 'api/patients/list/:action/:id/:docid', {}, {

                getThisDoctorPatients: {method: 'GET', params: {id: '@param1', docid: '@param2' , action: "get-patients-per-doctor"}, isArray: true}

            });
        });

    PatientPerDoctorDataTableController.$inject = ['User', '$rootScope', '$scope', '$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'patientsPerDoctorTableResource', '$stateParams'];

    function PatientPerDoctorDataTableController(User, $rootScope, $scope, $resource, DTOptionsBuilder, DTColumnDefBuilder, patientsPerDoctorTableResource, $stateParams) {
        var vm = this;
        vm.$scope = $scope;

        activate();

        ////////////////

        function activate() {


            console.log("this doctors id is", $stateParams.id);


            patientsPerDoctorTableResource.getThisDoctorPatients({id: $rootScope.thisUser, docid: $stateParams.id})
                .$promise
                .then(function (persons) {

                    var appointmentSum = 0;
                    var followUps = 0;


                    angular.forEach(persons, function (value, index) {


                    });

                    vm.persons = persons;
                    vm.persons.count = persons.length;
                    vm.appointmentSum = appointmentSum;
                    vm.followUps = followUps;

                });

            // Ajax
            // var userData = {};
            // User.get({})
            //     .$promise
            //     .then
            //     (function (successResponse) {
            //             // success callback
            //             userData = successResponse;
            //             vm.userData = successResponse;
            //
            //             // patientsTableResource.getThisDoctorPatients({id: userData._id}, {doctorId: $stateParams.id})
            //             //     .$promise
            //             //     .then(function (persons) {
            //             //
            //             //         var appointmentSum = 0;
            //             //         var followUps = 0;
            //             //
            //             //
            //             //         angular.forEach(persons, function (value, index) {
            //             //
            //             //
            //             //         });
            //             //
            //             //         vm.persons = persons;
            //             //         vm.persons.count = persons.length;
            //             //         vm.appointmentSum = appointmentSum;
            //             //         vm.followUps = followUps;
            //             //
            //             //     });
            //
            //
            //         },
            //         function (errorResponse) {
            //             // failure callback
            //             userData = "nada";
            //             console.log(errorResponse);
            //         });



            vm.dtOptions = DTOptionsBuilder
                .newOptions()
                .withDisplayLength(5)
                .withOption('order', [[0, 'desc']])
                .withOption("lengthMenu", [[5], ["5"]]);



        }
    }
})();
