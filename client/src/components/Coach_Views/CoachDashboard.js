import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const CoachDashboard = ({ userInfo, clientList, clientComments, getUserData, clearUserInfo }) => {
  // const [error, setError] = useState('');
  // const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className="h-[90%] w-full flex flex-wrap px-4 py-3">
        <div className="w-screen bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-center items-center">
          <h1 className="mb-2 text-3xl">Dashboard</h1>
        </div>
        <div className="w-screen flex justify-between">
          <div className="w-56">
            <div className="text-xl">Client List</div>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex-col justify-center items-center">
              {clientList.map((client, i) => <li key={i} className="">{client}</li>)}
            </div>
          </div>
          <div className="w-[60%]">
            <div className="text-xl">Comments</div>
            {clientComments.map((comment, i) => {
              return (
                <div key={i} className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-wrap justify-start items-center">
                  <div className="mx-2">{comment.client}</div>
                  <p className="mx-2">{comment.comment}</p>
                  <div className="mx-2">{comment.date}</div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="h-96 w-screen mt-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-center items-start text-3xl">Upcoming workouts</div>
      </div>
    </>
  );
};

export default CoachDashboard;