import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBYkrdmt1ouX-5rQh-xXgd6WjJmZpw9Yyk',
  authDomain: 'neww-69acc.firebaseapp.com',
  projectId: 'neww-69acc',
  storageBucket: 'neww-69acc.appspot.com',
  messagingSenderId: '510863725256',
  appId: '1:510863725256:web:ec931b2f74e6fe127d0bfd',
  measurementId: 'G-1KQKK3FQ7W'
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
