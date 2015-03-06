angular.module('Client')
    .controller('InventoryCtrl', ['$http', '$log', '$scope', function($http, $log, $scope){
        $scope.inventory = [];
        
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
            switch (msg.verb){
                case 'created' :
                    $scope.inventory.push(msg.data);
                    $scope.$digest();
                    break;
                    
                case 'updated' : 
                    var index = _.findIndex($scope.inventory, {id : msg.data.id});
                    $scope.inventory[index] = msg.data;
                    $scope.$digest();
                    
            }
        });
    }]);