import './App.css';
import { Link } from "react-router-dom"
import GoogleButton from 'react-google-button'
import { useState } from "react"
import Button from 'react-bootstrap/Button'

import { Theme } from '@twilio-paste/core/theme';
import { Box } from '@twilio-paste/box';
import { Grid, Column } from '@twilio-paste/core/grid';
import { Label } from '@twilio-paste/core/label';
import { Input } from '@twilio-paste/core/input';
import { Card } from '@twilio-paste/core/card';
import { Heading } from '@twilio-paste/core/heading';

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

import Dashboard from './Dashboard';
import Navbar from './components/Navbar';

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
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null)
  const [icon, setIcon] = useState(null)
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setUsername(event.target.username.value);
  }

  const app = initializeApp(firebaseConfig)
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app)

  console.log(user.displayName)

  function signOutButton() {
    return (
      <Button className="bg-[#F00] p-3" onClick={handleSignOut}>Sign Out</Button>
    )
  }

  function signIn() {
      signInWithPopup(auth, provider).then((result) => {
        console.log('signed in')
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        setUser(result.user)
        console.log(result.user)
        setLoggedIn(true);
        setEmail(result.user.email)
        setIcon(result.user.photoURL)
        console.log(email)
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
     <Navbar/>
     
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
            <Theme.Provider theme='default'>
              <Grid gutter='space30'>
                <Column span={10} offset={1}>
                    <Dashboard username={user.displayName} icon={icon} email={email} setUsername={setUsername} signOut={handleSignOut} />
                </Column>
              </Grid>
            </Theme.Provider>
           </div>}
          </div>
      </section>
      </div>
    </div>
  );
}

export default App;
