import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import CountryCode from "../data/countrycode.json";
import { useEffect } from "react";
import { signUp } from "../services/operations/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const handleForSignUp = async (data) => {
    console.log("logging  Data", data);
    dispatch(signUp(data, navigate));
  };

  const handleClick = async () => {
    // const res = await login();

    window.open(`http://localhost:5000/auth/google`, "_self");
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <div className="bg-richblack-700 text-white flex flex-col justify-center items-center h-screen">
      <div className="text-4xl p-6 font-bold">Welcome to Brain Inventory</div>
      <form onSubmit={handleSubmit(handleForSignUp)} className="">
        <div className="flex flex-col gap-3">
          <div className="flex gap-5   ">
            {/* first name  */}
            <div className="flex flex-col gap-2  w-full ">
              <label htmlFor="firstname">
                first Name<sup className=" text-pink-400 ">*</sup>
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                className="bg-[#161D29] rounded-[0.5rem]  text-richblack-5 w-full p-[12px]"
                placeholder="Enter first name"
                {...register("firstname", { required: true })}
              />
              {errors.firstname && (
                <span className="text-pink-100">Please Enter Your Name</span>
              )}
            </div>
            {/* lastname */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="lastname">last Name</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                className="bg-[#161D29] rounded-[0.5rem]  text-richblack-5 w-full p-[12px]"
                placeholder="Enter last name"
                {...register("lastname")}
              />
            </div>
          </div>

          {/* email  */}
          <div className="flex flex-col gap-2">
            <lable htmlFor="email">
              {" "}
              Email address<sup className=" text-pink-400 ">*</sup>
            </lable>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-[#161D29] rounded-[0.5rem]  text-richblack-5 w-full p-[12px]"
              placeholder="Enter your Email Address"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-pink-100">Please Enter email</span>
            )}
          </div>

          {/* password  */}
          <div className="flex flex-col gap-2">
            <lable htmlFor="password">
              {" "}
              password<sup className=" text-pink-400 ">*</sup>
            </lable>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-[#161D29] rounded-[0.5rem]  text-richblack-5 w-full p-[12px]"
              placeholder="Enter your Email Address"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-pink-100">Please Enter password</span>
            )}
          </div>

          {/* phone no  */}
          <div className="flex flex-col gap-2">
            <label htmlFor="phonenumber">
              Phone Number<sup className=" text-pink-400 ">*</sup>
            </label>
            <div className="flex flex-row gap-5">
              {/* dropdown */}
              <div className="w-[20%]">
                <select
                  name="dropdown"
                  id="dropdown"
                  className="bg-[#161D29] rounded-[0.5rem]  text-richblack-5 w-full p-[12px]"
                  {...register("countrycode", { required: true })}
                >
                  {CountryCode.map((element, index) => (
                    <option key={index} value={element.code}>
                      {element.code}-{element.country}
                    </option>
                  ))}
                </select>
              </div>
              {/* phone no  */}
              <div className="w-full">
                <input
                  type="number"
                  id="phonenumber"
                  name="phonenumber"
                  placeholder="1234 4321"
                  className="bg-[#161D29] rounded-[0.5rem]  text-richblack-5 w-full p-[12px]"
                  {...register("phonenumber", {
                    required: { value: true, message: "please Enetr phone no" },
                    maxLength: { value: 10, message: "Invalid Phone Number" },
                    minLength: { value: 10, message: "Invalid Phone Number" },
                  })}
                />
                {errors.phoneNo && (
                  <span className="text-pink-100">
                    {errors.phoneNo.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* button  */}
          <button
            type="submit"
            className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] `}
          >
            submit
          </button>
          <button
            onClick={handleClick}
            className="p-2 bg-richblack-800 mt-5 rounded-md"
          >
            Signup with google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
