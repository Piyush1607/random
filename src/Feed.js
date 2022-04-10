import React, { useEffect, useRef, useState } from 'react'
import CreateIcon from '@material-ui/icons/Create'
import './Feed.css'
import {db} from './firebase'
import InputOption from './InputOption'
import ImageIcon from '@material-ui/icons/Image'
import SubscriptionsIcon from '@material-ui/icons/Subscriptions'
import EventNoteIcon from '@material-ui/icons/EventNote'
import CalendatViewDayIcon from  "@material-ui/icons/CalendarViewDay"
import Post from './Post'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import { useSelector } from 'react-redux'
import { selectUser } from './features/counter/userSlice'
import FlipMove from 'react-flip-move'

const Feed = () => {
   
  const user = useSelector(selectUser)  
  const [posts,  setPosts]  = useState([]);
  const [input,setInput] = useState("");
  const [image,setImage] = useState('');
  const ref = useRef(null)
//   console.log(user)

  let loadFile = function(event) {
    setImage( URL.createObjectURL(event.target.files[0]));
  }

  useEffect(()=>{
    db.collection("posts")
    .orderBy('timestamp','desc')
    .onSnapshot(snapshot =>{
        setPosts(snapshot.docs.map(doc => (
            {
                id  : doc.id,
                data : doc.data(),
            }
        ) ))
    })

  },[]);

  const sendPost = (e) =>{
      e.preventDefault();
      db.collection("posts").add({
            name : user.displayName,
            description : user.email,
            message : input,
            photoUrl : user.photoURL || '',
            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
            likes : 0,
            postImg : image,
            dislikes : 0,
            comments : []
      });

      setInput('')
  };

  return (
    <div className='feed'>
        <div className="feed__inputContainer">
            <div className="feed__input">
                <CreateIcon/>
                <form >
                    <input type="text" value={input} onChange={e => setInput(e.target.value)}/>
                    <button  type='submit' onClick={sendPost}>Send</button>
                </form>
            </div>
            <div className="feed__inputOptions">
           
                <div className="inputOption">
                    <label htmlFor="files"> 
                        <ImageIcon htmlColor='#70B5F9' />
                        <h4>Image</h4>
                    </label>
                    <input id={"files"}  onChange={loadFile} className='media' style={{display : 'none'}} accept= "*" type="file"/>
                    <button style={{display : "none"}} type= "submit" >Upload Image</button>
                </div>

                <div className="inputOption">
                    <label htmlFor="files">
                        <SubscriptionsIcon htmlColor = '#E7A33E' /> 
                        <h4>Video</h4>
                    </label>
                    <input id={"files"}  className='media' style={{display : 'none'}} accept= "video/*" type="file"/>
                </div>

                <InputOption Icon = {EventNoteIcon} title ='Event' color = '#C0CBCD' />
                <InputOption Icon = {CalendatViewDayIcon} title ='Write Article' color = '#7FC15E' />
            </div>
        </div>

        <FlipMove>
        {posts.map(post => {
            // console.log(post.id)
            return (<Post
                key={post.id}
                ID = {post.id}
                name={post.data.name}
                description ={post.data.description}
                message={post.data.message}
                photoUrl={post.data.photoUrl}
                numLikes = {post.data.likes }
                numDisLikes = {post.data.dislikes}
                postImg = {post.data.postImg}
                />)
        })}
        </FlipMove>
    </div>
  )
}

export default Feed

