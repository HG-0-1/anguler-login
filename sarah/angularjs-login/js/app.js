// AngularJS Login Application
var loginApp = angular.module('loginApp', []);

// Login Controller
loginApp.controller('LoginController', ['$scope', function($scope) {
    // Initialize variables
    $scope.credentials = {
        username: '',
        password: ''
    };
    $scope.rememberMe = false;
    $scope.loginError = '';

    // Login function
    $scope.login = function() {
        // Clear previous error
        $scope.loginError = '';

        // Validate form
        if (!$scope.credentials.username || !$scope.credentials.password) {
            $scope.loginError = 'Please enter both username and password.';
            return;
        }

        // Simulate API call delay
        $scope.loginError = '';
        
        // Log login attempt (for demo purposes)
        console.log('Login attempt:', {
            username: $scope.credentials.username,
            rememberMe: $scope.rememberMe,
            timestamp: new Date()
        });

        // Success animation and message
        setTimeout(function() {
            alert('Welcome, ' + $scope.credentials.username + '! Login successful! 🎉');
            
            // Reset form
            $scope.$apply(function() {
                $scope.credentials = {
                    username: '',
                    password: ''
                };
                $scope.rememberMe = false;
            });
        }, 300);
    };

    // Optional: Watch for form changes to clear errors
    $scope.$watch('credentials.username + credentials.password', function() {
        if ($scope.loginError) {
            $scope.loginError = '';
        }
    });
}]);
