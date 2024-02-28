import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import toast from "react-hot-toast";
import { setLoading, setToken , setUser } from "../../store/Slices/authSlice";

const { LOGIN_API, SIGNUP_API } = endpoints;

export function signUp(data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
   
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        data,
      });
      console.log("SIGNUP API RESPONSE............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE.....", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Login Successful");
      dispatch(setToken(response.data.token));

      //set token to localstorage
      localStorage.setItem("token", JSON.stringify(response.data.token));

      //set user to localstorage
      console.log("loginapi" , response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}
