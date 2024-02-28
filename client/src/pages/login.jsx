import React from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../data/countrycode.json";
import { login } from "../services/operations/auth";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiConnector } from "../services/apiconnector";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const handleLogin = async (data) => {
    console.log("logging  Data", data);
    dispatch(login(data.email, data.password, navigate));
  };

  const handleClick = async () => {
    // const res = await login();

    window.open(`http://localhost:5000/auth/google`, "_self");
    // const res = await apiConnector("GET", `http://localhost:5000/auth/google`);
    // console.log("res", res);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <div className="bg-richblack-700 text-white flex flex-col justify-center items-center h-screen">
      <div className="text-4xl p-6 font-bold">Welcome to Brain Inventory</div>
      <form onSubmit={handleSubmit(handleLogin)} className="">
        <div className="flex flex-col gap-3">
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
          {/* button  */}
          <button
            type="submit"
            className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] `}
          >
            submit
          </button>
        </div>
      </form>

      <div className="flex gap-3">
        <button
          onClick={handleClick}
          className="p-2 bg-richblack-800 mt-5 rounded-md"
        >
          Login with google
        </button>
        <div className="bg-richblack-800 mt-3 p-2 rounded-md">
          {" "}
          <Link to={`/signup`}>Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
