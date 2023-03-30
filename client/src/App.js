import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { formatDistance } from 'date-fns';
import { useAuth } from './contexts/AuthContext';
import {
  AddWorkout,
  CalendarView,
  ClientView,
  ClientDashboard,
  CoachDashboard,
  CoachView,
  ClientWorkouts,
  ForgotPassword,
  Login,
  PrivateRoute,
  Signup,
  Test,
  UpdateProfile
} from './components';

const baseDate = new Date(2022, 0, 1, 0, 0, 15);
const currDate = new Date(2022, 0, 10, 0, 0, 15);

const initialComments = [
  {
    client: 'Alex A.',
    comment: 'Finished the workout no problem!',
    date: formatDistance(currDate, baseDate) + ' ago',
  },
  {
    client: 'Bahman B.',
    comment: 'Had a rough time with squats today',
    date: formatDistance(currDate, baseDate)  + ' ago',
  },
  {
    client: 'Jordan S.',
    comment: 'Hit a new PR! Super psyched :)',
    date: formatDistance(currDate, baseDate)  + ' ago',
  },
]

// move relevant functions that are unique to either coach or client to their respective dashboards or abstract everything to a common file we can pull from
const App = () => {
  const { currentUser } = useAuth();
  const [userInfo, setUserInfo] = useState();
  const [userRole, setUserRole] = useState();
  const [clientComments, setClientComments] = useState(initialComments);
  const [clientLookupTable, setClientLookupTable] = useState({});
  const [workout, setWorkout] = useState([]);

  useEffect(() => {
    if (userRole === 'Coach') {
      populateClientLookup();
    }
  }, [userRole])

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

  const populateClientLookup = () => {
    axios.get('/api/workout')
      .then(result => {
        setClientLookupTable(result.data);
      })
      .catch(err => {
        console.log(err)
      })
  }

  // TODO: resolve bug when getting user info that doesn't have workouts
  const getUserWorkouts = () => {
    axios.get(`/api/workout/4`)
      .then(result => {
        console.log(result)
        setWorkout(result.data)
      })
      .catch(error => console.log(error))
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
            <Route index element={<CoachDashboard clientLookupTable={clientLookupTable} clientComments={clientComments}/>} />
            <Route path='dashboard' element={<CoachDashboard clientLookupTable={clientLookupTable} clientComments={clientComments}/>} />
            <Route path='profile' element={<UpdateProfile />} />
            <Route path='program' element={<CalendarView clientLookupTable={clientLookupTable} populateClientLookup={populateClientLookup} />} />
          </Route>
          <Route
            path="client"
            element={
              <PrivateRoute isAllowed={!!currentUser && userRole === "Client"}>
                <ClientView userInfo={userInfo} getUserData={getUserData} clearUserInfo={clearUserInfo} getUserWorkouts={getUserWorkouts}/>
              </PrivateRoute>
            }
          >
            <Route index element={<ClientDashboard workout={workout}/>} />
            <Route path='dashboard' element={<ClientDashboard workout={workout}/>} />
            <Route path='profile' element={<UpdateProfile />} />
            <Route path='workouts' element={<ClientWorkouts workout={workout}/>} />
          </Route>
          <Route path='/signup' element={<Signup createNewUser={createNewUser} />} />
          <Route path='/' element={<Login getUserData={getUserData} />} />
          <Route path='/login' element={<Login getUserData={getUserData} />} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          {/* TODO: replace element with NoMatch element that renders a workable page with a Go Home button */}
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;