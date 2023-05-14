import React from "react";

export const formatDate = (date) => {
  // Split the date
  let parts = date.split("-");

  // Parts now contains ["05", "10", "2023"]

  // Create a new Date object
  let newDate = new Date(parts[2], parts[0] - 1, parts[1]);

  // Define your options
  let options = { year: "numeric", month: "long", day: "numeric" };

  // Format the date
  let formattedDate = newDate.toLocaleDateString("en-US", options);

  console.log(formattedDate); // Outputs: May 10, 2023

  return formattedDate;
};
