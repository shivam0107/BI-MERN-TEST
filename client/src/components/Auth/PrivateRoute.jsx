import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setToken } from "../../store/Slices/authSlice";

const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  console.log("token", token);

  function error() {
    toast.error("Please Login First");
  }

  if (token !== null) {
    return children;
  } else {
    return (
      <>
        error();
        <Navigate to="/login" />
      </>
    );
  }
};

export default PrivateRoute;
