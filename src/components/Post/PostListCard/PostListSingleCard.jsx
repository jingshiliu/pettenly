import styled from "styled-components";
import React, {useContext, useEffect, useState} from "react";
import {deletePost, getImageFromStorage} from "../../../utils/index.js";
import {AppContext} from "../../../context/AppContext.js";
import PostDetail from "../PostDetail.jsx";
import {auth} from "../../../config/firebase.js";

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
    z-index: 1;
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
    position: relative;
    
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
    
    .buttons{
      position: absolute;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      z-index: 2;

      button{
        background-color: ${({theme}) => theme.colors.deepGreenBlue2};
        color: ${({theme}) => theme.colors.lightGreen2};
        padding: 0.3em 1em;
        border-radius: 0.2em;
        margin-top: 0.2em;
      }
    }
  }
`


function PostListSingleCard({post, isOwnPost}) {
    const [imageUrl, setImageUrl] = useState('')
    const {addToTheList, refreshPosts} = useContext(AppContext)
    if(isOwnPost === undefined){
        isOwnPost = auth?.currentUser?.uid === post.postCreator
    }

    useEffect(()=>{
        getImageFromStorage(post.petImage)
            .then(url => setImageUrl(url))
            .catch(err => console.error(err))
    }, [])
    return (
        <StyledPostSingleCard
            className={'PostListSingleCard'}
        >
            <div className="hoverEffect"
                 onClick={() => addToTheList(<PostDetail post={post} />, true)}
            />
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
                {isOwnPost
                    ?
                    <div className={'buttons'}>
                        <button onClick={() => {
                            deletePost(post.id)
                            refreshPosts()
                        }}>Delete</button>
                    </div>: null}
            </div>
        </StyledPostSingleCard>
    );
}

export default PostListSingleCard;
