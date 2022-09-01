import { useState, useEffect } from 'react';
import axios from 'axios';

function CommentForm ({ postid }) {
    const [commentContent, setCommentContent] = useState("");
    const [image, setImage] = useState("");
    const [comments, setComments] = useState("");
    const [newComment, setNewComment] = useState(false);
    const [commentForm, setCommentForm] = useState(false)

    const tokenKey = JSON.parse(localStorage.getItem('token'));
    const userId = tokenKey.userId;
    const name = tokenKey.name;

    async function createComment(event) {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("name", name);
        formData.append("commentContent", commentContent);
        formData.append("image", image);
        console.log(formData)
        const response = await fetch(`http://localhost:3000/api/post/${postid}/comment`, {
          method: 'POST' ,
          headers: {
            'Authorization': `Bearer ` + tokenKey.token
          },
          body: formData,
        })

        const newComments = [...comments];
        console.log(response)
        console.log(newComment)
        setNewComment(true)
    }

    function addComment () {
        setCommentForm(true)
    }



    return (
    <>{commentForm ?
    <form onSubmit={createComment} method="post">
        <div>
            <label htmlFor="commentContent">
                <input type="text" className="postContent" id="postContent" placeholder="Tapez votre post ici"
                value={commentContent} onChange={(e) => setCommentContent(e.target.value)}></input>
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
    </form>: <button onClick={addComment}>Ajouter un commentaire</button>}
    </>  
    )
}


export default CommentForm