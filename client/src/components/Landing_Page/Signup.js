import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GoogleSignInButton } from "../../components";

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, googleSignup, logout, loading, setLoading, userObject } =
    useAuth();
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("Client");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // when userObject.isLoggedIn -> navigate to appropriate dashboard
    console.log(userObject, "in signup component");
    if (userObject.isLoggedIn) {
      // setLoading(false);
      navigate(`/${userObject.user_type}/dashboard`);
    } else if (userObject.needsSignup) {
      navigate("/signup");
    }
  }, [userObject]);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObject.needsSignup) {
      setLoading(true);
      await googleSignup(nameRef.current.value, userType);
    } else {
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Passwords do not match");
      }
      try {
        setError("");
        setLoading(true);
        await signup(
          nameRef.current.value,
          emailRef.current.value,
          passwordRef.current.value,
          userType
        );
      } catch (err) {
        setError(err);
      }
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <div className="w-screen h-screen flex flex-col relative items-center justify-center">
      <div className="flex flex-col items-center justify-evenly w-72 bg-white shadow-md rounded px-8 pt-6 pb-8 my-4">
        <div className="text-2xl">Sign up with</div>
        <div className="flex items-center gap-2 shadow-md rounded px-4 py-2 m-2">
          <GoogleSignInButton />
        </div>
        <div className="w-28 absolute top-6">
          <img
            className=""
            alt="cat barbell lifting icon"
            src="https://i.postimg.cc/t7G1VFrh/purple-with-black.png"
          />
        </div>
        {userObject.needsSignup ? (
          <div className="p-8">
            Thanks for signing up! We just need the following information to
            finish setting up your account.
          </div>
        ) : (
          <></>
        )}

        <form className="" onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              User type
            </label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            >
              <option className="" value="Client">
                Client
              </option>
              <option className="" value="Coach">
                Coach
              </option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              ref={nameRef}
              required
              placeholder="full name"
            />
          </div>
          {userObject.needsSignup ? (
            <></>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  ref={emailRef}
                  required
                  placeholder="email"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password:
                </label>
                <input
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  ref={passwordRef}
                  required
                  placeholder="password"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password Confirmation:
                </label>
                <input
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  ref={passwordConfirmRef}
                  required
                  placeholder="confirm password"
                />
              </div>
            </>
          )}
          <div className="mb-6">
            <button
              className="bg-[#394D79] hover:bg-[#293757] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
              type="submit"
            >
              Sign up
            </button>
          </div>
          <div className="text-sm">
            Already have an account?{" "}
            <Link
              className="font-bold text-sm text-blue-500 hover:text-blue-800"
              onClick={() => logout()}
              to="/login"
            >
              Log in
            </Link>
          </div>
        </form>
      </div>
      {error && console.log("error", { error })}
    </div>
  );
};

export default Signup;
