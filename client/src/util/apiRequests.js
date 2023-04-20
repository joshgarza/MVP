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
  postWorkoutResult: (clientId, date, workoutIdx, workoutResult) => {
    const data = {
      clientId: clientId,
      date: date,
      workoutIdx: workoutIdx,
      workoutResult: workoutResult,
    };
    return axios.post("/api/postWorkoutResult", data);
  },
};
