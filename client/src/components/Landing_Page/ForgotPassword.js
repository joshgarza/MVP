import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword, userObject } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // when userObject.isLoggedIn -> navigate to appropriate dashboard
    if (userObject.isLoggedIn) {
      // setLoading(false);
      navigate(`/${userObject.user_type}/dashboard`);
    } else if (userObject.needsSignup) {
      navigate("/signup");
    }
  }, [userObject]);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch (err) {
      setError("Error, please check the format and spelling of your email");
    }
    setLoading(false);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col items-center justify-evenly w-72 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="w-28 absolute top-10">
          <img
            className=""
            alt="cat barbell lifting icon"
            src="https://i.postimg.cc/t7G1VFrh/purple-with-black.png"
          />
        </div>
        <form className="" onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              ref={emailRef}
            />
          </div>
          <div className="mb-6 flex items-center justify-between">
            <button
              className="bg-[#394D79] hover:bg-[#293757] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
              type="submit"
            >
              Reset Password
            </button>
          </div>
          <div className="text-sm">
            Already have an account?{" "}
            <Link
              className="font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/login"
            >
              Log in
            </Link>
          </div>
          <div className="text-sm">
            Need an account?{" "}
            <Link
              className="font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/signup"
            >
              Sign up
            </Link>
          </div>
          {error && <div className="mt-4">{error}</div>}
          {message && <div className="mt-4">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
