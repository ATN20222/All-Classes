import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import './App.css';
import { useEffect, useState } from 'react';
import Login from './Pages/Auth/Login';
import './Responsive.css'
import Register from './Pages/Auth/Register';
import ForgetPassword from './Pages/Auth/ForgetPassword';
import ResetPassword from './Pages/Auth/ResetPassword';
import Verify from './Pages/Auth/Verify';
function App() {
  const location = useLocation();
  const hideNavRoutes = ['/Login', '/Register'];
  const shouldShowNav = !hideNavRoutes.includes(location.pathname);
  const [direction , setDirection] = useState('ltr');

  return (
    <div className='App'>
      {/* {shouldShowNav && <Nav />} */}
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/forgetpassword' element={<ForgetPassword />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/verify' element={<Verify />} />
        {/* <Route path='/' element={<Home />} /> */}
        
      </Routes>
      {/* {shouldShowNav && <Footer />} */}

    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
