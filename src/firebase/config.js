import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBrJQp70o6LIm0G14SOGfajqGgJZNr-l7g",
    authDomain: "privatechaters.firebaseapp.com",
    projectId: "privatechaters",
    storageBucket: "privatechaters.appspot.com",
    messagingSenderId: "55131541964",
    appId: "1:55131541964:web:03f240123f114ac6a6cd69",
    measurementId: "G-DC3K8C8D3T"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
export const projectAuth = firebase.auth(); // for auth
export const projectFirestore = firebase.firestore();  // for realtime db
export const projectStorage = firebase.storage();  // for storage
// timestamp
export const timestamp = firebase.firestore.Timestamp;