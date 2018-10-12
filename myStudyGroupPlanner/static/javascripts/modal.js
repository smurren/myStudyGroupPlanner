(function(){
    'use strict';

    angular
	.module('myStudyGroupPlanner')
	.controller('modalController', modalController);

    modalController.$inject = ['$location', '$scope', 'Authentication'];

    /**
     * @namespace modalController
     */
    function modalController($location, $scope, Authentication) {
	     var vm = this;
       vm.selectedBuilding = "";
       vm.buildings = ["Information Technology of Engineering",
                      "Sherman Hall","Arts and Humanities",
                      "Biological Science"];
      vm.selectedRoom ="";
      vm.rooms = ["102","202","303","505"];
     }
})();
