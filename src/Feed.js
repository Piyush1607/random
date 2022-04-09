import React, { useEffect, useState } from 'react'
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
  const [posts,setPosts]  = useState([]);
  const [input,setInput] = useState("");
  
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
//   console.log(posts)

  const sendPost = (e) =>{
      e.preventDefault();
      db.collection("posts").add({
            name : user.displayName,
            description : user.email,
            message : input,
            photoUrl : user.photoUrl || '',
            timestamp : firebase.firestore.FieldValue.serverTimestamp()
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
                <InputOption Icon = {ImageIcon} title ='Photo' color = '#70B5F9' />
                <InputOption Icon = {SubscriptionsIcon } title ='Video' color = '#E7A33E' />
                <InputOption Icon = {EventNoteIcon} title ='Event' color = '#C0CBCD' />
                <InputOption Icon = {CalendatViewDayIcon} title ='Write Article' color = '#7FC15E' />
            </div>
        </div>

        <FlipMove>
        {posts.map(post => {
            return (<Post
                key={post.id}
                name={post.data.name}
                description ={post.data.description}
                message={post.data.message}
                photoUrl={post.data.photoUrl}
                />)
        })}
        </FlipMove>
        <Post name={'Piyush Jain'} message ={'Wow this worked'} description ={"This is a test"}/>
    </div>
  )
}

export default Feed

