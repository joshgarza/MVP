import axios from "axios";
import dayjs from "dayjs";
let apiBaseURL;
let dev = true;
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
  checkGoogleUser: (email, firebaseId) => {
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
