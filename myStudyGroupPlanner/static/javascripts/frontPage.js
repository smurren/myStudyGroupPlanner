(function(){
    'use strict';

    angular
	.module('myStudyGroupPlanner')
	.controller('FrontPageController', FrontPageController);

    FrontPageController.$inject = ['$location', '$scope', 'Authentication'];

    /**
     * @namespace FrontPageController
     */
    function FrontPageController($location, $scope, Authentication) {
	var vm = this;
    }
})();
