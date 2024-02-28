import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { json, useNavigate, useParams } from "react-router-dom";
import { logout } from "../services/operations/auth";
import { setToken } from "../store/Slices/authSlice";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [googleUser, setGoogleUser] = useState(null);
  const { token, user } = useSelector((state) => state.auth);
  console.log("user", user);
  console.log("googleuser", googleUser);

  const sendMessage = () => {
    socket.emit("send_message", { message: "Hello" });
  };

  useEffect(() => {
    if (user === null) {
      const data = jwtDecode(token);
      console.log(" data", data);
      const obj = data.profile._json;
      console.log("obj", obj);

      const userData = {
        firstName: obj.given_name,
        lastName: obj.family_name,
        email: obj.email,
        image: obj.picture,
      };
      setGoogleUser(userData);
    }

    if (user) {
      console.log("user", user);
      const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        contact: user.contact,
      };
      setGoogleUser(userData);
    }
  }, [token, user]);

  const handleOnClick = () => {
    dispatch(logout(navigate));
  };

  return (
    <div className=" justify-center items-center text-white font-bold text-4xl">
      <div className="w-11/12 mx-auto mt-[14px] flex justify-between">
        <div>Brain Inventory</div>
        <div
          onClick={handleOnClick}
          className="p-2 cursor-pointer border-1[px] bg-white text-black  border-white rounded-md"
        >
          LogOut
        </div>
      </div>

      <div className="flex justify-center">
        {googleUser ? (
          <div>{googleUser.firstName}</div>
        ) : (
          <div>{user.firstName}</div>
        )}
      </div>

      <div>
        <input placeholder="Message..." />
        <button onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );
};

export default Dashboard;
