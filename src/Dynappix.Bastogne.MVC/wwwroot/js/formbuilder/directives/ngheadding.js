(function () {
    'use strict';

    angular.module('formControlls')
        .directive("headding", headding);

    function headding() {
        return {
            scope: {
                object: "=",
                isbuilder: "=",
            },
            replace: false,
            restrict: "E",
            link: link,
            templateUrl: '/js/formbuilder/directives/views/ngheadding.html',
        }

        function link (scope, element, attrs) {
            scope.object.settings.template = ""

            scope.object.settings.template ='/js/formbuilder/directives/views/ngheaddingsettings.html';
        }
    }


})();