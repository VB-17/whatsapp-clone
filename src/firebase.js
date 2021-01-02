import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBjRCcqFvOG9VyiVr45JRZkF_-OpT5vkXI",
    authDomain: "whatsapp-clone-99edc.firebaseapp.com",
    projectId: "whatsapp-clone-99edc",
    storageBucket: "whatsapp-clone-99edc.appspot.com",
    messagingSenderId: "384886149751",
    appId: "1:384886149751:web:50ba3b26ffbeb6c0026c72",
    measurementId: "G-KBGEWRVBJJ"
};

const firebaseApp =  firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth , provider } ;
export default db;