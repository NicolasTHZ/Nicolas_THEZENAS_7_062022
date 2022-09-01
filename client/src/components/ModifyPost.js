import { useState, useEffect } from 'react';
import axios from 'axios';

function ModifyPost ({ postid }) {
    const [commentContent, setCommentContent] = useState("");
    const [post, setPost] = useState("");
    const [newComment, setNewComment] = useState(false);
    const [postForm, setPostForm] = useState(false)
    const [postContent, setPostContent] = useState("");
    const [image, setImage] = useState("");
    const [posts, setPosts] = useState("");
    const [newPost, setNewPost] = useState(false);

    const tokenKey = JSON.parse(localStorage.getItem('token'));
    const userId = tokenKey.userId;
    const name = tokenKey.name;


    async function modifyPost(event) {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("name", name);
        formData.append("postContent", commentContent);
        formData.append("image", image);
        console.log(formData)
        const response = await fetch(`http://localhost:3000/api/post/${postid}`, {
          method: 'POST' ,
          headers: {
            'Authorization': `Bearer ` + tokenKey.token
          },
          body: formData,
        })

        // const newComments = [...comments];
        // console.log(response)
        // console.log(newComment)
        setNewPost(true)
    }



    return (
    <>
        <form onSubmit={ModifyPost} method="post" key={posts._id}>
        <div>
          <label htmlFor="postContent">
          <input type="text" className="postContent" id="postContent" placeholder="Tapez votre post ici"
          value={postContent} onChange={(e) => setPostContent(e.target.value)}></input>
          </label>
        </div>
        <div>
          <label htmlFor="image">
          <input type="file" className="image" id="image" placeholder="Image"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setImage(event.target.files[0]);
          }}></input>
          </label>
        </div>
        <input type="submit"></input>
        <button>Annuler la modification</button>
      </form>
    </>  
    )
}


export default ModifyPost