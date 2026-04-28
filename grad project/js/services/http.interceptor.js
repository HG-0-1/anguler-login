// HTTP Interceptor for adding credentials to authenticated requests
app.factory('AuthInterceptor', function($q, $window) {
    return {
        request: function(config) {
            // Get token directly from localStorage to avoid circular dependency
            var session = $window.localStorage.getItem('loginSession');
            if (session) {
                try {
                    var data = JSON.parse(session);
                    if (data.accessToken) {
                        config.headers = config.headers || {};
                        config.headers.Authorization = 'Bearer ' + data.accessToken;
                    }
                } catch(e) {
                    // Ignore parse errors
                }
            }
            return config || $q.when(config);
        },

        responseError: function(response) {
            if (response.status === 401) {
                // Unauthorized - clear session and redirect to login
                $window.localStorage.removeItem('loginSession');
                $window.location.href = '#/login';
            }
            return $q.reject(response);
        }
    };
});

// Register the interceptor
app.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});
