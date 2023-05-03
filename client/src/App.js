import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  LandingPage,
  Login,
  NavigationHandler,
  PrivateRoute,
  Signup,
  UpdateProfile,
} from "./components";

const App = () => {
  const { userObject } = useAuth();
  const [clientLookupTable, setClientLookupTable] = useState({});
  const [clientWorkouts, setClientWorkouts] = useState([]);
  const [workoutStarted, setWorkoutStarted] = useState(false);

  return (
    <>
      <Router>
        <NavigationHandler />
        <Routes>
          <Route
            path="coach"
            element={
              <PrivateRoute
                isAllowed={
                  !!userObject.isLoggedIn && userObject.user_type === "Coach"
                }
              >
                <CoachView />
              </PrivateRoute>
            }
          >
            <Route
              index
              element={
                <CoachDashboard
                  clientLookupTable={clientLookupTable}
                  setClientLookupTable={setClientLookupTable}
                />
              }
            />
            <Route
              path="dashboard"
              element={
                <CoachDashboard
                  clientLookupTable={clientLookupTable}
                  setClientLookupTable={setClientLookupTable}
                />
              }
            />
            <Route path="profile" element={<UpdateProfile />} />
            <Route
              path="program"
              element={<CalendarView clientLookupTable={clientLookupTable} />}
            />
          </Route>
          <Route
            path="client"
            element={
              <PrivateRoute
                isAllowed={
                  !!userObject.isLoggedIn && userObject.user_type === "Client"
                }
              >
                <ClientNavBar workoutStarted={workoutStarted} />
              </PrivateRoute>
            }
          >
            <Route
              index
              element={
                <ClientDashboard
                  clientWorkouts={clientWorkouts}
                  setClientWorkouts={setClientWorkouts}
                />
              }
            />
            <Route
              path="dashboard"
              element={
                <ClientDashboard
                  clientWorkouts={clientWorkouts}
                  setClientWorkouts={setClientWorkouts}
                />
              }
            />
            <Route
              path="calendar"
              element={<ClientCalendar clientWorkouts={clientWorkouts} />}
            />
            <Route path="workouts" element={<ClientWorkouts />}>
              <Route
                path=":date"
                element={
                  <ClientWorkoutsDateView
                    workoutStarted={workoutStarted}
                    setWorkoutStarted={setWorkoutStarted}
                  />
                }
              >
                <Route
                  path=":idx"
                  element={
                    <ClientWorkoutView
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
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* TODO: replace element with NoMatch element that renders a workable page with a Go Home button */}
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
