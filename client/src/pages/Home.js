import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log(searchParams.get("token"));
  }, [searchParams]);
  return (
    <div className="text-white flex flex-col h-screen items-center gap-2 justify-center">
      <div className="text-4xl font-bold">BrainInventory</div>
      <div className="flex gap-3">
        <div className="bg-richblack-700 p-2 rounded-md">
          {" "}
          <Link to={`/login`}>Login</Link>
        </div>
        <div className="bg-richblack-700 p-2 rounded-md">
          {" "}
          <Link to={`/signup`}>Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
