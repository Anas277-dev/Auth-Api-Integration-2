🔑 Token-Based Authentication Frontend:
A complete React frontend integrated with an external authentication API.
The app supports user registration, login, forgot password (OTP + reset), secure token handling, and a welcome page displaying decoded user information.

Live Demo:
Vercel Deployment: auth-api-integration-chi.vercel.app
GitHub Repository: https://github.com/Anas277-dev/Auth-Api-Integration

Features:
Register new users (/auth/newuser).
Login with email & password (/auth/login).
Forgot Password Flow:
Send OTP (/auth/send-otp)
Reset password with OTP (/auth/reset-password)
JWT Token Handling:
Store token securely in localStorage.
Decode token using jwt-decode.
Welcome Page showing decoded user details.
Logout functionality to clear token and redirect to login.
Clean, responsive, glassmorphism-inspired UI.

Tech Stack:
React.js (Frontend Framework)
React Router DOM (Routing)
Axios (HTTP Requests)
JWT Decode (Token decoding)
CSS (Custom Styling)

Authentication Flow:
    Register:
        New users register via auth/newuser.
        On success, they can log in with email & password.
        Login
        Users log in via auth/login.
        Backend returns a JWT token, stored in localStorage.
        Welcome Page
        Token is decoded with jwt-decode.
        Displays userId and other details from the token.
        Forgot Password
        Enter email → OTP is sent via auth/send-otp.
        Enter OTP + new password → reset via auth/reset-password.
        Logout
        Clears token from localStorage.
        Redirects back to login.

How to Test:
Register a new user on the Register Page.
Log in with the new account.
View decoded details on the Welcome Page.
Test Forgot Password by sending OTP and resetting password.
Log out and try logging in again with the updated password.