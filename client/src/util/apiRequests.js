import axios from "axios";
const apiBaseURL = process.env.REACT_APP_API_BASE_URL;
export const apiRequests = {
  addClient: (coachId, clientEmail) => {
    const data = {
      coachId: coachId,
      clientEmail: clientEmail,
    };
    return axios.post(`${apiBaseURL}/api/addClient`, data);
  },
  getWorkouts: (clientId, date) => {},
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
