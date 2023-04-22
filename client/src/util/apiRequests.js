import axios from "axios";

export const apiRequests = {
  addClient: (coachId, clientEmail) => {
    const data = {
      coachId: coachId,
      clientEmail: clientEmail,
    };
    return axios.post("/api/addClient", data);
  },
  getWorkouts: (clientId, date) => {},
  updateWorkoutResult: (set) => {
    return axios.put("/api/updateWorkoutResult", set);
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
