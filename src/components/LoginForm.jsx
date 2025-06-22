import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!email || !password) {
      toast.error("All fields are required", { position: "top-center" });
      setIsSubmitting(false);
      return;
    }

    try {
      // Firebase Login
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful! Redirecting...", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => navigate("/"), // Redirect to home page on success
      });
    } catch (err) {
      let errorMessage = "An error occurred during login";
      if (err.code === "auth/user-not-found") {
        errorMessage = "No user found with this email";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Incorrect password";
      }
      toast.error(errorMessage, { position: "top-center" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 cursor-pointer underline"
          >
            Register here
          </span>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
}

export default LoginForm;
