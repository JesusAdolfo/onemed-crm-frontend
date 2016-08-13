(function (){
    'use strict';

    angular.module('app.forms')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['Auth', '$state'];

    function LoginController(Auth, $state) {

        var vm = this;
        vm.$scope = $scope;

        vm.subMitNote = function () {
          console.log("Trying to log in....");
            vm.submitted = true;
        };

    }

})();







