import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";

const ClientProgress = () => {
  const [selectedLift, setSelectedLift] = useState("squat");
  const data = [
    {
      name: "Mar 1, 2023",
      squat: 4000,
      "bench press": 2400,
      deadlift: 2400,
    },
    {
      name: "Mar 7, 2023",
      squat: 3000,
      "bench press": 1398,
      deadlift: 2210,
    },
    {
      name: "Mar 14, 2023",
      squat: 2000,
      "bench press": 9800,
      deadlift: 2290,
    },
    {
      name: "Mar 21, 2023",
      squat: 2780,
      "bench press": 3908,
      deadlift: 2000,
    },
    {
      name: "Mar 28, 2023",
      squat: 1890,
      "bench press": 4800,
      deadlift: 2181,
    },
    {
      name: "Apr 5, 2023",
      squat: 2390,
      "bench press": 3800,
      deadlift: 2500,
    },
    {
      name: "Apr 12, 2023",
      squat: 3490,
      "bench press": 4300,
      deadlift: 2100,
    },
  ];

  const selectLift = (lift) => {
    setSelectedLift(lift);
  };

  return (
    <div className="h-[86%] w-full m-2 p-2">
      <select
        className="mt-4 ml-2"
        onChange={(e) => selectLift(e.target.value)}
      >
        <option value="squat">Squat</option>
        <option value="bench press">Bench Press</option>
        <option value="deadlift">Deadlift</option>
      </select>
      <ResponsiveContainer className="" width="100%" height="30%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey={selectedLift}
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClientProgress;
