angular.module('Client')
    .controller('BaysCtrl', ['$http', '$log', '$scope', function($http, $log, $scope){
        $scope.bays = [];
        
        $scope.getBays = function(){
            io.socket.get('/bays');
            
            $http.get('http://localhost:1337/bays')
                .success(function(data){
                    $scope.bays = data;
            });
        };
        
        $scope.getBays();
        
        io.socket.on('bays', function(msg){
            switch (msg.verb){
                case 'created' :
                    $scope.bays.push(msg.data);
                    $scope.$digest();
                    break;
            }
        });
        
        $scope.addBay = function(){
            var bay = {
                pile_name : $scope.pile_name
            };
            
            io.socket.post('/bays', bay);
        };
    }]);