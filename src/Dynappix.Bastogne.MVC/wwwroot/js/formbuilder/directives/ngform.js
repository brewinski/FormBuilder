(function () {
    angular.module('formControlls')
        .directive("ngform", ngform);

    function ngform(eventService, formdata) {
        return {
            scope: {
                formid: "=",
                object: "=",
                isbuilder: "=",
            },
            replace: false,
            restrict: "E",
            link: link,
            controller: controller,
            controllerAs: 'vm',
            templateUrl: '/js/formbuilder/directives/views/ngform.html'
        }

        function controller($scope) {
            // -------------------------------------- Objects -----------------------------------------------
            var vm = this;
            vm.id = $scope.formid;

            vm.sortOptions = {
                placeholder: 'placeholder',
                tolerance: 'pointer',
                cursor: 'move',
                dropOnEmpty: true,
                connectWith: '.builder-row'
            };

            vm.form = {
                control: []
            };

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
                settings: {},
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
                        SerializeFormSettings(vm.form.control, "json");
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
                SerializeFormSettings(vm.form.control, "text");
                formdata.saveForm(vm.form)
                    .then(function (data) {
                        console.log("save success")
                    },
                    function () {
                        console.log("save fail");
                    });
            }

            vm.init(vm.id);

        }

        function SerializeFormSettings (control, type) {
            for (var i = 0; i < control.length; i++) {
                if (control[i].control.length > 0) {
                    SerializeFormSettings(control[i].control, type);
                }
                if (type == "json") {
                    control[i].settings = JSON.parse(control[i].settings) || {};
                }
                else {
                    control[i].settings = JSON.stringify(control[i].settings);
                }
            }

        };

        function link(scope, element, attrs) {
            //vm.init(scope.formId);

            scope.FormInformation = eventService.FormInformation;

            scope.setFocusedObject = function (object) {
                eventService.setFocusedObject(object);
            }

        }
    }
})();