import { createContext, useState, useEffect } from "react";

export const postsContext = createContext();

export const PostsProvider = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        //console.log(data);
        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <postsContext.Provider value={[posts, setPosts]}>
      {props.children}
    </postsContext.Provider>
  );
};
