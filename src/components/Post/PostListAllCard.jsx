import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import {getImageFromStorage, getPosts, getUser} from "../../utils/index.js";
import {nanoid} from "nanoid";
import {ListContext} from "../../context/ListContext.js";
import PostDetail from "./PostDetail.jsx";

const StyledPostSingleCard = styled.div`
  margin: 1em 0;
  display: flex;
  height: 6vw;
  position: relative;
  
  :hover{
    cursor: pointer;
    .hoverEffect{
      visibility: visible;
    }
  }

  .hoverEffect{
    position: absolute;
    background-color: ${({theme}) => theme.colors.deepGreenBlue2};
    width: 180%;
    height: 110%;
    visibility: hidden;
    left: -40%;
    top: -5%;
    opacity: 0.4;
  }

  .petImageContainer{
    height: 6vw;
    width: 6vw;
    object-fit: cover;
    overflow: hidden;
    border-radius: 0.5vw;

    img{
      height: 100%;
    }
  }
  
  .postDetail{
    margin-left: 1em;
    width: 65%;
    
    h4{
      font-weight: 400;
    }
    
    div{
      display: flex;
      justify-content: space-between;
      
      margin-top: 0.2em;
    }
    
    span{
      font-size: smaller;
      background-color: ${({theme}) => theme.colors.lightGreen};
      color: ${({theme}) => theme.colors.deepGreenBlue2};
      padding: 0.2em 0.5em;
      border-radius: 0.2em;
    }
    
    p{
      font-size: smaller;
    }
  }
`


function PostListSingleCard({post}) {
    // {
    //     "postCreator": "bZhM701orDcqDYGNSa9gtQs4Fjg1",
    //     "description": "Cute",
    //     "price": 0,
    //     "petImage": "PostImage/5200.jpg34UgiDj6IX7zv0czbY80z",
    //     "adoptable": true,
    //     "petName": "Asol",
    //     "createdAt": {
    //         "seconds": 1685518480,
    //         "nanoseconds": 873000000
    //     },
    //     "location": {
    //         "latitude": 40.74958176387884,
    //         "longitude": -73.79543272100697
    //     },
    //     "id": "pjtblMfUQFGNrz9B8KND"
    // }
    const [imageUrl, setImageUrl] = useState('')
    const {addToTheList} = useContext(ListContext)

    useEffect(()=>{
        getImageFromStorage(post.petImage)
            .then(url => setImageUrl(url))
            .catch(err => console.error(err))
    }, [])
    return (
        <StyledPostSingleCard onClick={() => addToTheList(<PostDetail post={post} />, true)}>
            <div className="hoverEffect"></div>
            <div className="petImageContainer">
                <img src={imageUrl} alt=""/>
            </div>

            <div className="postDetail">
                <div>
                    <h4>{post.petName}</h4>
                    <span>{post.adoptable ? "Adoptable" : `$${post.price}`}</span>
                </div>
                <p>
                    {post.description}
                </p>
            </div>
        </StyledPostSingleCard>
    );
}


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