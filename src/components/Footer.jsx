import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

// Create a motion-enhanced NavLink component
const MotionNavLink = motion(NavLink);

function Footer() {
  // Animation variants for links and powered-by text
  const linkVariants = {
    hover: { scale: 1.05, color: "#ffffff", transition: { duration: 0.2 } },
  };

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-sm font-light text-gray-300"
        >
          © {new Date().getFullYear()} Miss Gypsy. All rights reserved.
        </motion.p>
        <div className="mt-6 flex justify-center space-x-6">
          <MotionNavLink
            to="/privacypolicy"
            variants={linkVariants}
            whileHover="hover"
            className="text-gray-400 text-sm font-medium hover:text-white transition-colors duration-200"
            aria-label="Privacy Policy"
          >
            Privacy Policy
          </MotionNavLink>
          <MotionNavLink
            to="/termsconditions"
            variants={linkVariants}
            whileHover="hover"
            className="text-gray-400 text-sm font-medium hover:text-white transition-colors duration-200"
            aria-label="Terms and Conditions"
          >
            Terms and Conditions
          </MotionNavLink>
          <MotionNavLink
            to="/contact"
            variants={linkVariants}
            whileHover="hover"
            className="text-gray-400 text-sm font-medium hover:text-white transition-colors duration-200"
            aria-label="Contact Us"
          >
            Contact Us
          </MotionNavLink>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="mt-4 text-xs text-gray-400"
        >
          Powered by{" "}
          <motion.a
            href="https://chiragbhoimarshal.netlify.app"
            variants={linkVariants}
            whileHover="hover"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            aria-label="Powered by Marshal"
            target="_blank"
            rel="noopener noreferrer"
          >
            Marshal
          </motion.a>
        </motion.p>
      </div>
    </footer>
  );
}

export default Footer;