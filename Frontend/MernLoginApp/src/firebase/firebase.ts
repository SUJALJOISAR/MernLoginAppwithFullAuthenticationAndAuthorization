import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC7HBYFtu6bXgCcSOrQ5bjtQoVL8-VlT6A",
  authDomain: "mernloginapp-d6e6c.firebaseapp.com",
  projectId: "mernloginapp-d6e6c",
  storageBucket: "mernloginapp-d6e6c.appspot.com",
  messagingSenderId: "898841927288",
  appId: "1:898841927288:web:98104b06718fdde18a978d",
  measurementId: "G-1QR5B33GNP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
// const analytics = getAnalytics(app);


export {app,auth};