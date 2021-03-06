QuestionManagerApp.controller('pattern', function($scope, $timeout, $uibModal, $ajaxService, $patternService, $rootScope,ngToast){
  /*Initialize variables for pattern search form*/
  $scope = angular.extend($scope, {
    newPattern : true,
    patternList :[],
    variableList : [],
    //formFields : ['whitelist','blacklist','regexPatterns','wikiRange','googleRange','usageRange','correctRange','searchIn'],
    patternJson : $patternService.getPattern(),
    regexFields : [{value:0}],//Array to dynamically create input boxes for regex
    isRun : false,
    submitButton : "Run this!",
    patternSelect : ""
  });


  $scope.initPatternList = function(){
    $ajaxService.listPattern({ //get the existing patterns
        requestType: 'listPattern'
      }, function(err, results) {
          if(err)
            console.log(err);
          $scope.patternList = results;
    });
  }
  $scope.getPattern = function(){
    //console.log($scope.patternSelect);
    if($scope.patternSelect=="")
      ngToast.create({
        className :"danger",
        content : "Please select a pattern",
        animation : 'slide'
      })
    else
    $ajaxService.getPattern({ //get the existing pattern
        requestType: 'getPattern',
        id: $scope.patternSelect
      }, function(err, results) {
          if(err)
            console.log(err);
          $scope.patternJson = results.data;
          $patternService.setPattern($scope.patternJson);
          $scope.newPattern = true;
          $scope.performSearch();
    });
  }

  $scope.isCreatePattern = function(choice){
    if(choice){
      if(!$scope.newPattern)
        $scope.newPattern = (!$scope.newPattern);
    }
    else
      if($scope.newPattern){
        $scope.newPattern = (!$scope.newPattern);
        $scope.initPatternList();
      }
  }

  /*Push and pop controls for regex input fields*/
  var i = 1;
  $scope.addField = function(){
    $scope.regexFields.push({value:i++});
  };
  $scope.removeField = function(){
    $scope.regexFields.pop();
    if($scope.regexFields.length == $scope.patternJson.regexPatterns.length-1) //Pop the value only if the field is already removed
      $scope.regexPatterns.pop();
    i--;
  };

  //Force render sliders on show
  $scope.refreshSlider = function () {
    $timeout(function () {
      $scope.$broadcast('rzSliderForceRender');
    });
  };

  $scope.onChange = function (slider){
    switch(slider){
      case "wiki"      : $scope.patternJson.wikiFlag = true;
                         break;
      case "google"    : $scope.patternJson.googleFlag = true;
                         break;
      case "usage"     : $scope.patternJson.usageFlag = true;
                         break;
      case "correct"   : $scope.patternJson.correctFlag = true;
                         break;
      case "regex"     : $scope.patternJson.regexFlag = true;
                         break;
      case "difficulty": $scope.patternJson.difficultyFlag = true;
                         break;
    }
  }

  //Search form submit handler
  $scope.performSearch = function () {
    $patternService.setPattern($scope.patternJson);
    $rootScope.$emit("filterQuestions",{});
    $scope.isRun = true;
    $scope.submitButton = "Re-run this!";
  }

  //Save a particular pattern
  $scope.onSavePattern = function() {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'savePatternModal.html', //Treat modal as seperate template for syntactical purposes
      controller: 'patternModal',
      resolve:{
        patternName : function (){
          return $scope.patternJson.patternName;
        }
      }
    });

    modalInstance.result.then(function (name) {
      $scope.patternJson.patternName = name;
      $ajaxService.savePattern({
        requestType: 'savePattern',
        data: $scope.patternJson
      }, function(err, results) {
          if(err)
            console.log(err);
          console.log(results);
      });
    });
  }
});
