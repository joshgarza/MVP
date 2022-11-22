import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Lifting History',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Squat',
      data: labels.map(() => Math.random() * 500),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Bench',
      data: labels.map(() => Math.random() * 400),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const ClientDashboard = ({ workout }) => {
  return (
    <>
      <div className="h-[90%] w-full flex flex-wrap px-4 py-3">
        <div className="w-screen bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex-col justify-center items-center">
        <div className="text-2xl">Stats</div>
        <div className="h-96 w-screen mt-4 bg-white rounded px-8 pt-6 pb-8 mb-4">
          <div className="block">
            <Line options={options} data={data} />
              {/* <div className="my-4 text-base">
                Adherence: 90% - 123 / 137 workouts completed
              </div>
              <div className="my-4 text-base">
                Squat PR: 475lb
              </div>
              <div className="my-4 text-base">
                Bench PR: 340lb
              </div>
              <div className="my-4 text-base">
                Deadlift PR: 500lb
              </div> */}
          </div>
        </div>
        </div>
        <div className="w-screen flex justify-between">
          <div className="w-56">
            <div className="text-xl">Coach Information</div>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex-col justify-center items-center">
              <div>
                Josh Garza
              </div>
              <div>
                josh@sf-iron.com
              </div>
            </div>
          </div>
          <div className="w-[60%]">
            <div className="text-xl ">Upcoming Workouts</div>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex-col justify-start items-center">
              Next:
              {workout.map((slot, i) => {
                return (
                  <div key={i} className="mx-2 flex">
                    <div>{slot.exercise} x {slot.reps} reps @{slot.rpe}{slot.weight}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ClientDashboard;