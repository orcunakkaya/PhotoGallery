import { useEffect, useState } from 'react'
import NavbarC from "./components/NavbarC";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { Routes, Route } from 'react-router-dom';
import Profile from "./pages/Profile";

import Search from "./pages/Search";
import SearchProfile from "./pages/SearchProfile";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import PrivateRoute from './pages/PrivateRoute';

function App() {
  const [color, setColor] = useState(localStorage.getItem("color") || "light");
  useEffect(() => {
    setColor(localStorage.getItem("color"))
    if(!localStorage.getItem("color")){
      localStorage.setItem("color", "light")
    }
  }, [setColor])

  return (
      <div className={`App ${color}`}>
      <NavbarC color={color} setColor={setColor}/>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} /> 
        <Route path="/search" element={<Search />} />
        <Route path="/search/:username" element={<SearchProfile />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
