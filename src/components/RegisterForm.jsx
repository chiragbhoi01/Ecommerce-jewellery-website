import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../firebaseConfig";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Validation rules
const validationRules = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
  },
  confirmPassword: {
    required: "Confirm Password is required",
    match: {
      message: "Passwords do not match",
    },
  },
};

// Memoize component for performance
const RegisterForm = React.memo(() => {
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Validate form fields
  const validateForm = useCallback((data) => {
    const newErrors = {};
    Object.keys(validationRules).forEach((field) => {
      const rule = validationRules[field];
      if (!data[field].trim()) {
        newErrors[field] = rule.required;
      } else if (rule.pattern && !rule.pattern.value.test(data[field])) {
        newErrors[field] = rule.pattern.message;
      } else if (rule.minLength && data[field].length < rule.minLength.value) {
        newErrors[field] = rule.minLength.message;
      } else if (field === "confirmPassword" && data.password !== data.confirmPassword) {
        newErrors[field] = rule.match.message;
      }
    });
    return newErrors;
  }, []);

  // Handle input changes with sanitization
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    // Basic sanitization: trim and remove script tags
    const sanitizedValue = value.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    // Real-time validation
    setErrors((prev) => {
      const fieldErrors = validateForm({ ...formData, [name]: sanitizedValue });
      return { ...prev, [name]: fieldErrors[name] || "" };
    });
  }, [formData, validateForm]);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const formErrors = validateForm(formData);
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        toast.error("Please fix the errors in the form", {
          position: "top-center",
          theme: "colored",
        });
        return;
      }
      setIsSubmitting(true);
      try {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        toast.success("Registration successful! Welcome aboard!", {
          position: "top-center",
          theme: "colored",
          autoClose: 2000,
          onClose: () => navigate("/"),
        });
        setFormData({ email: "", password: "", confirmPassword: "" });
      } catch (err) {
        let errorMessage = "An error occurred during registration";
        switch (err.code) {
          case "auth/email-already-in-use":
            errorMessage = "This email is already registered";
            toast.error(errorMessage, {
              position: "top-center",
              theme: "colored",
              autoClose: 3000,
              onClose: () => navigate("/login"),
            });
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email format";
            break;
          case "auth/weak-password":
            errorMessage = "Password is too weak";
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many attempts, please try again later";
            break;
          default:
            console.error("Registration error:", err);
        }
        if (err.code !== "auth/email-already-in-use") {
          toast.error(errorMessage, { position: "top-center", theme: "colored" });
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, navigate]
  );

  // Animation variants
  const formVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-8"
        variants={formVariants}
        initial="initial"
        animate="animate"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              required
            />
            {errors.email && (
              <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p id="password-error" className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={`w-full px-4 py-2 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 outline-none ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.confirmPassword && (
              <p id="confirmPassword-error" className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={`w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm sm:text-base flex items-center justify-center ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label={isSubmitting ? "Registering" : "Register"}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </motion.button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-600 hover:text-indigo-800 underline transition-colors duration-200"
            aria-label="Navigate to login page"
          >
            Login here
          </button>
        </p>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </motion.div>
    </div>
  );
});

export default RegisterForm;