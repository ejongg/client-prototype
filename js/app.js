angular.module("Client", ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('home');

        $stateProvider
            .state('home', {
                url : "/home",
                templateUrl : "/templates/home.html",
                controller : "HomeCtrl"
            })
            
            .state('inventory', {
                url : "/inventory",
                templateUrl : "/templates/inventory.html",
                controller : "InventoryCtrl"
            })
        
            .state('bays', {
                url : "/bays",
                templateUrl : "/templates/bays.html",
                controller : "BaysCtrl"
            })
        
            .state('products', {
                url : "/products",
                templateUrl : "/templates/products.html",
                controller : "ProductsCtrl"
            })
        
            .state('customers', {
                url : "/customers",
                templateUrl : "/templates/customers.html",
                controller : "CustomersCtrl"
            })
        
            .state('orders', {
                url : "/orders",
                templateUrl : "/templates/orders.html",
                controller : "OrdersCtrl"
            })
        
            .state('orders_view', {
                url : "/orders/view",
                templateUrl : "/templates/orders-view.html",
                controller : "OrdersViewCtrl"
            })
    })
