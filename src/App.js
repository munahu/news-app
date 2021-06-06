import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Nav from "./home page/components/Nav";
import Category from "./home page/components/Category";
import News from "./home page/components/News"
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <div className="wrapper">
          <Switch>
              <Route exact path="/" component={News} />
              <Route exact={true} path="/:id" component={Category} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
