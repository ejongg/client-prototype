angular.module('Client')
    .controller('InventoryCtrl', ['$http', '$log', '$scope', function($http, $log, $scope){
        $scope.bays = [];
        $scope.skus = [];
        $scope.inventory = [];
        
        $scope.add = true;
        
        /**
        *   Send a get request to the server
        *   then populate the select element for bays.
        */ 
        $http.get('http://localhost:1337/bays')
            .success(function(data){
                $scope.bays = data;
                $scope.baySelected = $scope.bays[0];
        });
        
        /**
        *   Send a get request to the server
        *   then populate the select element for sku.
        */
        $http.get('http://localhost:1337/sku')
            .success(function(data){
                $scope.skus = data;
                $scope.skuSelected = $scope.skus[0];
        });
        
        /**
        *   Subscribe to the inventory model and get
        *   the current records in the model
        */ 
        $scope.getInventory = function(){
            io.socket.get('/inventory');
            
            $http.get('http://localhost:1337/inventory')
                .success(function(data){
                   $scope.inventory = data;
            });
        };
        
        
        $scope.getInventory();
        
        /**
        *   Listen for any changes in Inventory model
        *   then push it to the array and use digest() 
        *   to updated the interface
        */ 
        io.socket.on('inventory', function(msg){
            $log.info(msg);
            switch (msg.verb){
                case 'created' :
                    $scope.inventory.push(msg.data);
                    $scope.$digest();
                    break;
                    
                case 'updated' : 
                    var index = _.findIndex($scope.inventory, {id : $scope.item_id});
                    $scope.inventory[index] = msg.data;
                    $scope.$digest();
                    
            }
        });
        
        /**
        *   This function adds a new item to the inventory.
        *   Note: Send an object where the key is named "item".
        */ 
        $scope.addItem = function (bay_id, sku_id) {
            var item = {
                bay_id : bay_id,
                sku_id : sku_id,
                exp_date : $scope.exp_date,
                cases : $scope.cases
            };
            
            io.socket.post('/inventory/add', {item : item});
        };
        
        // This function selects the item to be updated
        $scope.selectToReplenish = function(id){
            $scope.add = false;
            $scope.item_id = id;
        };
        
        /**
        *   Send a request to the server to update the number
        *   of cases for the particular item in the inventory
        */ 
        $scope.replenish = function(id){        
            io.socket.put('/inventory/replenish/' + id, {cases : $scope.cases});
        };
        
        $scope.cancel = function(){
            $scope.add = true;
        };
    }]);