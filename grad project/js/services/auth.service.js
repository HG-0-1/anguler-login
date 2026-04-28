// Authentication Service
app.factory('AuthService', function($http, $q, $window, MockAuthAPI) {
    var service = {
        currentUser: null,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,

        /**
         * Login with credentials
         * @param {string} username
         * @param {string} password
         * @returns {Promise}
         */
        login: function(username, password) {
            // Use mock API for testing (avoids CORS issues)
            return MockAuthAPI.login(username, password)
                .then(function(response) {
                    service.setSession(response);
                    return response;
                })
                .catch(function(error) {
                    return $q.reject(error);
                });
        },

        /**
         * Set the session data from login response
         * @param {object} data - Response from OAuth2 endpoint
         */
        setSession: function(data) {
            service.accessToken = data.access_token;
            service.refreshToken = data.refresh_token;
            service.currentUser = data.user;
            service.currentUser.timestamp = data.timestamp || new Date().toISOString();
            service.isAuthenticated = true;

            // Store in localStorage for persistence across page refresh
            $window.localStorage.setItem('loginSession', JSON.stringify({
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
                user: data.user,
                timestamp: data.timestamp || new Date().toISOString()
            }));
        },

        /**
         * Restore session from localStorage
         */
        restoreSession: function() {
            var session = $window.localStorage.getItem('loginSession');
            if (session) {
                try {
                    var data = JSON.parse(session);
                    service.accessToken = data.accessToken;
                    service.refreshToken = data.refreshToken;
                    service.currentUser = data.user;
                    service.isAuthenticated = true;
                    return true;
                } catch(e) {
                    return false;
                }
            }
            return false;
        },

        /**
         * Logout - clear session
         */
        logout: function() {
            service.accessToken = null;
            service.refreshToken = null;
            service.currentUser = null;
            service.isAuthenticated = false;
            $window.localStorage.removeItem('loginSession');
        },

        /**
         * Get the current access token
         * @returns {string}
         */
        getAccessToken: function() {
            return service.accessToken;
        }
    };

    // Try to restore session on service initialization
    service.restoreSession();

    return service;
});
