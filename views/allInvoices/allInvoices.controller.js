(function () {
    'use strict';

    angular
        .module('app')
        .controller('allInvoices', allInvoices);

    allInvoices.$inject = ['$rootScope','$http', '$scope'];
    function allInvoices($rootScope, $http, $scope) 
    {
        
        refresh();   
          

        $scope.removeInvoice = function(invoice)
        {
            console.log(invoice);
            $http.delete('/removeInvoice/' + invoice).success(function(response){
            refresh();
            console.log(response);
            });
        };
        function refresh()
    {
         $http.get('/allinvoices').success(function(response)
        {
            $scope.allinvoices = response;
            console.log($scope.allinvoices);    
        });
    }


    }
    
})();