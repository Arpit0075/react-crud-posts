import "./App.css";
import Nav from "./Nav";
import About from "./About";
import Posts from "./Posts";
import Create from "./Create";
import Home from "./Home";
import Post from "./Post";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PostsProvider } from "./PostsContext";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route path={"/about"} component={About} />
          <PostsProvider>
            <Route path={"/posts/:id"} component={Post} />
            <Route exact path={"/posts"} component={Posts} />
            <Route path={"/create"} component={Create} />
          </PostsProvider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
