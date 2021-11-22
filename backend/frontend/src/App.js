import './App.css';
import Nav from './Nav';
import Home from './routes/Home';
import Event from './routes/Event';
import Leaderboard from './routes/Leaderboard'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './Footer';
import {Helmet} from "react-helmet";

function App() {
  return (
   <Router>
     <div className="App">
     <Helmet>
                <meta charSet="utf-8" />
                <title>SMACS Scavenger Hunt</title>
      </Helmet>
    <Nav />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/Event" exact component={Event} />
      <Route path="/Leaderboard" exact component={Leaderboard} />
    </Switch>
     </div>
   </Router> 
    
  );
}

export default App;
