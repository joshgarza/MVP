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
  aspectRatio: 1,
  maintainAspectRatio: false,
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
    {
      label: 'Deadlift',
      data: labels.map(() => Math.random() * 600),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const ClientDashboard = ({ workout }) => {
  return (
    <>
      <div className="h-[90%] flex flex-wrap flex-grow py-[2rem] px-[4rem]">
        <div className="text-3xl mb-[1rem]">Hello, Josh Garza!</div>
        <div className="animate-slide-in-left w-full bg-[#e7f2f8]/[0.5] shadow-md rounded-3xl px-8 pt-6 pb-8 mb-12 flex justify-center items-center">
          <div className="relative h-[18rem] w-[60%] mt-4 rounded px-8 pt-6 pb-8 mb-4">
            <Line className="" options={options} data={data} />
          </div>
        </div>
        <div className="animate-slide-in-bottom w-screen flex justify-between">
          <div className="w-[20rem]">
            <div className="bg-[#f0ede8]/[0.5] shadow-md rounded-3xl p-[1rem]">
              <div className="text-xl">Coach Information</div>
              <div className="flex mx-2 px-4">
                <div className="rounded pt-6 pb-8 mb-4 flex-col justify-center items-center">
                  <div>
                    Josh Garza
                  </div>
                  <div>
                    josh@sf-iron.com
                  </div>
                </div>
                <div>
                  <img className="rounded-full mt-5 mx-2 max-w-[6rem]" src="https://i.postimg.cc/7hBRzyv3/Screen-Shot-2022-11-22-at-8-51-53-PM.png"/>
                </div>
              </div>

            </div>
          </div>
          <div className="w-[60%] shadow-md bg-[#f5f6f6]/[0.4] rounded-3xl p-[1rem]">
            <div className="text-xl ">Upcoming Workouts</div>
            {workout !== undefined &&
              <div className="rounded px-8 pt-6 pb-8 mb-4 flex-col justify-start items-center">
                Next:
                {/* {workout?.map((slot, i) => {
                  return (
                    <div key={i} className="mx-2 flex">
                      <div>{slot.exercise} x {slot.reps} reps @{slot.rpe}{slot.weight}</div>
                    </div>
                  )
                })} */}
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default ClientDashboard;