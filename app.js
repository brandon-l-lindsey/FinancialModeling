/* global angular */


var myApp = angular.module("myApp", ['angular-toArrayFilter', 'chart.js']);



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
 
    // $scope.getData = function() {
    //     $http({
    //         method: 'GET',
    //         url: 'json/testPrices.json'
    //         // url: 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol='+$scope.company+'&apikey='+$scope.APIKey
    //      }).then(function (result){
    //           $scope.messyData = result.data["Monthly Adjusted Time Series"];
    //           var xValues = [];
    //           var yValues = [];
    //           angular.forEach($scope.messyData, function(value, key) {
    //               var adjustedDate = $scope.monthMap(key.slice(5,7)) + '-' + key.slice(0,4);
    //               xValues.unshift(adjustedDate);
    //               yValues.unshift(value["5. adjusted close"]);
    //           });
    //           $scope.xVals = xValues;
    //           $scope.yVals = yValues;
    //           console.log("got Data");
    //           console.log(xValues);

    //      });
    // }

         


    $scope.newSearch = function(company){
        $scope.company = company;
        $http({
            method: 'GET',
            //url: 'json/testPrices.json'
            url: 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol='+$scope.company+'&apikey='+$scope.APIKey
         }).then(function (result){
              $scope.messyData = result.data["Monthly Adjusted Time Series"];
              var xValues = [];
              var yValues = [];
              angular.forEach($scope.messyData, function(value, key) {
                  var adjustedDate = $scope.monthMap(key.slice(5,7)) + '-' + key.slice(0,4);
                  xValues.unshift(adjustedDate);
                  yValues.unshift(value["5. adjusted close"]);
              });
              $scope.xVals = xValues;
              $scope.yVals = yValues;
              console.log("got Data");
              console.log(xValues);

         }).then(function(){
            new Chart(document.getElementById("line-chart"), {
                type: 'line',
                data: {
                    labels: $scope.xVals,
                    datasets: [{
                        data: $scope.yVals,
                        label: 'Historical Monthly Adjusted Closing Prices for ' + $scope.company,
                        borderColor: 'blue',
                        fill: true,
                        cubicInterpolationMode: 'default',
                        pointRadius: 0,
                        pointHoverRadius: 5
                    }]
                },
                options: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Historical Adjusted Monthly Close Prices for ' + $scope.company
                    }
                }
            })
         });
        console.log('success');
        
    }

    $scope.monthMap = function(month) {
        return $scope.months[parseInt(month) - 1];
    }

    $scope.months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    
    
}])


