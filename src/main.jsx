import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import './components/Dashbord/Dashboard.css';
import './components/Home/login.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import Layout from './HomeLayout.jsx';
import Body from './components/Home/Body.jsx';
import DashboardLayout from './DashboardLayout.jsx';
import Login from './components/Home/login.jsx';
import Dashboard_rooms from './components/Dashbord/Dash_rooms.jsx';
import Sales_record from './components/Dashbord/Sales_record.jsx';
import Register from './components/Home/Register.jsx';
import Report from './components/Dashbord/Report.jsx';
import { Rooms } from './components/Home/Room.jsx';
import { UpdateRooms } from './components/Dashbord/UpdateRoom.jsx';
import { Edit_guest } from './components/Dashbord/Edit_guest.jsx';
import RoomDetail from './components/Dashbord/RoomDetail.jsx';
import AboutUs from './components/Home/About.jsx';
const App = () => (
  <Router>
    <Routes>
      <Route path="/">
        <Route element={<Layout />}>
          <Route path="/" element={<Body />} />
          <Route path='/home' element={<Body />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/rooms' element ={<Rooms/>}/>
          <Route path ='/about' element={<AboutUs/>}/>
        </Route>
        <Route  element={<DashboardLayout />}>
          <Route path="dashboard/" element={<Dashboard_rooms />} />
          <Route path='/dash' element={<Dashboard_rooms />} />
          <Route path='/sales' element={<Sales_record/>}/>
          <Route path='/report' element={<Report/>} />
          <Route path='/update/:id' element={<UpdateRooms/>}/>
          <Route path='/editguest/:id' element={<Edit_guest/>}/> 
          <Route  path="/rooms/:id" element={<RoomDetail/>} /> 
        </Route>
      </Route>
    </Routes>
  </Router>

);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
