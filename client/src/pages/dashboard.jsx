import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { json, useNavigate, useParams } from "react-router-dom";
import { logout } from "../services/operations/auth";
import { setToken } from "../store/Slices/authSlice";
import io from "socket.io-client";
import { nanoid } from "@reduxjs/toolkit";

const socket = io.connect("http://localhost:4000");

const Dashboard = () => {
  const params = new URLSearchParams(document.location.search);
  const url = params.get("token");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [googleUser, setGoogleUser] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const { token, user } = useSelector((state) => state.auth);
  console.log("user", user);
  console.log("googleuser", googleUser);

  const sendChat = (e) => {
    const userName = googleUser.firstName;
    e.preventDefault();
    socket.emit("chat", { message, userName });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });

  useEffect(() => {
    if (url) {
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
  }, []);

  const handleOnClick = () => {
    dispatch(logout(navigate));
  };

  return (
    <div className=" justify-center items-center text-white font-bold text-2xl">
      <div className="w-11/12 mx-auto mt-[14px] flex justify-between">
        <div>Brain Inventory</div>
        <div
          onClick={handleOnClick}
          className="p-2 cursor-pointer border-1[px] bg-white text-black  border-white rounded-md"
        >
          LogOut
        </div>
      </div>

      <div className="flex justify-center text-pink-300">
        <div>
          Welcome to BrainInventory - {googleUser?.firstName}{" "}
          {googleUser?.lastName}
        </div>
      </div>

      <h1 className="flex justify-center">CHAT APP</h1>
      <div className=" w-11/12 mx-auto min-h-[100px] border-[1px] border-white rounded-md  p-3">
        {chat.map((payload, index) => (
          <h1 key={index}>
            <span className="text-sm p-1 border-2 border-white bg-lime-300 text-black rounded-md ml-3 mr-3">
              {payload.userName}
            </span>
            : {payload.message}
          </h1>
        ))}
      </div>

      <form
        onSubmit={sendChat}
        className="flex  flex-col justify-center items-center mt-10"
      >
        <input
          placeholder="Message..."
          type="text"
          name="chat"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="bg-richblack-800 border-[1px] p-2 rounded-md"
        />
        <button
          type="submit"
          className="mt-2 border-2 p-2 rounded-md bg-blue-200"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
