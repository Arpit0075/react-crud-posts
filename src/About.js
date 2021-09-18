import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about">
      <h1 className="about-h1">About the project</h1>
      <p className="about-point">
        This is a mini project which is using json placeholder api to get posts
        from the url, we can delete,edit posts.
      </p>
      <p className="about-point">
        We can get details about a particular post . It gives us detail about
        post and user and also the comments on the post.
      </p>
      <p className="about-point">We can create new post as well.</p>
    </div>
  );
}

export default About;
