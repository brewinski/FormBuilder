(function () {
    'use strict';

    angular.module("formControlls")
        .directive("column", column)

    function column(eventService, $compile) {
        return {
            scope: {
                object: "=",
                builder: "=",
                controllist: "=",
                isbuilder: "=",
            },
            replace: true,
            restrict: "E",
            link: link,
            templateUrl: '/js/formbuilder/directives/views/ngcolumn.html',
        };

        function link (scope, element, attrs) {
            //var selectedControl;
            //scope.settings = {};
            //scope.settings.class = "";
            //scope.settings = JSON.parse(scope.object.settings) || {};

            //scope.$watch("settings", function (newValue, oldValue) {
            //    scope.object.settings = JSON.stringify(scope.settings) || {};
            //}, true);

            scope.setFocusedObject = function (object) {
                eventService.setFocusedObject(object);
            }

        }
    }


})();