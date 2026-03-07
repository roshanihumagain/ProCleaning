
import {BrowserRouter,Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PaymentCallback from "./pages/PaymentCallback";
import SessionManager from "./components/common/SessionManager";

// Clear session on refresh UNLESS it's a payment callback
if (!window.location.pathname.includes('/payment-callback')) {
  sessionStorage.clear();
}

function App(){
    return(
        <div >
           <BrowserRouter>
            <SessionManager>
               <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/services" element={<Services/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile/>
                    </ProtectedRoute>
                }/>
                <Route path="/registration" element={<Registration/>} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/feedback" element={< Feedback />}/>
                <Route path="/servicesbook" element={
                    <ProtectedRoute>
                        <Servicesbook />
                    </ProtectedRoute>
                }/>
                <Route path="/terms" element={< Terms />}/>
                <Route path="/privacy" element={<Privacy />}/>
                <Route path="/admin" element={
                    <ProtectedRoute adminOnly={true}>
                        <AdminDashboard />
                    </ProtectedRoute>
                }/>
                <Route path="/payment-callback" element={<PaymentCallback />} />
               </Routes>
            </SessionManager>
           </BrowserRouter>
           <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
}
export default App;