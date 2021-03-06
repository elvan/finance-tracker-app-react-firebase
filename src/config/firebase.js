import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCFMADaHSuJb7_OGSI8fDjnArSKlYRMSjU',
  authDomain: 'finance-tracker-app-react.firebaseapp.com',
  projectId: 'finance-tracker-app-react',
  storageBucket: 'finance-tracker-app-react.appspot.com',
  messagingSenderId: '886033841873',
  appId: '1:886033841873:web:5a269afb8b68442bc00ff0',
};

firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();

const timestamp = firebase.firestore.Timestamp;

export { projectAuth, projectFirestore, timestamp };
