angular.module('Client')
    .controller('OrdersCtrl', ['$http', '$log', '$scope', function($http, $log, $scope){
        $scope.skus = [];
        $scope.ordersList = [];
        
        io.socket.get('/customer_orders');
        
        $scope.getSkus = function(){
            io.socket.get('/sku');
            
            $http.get('http://localhost:1337/sku')
                .success(function(data){
                    $scope.skus = data;
                    $scope.selectedSku = $scope.skus[0];
                });
        };
        
        $scope.getSkus();
        
        // Add order to the table
        $scope.addOrder = function(){
            var order = {
                sku_id : $scope.selectedSku.id,
                sku : $scope.selectedSku.sku_name,
                cases : $scope.cases
            };
            $scope.ordersList.push(order);
        };
        
        // Remove array from the table
        $scope.removeOrder = function(hashKey){   
            $scope.ordersList.splice(_.findIndex($scope.ordersList, {$$hashKey : hashKey}), 1);
        };
                
        /*
        *   Sends the order to the backend server.
        *   I did put static values for agent name and user
        *   because this is for demonstration only.
        */
         
        $scope.finalizeOrder = function(){
            var final_order = {
                customer : {
                    establishment : $scope.establishment,
                    owner : $scope.owner,
                    address : $scope.address,
                    distance : $scope.distance
                },
                
                orders : $scope.ordersList,
                cokeagent_name : "Agent 47",
                user : 'Sonic'
            };
            
            io.socket.post('/customer_orders/add', {order : final_order});
        };
    }])