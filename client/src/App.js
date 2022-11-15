import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './contexts/AuthContext';
import {
  AddWorkout,
  ClientView,
  CoachDashboard,
  CoachView,
  ForgotPassword,
  Login,
  PrivateRoute,
  Signup,
  UpdateProfile
} from './components';


const App = () => {
  const { currentUser } = useAuth();
  const [userInfo, setUserInfo] = useState();
  const [userRole, setUserRole] = useState();

  const getUserData = async (user) => {
    let userData = await axios.get(`/api/login/${user.firebaseId}`, {params: user});
    if (userData) {
      setUserInfo(userData.data[0])
      setUserRole(userData.data[0].user_type)
      return userData.data[0].user_type;
    }
  };

  const createNewUser = async (user) => {
    let userDataPost = await axios.post(`/api/signup/${user.firebaseId}`, {params: user});
    if (userDataPost) {
      let userData = await axios.get(`/api/login/${user.firebaseId}`, {params: user});
      setUserInfo(userData.data[0]);
      setUserRole(userData.data[0].user_type)
      return userData.data[0].user_type;
    }
  };

  const clearUserInfo = () => {
    setUserInfo(null)
    setUserRole('')
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="coach" element={
            <PrivateRoute isAllowed={!!currentUser && userRole === "Coach"}>
              <CoachView userInfo={userInfo} getUserData={getUserData} clearUserInfo={clearUserInfo} />
            </PrivateRoute>}
          >
            <Route index element={<CoachDashboard />} />
            <Route path='dashboard' element={<CoachDashboard />} />
            <Route path='profile' element={<UpdateProfile />} />
            <Route path='program' element={<AddWorkout />} />
          </Route>
          <Route
            path="client"
            element={
              <PrivateRoute isAllowed={!!currentUser && userRole === "Client"}>
                <ClientView userInfo={userInfo} getUserData={getUserData} clearUserInfo={clearUserInfo} />
              </PrivateRoute>
            }
          />
          <Route path='/signup' element={<Signup createNewUser={createNewUser} />} />
          <Route path='/login' element={<Login getUserData={getUserData} />} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;