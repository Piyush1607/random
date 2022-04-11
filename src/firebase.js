
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage'
import 'firebase/compat/firestore';
import { getStorage} from "firebase/storage";

// const storageRef = ref(storage);
const firebaseConfig = {
  apiKey: "AIzaSyD-4HkVhRQCHcoYtNjl5l_5q-MyWMa18w4",
  authDomain: "linkedin-clone-dc320.firebaseapp.com",
  projectId: "linkedin-clone-dc320",
  storageBucket: "linkedin-clone-dc320.appspot.com",
  messagingSenderId: "585194885424",
  appId: "1:585194885424:web:e4bb8b40311754ebd938f5",
  measurementId: "G-8226T9WKBS"
};



const firebaseApp = firebase.initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp)
const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db , auth ,storage };