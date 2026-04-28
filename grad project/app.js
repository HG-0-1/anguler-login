// Main AngularJS Application Module
var app = angular.module('LoginApp', ['ngRoute']);

// Route Configuration
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        // Login Route
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        // Dashboard Route
        .when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardController'
        })
        // Default redirect to login
        .otherwise({
            redirectTo: '/login'
        });

    // Use hashbang routing for better compatibility
    // $locationProvider.hashPrefix('!');
});

// Route Change Interceptor to check authentication
app.run(function($rootScope, $location, $injector) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        // Routes that don't require authentication
        var publicRoutes = ['/login'];
        
        // Lazily get AuthService to avoid circular dependency
        var AuthService = $injector.get('AuthService');
        
        // Check if next route exists and has originalPath
        if (next && next.$$route) {
            var routePath = next.$$route.originalPath;
            
            // Check if the next route requires authentication
            if (publicRoutes.indexOf(routePath) === -1) {
                // This route requires authentication
                if (!AuthService.isAuthenticated) {
                    event.preventDefault();
                    $location.path('/login');
                }
            }
        }
    });
});
