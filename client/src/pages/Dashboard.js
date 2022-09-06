import { useState, useEffect } from 'react';
import { useNavigate, NavLink} from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import CommentSection from "../components/CommentSection";
import CommentForm from "../components/CommentForm";
import ModifyPost from "../components/ModifyPost";
import { AiOutlineReload, AiFillLike, AiOutlineLike } from 'react-icons/ai'
import "./styles.css";
import logo from "../images/logosanstexte.png"
import groupomaniatexte from "../images/nomlogo.png"

function Dashboard () {
    const [postContent, setPostContent] = useState("");
    const [image, setImage] = useState("");
    const [posts, setPosts] = useState("");
    const [newPost, setNewPost] = useState(false);
    const [postForm, setPostForm] = useState("");
    const [modContent, setModContent] = useState("")
    const [userId, setUserId] = useState("");
    const [name, setName] = useState ("")


    const tokenKey = JSON.parse(localStorage.getItem('token'));
    console.log(tokenKey)
    function checkUser () {
      if(tokenKey === null || tokenKey.error || userId === null) {
        function redirectHome () {
          navigate("/Login") 
      };
      }
      else{
        setUserId(tokenKey.userId);
        setName(tokenKey.name)
      }
    }
   
    const navigate = useNavigate();
    

    useEffect(() => {
      checkUser();
      fetchPosts();
    }, [newPost]);

    const fetchPosts = async () => {
      checkUser()
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
    
    // const userId = tokenKey.userId;
    // const name = tokenKey.name;



    async function createPost(event) {
        checkUser()
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
      checkUser()
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
      checkUser()
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
      setNewPost(true)
    };

    async function unlikePost (id) {
      checkUser()
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
      setNewPost(true)
    }

    function refresh () {
      setNewPost(true)
    }

    function modifyForm (id) {
      console.log(id)
      setPostForm(id)
      console.log(postForm)
      // setPostForm(true)
      // console.log(postForm)
    }

    function updatesetNewPost () {
      setNewPost(true)
    }
    
    return (
    <>
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="logo sans texte" className="logo"></img>
        </div>
        <NavLink activeclassname="active" className="link-home" to="/Dashboard">
          <img src={groupomaniatexte} alt="groupomania" className="groupomaniatexte"></img>
        </NavLink>
        <div className="header-logout">
          <h3 className="header-connection">Connecté(e) en tant que <span className="nameColor">{tokenKey.name}</span></h3>
          <NavLink  to="/Login" className="nav-button">
          Logout
          </NavLink>
        </div>
      </nav>
      <div className="createPost post-card">
        <h2>Bonjour {tokenKey.name}, discutez avec vos collègues</h2>
          <form onSubmit={createPost} method="post">
            <div>
              <label htmlFor="postContent">
              <input type="text" className="postContent" id="postContent" placeholder="Tapez votre post ici"
              value={postContent} onChange={(e) => setPostContent(e.target.value)}></input>
              </label>
            </div>
            <div>
              <input type="submit" className="button" value="Envoyer ce post"></input>
              <label htmlFor="image">
              <input type="file" className="image button" id="image" placeholder="Choisir une image"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setImage(event.target.files[0]);
              }}></input>
              </label>
            </div>
          </form>
          </div>
          <div className="getAllPost">
            
            <div className='post-container'>
            {posts && posts.map((posts, key) => {
              let postid = posts._id;
              return ( 
                <article className='post-card' id={posts._id} key={posts._id}>
                {posts.imageUrl ? <div className="image-container"><a href={posts.imageUrl}><img className="image" src={posts.imageUrl} alt="{posts.image}"></img></a></div> : null}
                <div className="author">
                  <img className="avatar" alt="avatar" src={logo}></img>
                  <p className="postName">{posts.name}</p>
                </div>
                <p className="postContenu">{posts.postContent}</p>
                <p className="postDate">{moment(posts.dateTime).format("HH:mm - DD/MM/YYYY")}</p>
                  <div>
                  {posts.userId === tokenKey.userId || tokenKey.role === 'admin' ? (<>
                  {postForm === postid ?
                  <ModifyPost postid={postid}/> :
                    <button className="button" onClick={() => modifyForm(postid)}>Modifier</button>}
                    <button className="button" onClick={deletePost}>Supprimer</button></>):null}
                  <CommentForm postid={postid} updatesetNewPost={updatesetNewPost}/>
                  {posts.usersLiked.includes(tokenKey.userId) ? <AiFillLike alt={posts.usersLiked} className="like" onClick={() => unlikePost(postid)}/>:<AiOutlineLike alt={posts.usersLiked} className="like" onClick={() => likePost(postid)}/>}
                  <span>{posts.likes}</span>
                  </div>
                  <CommentSection postid={postid} />
                </article>
              )}).reverse()}
            </div>
          </div>
    </>
    )
};

export default Dashboard