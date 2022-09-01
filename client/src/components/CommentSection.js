import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';


function CommentSection({ postid }) {

    const [image, setImage] = useState("");
    const [comments, setComments] = useState("");


    const tokenKey = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        fetchComments();
      }, []);

    const fetchComments = useCallback(
        () => {
            console.log(postid);
          axios.get(`http://localhost:3000/api/post/${postid}/comment`, {
            'Method': 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ` + tokenKey.token}
          })
          .then((res) => {
            setComments(res.data);
            console.log(comments)
          })
          .catch((err) => {
            console.log(err);
          });
        }
        // [LStoken]
      );

      async function deleteComment (e, id, userId) {
        e.preventDefault();
        
        let article = e.target.closest("article");
        id = article.id
        console.log(tokenKey.token)
        article.remove();
        
        const response = await fetch(`http://localhost:3000/api/post/${id}/comment`, {
          method: 'DELETE' ,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ` + tokenKey.token
            }
        });
      }

      return (
      <div className="comment section">{ comments && comments.map((comments) => (
        <article className='comments-card' id={comments._id} postid={comments.postId} key={comments._id}>
        {comments.imageUrl ? <img src={comments.imageUrl} alt="{posts.image}"></img> : null}
        <p>{comments.name}</p>
        <p>{comments.commentContent}</p>
        <p>{comments.dateTime}</p>
        <div>
        {comments.userId === tokenKey.userId ? (<>
        <button>Modifier</button>
        <button onClick={deleteComment}>Supprimer</button></>):null}
        </div>
        </article>
      )) }
      </div>
      )
}


export default CommentSection
                