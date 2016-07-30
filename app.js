(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

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

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/newInvoice', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/newInvoice');
            }
        });
    }

})();