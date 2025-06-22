import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

// Contact Info Component
const ContactInfo = ({ icon, title, details, index }) => (
  <motion.div
    variants={{
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
      hover: { scale: 1.05, transition: { duration: 0.2 } },
    }}
    initial="initial"
    whileInView="animate"
    whileHover="hover"
    viewport={{ once: true }}
    className="bg-white rounded-lg shadow-md p-6 text-center"
  >
    <div className="text-blue-600 text-3xl mb-4 mx-auto">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{details}</p>
  </motion.div>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', or 'error'

  // Memoize contact info
  const contactInfo = useMemo(
    () => [
      {
        icon: <FaEnvelope />,
        title: "Email Us",
        details: "support@missgypsy.com",
      },
      {
        icon: <FaPhone />,
        title: "Call Us",
        details: "+91 123 456 7890",
      },
      {
        icon: <FaMapMarkerAlt />,
        title: "Visit Us",
        details: "123 Jewelry Lane, Mumbai, India",
      },
    ],
    []
  );

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSubmitStatus(null);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.length > 1000) newErrors.message = "Message must be under 1000 characters";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await addDoc(collection(db, "contacts"), {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        timestamp: new Date(),
      });
      setFormData({ name: "", email: "", message: "" });
      setSubmitStatus("success");
      setTimeout(() => setSubmitStatus(null), 5000); // Hide success message after 5s
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setErrors({ submit: "Failed to send message. Please try again." });
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.2 } },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.section
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="text-center mb-16"
          role="region"
          aria-label="Contact Miss Gypsy"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 tracking-tight"
          >
            Contact Miss Gypsy
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-3xl mx-auto prose"
          >
            We’re here to help! Reach out with any questions, feedback, or inquiries, and our team will get back to you promptly.
          </motion.p>
        </motion.section>

        {/* Contact Form Section */}
        <motion.section
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-16"
          role="region"
          aria-label="Contact Form"
        >
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-bold text-gray-800 mb-8 text-center"
          >
            Get in Touch
          </motion.h3>
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Your Name"
                  required
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </motion.div>
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Your Email"
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </motion.div>
              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  rows="5"
                  placeholder="Your Message"
                  required
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </motion.div>
              <AnimatePresence>
                {submitStatus && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`text-sm flex items-center justify-center ${
                      submitStatus === "success" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {submitStatus === "success" ? (
                      <>
                        <FaCheckCircle className="mr-2" />
                        Message sent successfully!
                      </>
                    ) : (
                      errors.submit || "Failed to send message. Please try again."
                    )}
                  </motion.p>
                )}
              </AnimatePresence>
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className={`bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
                aria-label="Send Message"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </div>
        </motion.section>

        {/* Contact Info Section */}
        <motion.section
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-16"
          role="region"
          aria-label="Contact Information"
        >
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-bold text-gray-800 mb-8 text-center"
          >
            Contact Information
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <ContactInfo
                key={index}
                icon={info.icon}
                title={info.title}
                details={info.details}
                index={index}
              />
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}