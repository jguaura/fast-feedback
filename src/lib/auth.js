import { GithubAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useState, useEffect, useContext, createContext } from 'react';
import { firebase } from './firebase';

console.info('f2', firebase)

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  console.log('user - useProvideAuth', user)

  const auth = getAuth()

  const signInWithGithub = () => {
    signInWithPopup(auth, new GithubAuthProvider)
      .then(result => {
        const credential = GithubAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        setUser(result.user)
      })
  };

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  // useEffect(() => {
  //   const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       setUser(user);
  //     } else {
  //       setUser(false);
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);

  return {
    user,
    signInWithGithub,
    signOut
  };
}
