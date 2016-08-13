/**=========================================================
 * Module: demo-dialog.js
 * Demo for multiple ngDialog Usage
 * - ngDialogProvider for default values not supported
 *   using lazy loader. Include plugin in base.js instead.
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.elements')
        .controller('DialogIntroCtrl', DialogIntroCtrl)
        .controller('DialogMainCtrl', DialogMainCtrl);

    DialogIntroCtrl.$inject = ['$scope', 'ngDialog', 'tpl'];
    // Called from the route state. 'tpl' is resolved before
    function DialogIntroCtrl($scope, ngDialog, tpl) {

        activate();

        ////////////////

        function activate() {
            // share with other controllers
            $scope.tpl = tpl;
            // open dialog window
            ngDialog.open({
                template: tpl.path,
                // plain: true,
                className: 'ngdialog-theme-default'
            });
        }
    }

    DialogMainCtrl.$inject = ['$scope', '$rootScope', 'ngDialog'];
    // Loads from view
    function DialogMainCtrl($scope, $rootScope, ngDialog) {

        activate();

        ////////////////

        function activate() {

            $rootScope.jsonData = '{"foo": "bar"}';
            $rootScope.theme = 'ngdialog-theme-default';

            $scope.directivePreCloseCallback = function (value) {
                if(confirm('Close it? MainCtrl.Directive. (Value = ' + value + ')')) {
                    return true;
                }
                return false;
            };

            $scope.preCloseCallbackOnScope = function (value) {
                if(confirm('Close it? MainCtrl.OnScope (Value = ' + value + ')')) {
                    return true;
                }
                return false;
            };

            $scope.open = function () {
                ngDialog.open({ template: 'firstDialogId', controller: 'InsideCtrl', data: {foo: 'some data'} });
            };

            $scope.openDefault = function () {
                ngDialog.open({
                    template: 'firstDialogId',
                    controller: 'InsideCtrl',
                    className: 'ngdialog-theme-default'
                });
            };

            $scope.openDefaultWithPreCloseCallbackInlined = function () {
                ngDialog.open({
                    template: 'firstDialogId',
                    controller: 'InsideCtrl',
                    className: 'ngdialog-theme-default',
                    preCloseCallback: function(value) {
                        if (confirm('Close it?  (Value = ' + value + ')')) {
                            return true;
                        }
                        return false;
                    }
                });
            };

            $scope.openConfirm = function () {
                ngDialog.openConfirm({
                    template: 'modalDialogId',
                    className: 'ngdialog-theme-default'
                }).then(function (value) {
                    console.log('Modal promise resolved. Value: ', value);
                }, function (reason) {
                    console.log('Modal promise rejected. Reason: ', reason);
                });
            };

            $scope.openConfirmWithPreCloseCallbackOnScope = function () {
                ngDialog.openConfirm({
                    template: 'modalDialogId',
                    className: 'ngdialog-theme-default',
                    preCloseCallback: 'preCloseCallbackOnScope',
                    scope: $scope
                }).then(function (value) {
                    console.log('Modal promise resolved. Value: ', value);
                }, function (reason) {
                    console.log('Modal promise rejected. Reason: ', reason);
                });
            };

            $scope.openConfirmWithPreCloseCallbackInlinedWithNestedConfirm = function () {
                ngDialog.openConfirm({
                        template: 'dialogWithNestedConfirmDialogId',
                        className: 'ngdialog-theme-default',
                        preCloseCallback: function(/*value*/) {

                            var nestedConfirmDialog = ngDialog.openConfirm({
                                template:
                                '<p>Are you sure you want to close the parent dialog?</p>' +
                                '<div>' +
                                '<button type="button" class="btn btn-default" ng-click="closeThisDialog(0)">No' +
                                '<button type="button" class="btn btn-primary" ng-click="confirm(1)">Yes' +
                                '</button></div>',
                                plain: true,
                                className: 'ngdialog-theme-default'
                            });

                            return nestedConfirmDialog;
                        },
                        scope: $scope
                    })
                    .then(function(value){
                        console.log('resolved:' + value);
                        // Perform the save here
                    }, function(value){
                        console.log('rejected:' + value);

                    });
            };

            $scope.openInlineController = function (location) {

                $rootScope.locationId = location._id;
                $rootScope.locationName = location.name;
                $rootScope.locationCity = location.city;
                $rootScope.locationState = location.state;
                $rootScope.locationPostal = location.postal;
                $rootScope.locationAddress = location.address;
                $rootScope.locationAddress2 = location.address2;
                $rootScope.phone = location.phone;
                $rootScope.fax = location.fax;
                $rootScope.contact = location.contact;
                $rootScope.contact_position = location.contact_position;
                $rootScope.contact_phone = location.contact_phone;
                $rootScope.date = location.date;
                $rootScope.latitude = location.latitude;
                $rootScope.longitude = location.longitude;
                $rootScope.theme = 'ngdialog-theme-default';

                $rootScope.notes = location.notes;

                ngDialog.open({
                    template: 'withInlineController',
                    controller: ['$rootScope', '$timeout', function ($rootScope, $timeout) {


                    }],
                    className: 'ngdialog-theme-default'
                });
            };

        }

    }


})();