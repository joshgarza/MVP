import React from "react";
import { useLocation, useParams } from "react-router-dom";

const ClientWorkoutView = () => {
  const location = useLocation();
  const params = useParams();

  console.log("params in workout view", params);

  return <div>client workout view</div>;
};

export default ClientWorkoutView;
