import { GithubAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { useState, useEffect, useContext, createContext } from 'react';
import { createUser } from './firestore';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const auth = getAuth()

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser)
      createUser(user.uid, user)
      setUser(user)
      return user
    } else {
      setUser(false)
      return false
    }
  }

  const signInWithGithub = () => {
    signInWithPopup(auth, new GithubAuthProvider)
      .then(result => {
        const credential = GithubAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        handleUser(result.user)
      })
  };

  const logOut = () => {
    signOut(auth)
      .then(() => setUser(false))
      .catch(err => console.info(err))
  };

  
  return {
    user,
    signInWithGithub,
    logOut
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId
  }
}