import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { formatDistance } from 'date-fns';
import { useAuth } from './contexts/AuthContext';
import {
  AddWorkout,
  ClientView,
  ClientDashboard,
  CoachDashboard,
  CoachView,
  ClientWorkouts,
  ForgotPassword,
  Login,
  PrivateRoute,
  Signup,
  UpdateProfile
} from './components';

const baseDate = new Date(2022, 0, 1, 0, 0, 15);
const currDate = new Date(2022, 0, 10, 0, 0, 15);

const initialList = ['Alex Allain', 'Maja W.', 'Laura Kelly'];

const initialComments = [
  {
    client: initialList[0],
    comment: 'Finished the workout no problem!',
    date: formatDistance(currDate, baseDate) + ' ago',
  },
  {
    client: initialList[1],
    comment: 'Had a rough time with squats today',
    date: formatDistance(currDate, baseDate)  + ' ago',
  },
  {
    client: initialList[2],
    comment: 'Hit a new PR! Super psyched :)',
    date: formatDistance(currDate, baseDate)  + ' ago',
  },
]


const App = () => {
  const { currentUser } = useAuth();
  const [userInfo, setUserInfo] = useState();
  const [userRole, setUserRole] = useState();
  const [clientList, setClientList] = useState(initialList);
  const [clientComments, setClientComments] = useState(initialComments);
  const [workout, setWorkout] = useState([{"exercise":"squat","reps":"4","rpe":"8"},{"exercise":"bench","reps":"3","rpe":"8"}])

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
          <Route
            path="coach"
            element={
              <PrivateRoute isAllowed={!!currentUser && userRole === "Coach"}>
                <CoachView userInfo={userInfo} getUserData={getUserData} clearUserInfo={clearUserInfo} />
              </PrivateRoute>
            }
          >
            <Route index element={<CoachDashboard clientList={clientList} clientComments={clientComments}/>} />
            <Route path='dashboard' element={<CoachDashboard clientList={clientList} clientComments={clientComments}/>} />
            <Route path='profile' element={<UpdateProfile />} />
            <Route path='program' element={<AddWorkout clientList={clientList}/>} />
          </Route>
          <Route
            path="client"
            element={
              <PrivateRoute isAllowed={!!currentUser && userRole === "Client"}>
                <ClientView userInfo={userInfo} getUserData={getUserData} clearUserInfo={clearUserInfo} />
              </PrivateRoute>
            }
          >
            <Route index element={<ClientDashboard />} />
            <Route path='dashboard' element={<ClientDashboard />} />
            <Route path='profile' element={<UpdateProfile />} />
            <Route path='workouts' element={<ClientWorkouts workout={workout}/>} />
          </Route>
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