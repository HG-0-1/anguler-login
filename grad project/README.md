# AngularJS Login Application - Task A

A fully functional login application built with AngularJS 1.8.2, demonstrating OAuth2 authentication, session persistence, routing, HTTP interceptors, custom directives, and filters.

## Overview

This application implements a complete authentication flow with the following features:

- **OAuth2 Authentication**: Login via bearer token with the provided API endpoint
- **Session Persistence**: Authenticated sessions survive page refresh
- **Routing**: Two named routes (Login and Dashboard) with automatic redirect
- **HTTP Interceptor**: Centralized credential injection for authenticated API calls
- **Custom Directive**: `auth-if` directive to conditionally show/hide markup based on authentication state
- **Custom Filter**: `formatTimestamp` filter to convert API timestamps into human-readable format
- **Dashboard**: Personalized greeting, formatted login timestamp, and logout functionality

## Project Structure

```
grad project/
├── index.html                           # Main application entry point
├── app.js                              # AngularJS module, routing, and interceptors
├── content/
│   └── css/
│       └── styles.css                  # Application styling
├── html/
│   └── angular-1.8.2/                  # AngularJS framework files
├── js/
│   ├── controllers/
│   │   ├── login.controller.js         # Login view controller
│   │   └── dashboard.controller.js     # Dashboard view controller
│   ├── services/
│   │   ├── auth.service.js             # Authentication service
│   │   └── http.interceptor.js         # HTTP interceptor for credentials
│   ├── directives/
│   │   └── auth-if.directive.js        # Custom authentication directive
│   └── filters/
│       └── format-timestamp.filter.js  # Custom timestamp formatter
├── views/
│   ├── login.html                      # Login view template
│   └── dashboard.html                  # Dashboard view template
└── README.md                            # This file
```

## Requirements Met

1. ✅ **Two Named Routes**: 
   - `/login` - Login view
   - `/dashboard` - Dashboard view (requires authentication)

2. ✅ **Login Form with API Integration**:
   - Calls OAuth2 endpoint at `https://test-acculab.azurewebsites.net/oauth/token`
   - Displays error messages on failed login
   - Navigates to dashboard on successful login

3. ✅ **Session Persistence**:
   - Session stored in `localStorage`
   - Survives page refresh within the same browser tab
   - Uses API response data as single source of truth

4. ✅ **Centralized HTTP Interceptor**:
   - All authenticated requests include `Authorization: Bearer <token>` header
   - Single interceptor implementation in `http.interceptor.js`
   - No token injection logic repeated in controllers

5. ✅ **Custom Directive**:
   - `auth-if` directive conditionally shows/hides content based on authentication state
   - Used in dashboard template to hide user info when not authenticated

6. ✅ **Custom Filter**:
   - `formatTimestamp` filter converts ISO 8601 or Unix timestamps to readable format
   - Example output: "Monday, January 15, 2024 at 2:30 PM"
   - Applied to login timestamp on dashboard

7. ✅ **Dashboard Features**:
   - Personalized greeting using session user data
   - Formatted login timestamp using custom filter
   - Logout button that clears session and redirects to login

## Setup Instructions

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (required due to `ng-view` and CORS limitations)

### Installation

1. **Clone or download the project**:
   ```bash
   git clone <your-repo-url>
   cd grad\ project
   ```

2. **Start a local web server**:

   **Option A: Using Python (3.x)**:
   ```bash
   python -m http.server 8000
   ```

   **Option B: Using Python (2.x)**:
   ```bash
   python -m SimpleHTTPServer 8000
   ```

   **Option C: Using Node.js (http-server)**:
   ```bash
   npm install -g http-server
   http-server -p 8000
   ```

   **Option D: Using PHP**:
   ```bash
   php -S localhost:8000
   ```

3. **Open the application**:
   - Navigate to `http://localhost:8000` in your web browser
   - You should see the login page

## Running the Application

1. The application starts at the login route (`http://localhost:8000/#/login`)

2. **Test Credentials**:
   - Username: `BAU`
   - Password: `3MvN=1T:`

3. **Login Flow**:
   - Enter credentials and click "Sign In"
   - On success, you're redirected to the dashboard
   - On failure, an error message is displayed

4. **Dashboard**:
   - View your personalized greeting
   - See the formatted login timestamp
   - Access logout button to clear session and return to login

5. **Session Persistence**:
   - After successful login, refresh the page (F5 or Cmd+R)
   - You remain logged in and stay on the dashboard
   - Close and reopen the browser tab - session persists
   - Clear browser storage to logout

