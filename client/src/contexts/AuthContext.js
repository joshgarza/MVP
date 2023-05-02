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
  const [userObject, setUserObject] = useState({
    id: null,
    name: null,
    email: null,
    firebase_id: null,
    user_type: null,
    signInMethod: null,
    isLoggedIn: false,
  });
  const [loading, setLoading] = useState(true);

  const signup = async (name, email, password, userType) => {
    let user = await createUserWithEmailAndPassword(auth, email, password);
    let currUser = user.user;
    // let response = {
    //   name: 'josh',
    //   email: 'josh@sf-iron.com',
    //   firebaseId: 'fajsio4j11321ijld',
    //   userType: 'client',
    // };
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
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const { uid } = auth.currentUser;
      apiRequests.getUser(email, uid).then((res) => {
        const data = {
          ...res.data[0],
          signInMethod: "email",
        };
        handleUserObjectChange(data);
      });
    } catch (error) {
      // catches invalid login attempt through firebase
      console.log(error);
    }

    // console.log(user, "in login in auth");
    // let currUser = user.user;
    // let response = {
    //   email: currUser.email,
    //   firebaseId: currUser.uid,
    // };
    // if (currUser) {
    //   setCurrentUser(response);
    //   return response;
    // }
  };

  const logout = () => {
    const setUserObjectNull = handleUserObjectChange({
      id: null,
      name: null,
      email: null,
      firebase_id: null,
      user_type: null,
      signInMethod: null,
      isLoggedIn: false,
    });
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
      if (isMobile) {
        await signInWithRedirect(auth, googleProvider);
      } else {
        await signInWithPopup(auth, googleProvider);
        const { email, uid } = auth.currentUser;
        apiRequests.getUser(email, uid).then((res) => {
          const data = {
            ...res.data[0],
            signInMethod: "google popup",
          };
          handleUserObjectChange(data);
        });
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const handleRedirectResult = async () => {
    try {
      getRedirectResult(auth).then((result) => {
        if (result) {
          const { email, uid } = auth.currentUser;
          apiRequests.getUser(email, uid).then((res) => {
            const data = {
              ...res.data[0],
              signInMethod: "google redirect",
            };
            handleUserObjectChange(data);
          });
        } else {
          console.log("No result or user found", result);
        }
      });
    } catch (error) {
      alert("errorrrrr");
      console.error("Error getting redirect result:", error);
    }
  };

  const handleUserObjectChange = (changedData) => {
    let copyUserObject = { ...userObject };
    let changedProperties = [...Object.keys(changedData)];
    let loginStatus = true;

    changedProperties.forEach((property, i) => {
      copyUserObject = {
        ...copyUserObject,
        [property]:
          changedData[property] === undefined ? null : changedData[property],
      };
    });

    // check if any properties have a null value indicating full login wasn't complete
    for (let prop in copyUserObject) {
      if (copyUserObject[prop] === null) {
        loginStatus = false;
      }
    }

    // if all properties have a value, then mark the user as logged in
    // isLoggedIn will function as a gate to initial routing to private routes
    if (loginStatus) {
      copyUserObject = {
        ...copyUserObject,
        isLoggedIn: true,
      };
    }

    return setUserObject(copyUserObject);
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { email, uid } = auth.currentUser;
        apiRequests.getUser(email, uid).then((res) => {
          const data = {
            ...res.data[0],
            signInMethod: "refresh",
          };
          handleUserObjectChange(data);
        });
      }
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
    userObject,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
