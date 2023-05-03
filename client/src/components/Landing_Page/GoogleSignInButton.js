import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";

const GoogleSignInButton = () => {
  const { signInWithGoogle } = useAuth();

  const handleClick = async () => {
    try {
      await signInWithGoogle();
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
