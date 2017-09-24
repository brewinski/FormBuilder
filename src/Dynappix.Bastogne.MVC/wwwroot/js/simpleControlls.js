//simpleControlls.js
(function () {
    'use strict';

    angular.module("simpleControlls", [])
        .directive("waitCursor", waitCursor);

    function waitCursor() {
        return {
            scope: {
                show: "=displayWhen"
            },
            restrict: "E",
            templateUrl: "/views/waitCursor.html"
        }
    }

})();