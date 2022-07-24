import { useState } from 'react'

function Dashboard () {
    const [name, setName] = useState("");
    const [postContent, setPostContent] = useState("");
    const [dateTime, setDateTime] = useState("");


    const tokenKey = JSON.parse(localStorage.getItem('token'));
    tokenKey.replace(/"/g, "");
    
    console.log(tokenKey);
    const userId = tokenKey.userId;

    async function getAllPosts() {
        console.log("Token key :")  
        console.log(tokenKey);
        let posts = await fetch('http://localhost:3000/api/post', {
            'Method': 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + tokenKey}
        });
        console.log("Fetch Success")
        console.log(posts)
        return posts.json();
    }

    async function createPost(event) {
        event.preventDefault();
    
        const response = await fetch('http://localhost:3000/api/post', {
          method: 'POST' ,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ` + tokenKey
          },
          body: JSON.stringify({
            userId,
            name,
            postContent,
            dateTime,
          }),
        })
    }

    getAllPosts()
    
    
    return <div className="App">
    <form onSubmit={createPost} method="post">
      <div>
        <label htmlFor="name">
        <input type="text" className="name" id="name" placeholder="Nom"
        value={name} onChange={(e) => setName(e.target.value)}></input>
        </label>
      </div>
      <div>
        <label htmlFor="postContent">
        <input type="text" className="dateTime" id="dateTime" placeholder="Tapez votre post ici"
        value={postContent} onChange={(e) => setPostContent(e.target.value)}></input>
        </label>
      </div>
      <div>
        <label htmlFor="dateTime">
        <input type="text" className="dateTime" id="dateTime" placeholder="à modifier plus tard"
        value={dateTime} onChange={(e) => setDateTime(e.target.value)}></input>
        </label>
      </div>
      <input type="submit"></input>
    </form>
  </div>
};

export default Dashboard