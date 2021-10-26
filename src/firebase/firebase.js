import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Firebase Config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
};

// Firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// DB
const db = firebaseApp.firestore();

// Auth
const auth = firebase.auth();

// Google Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Enable offline mode
firebase.firestore().enablePersistence()
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
      console.log(err);
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
      console.log(err);
    }
  });

// Function to create user profile document
const createUserProfileDocument = async (user) => {
  // Document ref
  const docRef = db.collection("users").doc(user.uid);

  // snapShot
  const snapShot = await docRef.get();

  if (!snapShot.exists) {

    const { displayName, email } = user;
    const createdAt = new Date();

    let display_name;

    if (!!displayName) {
      display_name = displayName;
    } else {
      display_name = email;
    }

    try {
      await docRef.set({
        displayName: display_name,
        email,
        createdAt,
        breakStart: {},
        breakEnd: {}
      })
    } catch (error) {
      console.log('Error Creating User', error.message);
    }
  }

  return docRef;
}

export { db, auth, googleProvider, createUserProfileDocument };