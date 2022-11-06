import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = ({ createNewUser }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      let user = await signup(emailRef.current.value, passwordRef.current.value);
      if (user) {
        navigate('/');
        createNewUser(user);
      }
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return (
    <>
      <h2>SignUp</h2>
      {error && console.log('error', {error})}
      <form onSubmit={onSubmit}>
        <label>
          Email:
          <input
            type="email"
            ref={emailRef}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            ref={passwordRef}
            required
          />
        </label>
        <label>
          Password Confirmation:
          <input
            type="password"
            ref={passwordConfirmRef}
            required
          />
        </label>
        <button disabled={loading} type="submit">Sign up</button>
      </form>
      <div>
        Already have an account? <Link to='/login'>Log in</Link>
      </div>
    </>
  );
};

export default SignUp;