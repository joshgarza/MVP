import axios from "axios";
import dayjs from "dayjs";
const apiBaseURL = process.env.REACT_APP_API_BASE_URL;
// const apiBaseURL = "http://localhost:3001";
export const apiRequests = {
  addClient: (coachId, clientEmail) => {
    const data = {
      coachId: coachId,
      clientEmail: clientEmail,
    };
    return axios.post(`${apiBaseURL}/api/addClient`, { data });
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
  // postWorkoutResult: (clientId, date, workoutIdx, workoutResult) => {
  //   const data = {
  //     clientId: clientId,
  //     date: date,
  //     workoutIdx: workoutIdx,
  //     workoutResult: workoutResult,
  //   };
  //   return axios.post("/api/postWorkoutResult", data);
  // },
};
