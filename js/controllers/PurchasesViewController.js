angular.module('Client')
    .controller('PurchasesViewCtrl', ['$http','$log','$scope',function($http, $log, $scope){
        $scope.purchases = [];
        $scope.purchase_products = [];
        
        $scope.getPurchases = function(){
            io.socket.get('/purchases');
            
            $http.get(io.sails.url + '/purchases')
                .success(function(data){
                    $scope.purchases = data;
                });
        };
        
        $scope.getPurchases();
        
        io.socket.on('purchases', function(msg){
            switch (msg.verb){
                case 'created' :
                    $scope.purchases.push(msg.data);
                    $scope.$digest();
                    break;
            }
        });
        
        $scope.viewDetails = function(id){
            $http.get(io.sails.url + '/purchase_products?where={"purchase_id" :'+ id +'}')
                .success(function(data){
                    $scope.purchase_products = data;
                });
        };
    }]);