## How It Works

### Authentication Flow

1. **Login Request**:
   - Form submission calls `AuthService.login()`
   - Credentials sent to OAuth2 endpoint via POST request

2. **Token Management**:
   - `AuthService` stores `access_token` and user data
   - Session persisted to `localStorage` for page refresh survival
   - `AuthInterceptor` automatically injects token into all subsequent requests

3. **Route Protection**:
   - Route change interceptor checks authentication status
   - Unauthenticated users attempting to access dashboard are redirected to login
   - Login route is always accessible

4. **Dashboard Display**:
   - `DashboardController` initializes with session data
   - `auth-if` directive ensures content only shows when authenticated
   - `formatTimestamp` filter displays login time in readable format

### Key Components

**AuthService** (`js/services/auth.service.js`):
- Manages authentication state
- Handles login requests
- Stores and restores session from localStorage
- Provides access token to interceptor

**AuthInterceptor** (`js/services/http.interceptor.js`):
- Intercepts all HTTP requests
- Injects Authorization header with bearer token
- Handles 401 responses by clearing session

**LoginController** (`js/controllers/login.controller.js`):
- Manages login form state
- Handles form submission
- Displays error messages
- Shows loading state during authentication

**DashboardController** (`js/controllers/dashboard.controller.js`):
- Initializes dashboard with user data
- Handles logout action
- Redirects unauthenticated users to login

**auth-if Directive** (`js/directives/auth-if.directive.js`):
- Watches authentication state
- Shows/hides DOM elements based on `AuthService.isAuthenticated`
- Used to protect dashboard content from non-authenticated users

**formatTimestamp Filter** (`js/filters/format-timestamp.filter.js`):
- Accepts ISO 8601, Unix timestamps, or Date objects
- Formats to: "Monday, January 15, 2024 at 2:30 PM"
- Locale-aware formatting (en-US)

## API Integration

The application integrates with the following OAuth2 endpoint:

**Endpoint**: `POST https://test-acculab.azurewebsites.net/oauth/token`

**Request Format** (Form-encoded):
```
username=BAU
password=3MvN=1T:
grant_type=password
client_id=ACCULAB
client_secret=acculab-secret
```

**Response** (JSON):
```json
{
  "access_token": "token_string",
  "token_type": "Bearer",
  "refresh_token": "refresh_token_string",
  "expires_in": 3600,
  "scope": "scope_string",
  "sessionId": 12345,
  "user": {
    "id": "user_id",
    "username": "BAU",
    "name": "User Name",
    "email": "user@example.com"
  }
}
```

## Browser Storage

The application uses **localStorage** to persist authentication:

```javascript
// Stored under key: "loginSession"
{
  "accessToken": "Bearer token string",
  "refreshToken": "refresh token string",
  "user": { /* user object from API */ },
  "timestamp": "ISO 8601 timestamp"
}
```

Clear this to logout completely, or use the logout button in the dashboard.

## Security Considerations

- **Test Credentials**: The provided credentials (`BAU` / `3MvN=1T:`) are for testing only
- **HTTPS**: Production deployments should use HTTPS only
- **Token Storage**: localStorage is used for demo purposes; production apps should consider more secure alternatives
- **CORS**: API endpoint should have CORS enabled for the domain

## Troubleshooting

### "ng-view not working / not seeing content"
- Ensure you're using a local web server (not opening `file://`)
- Check browser console for errors
- Verify all script files are loading correctly

### "Login fails with CORS error"
- The API endpoint must have CORS enabled
- Check browser console for the actual error message
- Verify credentials are correct

### "Session not persisting"
- Check browser localStorage settings (not blocked)
- Verify you're using the same browser tab
- Check browser console for errors

### "Custom directive not showing content"
- Ensure you're logged in
- Check browser console for errors
- Verify `auth-if` attribute is in the template

## Code Quality

- Clean separation of concerns (services, controllers, directives, filters)
- All business logic in services, not controllers
- Single Responsibility Principle for each component
- Consistent naming conventions following AngularJS style guide
- Comprehensive comments for clarity

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- IE 9+ (with polyfills for older browsers)

## Future Enhancements

- Implement token refresh mechanism
- Add password reset functionality
- Implement user profile management
- Add more sophisticated error handling
- Implement role-based access control
- Add unit and e2e tests

## License

This project is for educational purposes.

## Author

Created as part of the AngularJS to Angular migration hands-on task (2026).
