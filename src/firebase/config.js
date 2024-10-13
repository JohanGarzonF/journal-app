// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDS_ZkW1FCtnluyRF-_kO9Mpmm-R-s3QZM',
  authDomain: 'react-course-b6659.firebaseapp.com',
  projectId: 'react-course-b6659',
  storageBucket: 'react-course-b6659.appspot.com',
  messagingSenderId: '1076649686022',
  appId: '1:1076649686022:web:d954efa7b6db96272d7f87'
}

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig)
export const FirebaseAuth = getAuth( FirebaseApp )
export const FirebaseDB = getFirestore( FirebaseApp )
