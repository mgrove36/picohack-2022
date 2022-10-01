import logo from './logo.svg';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, getRedirectResult, connectAuthEmulator } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { useState } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyCQ3FcfwlAckhZNEVz3RmGGGuscW1jWDHY",
  authDomain: "pico22.mgrove.uk",
  databaseURL: "https://picohack-2022-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "picohack-2022",
  storageBucket: "picohack-2022.appspot.com",
  messagingSenderId: "200913112341",
  appId: "1:200913112341:web:4f0edd8dfa37df258bad1c",
  measurementId: "G-2BENT50640"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);


// emulators
connectFirestoreEmulator(db, 'localhost', 8080);
connectAuthEmulator(auth, "http://localhost:9099");



// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
// }});





function App() {
  const signIn = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        alert("logged in!");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const signUp = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        alert("logged in!");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // ..
      });
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Tiny Town Community First Response</h1>
      </header>
      <main>
        <form onSubmit={signUp}>
          <input
            type="email"
            placeholder="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <input type="submit" value="Sign up"/>
        </form>
        <form onSubmit={signIn}>
          <input
            type="email"
            placeholder="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <input type="submit" value="Sign in"/>
        </form>
      </main>
    </div>
  );
}

export default App;
