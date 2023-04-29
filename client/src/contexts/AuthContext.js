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
      const result = await signInWithPopup(auth, googleProvider);
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
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

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

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
