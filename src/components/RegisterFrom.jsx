import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Input Validation
    if (!email || !password || !confirmPassword) {
      toast.error("All fields are required", { position: "top-center" });
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { position: "top-center" });
      setIsSubmitting(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters", { position: "top-center" });
      setIsSubmitting(false);
      return;
    }

    try {
      // Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Registration successful! Welcome aboard!", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => navigate("/home"), // Navigate to Home page after success
      });

      // Reset Form
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      let errorMessage = "An error occurred during registration";
      if (err.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered";
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
          onClose: () => navigate("/login"), // Navigate to Login page if email already registered
        });
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email format";
        toast.error(errorMessage, { position: "top-center" });
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password is too weak";
        toast.error(errorMessage, { position: "top-center" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-2">Email</label>
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
            <label className="block text-gray-600 mb-2">Password</label>
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
            <label className="block text-gray-600 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")} // Navigate to Login page
            className="text-blue-500 cursor-pointer underline"
          >
            Login here
          </span>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
}
