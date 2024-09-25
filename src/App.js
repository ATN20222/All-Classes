import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './Responsive.css';
import { useState } from 'react';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import ForgetPassword from './Pages/Auth/ForgetPassword';
import ResetPassword from './Pages/Auth/ResetPassword';
import Verify from './Pages/Auth/Verify';
import DashboardLayout from './Dashboard/DashboardLayout';
import Home from './Pages/Home/Home';  // Ensure Home component is correctly imported
import Test from './Pages/Home/Test';
import Applications from './Pages/Applications/Applications';
import Members from './Pages/Members/Members';
import Admins from './Pages/Admins/Admins';
import ApplicationDetails from './Pages/Applications/ApplicationDetails';
import News from './Pages/News/News';
import AddNews from './Pages/News/AddNews';
import Events from './Pages/Events/Events';
import AddEvent from './Pages/Events/AddEvent';
import Jobs from './Pages/Jobs/Jobs';
import AddJob from './Pages/Jobs/AddJob';

function App() {
  const [direction, setDirection] = useState('ltr');

  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgetpassword' element={<ForgetPassword />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/verify' element={<Verify />} />

        <Route element={<DashboardLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} /> 
          <Route path='/test' element={<Test />} /> 
          <Route path='/applications' element={<Applications />} /> 
          <Route path='/members' element={<Members />} /> 
          <Route path='/admins' element={<Admins />} /> 
          <Route path='/applications/:id' element={<ApplicationDetails />} /> 
          <Route path='/news' element={<News />} /> 
          <Route path='/addnews' element={<AddNews />} /> 
          <Route path='/events' element={<Events />} /> 
          <Route path='/addevent' element={<AddEvent />} /> 
          <Route path='/jobs' element={<Jobs />} /> 
          <Route path='/addjob' element={<AddJob />} /> 

          
        </Route>
      </Routes>
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
