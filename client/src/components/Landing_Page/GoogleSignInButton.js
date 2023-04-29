import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiRequests } from "../../util/apiRequests";

const GoogleSignInButton = ({ createNewUser }) => {
  const { signInWithGoogle, currentUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [createAccount, setCreateAccount] = useState(false);

  const handleClick = async () => {
    try {
      let googleStatus = await signInWithGoogle();
      console.log(googleStatus, "google status");
      if (googleStatus === false) {
        setCreateAccount(true);
      }
      console.log("Signed in with Google successfully");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const addUser = (userType) => {
    const user = {
      name: name,
      email: currentUser.email,
      firebaseId: currentUser.firebaseId,
      userType: userType,
    };
  };

  return createAccount ? (
    <>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      ></input>
      <div>
        Please select a user type.
        <button onClick={() => addUser("Client")}>Client</button>
        <button onClick={() => addUser("Coach")}>Coach</button>
      </div>
    </>
  ) : (
    <button onClick={handleClick}>Sign in with Google</button>
  );
};

export default GoogleSignInButton;
