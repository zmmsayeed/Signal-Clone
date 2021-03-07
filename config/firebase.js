import * as firebase from 'firebase';
import "firebase/auth";
// import "firebase/database";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDGtNK0fQ8fCX4lUMqwpCWIkk1M6wUe1iY",
    authDomain: "signal-clone-zimam.firebaseapp.com",
    projectId: "signal-clone-zimam",
    storageBucket: "signal-clone-zimam.appspot.com",
    messagingSenderId: "387412115765",
    appId: "1:387412115765:web:368ea2eccd71af0b624c7c"
};

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };