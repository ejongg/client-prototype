angular.module('Client')
    .controller('CustomersCtrl', ['$http', '$log', '$scope', function($http, $log, $scope){
        $scope.customers = [];
        $scope.orders = [];
        
        $scope.getCustomers = function(){
            io.socket.get('/customers');
            
            $http.get('http://localhost:1337/customers')
                .success(function(data){
                    $scope.customers = data;
                });
        };
        
        $scope.getCustomers();
        
        $scope.getOrders = function(cust_id){
            $log.info('clicked');
            $http.get('http://localhost:1337/customer_orders?where={"customer_id" :' + cust_id + '}')
                .success(function(data){
                    $scope.orders = data;
                });
        };
    }])