import { useState, useEffect } from 'react';
import { useNavigate} from "react-router-dom";
import axios from 'axios';
import CommentSection from "../components/CommentSection";
import CommentForm from "../components/CommentForm";
import ModifyPost from "../components/ModifyPost";
import { FcLikePlaceholder, FcLike} from 'react-icons/fc'
import "./styles.css";

function Dashboard () {
    const [postContent, setPostContent] = useState("");
    const [image, setImage] = useState("");
    const [posts, setPosts] = useState("");
    const [newPost, setNewPost] = useState(false);
    const [postForm, setPostForm] = useState(false);


    const tokenKey = JSON.parse(localStorage.getItem('token'));
  
   
    const navigate = useNavigate();

    useEffect(() => {
      if (!tokenKey) {
        function redirectHome () {
          navigate("/Login") 
      };
      redirectHome();
      }
    }, []);
    

    useEffect(() => {
      fetchPosts();
    }, [newPost]);
    const fetchPosts = async () => {
      axios.get('http://localhost:3000/api/post', {
          'Method': 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + tokenKey.token}
        })
        .then((res) => {
          console.log(res);
          setPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
        setNewPost(false);
        console.log(newPost)
    };


    // tokenKey.replace(/"/g, "");
    
    const userId = tokenKey.userId;
    const name = tokenKey.name;



    async function createPost(event) {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("name", name);
        formData.append("postContent", postContent);
        formData.append("image", image);
        const response = await fetch('http://localhost:3000/api/post', {
          method: 'POST' ,
          headers: {
            'Authorization': `Bearer ` + tokenKey.token
          },
          body: formData,
        })

        const newPosts = [...posts];
        console.log(response)
        console.log(newPosts)
        setNewPost(true)
    }

    async function deletePost (e, id, userId) {
      e.preventDefault();
      
      let article = e.target.closest("article");
      id = article.id
      console.log(tokenKey.token)
      article.remove();
      

      const response = await fetch(`http://localhost:3000/api/post/${id}`, {
        method: 'DELETE' ,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ` + tokenKey.token
          }
      });
      const newPosts = posts.filter((post) => post.id !== id);
      console.log(response)
      setPosts(newPosts);
    }
    // async function getUser()

    async function likePost (id) {
      console.log(tokenKey.userId);
      const response = await fetch(`http://localhost:3000/api/post/${id}/like`, {
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

      console.log(response);
    };

    async function unlikePost (id) {

      const response = await fetch(`http://localhost:3000/api/post/${id}/like`, {
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

      console.log(response);
    }

    function modifyPost () {
      setPostForm(true)
      console.log(postForm)
    }
    
    function cancelModify () {
      setPostForm(false)
    }
    
    return (
    <div className="createPost">
        <h2>Bonjour {tokenKey.userName}, discutez avec vos collègues</h2>
        <form onSubmit={createPost} method="post">
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
        </form>
        <div className="getAllPost">
        <h3>Liste des posts</h3>
          <div className='post-container'>
          {posts && posts.map((posts, key) => {
            let postid = posts._id;
            return ( 
              <article className='post-card' id={posts._id} key={posts._id}>
              <p>{posts.name}</p>
              <p>{posts.postContent}</p>
              <p>{posts.dateTime}</p>
              {posts.imageUrl ? <img src={posts.imageUrl} alt="{posts.image}"></img> : null}
                <div>
                {posts.usersLiked.includes(tokenKey.userId) ? <FcLike onClick={() => unlikePost(postid)}/>:<FcLikePlaceholder onClick={() => likePost(postid)}/>}
                {posts.userId === tokenKey.userId || tokenKey.role === 'admin' ? (<>
                <button onClick={modifyPost}>Modifier</button>
                <button onClick={deletePost}>Supprimer</button></>):null}
                <CommentForm postid={postid}/>
                </div>
                <CommentSection postid={postid} />
            </article>
            )})}
          </div>
        </div>
    </div>
    )
};

export default Dashboard