import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {nanoid} from "nanoid";
import {getPosts, getUser} from "../../../utils/index.js";

import PostListSingleCard from './PostListSingleCard.jsx'

const StyledPostListAllCard = styled.div`
  width: 19vw;
  height: 75vh;
  border-radius: 1.4em;
  background-color: ${({theme}) => theme.colors.deepGreenBlue};
  padding: 20px;
  color: ${({theme}) => theme.colors.lightGreen};
  opacity: 0.94;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  
  h2{
    font-weight: 400;
  }
  
  hr{
    border: none;
    border-bottom: 1px solid ${({theme}) => theme.colors.lightGreen};
  }
  
  .postsContainer{
    overflow: scroll;
  }
`

function PostListAllCard({postList, userData}) {
    const [posts, setPosts] = useState(postList)
    const [user, setUser] = useState(userData)

    useEffect(()=>{
        if(! postList){
            getPosts()
                .then(postsData => setPosts(postsData))
                .catch(err => console.error(err))
        }

        if(! userData){
            getUser()
                .then(userData =>{
                    setUser(userData)
                })
                .catch(err => console.error(err))
        }
    }, [])

    console.log(posts)

    return (
        <StyledPostListAllCard>
            <div className="cardTitle">
                <h2>
                    {user.username}'s Post
                </h2>
                <hr/>
            </div>
            <div className="postsContainer">
                {posts.map(post => <PostListSingleCard post={post} key={nanoid()}/>)}
            </div>
        </StyledPostListAllCard>
    );
}

export default PostListAllCard;