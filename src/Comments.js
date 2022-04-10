import React, { useEffect, useState } from 'react'
import './Post.css'
import {db,auth} from './firebase'
import './Post.css'
import firebase from 'firebase/compat/app';

const Comments = ({show,keyID}) => {
  const [input,setInput] = useState("");
  
  const addComment = (e) => {
    e.preventDefault();
    if(input.trim().length === 0)
      return alert('Enter some text')
    db.collection("posts").doc(keyID).update({
      comments : firebase.firestore.FieldValue.arrayUnion(input)
    }) 
    setInput('')
  }

  return (
    <div className='comments' style={{display : show}}>
       <form  action='submit'>
       <textarea value={input} onChange = {e => setInput(e.target.value)}
          name="comment" placeholder='Write your Comment here ....' cols="30" rows="10">
       </textarea>

       <button 
            onClick=
            {e => {addComment(e) }}  
            className ="btn__post"
            type="submit">
            Post
          </button>
       </form>
    </div>
  )
}

export default Comments