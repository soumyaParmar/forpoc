// src/Login.js

import React from 'react';
import { signInWithGoogle, logout } from './firebase';
import { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Login() {
  const [user, setUser] = useState(null);

  // Listen to the authentication state changes
  React.useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser)
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.displayName}</h1>
          <img src={user.photoURL} alt="Profile" />
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Login with Google</button>
      )}
    </div>
  );
}

export default Login;
