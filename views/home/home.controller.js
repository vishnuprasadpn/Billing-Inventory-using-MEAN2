(function () {
    'use strict';
    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', '$location'];
    function HomeController($rootScope, $location) 
    {
        var vm = this;
        vm.username = $rootScope.globals.currentUser.username;
        vm.addCourse = addCourse;
        vm.enrollStudent = enrollStudent;
        vm.searchDetail = searchDetail;
        vm.feeInstall = feeInstall;
        
        function addCourse() 
        {
            $location.path('/addcourse');
        };
        function enrollStudent() 
        {
            $location.path('/enrollStudent');
        };
        function searchDetail() 
        {
            $location.path('/searchDetail');
        };
        function feeInstall() 
        {
            $location.path('/feeInstall');
        };
    }
})();