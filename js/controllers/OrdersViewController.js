angular.module('Client')
    .controller('OrdersViewCtrl', ['$http', '$log', '$scope', function($http, $log, $scope){
        $scope.ordersList = [];
        
        $scope.getOrders = function(){
            io.socket.get('/customer_orders');
            
            $http.get('http://localhost:1337/customer_orders')
                .success(function(data){
                    $scope.ordersList = data;
                });
        };
        
        $scope.getOrders();
        
        io.socket.on('customer_orders', function(msg){
            $log.info(msg);
            switch(msg.verb){
                case 'created':
                    $scope.ordersList.push(msg.data);
                    $scope.$digest();
            }
        });
        
        $scope.getOrderProducts = function(order_id){
            $http.get('http://localhost:1337/customer_order_products?where={"order_id" :' + order_id +'}')
                .success(function(data){
                    $scope.products = data;
                })
        }; 
    }]);