(function () {
    'use strict';

    angular.module("app-formbuilder")
        .controller("formListController", formListController);

    function formListController(formdata) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'controller';
        vm.forms = [];

        vm.selected = {};

        activate();

        function activate() { }

        vm.init = function () {
            formdata.getAllForms()
                .then(function (data) {
                    vm.forms = data;
                    console.log("Form load success");
                }, function () {
                    console.log("Form load fail");
                })
        }

        vm.setSelected = function (selected) {
            vm.selected = selected;
        }

        vm.DeleteForm = function (formId, form) {
            //vm.form.control = vm.flatControls;
            formdata.deleteForm(formId)
                .then(function () {
                    console.log("delete success");
                    vm.init();
                }, function () {
                    console.log("delete fail");
                })
        }

    }
})();
