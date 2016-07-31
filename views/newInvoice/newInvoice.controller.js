(function () {
    'use strict';
    angular
        .module('app')
        .controller('newInvoice', newInvoice);

    newInvoice.$inject = ['$rootScope', '$http','$scope','$filter'];
    
    function newInvoice($rootScope, $http,$scope,$filter) 
    {
        $scope.selected ={items:[{}]};
        $scope.selected.items.splice(0,1);
        $scope.pNos=0;
        $scope.tot=0;
        $scope.update={items:[{}]};
        
        $http.get('/allinvoices').success(function(response)
        {
            var i;
            
            var max=0;
            for(i=0;i< response.length;i++)
            {
                if (max < response[i].invoiceNo) 
                {
                    max = response[i].invoiceNo;
                    $scope.vm.invoiceNumber = parseInt(max);
                }
            }
            $scope.vm.invoiceNumber = $scope.vm.invoiceNumber+1;
            var date = new Date();
            $scope.vm.invoiceDate = $filter('date')(new Date(), 'dd/MM/yyyy');
        });

        $http.get('/allproducts').success(function(response)
        {
            $scope.d = response;
            $scope.options = [{pName:""}];
            var values = response;
            var i;
            for(i=0;i<values.length;i++)
            {
                $scope.options.push({pName:values[i].pName});
            }     
        });

        $scope.populateData = function(name)
        {
            var i;
            for(i=0;i<$scope.d.length;i++)
            {
                if (name.pName ==$scope.d[i].pName) 
                {
                    $scope.vm.pCost = parseInt($scope.d[i].pCost);
                    $scope.vm.pTax = parseInt($scope.d[i].pTax);
                    $scope.vm.pStock = parseInt($scope.d[i].pStock);
                    $scope.vm.pQty = 1;
                    $scope.vm.pName = $scope.d[i].pName;
                    $scope.vm.pCompany = $scope.d[i].pCompany;
                    $scope.vm.pDesc = $scope.d[i].pDesc;
                }
            }
        }
        $scope.addToBucket = function(product)
        {
            //console.log($scope.vm.pStock);
                product.pTotal = product.pCost * product.pQty;
                $scope.pNos = $scope.pNos +1;
                $scope.selected.items.push({nos:$scope.pNos,pName:product.pName,pCompany:$scope.vm.pCompany,pDesc:$scope.vm.pDesc,pCost:product.pCost,pStock:$scope.vm.pStock,pQty:product.pQty,pTax:product.pTax,pTotal:product.pTotal});
                $scope.tot= product.pCost + $scope.tot; 
        
                //console.log(product.pCost);

                $scope.select.pName= "";
                $scope.vm.pCost= "";
                $scope.vm.pStock= "";
                $scope.vm.pQty= "";
                $scope.vm.pTax= "";
                $scope.vm.pName= "";
                $scope.vm.pCompany= "";
                $scope.vm.pDesc= ""; 
        }
        
        $scope.removeProduct = function(product)
        {
            //console.log($scope.selected.items);
            var i;

            for(i=0;i<$scope.selected.items.length;i++)
            {
                if(product==$scope.selected.items[i].$$hashKey)
                {
                    $scope.tot = $scope.tot - $scope.selected.items[i].pCost;
                    $scope.selected.items.splice(i,1);
                    $scope.pNos = $scope.pNos -1;
                    //console.log($scope.tot);
                }
            }
        }
        $scope.purchase = function(products)
        {
            //console.log($scope.selected);
            var i;
            for(i=0;i<$scope.selected.items.length;i++)
            {
                var stock = $scope.selected.items[i].pStock - $scope.selected.items[i].pQty;
                var data = {pStock :stock, pName :$scope.selected.items[i].pName} 
                $http.put('/updateStock/', data).success(function(response)
                {
                    console.log("stock update success");
                });
    
            }

            var data = {invoiceNo : products.invoiceNumber,invoiceDate: products.invoiceDate,clientName:$scope.vm.clientName,clientContact:$scope.vm.clientContact,totalAmount:$scope.tot,note:$scope.Note};
            //console.log(data);
            $http.post('/insertTOinvoice',data).success(function(response){
            //console.log(response);
            alert("Success");
            });
    
            
        }
    }
})();