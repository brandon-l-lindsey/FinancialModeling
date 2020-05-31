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
    
//    $http({
//      method: 'GET',
//      url: 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=IBM&apikey='+$scope.APIKey
//   }).then(function (result){
//        $scope.tickers = result.data;
//   });

    

   

    
        $http({
            method: 'GET',
            // url: 'json/testPrices.json'
            url: 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=IBM&apikey='+$scope.APIKey
         }).then(function (result){
              $scope.messyData = result.data["Monthly Adjusted Time Series"];
              var xValues = [];
              var yValues = [];
              angular.forEach($scope.messyData, function(value, key) {
                  var adjustedDate = key.slice(5,8) + key.slice(0,4);
                  xValues.unshift(adjustedDate);
                  yValues.unshift(value["5. adjusted close"]);
              });
              $scope.labels2 = xValues;
              $scope.data2 = yValues;
              console.log($scope.xVals);
              console.log($scope.yVals);


         });
         
    
        



    //  $scope.data = {
    //      labels: $scope.xValues,
    //      datasets: [{
    //          label: "Historical Monthly Adjusted Stock Prices",
    //          data: $scope.yValues,
    //          backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //          borderColor: 'rgba(255, 99, 132, 1)',
    //          borderWidth: 1,
    //          fill: false
    //      }]
    //  };


    // $scope.labels2 = ["January", "February", "March", "April", "May", "June", "July"];
    // $scope.data2 = [
    //     [$scope.yVals],
    //     [28, 48, 40, 19, 86, 27, 90]
    // ];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
    $scope.options2 = {
        scales: {
        yAxes: [
            {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left',
            }
        ]
        }
    };

    $scope.colors = [
        {
          backgroundColor: "rgba(159,204,0, 0.2)",
          pointBackgroundColor: "rgba(159,204,0, 1)",
          pointHoverBackgroundColor: "rgba(159,204,0, 0.8)",
          borderColor: "rgba(159,204,0, 1)",
          pointBorderColor: '#fff',
          pointHoverBorderColor: "rgba(159,204,0, 1)"
        },"rgba(250,109,33,0.5)",'#9a9a9a',"rgb(233,177,69)"
      ];


   

    
    
}])


