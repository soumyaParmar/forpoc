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
    setInterval(()=>{
      x();
    },10*60*1000)
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  let x = async() =>{
    const auth = getAuth();
    const newz = auth.currentUser;
    console.log(newz,"data")
   // if(user != null){
      const token = await newz.getIdToken(/* forceRefresh */ true);
      console.log(token)
   // }
  }

  const logOut = () =>{
    logout();

    // fetch(`https://accounts.google.com/o/oauth2/revoke?token=${user.accessToken}`, {
    //   method: 'POST',
    //   mode: 'cors'
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       console.log('Token successfully revoked.');
    //     } else {
    //       console.error('Failed to revoke token.');
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('Error revoking token:', error);
    //   });
  }


  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.displayName}</h1>
          <img src={user.photoURL} alt="Profile" />
          <button onClick={logOut}>Logout</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Login with Google</button>
      )}
    </div>
  );
}

export default Login;
