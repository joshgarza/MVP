import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { generateCalendar } from "../../util/calendar.js";
import { useLastRoute } from "../../contexts/LastRouteContext";

const Login = ({ getUserData, isLoggedIn, userRole }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  const { lastRoute } = useLastRoute();

  useEffect(() => {
    if (isLoggedIn) {
      console.log("is logged in");
      navigate(lastRoute);
    }
  }, [isLoggedIn]);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setError("");
      setLoading(true);
      const user = await login(
        emailRef.current.value,
        passwordRef.current.value
      );
      if (user) {
        const userRole = await getUserData(user);
        console.log("user role", userRole);
        if (userRole) {
          console.log("logging in as", userRole);
          if (userRole === "Client") {
            navigate("/client");
          } else if (userRole === "Coach") {
            navigate("/coach");
          } else {
            console.log("not loading");
          }
        }
      }
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        className="w-72 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={onSubmit}
      >
        {/* <h2 className="w-48 text-3xl font-bold underline">Log in</h2> */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            ref={emailRef}
            placeholder="email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            ref={passwordRef}
            placeholder="password"
          />
        </div>
        <div className="mb-6 flex items-center justify-between">
          <button
            className="bg-[#394D79] hover:bg-[#293757] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
            type="submit"
          >
            Log in
          </button>
          <div className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            <Link className="" to="/forgot-password">
              Forgot password?
            </Link>
          </div>
        </div>
        <div className="">
          Need an account?{" "}
          <Link
            className="font-bold text-sm text-blue-500 hover:text-blue-800"
            to="/signup"
          >
            Sign up
          </Link>
        </div>
        {error && console.log("error", { error })}
      </form>
      <div className="mx-[5rem]">
        <img
          className="h-[10rem]"
          src="https://i.postimg.cc/t7G1VFrh/purple-with-black.png"
        />
      </div>
    </div>
  );
};

export default Login;

// return (
//   <div className="login-container">
//     <h2 className="text-3xl font-bold underline">Log in</h2>
//     {error && console.log('error', {error})}
//     <form className="login-form" onSubmit={onSubmit}>
//       <label className="login-email-label input-label-hidden">
//         Email:
//       </label>
//       <input
//         type="email"
//         ref={emailRef}
//         placeholder="email"
//         className="login-email-input input-field"
//       />
//       <label className="login-password-label input-label-hidden">
//         Password:
//       </label>
//       <input
//         type="password"
//         ref={passwordRef}
//         placeholder="password"
//         className="login-password-input input-field"
//       />
//       <button className="login-button btn" disabled={loading} type="submit">Log in</button>
//     </form>
//     <div className="forgot-password-div">
//       <Link className="forgot-password-link" to='/forgot-password'>Forgot password?</Link>
//     </div>
//     <div className="signup-link-div">
//       Need an account? <Link className="signup-link" to='/signup'>Sign up</Link>
//     </div>
//   </div>
// );
