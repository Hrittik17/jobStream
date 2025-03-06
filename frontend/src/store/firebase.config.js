// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDN15ErIWhfqxQUqj-EqrD-8OjAOoIiiRA",
  authDomain: "jobstream-3dfef.firebaseapp.com",
  projectId: "jobstream-3dfef",
  storageBucket: "jobstream-3dfef.firebasestorage.app",
  messagingSenderId: "83397715975",
  appId: "1:83397715975:web:32a51635b73599eed422a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const userAvatarUploads = getStorage(app)