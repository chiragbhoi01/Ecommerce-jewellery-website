import React from "react";
import { motion } from "framer-motion";

function PrivacyPolicy() {
  // Animation variants for page content
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        role="region"
        aria-label="Privacy Policy"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center tracking-tight"
          variants={itemVariants}
        >
          Privacy Policy
        </motion.h1>

        <motion.div className="prose prose-lg text-gray-700 mx-auto" variants={itemVariants}>
          <motion.h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4" variants={itemVariants}>
            1. Introduction
          </motion.h2>
          <motion.p variants={itemVariants}>
            Welcome to [Your Company Name] ("we," "us," or "our"). This Privacy Policy explains how we collect, use,
            disclose, and protect your personal information when you visit our website [Your Website URL] or make a purchase.
            By using our services, you agree to the terms of this policy.
          </motion.p>

          <motion.h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4" variants={itemVariants}>
            2. Information We Collect
          </motion.h2>
          <motion.p variants={itemVariants}>
            We collect the following types of information:
          </motion.p>
          <motion.ul className="list-disc pl-6 mb-4" variants={itemVariants}>
            <motion.li variants={itemVariants}>
              <strong>Personal Information</strong>: Name, email address, phone number, billing and shipping addresses, and
              payment information (e.g., credit card details) when you create an account, place an order, or subscribe to our
              newsletter.
            </motion.li>
            <motion.li variants={itemVariants}>
              <strong>Non-Personal Information</strong>: Browser type, IP address, device type, operating system, and browsing
              behavior (e.g., pages visited, time spent) collected via cookies and analytics tools.
            </motion.li>
            <motion.li variants={itemVariants}>
              <strong>Order Information</strong>: Details about the products you purchase, including item names, quantities,
              and prices.
            </motion.li>
          </motion.ul>

          <motion.h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4" variants={itemVariants}>
            3. How We Use Your Information
          </motion.h2>
          <motion.p variants={itemVariants}>
            We use your information to:
          </motion.p>
          <motion.ul className="list-disc pl-6 mb-4" variants={itemVariants}>
            <motion.li variants={itemVariants}>Process and fulfill your orders, including shipping and returns.</motion.li>
            <motion.li variants={itemVariants}>Communicate with you about your account, orders, or customer service inquiries.</motion.li>
            <motion.li variants={itemVariants}>Send marketing emails or newsletters (with your consent, and you can unsubscribe anytime).</motion.li>
            <motion.li variants={itemVariants}>Improve our website, products, and services through analytics and user feedback.</motion.li>
            <motion.li variants={itemVariants}>Prevent fraud and ensure the security of our platform.</motion.li>
          </motion.ul>

          <motion.h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4" variants={itemVariants}>
            4. Cookies and Tracking Technologies
          </motion.h2>
          <motion.p variants={itemVariants}>
            We use cookies and similar technologies to enhance your experience, track website usage, and personalize content.
            You can manage cookie preferences through your browser settings, but disabling cookies may affect site functionality.
          </motion.p>

          <motion.h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4" variants={itemVariants}>
            5. Sharing Your Information
          </motion.h2>
          <motion.p variants={itemVariants}>
            We may share your information with:
          </motion.p>
          <motion.ul className="list-disc pl-6 mb-4" variants={itemVariants}>
            <motion.li variants={itemVariants}>
              <strong>Service Providers</strong>: Third parties that assist with payment processing, shipping, email marketing,
              or analytics (e.g., Stripe, Google Analytics). These providers are contractually obligated to protect your data.
            </motion.li>
            <motion.li variants={itemVariants}>
              <strong>Legal Requirements</strong>: If required by law, such as to comply with a subpoena or protect our rights.
            </motion.li>
            <motion.li variants={itemVariants}>
              <strong>Business Transfers</strong>: In the event of a merger, acquisition, or sale of assets, your data may be
              transferred to the new entity.
            </motion.li>
          </motion.ul>

          <motion.h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4" variants={itemVariants}>
            6. Data Security
          </motion.h2>
          <motion.p variants={itemVariants}>
            We implement industry-standard security measures, such as encryption and secure servers, to protect your personal
            information. However, no online platform is 100% secure, and we cannot guarantee absolute security.
          </motion.p>

          <motion.h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4" variants={itemVariants}>
            7. Your Rights
          </motion.h2>
          <motion.p variants={itemVariants}>
            Depending on your location, you may have the following rights:
          </motion.p>
          <motion.ul className="list-disc pl-6 mb-4" variants={itemVariants}>
            <motion.li variants={itemVariants}>Access your personal data.</motion.li>
            <motion.li variants={itemVariants}>Correct inaccurate or incomplete data.</motion.li>
            <motion.li variants={itemVariants}>Request deletion of your data.</motion.li>
            <motion.li variants={itemVariants}>Opt out of marketing communications.</motion.li>
            <motion.li variants={itemVariants}>Restrict or object to certain data processing.</motion.li>
          </motion.ul>
          <motion.p variants={itemVariants}>
            To exercise these rights, contact us at [Your Contact Email].
          </motion.p>

          <motion.h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4" variants={itemVariants}>
            8. Third-Party Links
          </motion.h2>
          <motion.p variants={itemVariants}>
            Our website may contain links to third-party sites. We are not responsible for their privacy practices, and we
            encourage you to review their policies.
          </motion.p>

          <motion.h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4" variants={itemVariants}>
            9. Children’s Privacy
          </motion.h2>
          <motion.p variants={itemVariants}>
            Our services are not intended for individuals under 13. We do not knowingly collect personal information from
            children. If you believe we have such data, contact us immediately.
          </motion.p>

          <motion.h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4" variants={itemVariants}>
            10. Changes to This Policy
          </motion.h2>
          <motion.p variants={itemVariants}>
            We may update this Privacy Policy periodically. Changes will be posted on this page with an updated effective date.
            Please review this policy regularly.
          </motion.p>

          <motion.h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4" variants={itemVariants}>
            11. Contact Us
          </motion.h2>
          <motion.p variants={itemVariants}>
            If you have questions about this Privacy Policy, contact us at:
          </motion.p>
          <motion.ul className="list-none pl-0 mb-4" variants={itemVariants}>
            <motion.li variants={itemVariants}>Email: [Your Contact Email]</motion.li>
            <motion.li variants={itemVariants}>Address: [Your Company Address]</motion.li>
            <motion.li variants={itemVariants}>Phone: [Your Contact Phone Number]</motion.li>
          </motion.ul>
          <motion.p variants={itemVariants}>
            Effective Date: June 22, 2025
          </motion.p>
        </motion.div>
      </motion.section>
    </div>
  );
}

export default PrivacyPolicy;