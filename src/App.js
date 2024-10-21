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
import BuyAndSell from './Pages/BuyAndSell/BuyAndSell';
import AddBuyAndSell from './Pages/BuyAndSell/AddBuyAndSell';
import Communities from './Pages/Community/Communities';
import Community from './Pages/Community/Community';
import PointSystem from './Pages/PointSystem/PointSystem';
import Brands from './Pages/Brands/Brands';
import Cashiers from './Pages/Cashiers/Cashiers';
import CashiersHistory from './Pages/Cashiers/CashiersHistory';
import Offers from './Pages/Offers/Offers';
import AddOffer from './Pages/Offers/AddOffer';
import Rewards from './Pages/Rewards/Rewards';
import AddReward from './Pages/Rewards/AddReward';
import Charity from './Pages/Charity/Charity';
import AddCharity from './Pages/Charity/AddCharity';
import Subscription from './Pages/Subscription/Subscription';
import About from './Pages/About/About';
import AddAbout from './Pages/About/AddAbout';
import PrivacyPolicy from './Pages/PrivacyAndTerms/PrivacyPolicy';
import TermsAndConditions from './Pages/PrivacyAndTerms/TermsAndConditions';
import Chats from './Pages/Chat/Chats';
import LandingHome from './Pages/Landing/Home/LandingHome';
import EditEvent from './Pages/Events/EditEvent';
import EditNews from './Pages/News/EditNews';
import EditJob from './Pages/Jobs/EditJob';
import EditBuyAndSell from './Pages/BuyAndSell/EditBuyAndSell';
import MemberDetails from './Pages/Members/MemberDetails';
import EditOffer from './Pages/Offers/EditOffer';
import EditCharity from './Pages/Charity/EditCharity';

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
        <Route path='/landing' element={<LandingHome />} />
        <Route path='/' element={<LandingHome />} />
        
        <Route element={<DashboardLayout />}>
          {/* <Route path='/' element={<Home />} /> */}
          <Route path='/home' element={<Home />} /> 
          <Route path='/test' element={<Test />} /> 
          <Route path='/applications' element={<Applications />} /> 
          <Route path='/members' element={<Members />} /> 
          <Route path='/member/:id' element={<MemberDetails />} /> 
          <Route path='/admins' element={<Admins />} /> 
          <Route path='/applications/:id' element={<ApplicationDetails />} /> 
          <Route path='/news' element={<News />} /> 
          <Route path='/addnews' element={<AddNews />} /> 
          <Route path='/editnews/:id' element={<EditNews />} /> 
          <Route path='/events' element={<Events />} /> 
          <Route path='/addevent' element={<AddEvent />} /> 
          <Route path='/editevent/:id' element={<EditEvent />} /> 
          <Route path='/jobs' element={<Jobs />} /> 
          <Route path='/addjob' element={<AddJob />} /> 
          <Route path='/editjob/:id' element={<EditJob />} /> 
          <Route path='/buyandsell' element={<BuyAndSell />} /> 
          <Route path='/addbuyandsell' element={<AddBuyAndSell />} /> 
          <Route path='/editbuyandsell/:id' element={<EditBuyAndSell />} /> 
          <Route path='/communities' element={<Communities />} /> 
          <Route path='/community/:id' element={<Community />} /> 
          <Route path='/pointsystem' element={<PointSystem />} /> 
          <Route path='/brands' element={<Brands />} /> 
          <Route path='/cashiers' element={<Cashiers />} /> 
          <Route path='/cashiershistory' element={<CashiersHistory />} /> 

          <Route path='/offers' element={<Offers />} /> 
          <Route path='/addoffer' element={<AddOffer />} /> 
          <Route path='/editoffer/:id' element={<EditOffer />} /> 
          <Route path='/rewards' element={<Rewards />} /> 
          <Route path='/addreward' element={<AddReward />} /> 
          <Route path='/charity' element={<Charity />} /> 
          <Route path='/addcharity' element={<AddCharity />} /> 
          <Route path='/editcharity/:id' element={<EditCharity />} /> 
          <Route path='/supscription' element={<Subscription />} /> 
          <Route path='/about' element={<About />} /> 
          <Route path='/addabout' element={<AddAbout />} /> 
          <Route path='/privacypolicy' element={<PrivacyPolicy />} /> 
          <Route path='/termsandconditions' element={<TermsAndConditions />} /> 
          <Route path='/chats' element={<Chats />} /> 

          
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
