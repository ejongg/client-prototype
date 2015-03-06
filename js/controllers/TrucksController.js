angular.module('Client')
    .controller("TrucksCtrl", ['$http', '$log', '$scope', function($http, $log, $scope){
        $scope.trucks = [];
        $scope.selectedTruck = null;
        $scope.add = true;
        
        /**
        *   Send a get request to the server then
        *   populate the trucks table
        */
        $scope.getTrucks = function(){
            io.socket.get('/trucks');
            
            $http.get(io.sails.url + '/trucks')
                .success(function(data){
                    $scope.trucks = data;
                });
        };
        
        
        /**
        *   Invoke the function above
        */
        $scope.getTrucks();
        
        io.socket.on('trucks', function(msg){
            switch (msg.verb){
                case 'created' :
                    $scope.trucks.push(msg.data);
                    $scope.$digest();
                    break;
                    
                case 'updated' :
                    var updated = msg.data;
                    var index = _.findIndex($scope.trucks, {id : updated.id});
                    
                    $scope.trucks[index] = msg.data; 
                    $scope.$digest();
                    
                    $scope.add = true;
            }
        });
        
        $scope.addTruck = function(){
            var truck = {
                driver : $scope.driver,
                dispatcher : $scope.dispatcher,
                agent : $scope.agent,
                helper : $scope.helper,
                route : $scope.route
            };
            
            io.socket.post('/trucks', truck);
        };
        
        $scope.selectTruck = function(id){
            $scope.selectedTruck = id;
            $scope.add = false;
            
            var index = _.findIndex($scope.trucks, {id : id});
            var truck = $scope.trucks[index];
            
            $scope.driver = truck.driver;
            $scope.dispatcher = truck.dispatcher;
            $scope.agent = truck.agent;
            $scope.helper = truck.helper;
            $scope.route = truck.route;
        };
        
        $scope.reassign = function(){
            var truck = {
                driver : $scope.driver,
                dispatcher : $scope.dispatcher,
                agent : $scope.agent,
                helper : $scope.helper,
                route : $scope.route
            };
            
            io.socket.put('/trucks/' + $scope.selectedTruck, truck);
            $scope.selectedTruck = null;
        };
        
        $scope.cancel = function(){
            $scope.add = true;
        };
        
    }]);