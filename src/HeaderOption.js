import { Avatar } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from './features/counter/userSlice'
import './HeaderOption.css'

const HeaderOption = ({avatar ,Icon , propic ,title ,onClick}) => {
  return (
    <div className = "headerOption" onClick={onClick}>
        {Icon && <Icon className="headerOption__icon"/>}
        {avatar && <Avatar src= {propic} className = "headerOption__icon" ></Avatar>}
        <h3 className='headerOption__title'>{title}</h3>
    </div>
  )
}

export default HeaderOption