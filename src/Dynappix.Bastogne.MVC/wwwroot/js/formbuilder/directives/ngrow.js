(function () {
    'use strict';

    angular.module('formControlls')
        .directive("row", row);

    function row(eventService, $compile) {
        return {
            scope: {
                object: "=",
                builder: "=",
                controllist: "=",
                isbuilder: "=",
            },
            replace: false,
            restrict: "E",
            link: link,

            //todo restrict the list type to column so that users are only able to put a column into a row and 
            //change the code to remove the need for a button to add columns
        }

        function link (scope, element) {
            scope.addColumn = function () {
                var controlStructure = {
                    controlId: null,
                    createdDate: null,
                    createdId: null,
                    updatedDate: null,
                    updatedId: null,
                    name: null,
                    settings: null,
                    controlTypeId: "column",
                    partialId: null,
                    parentControlId: null,
                    control: [],
                    tempControlId: null,
                    tempParentControlId: null
                };

                scope.object.control.push(controlStructure);
                scope.init();
            }

            scope.setFocusedObject = function (object) {
                eventService.setFocusedObject(object);
            }

            scope.init = function () {
                var template = '<ul class="row builder-row" >';

                if (scope.object) {
                    for (var i = 0; i < scope.object.control.length; i++) {
                        template += '<' + scope.object.control[i].controlTypeId + ' object="object.control[' + i + ']" controllist="controllist" isbuilder="isbuilder" ng-click="setFocusedObject(object.control[' + i + ']); $event.stopPropagation();"></' + scope.object.control[i].controlTypeId + '>'
                    }
                }

                template += '</ul>'
                template += '<uib-accordion ng-if="isbuilder">' +
                    '<div uib-accordion-group class="panel-default" is-open="status.open">' +
                    '<uib-accordion-heading>' +
                    'Row Settings' +
                    '</uib-accordion-heading>' +
                    '<form class="well">' +
                    '<div class="form-group">' +
                    '<button ng-click="addColumn()">Add Column</button>' +
                    '</div>' +
                    '</form>' +
                    '</div>' +
                    '</uib-accordion>';
                element.html($compile(template)(scope));
            }

            scope.init();

        }
    }

})();