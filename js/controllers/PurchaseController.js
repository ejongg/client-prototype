angular.module('Client')
    .controller('PurchaseCtrl', ['$http','$log','$scope', function($http, $log, $scope){        
        $scope.skus = [];
        $scope.purchases = [];
        $scope.bays = [];
        $scope.total_cost = 0;
        
        $scope.getSkusAndBays = function(){
            io.socket.get('/sku');
            io.socket.get('/bays');
            
            $http.get(io.sails.url + '/sku')
                .success(function(data){
                    $scope.skus = data;
                    $scope.selectedSku = $scope.skus[0];
                });
            
            $http.get(io.sails.url + '/bays')
                .success(function(data){
                    $scope.bays = data;
                    $scope.selectedBay = $scope.bays[0];
                });
        };
        
        $scope.getSkusAndBays();
        
        $scope.addPurchase = function(){
            /**
            *   Please follow the keys of this object
            *   to avoid conflict with the backend.
            */
            var item = {
                sku_id : $scope.selectedSku.id,
                bay_id : $scope.selectedBay.id,               
                bay : $scope.selectedBay.pile_name,
                prod_date : $scope.prod_date,
                cases : $scope.cases,
                amount : $scope.costpercase * $scope.cases,
                costpercase : $scope.costpercase,
                discountpercase : $scope.discountpercase,
                name : $scope.selectedSku.sku_name,
                company : $scope.selectedSku.prod_id.company,
            };
            
            $scope.total_cost = $scope.total_cost + item.amount;
            $scope.purchases.push(item);
        };
        
        /**
        *   This function will send a request to the server
        *   please follow the keys of the objects.
        */
        $scope.finalizePurchase = function(){
            var purchase = {
                products : $scope.purchases,
                total_cost : $scope.total_cost,
                user : 'Sonic'
            };
            
            io.socket.post('/purchases/add', purchase);
        };
    }]);