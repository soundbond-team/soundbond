
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase_config"

import {
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  
 
} from "firebase/auth";



const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

signInWithPopup (auth,googleProvider)
.then((result)=>{
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    const user = result.user;
    console.log(user);
}).catch((error)=>{
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
});

export {signInWithPopup};


