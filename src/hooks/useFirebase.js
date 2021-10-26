// FIREBASE
import { useRef, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAM0Q-A-Y9SyIC3tP8_1edQTxQF9C6cKf4',
  authDomain: 'resume-creator-3ef3e.firebaseapp.com',
  projectId: 'resume-creator-3ef3e',
  storageBucket: 'resume-creator-3ef3e.appspot.com',
  messagingSenderId: '91020095700',
  appId: '1:91020095700:web:484ab557ad398553618b41',
};

const initFirebaseAuth = (authStateObserver) => {
  onAuthStateChanged(getAuth(), authStateObserver);
};

const useFirebase = (authStateObserverCallback) => {
  const authStateObserver = useRef(authStateObserverCallback);

  useEffect(() => {
    initializeApp(firebaseConfig);
    initFirebaseAuth(authStateObserver.current);
  }, []);

  async function signIn() {
    let provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  }

  const signOutUser = () => {
    signOut(getAuth());
  };

  const getProfilePicUrl = () => {
    return getAuth().currentUser.photoURL;
  };

  const getUserName = () => {
    return getAuth().currentUser.displayName;
  };

  const getUserId = () => {
    return getAuth().currentUser.uid;
  };

  return {
    signIn,
    signOutUser,
    getProfilePicUrl,
    getUserName,
    getUserId,
  };
};

export { useFirebase };
