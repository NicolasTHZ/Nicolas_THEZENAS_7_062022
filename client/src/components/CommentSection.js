import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import "../pages/styles.css";
import { AiOutlineReload, AiFillLike, AiOutlineLike } from 'react-icons/ai'
import moment from 'moment'

function CommentSection({ postid }) {

    const [image, setImage] = useState("");
    const [comments, setComments] = useState("");
    const [newComment, setNewComments] = useState(false);


    const tokenKey = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        fetchComments();
      }, [newComment]);


      async function likeComment (id) {
        console.log(tokenKey.userId);
        const response = await fetch(`http://localhost:3000/api/post/${id}/comment/like`, {
          method: 'POST' ,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ` + tokenKey.token
            },
            body: JSON.stringify({
              "userId": tokenKey.userId,
              "like": 1
          })
        })
        setNewComments(true)
      };
  
      async function unlikeComment (id) {
        const response = await fetch(`http://localhost:3000/api/post/${id}/comment/like`, {
          method: 'POST' ,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ` + tokenKey.token
            },
            body: JSON.stringify({
              "userId": tokenKey.userId,
              "like": 0
          })
        })
        setNewComments(true)
      }

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
            setNewComments(false)
            console.log(comments)
          })
          .catch((err) => {
            console.log(err);
          });
        }
      );



      async function deleteComment (e, id, userId) {
        e.preventDefault();
        
        let article = e.target.closest("article");
        id = article.id
        console.log(tokenKey.token)
 
        
        const response = await fetch(`http://localhost:3000/api/post/${id}/comment`, {
          method: 'DELETE' ,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ` + tokenKey.token
            }
        });
        setNewComments(true)
      }

      return (
      <div className="comment section">{ comments && comments.map((comments) => (
        <article className='comments-card' id={comments._id} postid={comments.postId} key={comments._id}>
        {comments.imageUrl ? <img src={comments.imageUrl} alt="{posts.image}"></img> : null}
        <p>{comments.name}</p>
        <p>{comments.commentContent}</p>
        <p>{moment(comments.dateTime).format("DD/MM/YYYY, hh:mm")}</p>
        <div>
        {comments.userId === tokenKey.userId ? (<>
        <button className="button" >Modifier</button>
        <button className="button" onClick={deleteComment}>Supprimer</button></>):null}
        {comments.usersLiked.includes(tokenKey.userId) ? <AiFillLike alt={comments.usersLiked} className="like" onClick={() => unlikeComment(comments._id)}/>:<AiOutlineLike alt={comments.usersLiked} className="like" onClick={() => likeComment(comments._id)}/>}
        <span>{comments.likes}</span>
        </div>
        </article>
      )) }
      </div>
      )
}


export default CommentSection
                