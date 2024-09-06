import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
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

    // Attach the handleGoogleLogin function to the window object
    window.handleGoogleLogin = async (response) => {
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
          title: "Login Successful",
          text: "You have successfully logged in with Google!",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/"); // Navigate to home page
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Login Error",
          text:
            error.response?.data?.message ||
            "There was an error during Google login. Please try again.",
          confirmButtonText: "OK",
        });
      }
    };
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        formData,
        { withCredentials: true }
      );

      if (response.data.token) {
        Cookies.set("token", response.data.token, { expires: 1 }); // Expires in 1 day
      }

      if (response.data.user_id) {
        Cookies.set("user_id", response.data.user_id, { expires: 1 });
      }

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: response.data.message,
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/"); // Navigate to home page
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Error",
        text: error.response?.data?.message || "Error logging in.",
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
          Log In
        </h2>
        <form className="space-y-4" onSubmit={handleLogin}>
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
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-green-600 hover:underline font-medium"
            >
              Sign up
            </a>
          </p>
        </div>
        <div className="mt-4">
          {/* Google Sign-In Button */}
          <div
            id="g_id_onload"
            data-client_id="468900062950-532lg7d7tukto20c7bs39t406f7qo8o8.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-callback="handleGoogleLogin"
            data-auto_prompt="false"
          ></div>
          <div
            className="g_id_signin"
            data-type="standard"
            data-shape="rectangular"
            data-theme="outline"
            data-text="signin_with"
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

export default Login;
