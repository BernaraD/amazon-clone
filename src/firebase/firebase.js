import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyCey0TnLILTGFb3OmHjcsD9MWN2DdalZu4",
    authDomain: "clone-4283f.firebaseapp.com",
    projectId: "clone-4283f",
    storageBucket: "clone-4283f.appspot.com",
    messagingSenderId: "1016519975993",
    appId: "1:1016519975993:web:c8b9e0fc33f658a06d99e8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };