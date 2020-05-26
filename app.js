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
      url: 'json/data.json'
   }).then(function (result){
        $scope.tickers = result.data;
   });
    
    $scope.newSearch = function(userInput){
        $scope.currentSearch = userInput;
    }
}])


myApp.controller('GraphController', ['$scope', '$http', function($scope, $http){
    
    $scope.APIKey = 'H5XW676HRUVKHEFX';    
    
//    $http({
//      method: 'GET',
//      url: 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=IBM&apikey='+$scope.APIKey
//   }).then(function (result){
//        $scope.tickers = result.data;
//   });
    
        $http({
          method: 'GET',
          url: 'json/testPrices.json'
       }).then(function (result){
            $scope.messyData = result.data["Monthly Adjusted Time Series"];
            var xValues = [];
            var yValues = [];
            angular.forEach($scope.messyData, function(value, key) {
                xValues.push(key);
                yValues.push(value["5. adjusted close"]);
            });
            $scope.xValues = xValues;
            $scope.yValues = yValues;
            
            
       });
    

    
    
}])


