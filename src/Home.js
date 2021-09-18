import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <h1 className="h1">This is Basic React Project</h1>
      <h3 className="h3">We have used:</h3>
      <li className="p">State Hook, useEffect Hook</li>
      <li className="p">React-router-dom</li>
      <li className="p">Context Hook</li>
    </div>
  );
}

export default Home;
