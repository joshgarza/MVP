import axios from 'axios';

export const apiRequests = {
  addClient: (coachId, clientEmail) => {
    const data = {
      coachId: coachId,
      clientEmail: clientEmail
    }
    return axios.post('/api/addClient', data)
  }
};