angular.module('Client')
    .controller('DeliveryCtrl', ['$http','$log','$scope', function($http, $log, $scope){
        $scope.test = function(){
            io.socket.get('/delivery_transactions/test')
                .success(function(data){
                    $log.info(data);
                });
        };
    }]);