import React, { useState } from 'react'
import './Login.css'
import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { login } from './features/counter/userSlice'

const Login = () => {
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')
  const [profilePic,setProfilePic] = useState('')
  const dispatch = useDispatch();

  const loginToApp = e =>{
    e.preventDefault()
    auth.signInWithEmailAndPassword(email,password)
    .then(userAuth =>{  
        dispatch(login({
            email : userAuth.user.email,
            uid :userAuth.user.uid,
            displayName : userAuth.user.displayName,
            photoUrl : userAuth.user.photoURL
        }))
    }).catch(err => alert(err))
  }

  const register = e =>{
    e.preventDefault()
    if(!name){
        return alert("Please Enter a full name")
    }

    auth.createUserWithEmailAndPassword(email,password)
    .then((userAuth) =>{
        userAuth.user.updateProfile({
            displayName : name,
            photoURL : profilePic
        }).then(()=>{
            dispatch(login({
                email : userAuth.user.email,
                uid : userAuth.user.uid,
                displayName :name,
                photoUrl : profilePic,
            }))
        })
    })
    .catch(err=>{
        alert(err.message)
    })
  } 
  return (
    <div className='login'>
        <img src="https://www.edigitalagency.com.au/wp-content/uploads/Linkedin-logo-png.png"
         alt="" />

         <form >
             <input type="text" value={name} onChange ={e => setName(e.target.value)} placeholder='Full Name (required)' />
             <input type="text" value={profilePic} onChange ={e => setProfilePic(e.target.value)} placeholder='Profile picture url (optional)' />
             <input type="email" value={email} onChange ={(e) => setEmail(e.target.value)} placeholder='enter email'/>
             <input type="password" value={password} onChange = {e => setPassword(e.target.value)} placeholder='password'/>
             <button type='submit' onClick={loginToApp}>Sign In</button>
         </form>

         <p>Not a Member ?</p>{" "}
            <span className='login__register' onClick={register}>Register Now</span>
    </div>

    
  )
}

export default Login