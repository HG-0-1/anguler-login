// Mock Authentication API for testing
app.factory('MockAuthAPI', function($q, $timeout) {
    return {
        login: function(username, password) {
            var deferred = $q.defer();
            
            // Simulate API delay
            $timeout(function() {
                // Test credentials
                if (username === 'BAU' && password === '3MvN=1T:') {
                    // Mock successful response
                    deferred.resolve({
                        access_token: 'mock_token_' + Math.random().toString(36).substr(2, 9),
                        token_type: 'Bearer',
                        refresh_token: 'mock_refresh_token_' + Math.random().toString(36).substr(2, 9),
                        expires_in: 3600,
                        scope: 'read write',
                        sessionId: 12345,
                        timestamp: new Date().toISOString(),
                        user: {
                            id: 'user_123',
                            username: 'BAU',
                            name: 'Test User',
                            email: 'user@example.com'
                        }
                    });
                } else {
                    // Mock error response
                    deferred.reject({
                        error: 'invalid_grant',
                        error_description: 'Invalid username or password'
                    });
                }
            }, 500); // 500ms delay to simulate network
            
            return deferred.promise;
        }
    };
});
