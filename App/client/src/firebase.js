import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCMlRaoetGmVp4ZwQ_9_UD4RT2n52zoEY4",
    authDomain: "react-project941110.firebaseapp.com",
    projectId: "react-project941110",
    storageBucket: "react-project941110.appspot.com",
    messagingSenderId: "236463872290",
    appId: "1:236463872290:web:d9a92eadc3621dd751ed7b"
};


firebase.initializeApp(firebaseConfig)

export default firebase;