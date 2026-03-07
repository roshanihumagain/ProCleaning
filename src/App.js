
import {BrowserRouter,Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Feedback from "./pages/feedback.js";
import Servicesbook from "./pages/Servicesbook.js";
import Terms from "./pages/terms.js";
import Privacy from "./pages/Privacy.js";
function App(){
    return(
        <div >
           <BrowserRouter>
           <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/services" element={<Services/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/profile" element={<Profile/>  }/>
            <Route path="/registration" element={<Registration/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/feedback" element={< Feedback />}/>
            <Route path="/servicesbook" element={< Servicesbook />}/>
            <Route path="/terms" element={< Terms />}/>
            <Route path="/privacy" element={<Privacy />}/>
           </Routes>
           </BrowserRouter>
        </div>
    );
}
export default App;