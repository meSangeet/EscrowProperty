import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  // ============= Initial State Start here =============
  const [cookies, setCookie] = useCookies(["token"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");
  // ============= Event Handler Start here =============
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  // ============= Event Handler End here ===============
  // ============= Sign In API Call Start here =============
   const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrEmail("Enter your email");
    }

    if (!password) {
      setErrPassword("Create a password");
    }
    // ============== Getting the value ==============
    if (email && password) {
      try {
        // Make API call for sign-in
        const response = await axios.post('https://minor-api-mwao.onrender.com/api/users/login', {
          name: email,  // Using email as the name for simplicity
          password,
        });

        // Store token in cookie
        setCookie("token", response.data.token, { path: "/" });
        console.log(response)
        // Make API call to get user details
        const userResponse = await axios.post('https://minor-api-mwao.onrender.com/api/users/me', {
          token: cookies.token,
        });

        setCookie("userData", userResponse.data, {path: "/"});

        // Display user details in alert
        alert(`Hello ${cookies.userData.name}, Welcome back!`);

        // Clear form fields
        setEmail("");
        setPassword("");
        
        navigate("/MyProfile");
      } catch (error) {
        // Handle API error
        console.error('Sign In API Error:', error);
        // You might want to set an error state to display an error message to the user
      }
    }
  };
  // ============= Sign In API Call End here =============

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <h1>PropLuxe</h1>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Stay signed in for more
            </h1>
            <p className="text-base">When you sign in, you are with us!</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with PropLuxe
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Access all PROPLUXE services
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted By 1000 of users
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <Link to="/">
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                © PropLuxe
              </p>
            </Link>
            {/* ... (Remaining code remains the same) */}
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-1/2 h-full">
        {successMsg ? (
          <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signup">
              <button
                className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
                Sign in
              </h1>
              <div className="flex flex-col gap-3">
                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Enter username
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="myusername"
                  />
                  {errEmail && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errEmail}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Create password"
                  />
                  {errPassword && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSignIn}
                  className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
                >
                  Sign In
                </button>
                <p className="text-sm text-center font-titleFont font-medium">
                  Don't have an Account?{" "}
                  <Link to="/signup">
                    <span className="hover:text-blue-600 duration-300">
                      Sign up
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;
