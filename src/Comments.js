import React, { useState } from 'react'
import './Post.css'
import {db} from './firebase'
import { useEffect } from 'react'
import './Post.css'
import firebase from 'firebase/compat/app';

const Comments = ({show,keyID}) => {
  const [input,setInput] = useState("");

  const addComment = (e) => {
    e.preventDefault();
    if(input.trim().length === 0)
    return alert('enter a comment')
    db.collection("posts").doc(keyID).update({
      comments : firebase.firestore.FieldValue.arrayUnion(input)
    }) 
  }

  return (
    <div className='comments' style={{display : show}}>
       <form action='submit' >
       <textarea value={input} onChange = {e => setInput(e.target.value)} onKeyDown ={
              e=>{
                if(e.key === "Enter")
                addComment(e)
              }
            }
          name="comment" placeholder='Write your Comment here ....' cols="30" rows="10">
       </textarea>
         <button className='post__comment'
            onClick=
            {e => {
              addComment(e) 
            }}
            
            type="submit">
              Post
          </button>
       </form>
    </div>
  )
}

export default Comments