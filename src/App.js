import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, connectFirestoreEmulator } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, getRedirectResult, getAuth, onAuthStateChanged, connectAuthEmulator, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import FirstAiderDashboard from './FirstAiderDashboard';
import PatientDashboard from "./PatientDashboard";

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
// connectFirestoreEmulator(db, 'localhost', 8080);
// connectAuthEmulator(auth, "http://localhost:9099");

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: null,
	    email: "",
      password: "",
      db: db,
    };
  }

  componentDidMount() {
    
    onAuthStateChanged(auth, (userCredential) => {
      console.log("state changing...")
      if (userCredential) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.setState({
          user: userCredential,
        });
        console.log("signed in");
        console.log(userCredential);
        console.log(this.state.user);
        // console.log(this.state.user.uid === null);
        // ...
      } else {
        // User is signed out
        // ...
        this.setState({
          user: null,
        });
        console.log("signed out");
        console.log(this.state.user);
      }
    });
  }

  signIn = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCredential) => {
        // Signed in 
        this.setState({
          user: userCredential.user
        });
        alert("logged in!");
        console.log(this.props.user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  signUp = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCredential) => {
        // Signed in 
        this.setState({
          user: userCredential.user
        });
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
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Tiny Town Community First Response</h1>
        </header>
        <main>
          {
            (typeof this.state.user !== "undefined" && this.state.user !== null) ?
            <FirstAiderDashboard db={this.state.db}/>
            :
            // user.role === "firstAider"
            // ?
            // :
            // <PatientDashboard/>
            <>
            <form onSubmit={this.signUp}>
              <input
                type="email"
                placeholder="email"
                onChange={(e) => this.setState({email: e.target.value})}
                value={this.state.email}
              />
              <input
                type="password"
                placeholder="password"
                onChange={(e) => this.setState({password: e.target.value})}
                value={this.state.password}
              />
              <input type="submit" value="Sign up"/>
            </form>
            <form onSubmit={this.signIn}>
              <input
                type="email"
                placeholder="email"
                onChange={e => this.setState({email: e.target.value})}
                value={this.state.email}
              />
              <input
                type="password"
                placeholder="password"
                onChange={e => this.setState({password: e.target.value})}
                value={this.state.password}
              />
              <input type="submit" value="Sign in"/>
            </form>
            </>
        }
        </main>
      </div>
    );
  }
}

export default App;
