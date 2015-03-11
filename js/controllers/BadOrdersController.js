angular.module('Client')
    .controller('BadOrdersCtrl', ['$http','$log','$scope', function($http, $log, $scope){
        $scope.skus = [];
        $scope.products = [];
        $scope.total_expense = 0;
        
        $scope.getSkus = function(){
            io.socket.get('/sku');
            
            $http.get(io.sails.url + '/sku')
                .success(function(data){
                    $scope.skus = data;
                    $scope.selectedSku = $scope.skus[0];
                });
        };
        
        $scope.getSkus();
        
        $scope.addProduct = function(){
            var product = {
                sku_id : $scope.selectedSku.id, 
                sku_name : $scope.selectedSku.sku_name,
                expense : $scope.cases * ($scope.selectedSku.price * $scope.selectedSku.bottlespercase),
                cases : $scope.cases,
                reason : $scope.reason,
            };
            
            $scope.total_expense = $scope.total_expense + product.expense;
            $scope.products.push(product);
        };
        
        $scope.finalizeBadOrder = function(){
            var bad_order = {
                products : $scope.products,
                total_expense : $scope.total_expense
            };
            
            io.socket.post('/bad_orders/add', bad_order);
        };
    }])