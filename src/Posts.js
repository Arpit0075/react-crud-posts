import React, { useState, useContext } from "react";
import "./Posts.css";
import { Link } from "react-router-dom";
import { postsContext } from "./PostsContext";

function Posts() {
  const [posts, setPosts] = useContext(postsContext);

  //container for confirming deleting post
  const [delContainer, setDelContainer] = useState(false);

  const handleDel = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let newPosts = posts.filter((post) => {
        return post.id !== id;
      });
      setPosts(newPosts);

      //after deleting user display contianer for 1 second
      setDelContainer(true);
      setTimeout(() => {
        setDelContainer(false);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="posts">
      {delContainer && (
        <div className="del-confirm-container">
          <p>Post Deleted</p>
        </div>
      )}

      {posts.map((post) => {
        return (
          <div className="posts-container" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <div className="button-container">
              <button onClick={() => handleDel(post.id)}>Delete</button>
              <Link to={`/posts/${post.id}`}>
                <button>Details</button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
