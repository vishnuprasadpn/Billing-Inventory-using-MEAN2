(function () {
    'use strict';
    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', '$location'];
    function HomeController($rootScope, $location) 
    {
        var vm = this;
        vm.newInvoice = newInvoice;
        vm.allProducts = allProducts;
        
        function newInvoice() 
        {
            $location.path('/newInvoice');
        };
        function allProducts() 
        {
            $location.path('/allProducts');
        };
        
    }
})();