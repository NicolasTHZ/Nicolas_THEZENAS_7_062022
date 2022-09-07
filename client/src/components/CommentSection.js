import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import "../pages/styles.css";
import {  AiFillLike, AiOutlineLike } from 'react-icons/ai'
import ModifyComment from "./ModifyComment"
import moment from 'moment'

function CommentSection({ postid }) {
    const [postForm, setPostForm] = useState("");
    const [image, setImage] = useState("");
    const [comments, setComments] = useState("");
    const [newComment, setNewComments] = useState(false);

    const [commentContent, setCommentContent] = useState("");
    const [commentForm, setCommentForm] = useState(false)

    const tokenKey = JSON.parse(localStorage.getItem('token'));
    const userId = tokenKey.userId;
    const name = tokenKey.name;


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

      function modifyForm (id) {
        console.log(id)
        setPostForm(id)
        console.log(postForm)
        // setPostForm(true)
        // console.log(postForm)
      }

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
        setNewComments(true)
    }

    function addComment () {
        setCommentForm(true)
    }

    function updatesetNewComments () {
      setPostForm("")
      setNewComments(true)
    }

      return (<>
        {commentForm ?
          <form onSubmit={createComment} method="post">
              <div>
                  <label htmlFor="commentContent">
                      <input type="text" className="postContent" id="postContent" placeholder="Tapez votre post ici"
                      value={commentContent} onChange={(e) => setCommentContent(e.target.value)}></input>
                  </label>
              </div>
              <div>
                  <label htmlFor="image">
                      <input type="file" className="image-button button" id="image" placeholder="Image"
                      onChange={(event) => {
                          console.log(event.target.files[0]);
                          setImage(event.target.files[0]);
                      }}></input>
                  </label>
                  <input className="button" type="submit"></input>
              </div> 
          </form>: <button className="button" onClick={addComment}>Ajouter un commentaire</button>}
      <div className="comment section">{ comments && comments.map((comments) => (
        <article className='comments-card' id={comments._id} postid={comments.postId} key={comments._id}>
        {comments.imageUrl ? <img src={comments.imageUrl} alt="{posts.image}"></img> : null}
        <p>{comments.name}</p>
        <p>{comments.commentContent}</p>
        <p>{moment(comments.dateTime).format("DD/MM/YYYY, hh:mm")}</p>
        <div>
        {comments.userId === tokenKey.userId || tokenKey.role === 'admin' ? (<>
        {comments.userId === tokenKey.userId || tokenKey.role === 'admin' ? (<>
          {postForm === comments._id ?
          <ModifyComment commentsid={comments._id} updatesetNewComments={updatesetNewComments}/>:
          <button className="button" onClick={() => modifyForm(comments._id)}>Modifier</button>}</>):null}
          <button className="button" onClick={deleteComment}>Supprimer</button></>):null}
        {comments.usersLiked.includes(tokenKey.userId) ? <AiFillLike alt={comments.usersLiked} className="like" onClick={() => unlikeComment(comments._id)}/>:<AiOutlineLike alt={comments.usersLiked} className="like" onClick={() => likeComment(comments._id)}/>}
        <span>{comments.likes}</span>
        </div>
        </article>
      )).reverse()}
      </div>
      </>)
}


export default CommentSection
                