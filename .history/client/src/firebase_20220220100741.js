
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase_config"

import {
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  
 
} from "firebase/auth";

const initializeAuth = () =>{
  initializeApp(firebaseConfig);
}

export default initializeAuth;




