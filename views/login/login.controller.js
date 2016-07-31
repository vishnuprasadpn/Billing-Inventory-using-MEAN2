(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location','$scope','$http'];
    function LoginController($location,$scope,$http) {
       $scope.login = function()
        {
            //console.log($scope.vm);
            $http.post('/login',$scope.vm).success(function(response)
            {   

                console.log(response);
                if(response == "true") 
                {
                    var test = $location.path('/home');
                    console.log(test);
                    
                }
                
            });
        };

        
       
    }

})();
