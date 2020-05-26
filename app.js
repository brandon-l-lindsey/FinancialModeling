/* global angular */


var myApp = angular.module("myApp", ['angular-toArrayFilter']);



myApp.config(function(){
    
    
})

myApp.run(function(){
    
    
    
})


myApp.controller('TickerController', ['$scope', '$http', function($scope, $http){
    
    
    $scope.startsWith = function (actual, expected) {
        var lowerStr = (actual + "").toLowerCase();
        return lowerStr.indexOf(expected.toLowerCase()) === 0;
    }
    
    $scope.searchBySymbol = function(){
        $scope.symbolSearch = true;
        $scope.nameSearch = false;
    }
    
    $scope.searchByName = function(){
        $scope.symbolSearch = false;
        $scope.nameSearch = true;
    }
    
    $http({
      method: 'GET',
      url: 'TickerSymbols/data.json'
   }).then(function (result){
        $scope.tickers = result.data;
   });
    
    $scope.newSearch = function(userInput){
        $scope.currentSearch = userInput;
    }
    
     
    
    
    
}])


