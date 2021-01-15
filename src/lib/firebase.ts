import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const {
  REACT_APP_FIREBASE_APIKEY,
  REACT_APP_FIREBASE_AUTHDOMAIN,
  REACT_APP_FIREBASE_PROJECTID,
  REACT_APP_FIREBASE_STORAGEBUCKET,
  REACT_APP_FIREBASE_MESSAGINGSENDERID,
  REACT_APP_FIREBASE_APPID
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_APIKEY,
  authDomain: REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECTID,
  storageBucket: REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: REACT_APP_FIREBASE_APPID
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const provider = new firebase.auth.GoogleAuthProvider();

