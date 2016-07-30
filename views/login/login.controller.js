(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    //LoginController.$inject = ['$location'];
    function LoginController($location,$scope,$http) {
       $scope.login = function()
        {
            console.log($scope.vm);
            $http.post('/login',$scope.vm).success(function(response)
            {   

                console.log(response);
                if(response == true) 
                {
                    console.log("success");
                    $location.path('/home');
                }
                
            });
        };

        
       
    }

})();
