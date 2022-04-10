import React, { useState } from 'react'
import './InputOption.css'
import {db} from './firebase'
import Comments from './Comments'
import { selectUser } from './features/counter/userSlice'
import { useDispatch } from 'react-redux'

const InputOption = ({Icon,title,color,num,id,flag,type,inp }) => {
  const dispatch = useDispatch();

  const logI = () => {
    db.collection("posts").doc(id).update({
      likes : num + 1
    })
  }

  const logD = () => {
    db.collection("posts").doc(id).update({
      dislikes : num + 1
    })
  }


  return (
    <div className='inputOption' onClick={flag ? logI :logD}>
         <Icon style ={{color : color}}/>
          <h4>{title}</h4>
    </div>
  )
}

export default InputOption