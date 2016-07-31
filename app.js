(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                controller: 'HomeController',
                templateUrl: 'views/home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'views/login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/settings', {
                controller: 'settings',
                templateUrl: 'views/settings/settings.view.html',
                controllerAs: 'vm'
            })
            .when('/newInvoice', {
                controller: 'newInvoice',
                templateUrl: 'views/newInvoice/newInvoice.view.html',
                controllerAs: 'vm'
            })
            .when('/allProducts', {
                controller: 'allProducts',
                templateUrl: 'views/allProducts/allProducts.view.html',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/login' });
    }

    

})();