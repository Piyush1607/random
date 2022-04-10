import React, { useState , forwardRef, useEffect } from 'react'
import './Post.css'
import InputOption from './InputOption'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined'
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined"
import SendOutlinedIcon from "@material-ui/icons/SendOutlined"
import Comments from './Comments'
import CommentList from './CommentList'
import { Avatar } from '@material-ui/core'
import {db} from './firebase'


const Post = forwardRef(({ID,name , description , message ,propic, photoUrl,numLikes , numDisLikes,postImg },ref) => { 
    const [comment, setComment] = useState('none')
    const [list,setList] = useState([]);

    useEffect(()=>{
      db.collection("posts").onSnapshot(snap=>{
        setList(snap.docs.find(doc => doc.id === ID).data().comments)
        // console.log(list)
      })
    },[])

    return (
        <div ref ={ref} className='post' id={ID}>
            <div className="post__header">
                <Avatar src ={photoUrl}>{name[0]}</Avatar>
                <div className="post__info">
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div> 
            </div>
    
            <p>{message}</p>
            <div className="post__body">
               {postImg!== '' ?  <img className ="uploaded__img" src= {postImg} alt="" /> : ''}
            </div>
    
            <div className="post__buttons">
                <InputOption Icon ={ThumbUpAltOutlinedIcon} id = {ID} flag={true} color = '#90C8F9' num={numLikes}  title='Like'/>
                <InputOption Icon ={ThumbDownAltOutlinedIcon} id={ID} color='#90C8F9' num={numDisLikes} flag={false} title = 'Dislike'/>
                <div className="inputOption" onClick={() =>{
                    setComment(val => val === 'initial' ? 'none' : 'initial')
                }}>
                    <ChatOutlinedIcon htmlColor="#AA00AA"/>
                    <h4>Comment</h4>
                </div>
                <InputOption Icon ={SendOutlinedIcon} color = '#7FC15E' title= 'Send'/>
            </div>
            <Comments keyID={ID} show={comment} />                    

            <div className="stats">
                <span>{numLikes+" likes"}</span>
                <span>{numDisLikes+" dislikes"}</span>
            </div>
            <CommentList list ={list} show={comment}/>
        </div>
      )
})

export default Post