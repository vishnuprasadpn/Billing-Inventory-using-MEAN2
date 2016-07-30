(function () {
    'use strict';

    angular
        .module('app')
        .controller('allProducts', allProducts);

    allProducts.$inject = ['$rootScope','$http', '$scope'];
    function allProducts($rootScope, $http, $scope) 
    {
        
        refresh();
        
        $scope.populateData = function(name)
        {
            var i;
            for(i=0;i<$scope.details.length;i++)
            {
                if (name.pName ==$scope.details[i].pName) 
                {
                    $scope.update.pCompany = $scope.details[i].pCompany;
                    $scope.update.pDesc = $scope.details[i].pDesc;
                    $scope.update.pCost = parseInt($scope.details[i].pCost);
                    $scope.update.pTax = parseInt($scope.details[i].pTax);
                    $scope.update.Stock = parseInt($scope.details[i].pStock);
                   // console.log($scope.update);
                }
            }
        }


        $scope.updateProduct = function(name)
        {
            $http.put('/update',$scope.update).success(function(response){
            refresh();
            $scope.update="";
            });
        };
        $scope.removeProduct = function(name)
        {
            console.log(name.pName);
            $http.delete('/remove/' + name.pName).success(function(response){
            refresh();
            $scope.remove="";
            });
        };
        $scope.addProduct = function()
        {
            //console.log($scope.d);
            $http.post('/addProducts',$scope.add).success(function(response){
            //console.log(response);
            refresh();
            });
        }
        function refresh()
        {
            $http.get('/allproducts').success(function(response)
            {
                //console.log("got data rquested");
                $scope.details = response;
                $scope.options = [{pName:""}];
                //console.log(response);
                var values = response;
                var i;
                //console.log(values);
                for(i=0;i<values.length;i++)
                {
                    $scope.options.push({pName:values[i].pName});
                }     
            });
      
        }   
    }
})();