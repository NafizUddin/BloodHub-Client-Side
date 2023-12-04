import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { auth } from "../Firebase Config/firebase.config";
import useAxiosSecureInterceptors from "../Custom Hooks/useAxiosSecureInterceptors";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext({});

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecureInterceptors();

  const logInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logInWithGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Set token to cookies
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedInUser = { email: userEmail };
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        axiosSecure.post("/auth/access-token", loggedInUser).then((res) => {
          console.log(res.data);
        });
      } else {
        axiosSecure.post("/auth/logout", loggedInUser).then((res) => {
          console.log(res.data);
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user?.email, axiosSecure]);

  // set token to localStorage
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     const loggedInUser = { email: currentUser.email };
  //     if (currentUser) {
  //       // get token and store client
  //       axios.post("/auth/access-token", loggedInUser).then((res) => {
  //         if (res.data.token) {
  //           localStorage.setItem("access-token", res.data.token);
  //         }
  //       });
  //     } else {
  //       // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
  //       localStorage.removeItem("access-token");
  //     }
  //     setLoading(false);
  //   });
  //   return () => {
  //     return unsubscribe();
  //   };
  // }, []);

  const authInfo = {
    user,
    logInWithGoogle,
    logInWithGithub,
    createUser,
    signInUser,
    logOut,
    updateUserProfile,
    loading,
    setLoading,
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
