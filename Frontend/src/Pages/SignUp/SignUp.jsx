import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Load Google Sign-In API
    const loadGoogleSignInScript = () => {
      if (!document.getElementById("google-signin-script")) {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.id = "google-signin-script";
        document.body.appendChild(script);
      }
    };

    loadGoogleSignInScript();

    // Attach the handleGoogleSignup function to the window object
    window.handleGoogleSignup = async (response) => {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/users/google-signup",
          { credential: response.credential },
          { withCredentials: true }
        );

        if (res.data.token) {
          Cookies.set("token", res.data.token, { expires: 1 });
        }

        if (response.data.user_id) {
          Cookies.set("user_id", response.data.user_id, { expires: 1 });
        }

        Swal.fire({
          icon: "success",
          title: "Signup Successful",
          text: "You have successfully signed up with Google!",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      } catch (error) {
        console.error("Google signup error:", error);
        Swal.fire({
          icon: "error",
          title: "Signup Error",
          text:
            error.response?.data?.message ||
            "There was an error during Google signup. Please try again.",
          confirmButtonText: "OK",
        });
      }
    };
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/signup",
        formData,
        { withCredentials: true }
      );
      setIsOtpSent(true);
      Swal.fire({
        icon: "success",
        title: "OTP Sent",
        text: response.data.message || "OTP has been sent to your email.",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Signup error:", error);
      Swal.fire({
        icon: "error",
        title: "Signup Error",
        text:
          error.response?.data?.message ||
          "There was an error during signup. Please try again.",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/verify-otp",
        { email: formData.email, otp },
        { withCredentials: true }
      );

      if (response.data.token) {
        Cookies.set("token", response.data.token, { expires: 1 });
      }
      if (response.data.user_id) {
        Cookies.set("user_id", response.data.user_id, { expires: 1 });
      }

      Swal.fire({
        icon: "success",
        title: "OTP Verified",
        text:
          response.data.message ||
          "OTP verified successfully. Welcome to our website!",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error("OTP verification error:", error);
      Swal.fire({
        icon: "error",
        title: "Verification Error",
        text:
          error.response?.data?.message ||
          "OTP verification failed. Please check your OTP and try again.",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-green-600">
          Sign Up
        </h2>
        {!isOtpSent ? (
          <form className="space-y-4" onSubmit={handleSignup}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
            <button
              type="submit"
              className={`w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-300 ease-in-out ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleOtpVerification}>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
            <button
              type="submit"
              className={`w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-300 ease-in-out ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </form>
        )}
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            Already have an account?{" "}
            <a
              href="/login"
              className="text-green-600 hover:underline font-medium"
            >
              Log in
            </a>
          </p>
        </div>
        <div className="mt-4">
          <div
            id="g_id_onload"
            data-client_id="468900062950-532lg7d7tukto20c7bs39t406f7qo8o8.apps.googleusercontent.com"
            data-context="signup"
            data-ux_mode="popup"
            data-callback="handleGoogleSignup"
            data-auto_prompt="false"
          ></div>
          <div
            className="g_id_signin"
            data-type="standard"
            data-shape="rectangular"
            data-theme="outline"
            data-text="signup_with"
            data-size="large"
            data-logo_alignment="left"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "16px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
