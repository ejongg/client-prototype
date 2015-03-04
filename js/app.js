angular.module("Client", ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('inventory');

        $stateProvider
            .state('sku', {
                url : "/sku",
                templateUrl : "/templates/sku.html",
                controller : "SkuCtrl"
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
        
            .state('trucks', {
                url : "/trucks",
                templateUrl : "/templates/trucks.html",
                controller : "TrucksCtrl"
            })
    })
