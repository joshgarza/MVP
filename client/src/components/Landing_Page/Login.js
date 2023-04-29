import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { generateCalendar } from "../../util/calendar.js";
import { useLastRoute } from "../../contexts/LastRouteContext";
import { GoogleSignInButton } from "../../components";

const Login = ({
  getUserData,
  isLoggedIn,
  userRole,
  initializing,
  setInitializing,
  createNewUser,
}) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  const { lastRoute } = useLastRoute();

  useEffect(() => {
    if (isLoggedIn) {
      setInitializing(false);
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
        if (userRole) {
          if (userRole === "Client") {
            navigate("/client/dashboard");
          } else if (userRole === "Coach") {
            navigate("/coach/dashboard");
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
    <div className="w-screen h-screen flex flex-col relative justify-evenly items-center">
      {initializing ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="w-[30%] absolute top-10">
            <img
              className=""
              src="https://i.postimg.cc/t7G1VFrh/purple-with-black.png"
            />
          </div>
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
          <div>
            <GoogleSignInButton getUserData={getUserData} userRole={userRole} />
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
