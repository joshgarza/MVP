import React, { useState, useEffect, useContext } from "react";
import { auth, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { apiRequests } from "../util/apiRequests";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = async (name, email, password, userType) => {
    let user = await createUserWithEmailAndPassword(auth, email, password);
    let currUser = user.user;
    let response = {
      name: name,
      email: currUser.email,
      firebaseId: currUser.uid,
      userType: userType,
    };

    if (currUser) {
      setCurrentUser(response);
      return response;
    }
  };

  const login = async (email, password) => {
    let user = await signInWithEmailAndPassword(auth, email, password);
    let currUser = user.user;
    let response = {
      email: currUser.email,
      firebaseId: currUser.uid,
    };
    if (currUser) {
      setCurrentUser(response);
      return response;
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserEmail = (email) => {
    return updateEmail(currentUser, email);
  };

  const updateUserPassword = (password) => {
    return updatePassword(currentUser, password);
  };

  const signInWithGoogle = async () => {
    try {
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      let result;
      if (isMobile) {
        await signInWithRedirect(auth, googleProvider);
      } else {
        result = await signInWithPopup(auth, googleProvider);
        return checkGoogleUser(result);
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const checkGoogleUser = (result) => {
    const user = result.user;
    let response = {
      email: user.email,
      firebaseId: user.uid,
    };
    return apiRequests
      .checkGoogleUser(user.email, user.uid)
      .then((result) => {
        if (Object.keys(result.data).length > 0) {
          return { user: response, userExists: true };
        } else {
          return { user: response, userExists: false };
        }
      })
      .catch((error) => console.log("error in api request", error));
  };

  // let handleRedirectPromise = null;

  const handleRedirectResult = async () => {
    try {
      const result = await getRedirectResult(auth);
      if (result && result.user) {
        const googleStatus = checkGoogleUser(result);
        googleStatus.then((result) => {
          setCurrentUser(result.user);
        });
      }
    } catch (error) {
      console.error("Error getting redirect result:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    handleRedirectResult();

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
    signInWithGoogle,
  };
  console.log(currentUser);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
