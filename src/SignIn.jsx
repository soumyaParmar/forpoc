import { GoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from 'react';

const AuthComponent = () => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  // Initialize Google Identity Services
  useEffect(() => {
    const initGoogleAuth = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: '606812803775-bg3lhfjdqj75u71u04n9gndo0i2rbh60.apps.googleusercontent.com', // Replace with your actual client ID
        });
      } else {
        console.error('Google API not loaded');
      }
    };

    initGoogleAuth();
  }, []);

  // Set up the silent refresh mechanism
  useEffect(() => {
    const interval = setInterval(() => {
      if (accessToken) {
        console.log('Attempting silent renew...');
        performSilentLogin(); // Trigger silent renewal every 5 seconds
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [accessToken]);

  const handleLoginSuccess = (response) => {
    console.log('Login Success:', response);
    setUser(response);  // Store user info here
    setAccessToken(response.credential);  // Store the access token (JWT)
  };

  const handleLoginFailure = (error) => {
    console.error('Login Failed:', error);
  };

  const handleLogout = () => {
    setUser(null);  // Clear user data on logout
    setAccessToken(null); // Clear the token
    console.log('User logged out');
  };

  // Silent login to refresh the token without showing the login prompt
  const performSilentLogin = () => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.error('Silent login failed or was skipped. User might be logged out.');
        } else {
          console.log('Silent login success');
          // No direct method to fetch the new token; the user is already authenticated.
          const newToken = notification.credential; // Assuming the token would be in this format
          setAccessToken(newToken); // Update the access token
          console.log('New token:', newToken);
        }
      });
    } else {
      console.error('Google API not loaded');
    }
  };

  return (
    <div>
      {!user ? (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      ) : (
        <div>
          <h2>Welcome, User!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
