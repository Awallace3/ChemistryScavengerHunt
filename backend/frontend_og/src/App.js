import './App.css';
import Nav from './Nav';
import Home from './routes/Home';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Footer from './Footer';
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
    <Routes>
      <Route exact path="/">
        <Home />
      </Route>
    </Routes>
     </div>
   </Router> 
    
  );
}

export default App;
