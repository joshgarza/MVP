import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const CoachDashboard = ({ userInfo, clientList, clientComments, getUserData, clearUserInfo }) => {
  // const [error, setError] = useState('');
  // const { logout } = useAuth();
  const navigate = useNavigate();

  console.log('logging')

  return (
    <>
      <div className="h-[calc(100%-4.5rem)] w-full flex flex-wrap px-4 py-3">
        <div className="animate-slide-in-left h-[40%] w-screen mt-4 bg-[#e7f2f8]/[0.5] shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4 flex justify-center items-start text-3xl">Upcoming workouts</div>
        <div className="h-[60%] animate-slide-in-bottom w-screen flex justify-between">
          <div className="w-[20rem] h-[90%]">
            <div className="h-full bg-[#f0ede8]/[0.5] shadow-md rounded-2xl p-[1rem] overflow-auto">
              <div className="text-xl">Client List</div>
              <div className="rounded px-8 pt-6 pb-8 mb-4 flex-col justify-center items-center">
                {clientList.map((client, i) => <li key={i} className="">{client}</li>)}
              </div>
            </div>
          </div>
          <div className="h-[90%] w-[60%] overflow-auto bg-[#f5f6f6]/[0.4] rounded-3xl p-[1rem]">
            <div className="text-xl">Comments</div>
            {clientComments.map((comment, i) => {
              return (
                <div key={i} className="rounded px-8 pt-6 pb-8 mb-4 flex flex-wrap justify-start items-center">
                  <div className="mx-2">{comment.client}</div>
                  <p className="mx-2">{comment.comment}</p>
                  <div className="mx-2">{comment.date}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachDashboard;