(function () {
  'use strict';

  angular
    .module('myStudyGroupPlanner', [
      'myStudyGroupPlanner.routes',
      'myStudyGroupPlanner.authentication',
      'myStudyGroupPlanner.config',
      'myStudyGroupPlanner.layout',
      'pickadate',
      'igTruncate'
    ]);

  angular
    .module('myStudyGroupPlanner.config', []);	

  angular
    .module('myStudyGroupPlanner.routes', ['ngRoute']);

  angular
  .module('myStudyGroupPlanner')
  .run(run);

run.$inject = ['$http'];

/**
* @name run
* @desc Update xsrf $http headers to align with Django's defaults
*/
function run($http) {
  $http.defaults.xsrfHeaderName = 'X-CSRFToken';
  $http.defaults.xsrfCookieName = 'csrftoken';
}
})();
