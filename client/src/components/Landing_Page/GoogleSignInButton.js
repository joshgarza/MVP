import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiRequests } from "../../util/apiRequests";
import { FcGoogle } from "react-icons/fc";

const GoogleSignInButton = ({ getUserData, userRole }) => {
  const { signInWithGoogle, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      let googleStatus = await signInWithGoogle();
      console.log("google status", googleStatus);
      if (googleStatus.userExists === false) {
        navigate("/signup", { state: true });
      } else {
        const userType = await getUserData(googleStatus.user);
        navigate(`/${userType.toLowerCase()}/dashboard`);
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between w-20"
    >
      <FcGoogle />
      <div>Google</div>
    </div>
  );
};

export default GoogleSignInButton;
