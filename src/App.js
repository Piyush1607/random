import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import SideBar from './SideBar';
import Feed from './Feed'
import Login from './Login';
import { login, logout, selectUser } from './features/counter/userSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { auth } from './firebase';
import Widgets from './Widgets'

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    auth.onAuthStateChanged(userAuth =>{

      if(userAuth){
        dispatch(login({
          email : userAuth.email,
          uid : userAuth.uid,
          displayName :userAuth.displayName,
          photoUrl : userAuth.profilePic,
        }))
      }
      else{
        dispatch(logout())
      }
    })
  },[])


  const user = useSelector(selectUser)
  return (
    <div className="app">
      <Header/>
      {!user ? <Login/> :(
        <div className="app__body">
        <SideBar/>
        <Feed/>
        <Widgets/>
      </div>
      )}
    </div>

  );
}

export default App;
