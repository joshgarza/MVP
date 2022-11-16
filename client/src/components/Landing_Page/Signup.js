import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Signup = ({ createNewUser }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const [userType, setUserType] = useState('Client');
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      let user = await signup(emailRef.current.value, passwordRef.current.value, userType);


      navigate('/');
      createNewUser(user);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    setUserType(event.target.value)
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form className="w-72 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
        {/* <h2 className="text-lg">SignUp</h2> */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">User type</label>
          <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange}>
            <option className="" value="Client">Client</option>
            <option className="" value="Coach">Coach</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" ref={emailRef} required placeholder="email" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" ref={passwordRef} required placeholder="password" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password Confirmation:</label>
          <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" ref={passwordConfirmRef} required placeholder="confirm password" />
        </div>
        <div className="mb-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={loading} type="submit">Sign up</button>
        </div>
        <div className="text-sm">
          Already have an account? <Link className="font-bold text-sm text-blue-500 hover:text-blue-800" to='/login'>Log in</Link>
        </div>
      </form>
      {error && console.log('error', {error})}
    </div>
  );
};

export default Signup;