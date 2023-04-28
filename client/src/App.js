import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { formatDistance } from "date-fns";
import { useAuth } from "./contexts/AuthContext";
import {
  CalendarView,
  ClientCalendar,
  ClientChat,
  ClientDashboard,
  ClientNavBar,
  ClientProfile,
  ClientProgress,
  ClientWorkouts,
  ClientWorkoutsDateView,
  ClientWorkoutView,
  CoachDashboard,
  CoachView,
  ForgotPassword,
  Login,
  NavigationHandler,
  PrivateRoute,
  Signup,
  UpdateProfile,
} from "./components";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5001");

// socket.on("connect", () => {
//   console.log(socket.id);
// });

const baseDate = new Date(2022, 0, 1, 0, 0, 15);
const currDate = new Date(2022, 0, 10, 0, 0, 15);

const initialComments = [
  {
    client: "Alex A.",
    comment: "Finished the workout no problem!",
    date: formatDistance(currDate, baseDate) + " ago",
  },
  {
    client: "Bahman B.",
    comment: "Had a rough time with squats today",
    date: formatDistance(currDate, baseDate) + " ago",
  },
  {
    client: "Jordan S.",
    comment: "Hit a new PR! Super psyched :)",
    date: formatDistance(currDate, baseDate) + " ago",
  },
];

// move relevant functions that are unique to either coach or client to their respective dashboards or abstract everything to a common file we can pull from
const App = () => {
  const { currentUser } = useAuth();
  const [userInfo, setUserInfo] = useState();
  const [userRole, setUserRole] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientComments, setClientComments] = useState(initialComments);
  const [clientLookupTable, setClientLookupTable] = useState({});
  const [clientWorkouts, setClientWorkouts] = useState([]);
  const [clientWorkoutResults, setClientWorkoutResults] = useState([]);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [initializing, setInitializing] = useState(true);

  const apiBaseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    if (currentUser) {
      let user = {
        email: currentUser.email,
        firebaseId: currentUser.uid,
      };
      getUserData(user);
    } else {
      setInitializing(false);
    }
    if (userRole === "Coach") {
      populateClientLookupTable();
      setIsLoggedIn(true);
    }
    if (userRole === "Client") {
      axios.get(`${apiBaseURL}/api/workout/${userInfo.id}`).then((result) => {
        setClientWorkouts(result.data);
        setIsLoggedIn(true);
      });
    }
  }, [userRole]);

  const getUserData = async (user) => {
    let userData = await axios.get(
      `${apiBaseURL}/api/login/${user.firebaseId}`,
      {
        params: user,
      }
    );
    if (userData) {
      setUserInfo(userData.data[0]);
      setUserRole(userData.data[0].user_type);
      // setInitializing(false);
      return userData.data[0].user_type;
    }
  };

  const createNewUser = async (user) => {
    let userDataPost = await axios.post(
      `${apiBaseURL}/api/signup/${user.firebaseId}`,
      {
        params: user,
      }
    );
    if (userDataPost) {
      let userData = await axios.get(
        `${apiBaseURL}/api/login/${user.firebaseId}`,
        {
          params: user,
        }
      );
      setUserInfo(userData.data[0]);
      setUserRole(userData.data[0].user_type);
      return userData.data[0].user_type;
    }
  };

  const clearUserInfo = () => {
    setUserInfo(null);
    setUserRole("");
  };

  const populateClientLookupTable = () => {
    const data = userInfo.id;
    axios
      .get(`${apiBaseURL}/api/getAllClients/${data}`)
      .then((result) => {
        setClientLookupTable(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // TODO: resolve bug when getting user info that doesn't have workouts
  const getUserWorkouts = () => {
    axios
      .get(`${apiBaseURL}/api/workout/4`)
      .then((result) => {
        // console.log(result);
        // setWorkout(result.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Router>
        <NavigationHandler />
        <Routes>
          <Route
            path="coach"
            element={
              <PrivateRoute isAllowed={!!currentUser && userRole === "Coach"}>
                <CoachView
                  userInfo={userInfo}
                  getUserData={getUserData}
                  clearUserInfo={clearUserInfo}
                />
              </PrivateRoute>
            }
          >
            <Route
              index
              element={
                <CoachDashboard
                  userInfo={userInfo}
                  populateClientLookupTable={populateClientLookupTable}
                  clientLookupTable={clientLookupTable}
                  clientComments={clientComments}
                />
              }
            />
            <Route
              path="dashboard"
              element={
                <CoachDashboard
                  userInfo={userInfo}
                  populateClientLookupTable={populateClientLookupTable}
                  clientLookupTable={clientLookupTable}
                  clientComments={clientComments}
                />
              }
            />
            <Route path="profile" element={<UpdateProfile />} />
            <Route
              path="program"
              element={
                <CalendarView
                  clientLookupTable={clientLookupTable}
                  populateClientLookupTable={populateClientLookupTable}
                />
              }
            />
          </Route>
          <Route
            path="client"
            element={
              <PrivateRoute isAllowed={!!currentUser && userRole === "Client"}>
                <ClientNavBar
                  userInfo={userInfo}
                  getUserData={getUserData}
                  clearUserInfo={clearUserInfo}
                  getUserWorkouts={getUserWorkouts}
                  workoutStarted={workoutStarted}
                />
              </PrivateRoute>
            }
          >
            <Route index element={<ClientDashboard />} />
            <Route path="dashboard" element={<ClientDashboard />} />
            <Route
              path="calendar"
              element={
                <ClientCalendar
                  clientWorkouts={clientWorkouts}
                  userInfo={userInfo}
                  // clientWorkoutResults={clientWorkoutResults}
                />
              }
            />
            <Route path="workouts" element={<ClientWorkouts />}>
              <Route
                path=":date"
                element={
                  <ClientWorkoutsDateView
                    userId={userInfo?.id}
                    workoutStarted={workoutStarted}
                    setWorkoutStarted={setWorkoutStarted}
                  />
                }
              >
                <Route
                  path=":idx"
                  element={
                    <ClientWorkoutView
                      userId={userInfo?.id}
                      workoutStarted={workoutStarted}
                      setWorkoutStarted={setWorkoutStarted}
                    />
                  }
                ></Route>
              </Route>
            </Route>
            <Route path="progress" element={<ClientProgress />} />
            <Route path="chat" element={<ClientChat />} />
            <Route path="profile" element={<ClientProfile />} />
          </Route>
          <Route
            path="/signup"
            element={<Signup createNewUser={createNewUser} />}
          />
          <Route
            path="/"
            element={
              <Login
                getUserData={getUserData}
                isLoggedIn={isLoggedIn}
                userRole={userRole}
                setInitializing={setInitializing}
                initializing={initializing}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                getUserData={getUserData}
                isLoggedIn={isLoggedIn}
                userRole={userRole}
                initializing={initializing}
                setInitializing={setInitializing}
              />
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* TODO: replace element with NoMatch element that renders a workable page with a Go Home button */}
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
