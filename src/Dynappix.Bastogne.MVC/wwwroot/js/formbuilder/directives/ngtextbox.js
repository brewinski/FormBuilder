(function () {
    'use strict';

    angular.module('formControlls')
        .directive("textbox", textbox);

    function textbox($compile) {
        return {
            scope: {
                object: "=",
                isbuilder: "=",
            },
            replace: false,
            link: link,
            restrict: "E",
            templateUrl: '/js/formbuilder/directives/views/ngtextbox.html',
        }

        function link (scope, element, attrs) {
            scope.object.settings.template = scope.object.settings.template || '/js/formbuilder/directives/views/ngtextboxsettings.html';
        }
    }


})();