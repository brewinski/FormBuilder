(function () {
    'use strict';

    angular
        .module('formControlls')
        .factory('eventService', eventService);

    function eventService() {
        
        return {
            FormInformation: {
                focusedObject: {},
                raiseEvent: {},
            },

            setFocusedObject: function (object) {
                this.FormInformation.focusedObject = object; 
            },

            getFocusedObject: function () {
                return FormInformation.focusedObject
            },

            raiseEvent: function (eventType, object) {

            },
        };
    }
})();