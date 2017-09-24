//app-formBuilderController.js
(function () {
    'use strict';

    angular.module("app-formbuilder")
        .controller("formBuilderController", formBuilderController);


    function formBuilderController(formdata) {

        // -------------------------------------- Objects -----------------------------------------------
        var vm = this;
        
        vm.sortOptions = {
            placeholder: 'placeholder',
            tolerance: 'pointer',
            cursor: 'move',
            dropOnEmpty: true,
            connectWith: '.builder-row'
        };

        vm.id;
        vm.form = {
            control: []
        };
        vm.formString;
        vm.selected;
        vm.editToggle = true;
        vm.dataLoaded = false;
        vm.controlStructure = {
            controlId: null,
            createdDate: null,
            createdId: null,
            updatedDate: null,
            updatedId: null,
            name: null,                                                                                                                                                                                      
            settings: null,
            controlTypeId: null,
            partialId: null,
            parentControlId: null,
            control: [],
            tempControlId: null,
            tempParentControlId: null,
        };

        vm.init = function (formid) {
            if (formid != "") {
                formdata.getForm(formid).then(function (data) {
                    vm.form = data;
                    vm.id = vm.form.partialId;
                    vm.dataLoaded = true;
                    console.log("Success retreaved form ");
                }, function () {
                    vm.dataLoaded = false;
                    console.log("fail")
                });
            }
            else {
                vm.dataLoaded = true;
            }
        }


        vm.stringify = function () {
            vm.formString = JSON.stringify(vm.form);
        }

        // -------------------------------------------- Functions -------------------------------------------- 
        vm.controlList = function () {
            var List = []

            angular.module('formControlls')._invokeQueue.forEach(function (value, i) {
                //angular.copy(source, [destination]);
                var tempControl = {};

                vm.controlStructure.controlTypeId = value[2][0]
                angular.copy(vm.controlStructure, tempControl);
                List.push(tempControl);
            });

            return List;
        }
        vm.List = vm.controlList();

        // -------------------------------------------- AJAX -----------------------------------------------

        vm.CreateForm = function () {
            formdata.saveForm(vm.form)
                .then(function (data) {
                    console.log("save success")
                },
                function () {
                    console.log("save fail");
                });
        }
    }
})();