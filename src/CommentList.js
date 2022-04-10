import React from 'react'
import './Post.css'
import { selectUser } from './features/counter/userSlice'
import { useSelector } from 'react-redux'
import { Avatar } from '@material-ui/core'

const CommentList = ({list,show}) => {
  const user = useSelector(selectUser)  
//   console.log(list)
  return (
    <div className='commentList' style={{display :show}}>
        {list.map((com,idx )=>{
            return (
                <div className='posted__comment' key={idx}>
                    <div className='comm_info'>
                        <Avatar src={user.photoUrl}>{user.displayName[0]}</Avatar>
                        <span>{user.displayName}</span>
                    </div>
                    <p className='cm'>{com}</p>
                </div>
            )
        })}
    </div>
  )
}

export default CommentList