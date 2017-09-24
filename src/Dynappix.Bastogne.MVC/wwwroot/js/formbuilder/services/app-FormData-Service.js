(function () {
    'use strict';

    var formdataservice = function ($http) {
        var api = "/api/formservice/"
        //Todo Guard these routes for users 
        var getAllForms = function () {
            return $http.get(api).then(function (response) {
                    return response.data;
                });
        };

        var getForm = function (formid) {
            return $http.get(api+formid).then(function (response) {
                return response.data;
            });
        };

        var saveForm = function (form) {
            return $http.post(api, form).then(function (response) {
                return response.data;
            });
        };

        var deleteForm = function (formid) {
            return $http.delete(api + formid).then(function (response) {
                return response.data;
            });
        };

        return {
            getAllForms: getAllForms,
            getForm: getForm,
            saveForm: saveForm,
            deleteForm: deleteForm
        };
    }

    angular.module('formControlls')
        .factory("formdata", formdataservice);
})();