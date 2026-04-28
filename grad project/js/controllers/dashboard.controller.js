// Dashboard Controller
app.controller('DashboardController', function($scope, $location, AuthService) {
    /**
     * Initialize dashboard with current user data
     */
    $scope.init = function() {
        if (!AuthService.isAuthenticated || !AuthService.currentUser) {
            // Not authenticated - redirect to login
            $location.path('/login');
            return;
        }

        // Store user data for template
        $scope.user = AuthService.currentUser;
    };

    /**
     * Handle logout
     */
    $scope.logout = function() {
        AuthService.logout();
        $location.path('/login');
    };

    // Initialize on controller load
    $scope.init();
});
