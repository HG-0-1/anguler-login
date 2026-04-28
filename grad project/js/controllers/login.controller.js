// Login Controller
app.controller('LoginController', function($scope, $location, AuthService) {
    $scope.credentials = {
        username: '',
        password: ''
    };
    $scope.loading = false;
    $scope.errorMessage = '';

    /**
     * Handle login form submission
     */
    $scope.login = function() {
        // Clear previous error message
        $scope.errorMessage = '';
        $scope.loading = true;

        // Validate inputs
        if (!$scope.credentials.username || !$scope.credentials.password) {
            $scope.errorMessage = 'Username and password are required.';
            $scope.loading = false;
            return;
        }

        // Call authentication service
        AuthService.login($scope.credentials.username, $scope.credentials.password)
            .then(function(response) {
                // Successful login - navigate to dashboard
                $location.path('/dashboard');
            })
            .catch(function(error) {
                // Handle error
                if (error && error.error_description) {
                    $scope.errorMessage = error.error_description;
                } else if (error && error.message) {
                    $scope.errorMessage = error.message;
                } else {
                    $scope.errorMessage = 'Login failed. Please check your credentials and try again.';
                }
            })
            .finally(function() {
                $scope.loading = false;
            });
    };
});
