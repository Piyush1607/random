import React from 'react'
import './Header.css'
import SearchIcon from "@material-ui/icons/Search"
import HomeIcon from "@material-ui/icons/Home"
import  SupervisorAccountIcon  from '@material-ui/icons/SupervisorAccount'
import ChatIcon from "@material-ui/icons/Chat"
import BussinessCentreIcon from "@material-ui/icons/BusinessCenter"
import NotificationsIcon from "@material-ui/icons/Notifications"
import HeaderOption from './HeaderOption'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from './firebase'
import { logout, selectUser } from './features/counter/userSlice'

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)

  const logOutOfApp = e => {
    dispatch(logout())
    auth.signOut();
  }
  return (
    <div className='header'>        
        <div className="header__left">
            <img src= "https://i0.wp.com/logotaglines.com/wp-content/uploads/2021/11/LinkedIn-Logo-Tagline-Slogan-founder-owner.jpg?resize=480%2C480&ssl=1" alt="" />
            <div className="header__search">
                <SearchIcon/>
                <input type="text" placeholder='Search' />
            </div>
        </div>

        <div className="header__right">
            <HeaderOption Icon ={HomeIcon} title = 'Home'/>
            <HeaderOption Icon ={SupervisorAccountIcon} title = "Connections"/>
            <HeaderOption Icon ={BussinessCentreIcon} title = "Jobs"/>
            <HeaderOption Icon ={ChatIcon} title = "Messaging"/>
            <HeaderOption Icon ={NotificationsIcon} title = "Notifications"/>

            <HeaderOption 
            avatar = {true}
            title = "Me"
            onClick={logOutOfApp}
            />
        </div>
    </div>
  )
}

export default Header
