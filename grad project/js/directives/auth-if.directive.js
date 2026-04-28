// Custom directive to show/hide markup based on authentication state
app.directive('authIf', function(AuthService) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            // Watch authentication state
            scope.$watch(function() {
                return AuthService.isAuthenticated;
            }, function(newVal) {
                if (newVal) {
                    element.show();
                } else {
                    element.hide();
                }
            });

            // Initial check
            if (!AuthService.isAuthenticated) {
                element.hide();
            }
        }
    };
});
