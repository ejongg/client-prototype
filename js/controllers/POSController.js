angular.module('Client')
    .controller('POSCtrl', ['$http','$log','$scope', function($http, $log, $scope){
        $scope.skus = [];
        $scope.products = [];
        $scope.returns = [];
        $scope.total_amount = 0;
        
        $scope.getSku = function(){
            io.socket.get('/sku');
            
            $http.get(io.sails.url + '/sku')
            .success(function(data){
                $scope.skus = data;
                $scope.selectedSku = data[0];
            });
        };
        
        $scope.getSku();
        
        
        $scope.addTransItem = function(){
            var item = {
                sku_id : $scope.selectedSku.id,
                sku_name : $scope.selectedSku.sku_name,
                bottles : $scope.trans_bottles,
                cases : $scope.trans_cases
            };
            
            $scope.total_amount = $scope.total_amount + ($scope.selectedSku.price * item.cases);
            
            $scope.products.push(item);
        };
        
        $scope.addReturns = function(){
            var return_item = {
                sku_id : $scope.selectedSku.id,
                sku_name : $scope.selectedSku.sku_name,
                bottles : $scope.return_bottles,
                cases : $scope.return_cases,
                deposit : $scope.return_deposit
            };
            
            $scope.returns.push(return_item);
        };
        
        /**
        *   Send request to the backend server
        */
        $scope.finalizeTransaction = function(){
            var transaction = {
                products : $scope.products,
                returns : $scope.returns,
                customer_name : $scope.customer_name,
                total_amount : $scope.total_amount,
                user : 'Sonic'
            };
            
            io.socket.post('/warehouse_transactions/add', transaction, function(response){
                $log.info(response);
            });
        };
    }]);