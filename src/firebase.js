import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/storage'
import "firebase/firestore";

const appDB = firebase.initializeApp({
apiKey: process.env.REACT_APP_PROJECT_FIREBASE_KEY,
authDomain: process.env.REACT_APP_PROJECT_FIREBASE_AUTH_DOMAIN,
projectId: process.env.REACT_APP_PROJECT_FIREBASE_PROJECT_ID,
storageBucket: process.env.REACT_APP_PROJECT_FIREBASE_STORAGE_BUCKET,
messagingSenderId: process.env.REACT_APP_PROJECT_FIREBASE_MSG_SENDER_ID,
appId: process.env.REACT_APP_PROJECT_FIREBASE_APP_ID
})


export const appAuth = appDB.auth();
export const appStorage = appDB.storage();
export const appFirestore = appDB.firestore();
export default appDB