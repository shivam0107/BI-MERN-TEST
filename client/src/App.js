import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/Home";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import PrivateRoute from "./components/Auth/PrivateRoute";
import { useDispatch } from "react-redux";
import { setToken } from "./store/Slices/authSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


    const params = new URLSearchParams(document.location.search);
  const token = params.get("token");
  
  if (token) {
    dispatch(setToken(token));
    
  }



  return (
    <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
