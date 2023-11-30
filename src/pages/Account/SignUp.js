import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const SignUp = () => {
  // ============= Initial State Start here =============
  const [cookies, setCookie] = useCookies(["token"]);
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");
  // ============= Event Handler Start here =============
  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  // ============= Event Handler End here ===============
  // ================= Email Validation start here =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ================= Email Validation End here ===============

  

  // ============= OTP Verification Start here =============
  const [otp, setOtp] = useState("");
  const [errOtp, setErrOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleResendOtp = async () => {
    try {
      // Make API call to resend OTP
      await axios.post('https://minor-api-mwao.onrender.com/api/users/resend-otp', {
        email,
      });
      // Set a flag to indicate that OTP is resent
      setOtpSent(true);
    } catch (error) {
      // Handle API error
      console.error('Resend OTP API Error:', error);
      // You might want to set an error state to display an error message to the user
    }
  };
  
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    setErrOtp("");
  };

  // ... (previous state and functions)

  const [wallet, setWallet] = useState(""); // New state for wallet field
  const [errWallet, setErrWallet] = useState(""); // New state for wallet error

  const handleWallet = (e) => {
    setWallet(e.target.value);
    setErrWallet("");
  };

  const handleOtpVerification = async () => {
    try {
      // Make API call for OTP verification
      const response = await axios.post('https://minor-api-mwao.onrender.com/api/users/verify', {
        otp,
      });

            // Store token in cookie
            setCookie("token", response.data.token, { path: "/" });
      // Handle success response
      setSuccessMsg(`Account created successfully!`);
      alert(successMsg);
      // Clear form fields
      setClientName("");
      setEmail("");
      setPassword("");
      setOtp("");
      setChecked(false);

    } catch (error) {
      // Handle API error
      console.error('OTP Verification API Error:', error);
      // Set error state to display an error message to the user
      setErrOtp("Invalid OTP. Please try again.");
    }
  };
  // ============= OTP Verification End here =============

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (checked) {
      if (!clientName) {
        setErrClientName("Enter your name");
      }
      if (!email) {
        setErrEmail("Enter your email");
      } else {
        if (!EmailValidation(email)) {
          setErrEmail("Enter a Valid email");
        }
      }
      if (!password) {
        setErrPassword("Create a password");
      } else {
        if (password.length < 6) {
          setErrPassword("Passwords must be at least 6 characters");
        }
      }

      // Validate wallet field
      if (!wallet) {
        setErrWallet("Enter your wallet ID");
      }

      // ============== Getting the value ==============
      if (
        clientName &&
        email &&
        EmailValidation(email) &&
        password &&
        password.length >= 6 &&
        wallet
      ) {

        try {
          // Make API call for signup
          const response = await axios.post('https://minor-api-mwao.onrender.com/api/users/signup', {
            name: clientName,
            email,
            password,
            wallet,
            // Remove the following fields from the request: phone, address, city, country, zip
          });
// Set a flag to indicate that OTP is sent
setSuccessMsg(
  `Hello dear ${clientName}, Welcome you to PropLuxe Admin panel. We received your Sign up request. We are processing to validate your access. Till then stay connected and additional assistance will be sent to you by your mail at ${email}`
);
setClientName("");
setEmail("");
setPassword("");
setWallet("");
setOtpSent(true);
      } catch (error) {
        // Handle API error
        console.error('Signup API Error:', error);
        // You might want to set an error state to display an error message to the user
      }
    }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-start">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <h1>PropLuxe</h1>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Get started for free
            </h1>
            <p className="text-base">Create your account to access more</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with PROPLUXE
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
                Trusted By Thousands Of Real Estate Experts
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              © PropLuxe
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Privacy
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Security
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
        {otpSent ? (
          <div className="flex flex-col gap-3">
          <p className="text-green-500 font-medium font-titleFont">
          </p>
            <div className="flex flex-col gap-.5">
              <p className="font-titleFont text-base font-semibold text-gray-600">
                Enter OTP
              </p>
              <input
                onChange={handleOtpChange}
                value={otp}
                className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                type="text"
                placeholder="Enter OTP"
              />
              {errOtp && (
                <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                  <span className="font-bold italic mr-1">!</span>
                  {errOtp}
                </p>
              )}
            </div>
          <div className="flex gap-3">
            <button
              onClick={handleResendOtp}
              className="bg-primeColor hover:bg-black hover:text-white cursor-pointer w-1/2 text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300"
            >
              Resend OTP
            </button>
            <button
              onClick={handleOtpVerification}
              className="bg-primeColor hover:bg-black hover:text-white cursor-pointer w-1/2 text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300"
            >
              Verify OTP
            </button>
          </div>
        </div>
        ) : (
          <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Create your account
              </h1>
                
                
                <div className="flex flex-col gap-3">
                {/* client name */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Full Name
                  </p>
                  <input
                    onChange={handleName}
                    value={clientName}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. John Doe"
                  />
                  {errClientName && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errClientName}
                    </p>
                  )}
                </div>
                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Work Email
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="john@workemail.com"
                  />
                  {errEmail && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errEmail}
                    </p>
                  )}
                </div>
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
                
                {/* Wallet Field */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Wallet ID
                </p>
                <input
                  onChange={handleWallet}
                  value={wallet}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="text"
                  placeholder="Enter your wallet ID"
                />
                {errWallet && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errWallet}
                  </p>
                )}
              </div>


                {/* Checkbox */}
                <div className="flex items-start mdl:items-center gap-2">
                  <input
                    onChange={() => setChecked(!checked)}
                    className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                    type="checkbox"
                  />
                  <p className="text-sm text-primeColor">
                    I agree to the PropLuxe{" "}
                    <span className="text-blue-500">Terms of Service </span>and{" "}
                    <span className="text-blue-500">Privacy Policy</span>.
                  </p>
                </div>
                <button
                  onClick={handleSignUp}
                  className={`${
                    checked
                      ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                      : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none"
                  } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                >
                  Create Account
                </button>
                <p className="text-sm text-center font-titleFont font-medium">
                  have an Account?{" "}
                  <Link to="/signin">
                    <span className="hover:text-blue-600 duration-300">
                      Sign in
                    </span>
                  </Link>
                </p>

              </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
