
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase_config"



const initializeAuth = () =>{
  initializeApp(firebaseConfig);
}

export default initializeAuth;




