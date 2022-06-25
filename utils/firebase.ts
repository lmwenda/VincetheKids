import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {

    apiKey: "AIzaSyDrZv-Ro0o4oCGlgIb2nDJ-Ik_lKKnUELM",
  
    authDomain: "vincethekids.firebaseapp.com",
  
    databaseURL: "https://vincethekids-default-rtdb.firebaseio.com",
  
    projectId: "vincethekids",
  
    storageBucket: "vincethekids.appspot.com",
  
    messagingSenderId: "473557399366",
  
    appId: "1:473557399366:web:f70138ba1135608e8e9747",
  
    measurementId: "G-F6WD68TNXH"
  
};  

// Initialize Firebase

const app: firebase.app.App = firebase.initializeApp(firebaseConfig);

// Firebase Objects

const auth: firebase.auth.Auth = firebase.auth(app);
const storage: firebase.storage.Storage = firebase.storage(app);
const database: firebase.firestore.Firestore = firebase.firestore(app);

// Exporting Firebase Objects

export { app, auth, database, storage }