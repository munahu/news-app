import './App.css';
import Nav from "./home page/components/Nav";
import News from "./home page/components/News"

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Nav/>
        <News/>
      </div>
    </div>
  );
}

export default App;
