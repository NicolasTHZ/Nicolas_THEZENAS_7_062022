import { useState } from 'react';
import "../pages/styles.css";


function ModifyComment ({ commentsid, updatesetNewComments }) {

    const [commentContent, setCommentContent] = useState("");
    const [image, setImage] = useState("");
    const [posts] = useState("");


    const tokenKey = JSON.parse(localStorage.getItem('token'));
    const userId = tokenKey.userId;
    const name = tokenKey.name;


    async function modifyComment(event) {
      event.preventDefault();
      
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("name", name);
      formData.append("commentContent", commentContent);
      formData.append("image", image);
      const response = await fetch(`http://localhost:3000/api/post/${commentsid}/comment`, {
        method: 'PUT' ,
        headers: {
          'Authorization': `Bearer ` + tokenKey.token
        },
        body: formData,
      })
      updatesetNewComments();
  }



    return (
    <>
        <form onSubmit={modifyComment} method="put" key={posts._id}>
        <div>
          <label htmlFor="postContent">
          <input type="text" className="postContent" id="postContent" placeholder="Tapez votre post ici"
          value={commentContent} onChange={(e) => setCommentContent(e.target.value)}></input>
          </label>
        </div>
        <div>
          <label htmlFor="image">
          <input type="file" className="image" id="image" placeholder="Ajouter une Image"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setImage(event.target.files[0]);
          }}></input>
          </label>
        </div>
        <input className="button" type="submit"></input>
        <button className="button">Annuler la modification</button>
      </form>
    </>  
    )
}


export default ModifyComment