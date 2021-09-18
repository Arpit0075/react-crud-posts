import React, { useEffect, useState, useContext } from "react";
import "./Post.css";
import { postsContext } from "./PostsContext";

function Post({ match }) {
  const [posts, setPosts] = useContext(postsContext);
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState([]);

  //for transition
  const [myStyle, setMyStyle] = useState({ transform: "translateX(-100px)" });

  //for new post
  const [editPost, setEditPost] = useState({ editTitle: "", editBody: "" });

  // for button and edit-div
  const [edit, setEdit] = useState({
    buttonName: "Enable Edit",
    enableEditDiv: false,
  });

  //for confirmation div after the post has been updated
  const [conUpdateDiv, setConUpdateDiv] = useState(false);

  //comments, post, user data

  // for particular post
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${match.params.id}`
        );
        const data = await res.json();
        //console.log(data);
        setPost(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // for comments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${match.params.id}/comments`
        );
        const data = await res.json();
        //console.log(data);
        setComments(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // for user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${match.params.id}`
        );
        const data = await res.json();
        //console.log(data);
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enableEdit = () => {
    //const [myStyle, setMyStyle] = useState({ transform: "translateY(200px)" });

    if (edit.buttonName === "Enable Edit") {
      setTimeout(() => {
        setMyStyle({ transform: "translateX(0px)" });
      }, 10);

      setEdit((prev) => ({
        ...prev,
        buttonName: "Disable Edit",
        enableEditDiv: true,
      }));
    } else {
      setMyStyle({ transform: "translateX(100px)" });

      setEdit((prev) => ({
        ...prev,
        buttonName: "Enable Edit",
        enableEditDiv: false,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditPost((prev) => ({ ...prev, [name]: value }));
    //console.log(editPost);
  };

  //put request to update post
  const updatePost = async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${match.params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1,
          title: editPost.editTitle,
          body: editPost.editBody,
        }),
      }
    );

    const data = await response.json();
    //console.log(data);

    let newPosts = [...posts];
    let index = newPosts.findIndex((post) => post.id === +match.params.id);
    newPosts[index] = data;
    setPosts(newPosts);
    setPost(data);
    setEditPost((prev) => ({ ...prev, editTitle: "", editBody: "" }));
    enableEdit();

    //update post confirmation container and display for 1 second
    setConUpdateDiv(true);
    setTimeout(() => {
      setConUpdateDiv(false);
    }, 1000);
  };

  return (
    <div className="post">
      {conUpdateDiv && (
        <div className="confirm-update-container">
          <p>Post Updated</p>
        </div>
      )}

      <div className="user-post-container">
        <div className="user-detail">
          <h2>Post by: {user.username}</h2>
          <p>Emai:{user.email}</p>
        </div>
        <div className="post-detail">
          <h3>Title: {post.title}</h3>
          <p>{post.body}</p>
        </div>
        <p>
          <button id="clickBtn" onClick={enableEdit}>
            {edit.buttonName}
          </button>
        </p>
        {edit.enableEditDiv && (
          <div className="edit-container" style={myStyle}>
            <h3>Update Post</h3>
            <input
              name="editTitle"
              onChange={handleChange}
              value={editPost.editTitle}
              className="input-new-post"
              placeholder="title"
            />
            <input
              name="editBody"
              onChange={handleChange}
              value={editPost.editBody}
              className="input-new-post"
              placeholder="body"
            />
            <p>
              <button onClick={updatePost}>Update Post</button>
            </p>
          </div>
        )}
      </div>

      <div className="comment-section">
        <h2>Comments</h2>
        {comments.map((comment) => {
          return (
            <div className="comment">
              <h4>Name: {comment.name}</h4>
              <p> {comment.email} </p>
              <p> {comment.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Post;
