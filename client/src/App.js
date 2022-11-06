import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import SignUp from './components/Signup';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import UpdateProfile from './components/UpdateProfile';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const [userInfo, setUserInfo] = useState();

  const getUserData = async (id) => {
    let userData = await axios.get(`/login/${id}`);
    setUserInfo(userData.data);
  };
  // const createNewUser = async (userObject) => {
  //   let newUser = await axios.post('/signup');

  //   getUserData();
  // };

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard getUserData={getUserData}/>} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/update-profile" element={<UpdateProfile />} />
            </Route>
            <Route path='/signup' element={<SignUp getUserData={getUserData}/>} />
            <Route path='/login' element={<Login getUserData={getUserData}/>} />
            <Route path='/forgot-password' element={<ForgotPassword/>} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
};


// const App = () => {
//   const [backendData, setBackendData] = useState([{}]);

//   useEffect(() => {
//     axios.get('/api')
//       .then(result => {
//         setBackendData(result.data)
//       })

//     return (
//       console.log('fetched data')
//     )
//   }, [])

//   return (
//     <>
//       <div>
//         Hello world!
//         <Dashboard />
//         <SignUp />
//         <Login />
//         <ForgotPassword />
//         <UpdateProfile />
//       </div>
//     </>
//   )
// }

export default App;