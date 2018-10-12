/**
* GroupCreatorController controller
* @namespace myStudyGroupPlanner.authentication.controllers
*/
(function () {
  'use strict';

  angular
    .module('myStudyGroupPlanner')
    .controller('GroupCreatorController', GroupCreatorController);

  GroupCreatorController.$inject = ['$location', '$scope', 'Authentication'];

  /**
  * @namespace
  */
  function GroupCreatorController($location, $scope, Authentication) {
    var vm = this;

    vm.groupName = "GroupName1";

    vm.members = ["Siqi Lin", "Tyler Campbell", "Sean Murren", "Aparna Kaliappan"];
    vm.meetings = [["Meeting01", "Time: 4:00pm to 8:00pm", "Locatoin: Sherman 151"],["Meeting02", "Time: 7:00pm to 12:00am", "Locatoin: RLC"]]

    vm.selectedBuilding = "";//
    vm.buildings = ["Information Technology of Engineering",
                   "Sherman Hall","Arts and Humanities",
                   "Biological Science"];
   vm.selectedRoom ="";
   vm.rooms = ["102","202","303","505"];
  }

})();
