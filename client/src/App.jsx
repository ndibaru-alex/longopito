import React, { useEffect } from 'react';


import "./assets/css/materialdesignicons.min.css";
import "./assets/scss/themes.scss";



import {
 
  Routes,
  Route,
} from "react-router-dom";


import Error from './pages/error';
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import ResetPassword from './pages/auth/reset-password';

import Startup from './pages/startup';
import CheckRoute from './component/CheckRoute'
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/auth-slice';
import { Spinner } from 'reactstrap';
import AdminLayout from './component/Admin/AdminLayout';

import Banner from './pages/Admin/banner'
import Portfolios from './pages/Admin/portfolio';
import Users from './pages/Admin/users'
import Teams from './pages/Admin/team'
import Messages from './pages/Admin/messages'

function App() {
   
  const {isAuthenticated,isLoading,user} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])

  if(isLoading){
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  } 

  return (
    <>
      <Routes>

           <Route path="/" element={ <Startup/>}/>

           <Route path="/auth-login" element={<Login />} />
           <Route path="/auth-signup" element={<Signup />} />

           <Route path="/admin" element={
            <CheckRoute isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
            </CheckRoute>
            }>
           
           <Route path="banner" element={<Banner />} />
           <Route path="portfolio" element={<Portfolios />} />
           <Route path="users" element={<Users />} />
           <Route path='teams' element={<Teams/>} />
           <Route path='messages' element={<Messages/>} />
             
           </Route>   
           <Route path="*" element={<Error />} />         

           <Route path="/auth-reset-password" element={<ResetPassword />} />

           
         </Routes>
    </>
  )
}

export default App
