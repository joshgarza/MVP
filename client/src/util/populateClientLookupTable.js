import { apiRequests } from "./apiRequests";

export const populateClientLookupTable = (coachId) => {
  return apiRequests.getAllClients(coachId);
};
