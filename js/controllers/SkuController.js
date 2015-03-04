angular.module("Client")
    .controller('SkuCtrl', ['$http', '$log', '$scope', function($http, $log, $scope){      
        $scope.products = [];
        $scope.skus = [];

        // Populate the select element in the form
        $http.get('http://localhost:1337/products')
            .success(function(data){
                $scope.products = data;
                $scope.productSelected = $scope.products[0];
            });

        /**
        *   A function that subscribes the socket to the model
        *   and also send a get request to the model.
        */
        $scope.getSKU = function(){
            io.socket.get('http://localhost:1337/sku');

            $http.get(io.sails.url + '/sku')
                .success(function(data){
                    $scope.skus = data;
                });
        };

        // Invokes the getSKU function implemented above
        $scope.getSKU();

        // Listens for any messages that is send by the server regarding SKU model
        io.socket.on('sku', function(msg){
            switch(msg.verb){
                case 'created' : 
                    $scope.skus.push(msg.data);
                    $scope.$digest();
                    break;
            }
        });
        
        // Function that adds products
        $scope.addSKU = function(prod_id){
            var sku = {
                sku_name : $scope.sku_name,
                prod_id : prod_id,
                bottlespercase : $scope.bottlespercase,
                size : $scope.size,
                price : $scope.price
            };

            io.socket.post('/sku', sku);
        }
    }])
