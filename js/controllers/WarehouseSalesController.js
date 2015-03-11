angular.module('Client')
    .controller('WarehouseSalesCtrl', ['$http','$log','$scope', function($http, $log, $scope){
        $scope.transactions = [];
        
        $scope.getTransactions = function(){
            io.socket.get('/warehouse_transactions');
            
            $http.get(io.sails.url + '/warehouse_transactions')
                .success(function(data){
                    $scope.transactions = data;
                });
        };
        
        $scope.getTransactions();
        
        io.socket.on('warehouse_transactions', function(msg){
            if(msg.verb == 'created'){
                $scope.transactions.push(msg.data);
                $scope.$digest();
            }
        });
    }]);