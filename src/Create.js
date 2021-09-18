import React, { useContext, useEffect, useState } from "react";
import "./Create.css";
import { postsContext } from "./PostsContext";
import { useHistory } from "react-router-dom";

function Create() {
  let history = useHistory();
  const [posts, setPosts] = useContext(postsContext);
  const [users, setUsers] = useState([]);
  const [post, setPost] = useState({ userName: "", title: "", body: "" });

  //users data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/`);
        const data = await res.json();
        //console.log(data);
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
    //console.log(post);
  };

  //https://jsonplaceholder.typicode.com/posts
  const submitPost = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: 1, title: post.title, body: post.body }),
    });

    const data = await response.json();
    //console.log(data);
    let newPosts = [...posts];
    newPosts.push(data);
    setPosts(newPosts);
    history.push("/posts");
  };

  return (
    <div className="create">
      <div className="container-form">
        <h2>User Name</h2>
        <select name="userName" onChange={handleChange}>
          {users.map((user) => {
            return (
              <>
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              </>
            );
          })}
        </select>
        <h3>Title</h3>
        <input
          onChange={handleChange}
          placeholder="title"
          name="title"
          value={post.title}
        />
        <h3>Body</h3>
        <textarea
          rows="10"
          cols="60"
          onChange={handleChange}
          placeholder="body"
          name="body"
          value={post.body}
        />
        <button onClick={submitPost} className="btn">
          Submit
        </button>
      </div>
    </div>
  );
}

export default Create;
