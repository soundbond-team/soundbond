import "./App.css";
import { BrowserRouter as Router , Route} from "react-router-dom";

import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from  "./pages/Login/Login";
import SoundMap from "./pages/SoundMap/SoundMap";
import Navbar from "./components/Navbar/Navbar";

function App() {  
  return (
    <>
    <Navbar/>
      <Router>
        <Route path="/" exact render= {()=> <Home/>}/>
        <Route path="/register" exact render= {()=> <Register/>}/>
        <Route path="/login" exact render= {()=> <Login/>}/>
        <Route path="/map" exact render= {()=> <SoundMap/>}/>
      </Router>
      
    </>
  );
}

export default App;
