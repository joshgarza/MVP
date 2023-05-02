import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { generateCalendar } from "../../util/calendar.js";
import { useLastRoute } from "../../contexts/LastRouteContext";
import { GoogleSignInButton } from "../../components";

const Login = ({ getUserData, createNewUser }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, logout, loading, setLoading, userObject } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { lastRoute } = useLastRoute();

  useEffect(() => {
    console.log(userObject);
  }, [userObject]);

  // useEffect(() => {
  //   console.log("logged in", isLoggedIn);
  //   if (isLoggedIn) {
  //     setLoading(true);
  //     console.log("is logged in");
  //     setInitializing(false);
  //     if (lastRoute === "/") {
  //       console.log(userInfo, "in login");
  //       navigate(`/${userInfo.user_type}/dashboard`);
  //     } else {
  //       console.log("navving");
  //       setLoading(false);
  //       navigate(lastRoute);
  //     }
  //   } else {
  //     console.log("is not logged in");
  //     setInitializing(false);
  //     if (userInfo === false) {
  //       navigate("/signup", { state: true });
  //     }
  //   }
  // }, [isLoggedIn, userInfo]);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setError("");
      setLoading(true);
      const user = await login(
        emailRef.current.value,
        passwordRef.current.value
      );
      // if (user) {
      //   const userRole = await getUserData(user);
      //   if (userRole) {
      //     if (userRole === "Client") {
      //       navigate("/client/dashboard");
      //     } else if (userRole === "Coach") {
      //       navigate("/coach/dashboard");
      //     } else {
      //       console.log("not loading");
      //     }
      //   }
      // }
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return (
    <div className="w-screen h-screen flex flex-col relative justify-evenly items-center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col items-center justify-evenly w-72 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="text-2xl">Sign in with</div>
          <div className="flex items-center gap-2 shadow-md rounded px-4 py-2 m-2 cursor-pointer">
            <GoogleSignInButton getUserData={getUserData} />
          </div>
          <div className="w-28 absolute top-10">
            <img
              className=""
              alt="cat barbell lifting icon"
              src="https://i.postimg.cc/t7G1VFrh/purple-with-black.png"
            />
          </div>
          <div className="cursor-pointer" onClick={() => logout()}>
            Logout
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
                className="bg-[#394D79] hover:bg-[#293757] text-white font-bold py-2 px-4 rounded mx-2 focus:outline-none focus:shadow-outline"
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
        </div>
      )}
    </div>
  );
};

export default Login;
