import axios from "axios";
// import dayjs from "dayjs";
let apiBaseURL;
let dev = false;
if (dev) {
  apiBaseURL = "http://localhost:3001";
} else {
  apiBaseURL = process.env.REACT_APP_API_BASE_URL;
}

export const apiRequests = {
  addClient: (coachId, clientEmail) => {
    const data = {
      coachId: coachId,
      clientEmail: clientEmail,
    };
    return axios.post(`${apiBaseURL}/api/addClient`, { data });
  },
  createUser: (userObject) => {
    return axios.post(`${apiBaseURL}/api/signup/${userObject.firebaseId}`, {
      params: userObject,
    });
  },
  getAllClients: (coachId) => {
    return axios.get(`${apiBaseURL}/api/getAllClients/${coachId}`);
  },
  getUser: (email, firebaseId) => {
    const data = {
      email,
      firebaseId,
    };
    return axios.get(`${apiBaseURL}/api/user/check`, { params: data });
  },
  getWorkout: (clientId, date, workoutIdx) => {
    const data = {
      clientId,
      date,
      workoutIdx,
    };
    console.log("data being sent", data);
    return axios.get(`${apiBaseURL}/api/workout`, { params: data });
  },
  getWorkoutResults: (clientId) => {
    return axios.get(`${apiBaseURL}/api/workoutResults/${clientId}`);
  },
  getWorkouts: (clientId) => {
    return axios.get(`${apiBaseURL}/api/workouts/${clientId}`);
  },
  getDateRangeOfWorkouts: (clientId, startDate, endDate = null) => {
    const data = {
      clientId,
      startDate,
      endDate,
    };
    return axios.get(`${apiBaseURL}/api/dateRangeOfWorkouts`, { params: data });
  },
  getWorkoutByDate: (clientId, date) => {
    const data = {
      clientId,
      date,
    };
    return axios.get(`${apiBaseURL}/api/workoutByDate`, { params: data });
  },
  updateWorkoutResult: (set) => {
    return axios.put(`${apiBaseURL}/api/updateWorkoutResult`, set);
  },
};
