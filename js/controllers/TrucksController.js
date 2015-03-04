angular.module('Client')
    .controller("TrucksCtrl", ['$http', '$log', '$scope', function($http, $log, $scope){
        $scope.trucks = [];
        
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
    }])