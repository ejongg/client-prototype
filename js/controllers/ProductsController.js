angular.module('Client')
    .controller('ProductsCtrl', ['$http', '$log', '$scope', function($http, $log, $scope){
        $scope.products = [];
        
        // Subscribe to products model and get content for the table
        $scope.getProducts = function(){
            io.socket.get('/products');
            
            $http.get('http://localhost:1337/products')
                .success(function(data){
                    $scope.products = data;
                });
        };
        
        // Invoke getProducts() method
        $scope.getProducts();
        
        // Listen for changes in the products model
        io.socket.on('products', function(msg){
            switch(msg.verb){
                case 'created' : 
                    $scope.products.push(msg.data);
                    $scope.$digest();
            }
        });
        
        // This function send a post request to add product
        $scope.addProduct = function(){
            var product = {
                prod_name : $scope.product,
                company : $scope.company
            };
            
            io.socket.post('/products', product);
        };
    }])