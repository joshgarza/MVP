import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const { currentUser, updateUserPassword, updateUserEmail } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    const promises = [];
    setLoading(true);
    setError('');

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateUserEmail(emailRef.current.value))
    }

    if (passwordRef.current.value) {
      promises.push(updateUserPassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        navigate('/')
      })
      .catch(err => setError(err))
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      {currentUser &&
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="w-[65%]">
            <div className="text-3xl">Update Profile</div>
            <form className="w-[100%] bg-white shadow-md rounded px-20 py-28 mb-4" onSubmit={onSubmit}>
              <div className="mb-4">
                <label>Email:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" ref={emailRef} defaultValue={currentUser.email} placeholder={currentUser.email} />
              </div>
              <div className="mb-4">
                <label>Password:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" ref={passwordRef} placeholder="Leave blank to keep the same" />
              </div>
              <div className="mb-4">
                <label>Password Confirmation:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same" />
              </div>
              <div className="flex justify-between">
                <div className="mb-4 w-[50%]">
                  <button className="bg-[#394D79] hover:bg-[#293757] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={loading} type="submit">Update Profile</button>
                </div>
                <div className="mb-4 w-[50%]">
                  <div className="bg-[#9E9E9E] hover:bg-[#717171] text-white font-bold py-2 px-4 flex justify-center rounded focus:outline-none focus:shadow-outline">
                    <Link to='../dashboard'>Cancel</Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {error && console.log('error', {error})}
        </div>
      }
    </>
  )
}

export default UpdateProfile;