(function () {
    'use strict';

    angular
        .module('formControlls')
        .directive('ngsettingsrenderer', ngsettingsrenderer);

    function ngsettingsrenderer($compile) {
        // Usage:
        //     <ngsettingsrenderer></ngsettingsrenderer>
        // Creates:
        // 
        var directive = {
            scope: {
                settings: '=',
            },
            link: link,
            restrict: 'EA',
        };
        return directive;

        function link(scope, element, attrs) {
            scope.settings = {};

            scope.$watch("settings.template", function (newValue, oldValue) {
                if (scope.settings.template) {
                    var template = '<div><div ng-include="\'' + scope.settings.template + '\'"></div><div>';
                } else {
                    var template = '<div></div>';
                }
                element.html($compile(template)(scope));
            }, true);

            //scope.$watch("objectsettings", function (newValue, oldValue) {
            //    if (scope.objectsettings != null) {
            //        scope.settings = JSON.parse(scope.objectsettings) || {};
            //    }
            //    if (scope.settings.template != null) {
            //        var template = '<div><div ng-include="\'' + scope.settings.template + '\'"></div><div>';
            //        element.html($compile(template)(scope));
            //    } else {
            //        var template = '<div ng-include=""></div>';
            //        element.html($compile(template)(scope));
            //    }
            //}, true);

        }
    }

})();