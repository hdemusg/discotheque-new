import './App.css';
import { Link } from "react-router-dom"
import GoogleButton from 'react-google-button'
import { useState } from "react"
import Button from 'react-bootstrap/Button'

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyBn34l-JAWUrfrS8AbR5Pl8lYeU8cT9k0c",
    authDomain: "discotheque-ea90f.firebaseapp.com",
    projectId: "discotheque-ea90f",
    storageBucket: "discotheque-ea90f.appspot.com",
    messagingSenderId: "416576467505",
    appId: "1:416576467505:web:a310c4b5efa94622555b10",
    measurementId: "G-HMXESGY1Z4"
  };

  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState("")

  const app = initializeApp(firebaseConfig)
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app)

  console.log(user.displayName)

  function signIn() {
      signInWithPopup(auth, provider).then((result) => {
        console.log('signed in')
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        setUser(result.user)
        console.log(user)
        setLoggedIn(true);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential)
      })
  }

  function handleSignOut() {
      signOut(auth).then(() => {
        console.log('signed out');
        setLoggedIn(false);
        setUser("");
      }).catch((error) => {
        console.log('error')
      });
  }

  return (
    <div className="App">
      <div className='h-full'>
      <div className="nav">
        <h1 class="text"> DISCOTHEQUE </h1> 
      </div>
      <section className='bg-black justify-center p-10 h-screen flex grow'>
          <div>
           {!loggedIn ? 
           <div> 
            <p className="logintext">You are not logged in.</p>
            <GoogleButton
              onClick={signIn}>
            </GoogleButton>
           </div> : 
           <div>
            <p className="logintext">{user.displayName}</p>
            <Button className="bg-[#F00] p-3" onClick={handleSignOut}>Sign Out</Button>{' '}
           </div>}
          </div>
      </section>
      </div>
    </div>
  );
}

export default App;
