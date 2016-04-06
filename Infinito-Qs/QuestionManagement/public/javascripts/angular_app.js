var QuestionManagerApp = angular.module("QuestionManagerApp", [
  'ngRoute',
  'bw.paging',
  'ui.bootstrap',
  'ngAnimate',
  'rzModule',
  'ngTagsInput'
])
.config(function ($routeProvider, $locationProvider, $provide) {
  $routeProvider
    .when('/', {
      templateUrl: 'QuestionManager.html',
      controller: 'index',
      controllerAs: 'indexController'
    })
    .when('/PatternSearch',{
      templateUrl: 'PatternSearch.html',
      controller: 'pattern',
      controllerAs: 'patternController'
    })
    .when('/signout',{
      resolve :{
          signout: ['signoutService', function (signoutService) {
                    signoutService($window);
        }]
      }
    })
    .otherwise({
      redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
});

QuestionManagerApp.service('$ajaxService', function($http){
   this.getQuestionJson = function(data, callback) {
     $http({
       url: '/QuestionRequestHandler',
       data: data,
       // dataType: 'json',
       method: 'post'
     }).then(function(results) {
       callback(null,results);
     }, function errorCall(data) {
       callback(data,null);
     });
   };
   this.onQuestionDelete = function(data, callback) {
     $http({
       url: '/QuestionRequestHandler',
       data: data,
       // dataType: 'json',
       method: 'post'
     }).then(function(results) {
       callback(null,results);
     }, function errorCall(data) {
       callback(data,null);
     });
   };
   this.addTopic = function(data, callback) {
     $http({
       url: '/TopicsRequestHandler',
       data: data,
       // dataType: 'json',
       method: 'post'
     }).then(function(results) {
       callback(null,results);
     }, function errorCall(data) {
       callback(data,null);
     });
   };
   this.addCategoryId = function(data, callback) {
     $http({
       url: '/TopicsRequestHandler',
       data: data,
       // dataType: 'json',
       method: 'post'
     }).then(function(results) {
       callback(null,results);
     }, function errorCall(data) {
       callback(data,null);
     });
   };
   this.yesBtnClicked = function(data, callback) {
     $http({
       url: '/TopicsRequestHandler',
       data: data,
       // dataType: 'json',
       method: 'post'
     }).then(function(results) {
       callback(null,results);
     }, function errorCall(data) {
       callback(data,null);
     });
   };
   this.QuestionSave = function(data, callback) {
     $http({
       url: '/QuestionRequestHandler',
       data: data,
       // dataType: 'json',
       method: 'post'
     }).then(function(results) {
       callback(null,results);
     }, function errorCall(data) {
       callback(data,null);
     });
   };
   this.getCategoriesDatalist = function(data, callback) {
     $http({
       url: '/TopicsRequestHandler',
       data: data,
       // dataType: 'json',
       method: 'post'
     }).then(function(results) {
       callback(null,results);
     }, function errorCall(data) {
       callback(data,null);
     });
   };
   this.getTopicDatalist = function(data, callback) {
     $http({
       url: '/TopicsRequestHandler',
       data: data,
       // dataType: 'json',
       method: 'post'
     }).then(function(results) {
       callback(null,results);
     }, function errorCall(data) {
       callback(data,null);
     });
   };
   this.deleteSelectedQuestion = function(data, callback) {
     //console.log('call received');
     $http({
       url: '/QuestionRequestHandler',
       data: data,
       method: 'post'
     }).then(function(results) {
       //console.log(results);
       callback(null, results);
     }, function errorCall(data) {
       callback(data,null);
     });
   };

   this.savePattern = function(data, callback) {
     console.log('call received');
     $http({
       url: '/PatternSearchHandler',
       data: data,
       method: 'post'
     }).then(function(results) {
       console.log(results);
       callback(null, results);
     }, function errorCall(data) {
       callback(data,null);
     });
   };
   this.listPattern = function(data, callback) {
     //console.log('call received');
     $http({
       url: '/PatternSearchHandler',
       data: data,
       method: 'post'
     }).then(function(results) {
       //console.log(results);
       callback(null, results);
     }, function errorCall(data) {
       callback(data,null);
     });
   };
});

QuestionManagerApp.service('signoutService', function ($window){
    $window.location.href = '/signout';
});
