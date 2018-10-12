(function () {
  'use strict';

  angular
    .module('myStudyGroupPlanner.authentication', [
      'myStudyGroupPlanner.authentication.controllers',
      'myStudyGroupPlanner.authentication.services'
    ]);

  angular
    .module('myStudyGroupPlanner.authentication.controllers', []);

  angular
    .module('myStudyGroupPlanner.authentication.services', ['ngCookies']);
})();
