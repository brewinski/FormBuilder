(function () {
    'use strict';

    angular.module('formControlls')
        .directive('itemGenerator', function ($compile) {
            return {
                scope: {
                    type: '=',
                    object: '=',
                    controllist: "=",
                    isbuilder: '=',
                },
                link: link,
            };

            function link(scope, element) {
                var generatedTemplate = '<' + scope.type + ' object=object controllist="controllist" isbuilder=isbuilder class="itemgenerator" ' +
                    + '></' + scope.type + '>';
                element.append($compile(generatedTemplate)(scope));
            }
        });

})();