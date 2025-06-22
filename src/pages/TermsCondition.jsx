
import React from "react";
import { motion } from "framer-motion";

function TermsCondition() {
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
        aria-label="Terms and Conditions"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center tracking-tight"
          variants={itemVariants}
        >
          Terms and Conditions
        </motion.h1>

        <motion.div className="prose prose-lg text-gray-700 mx-auto" variants={itemVariants}>
          <motion.h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4" variants={itemVariants}>
            1. Introduction
          </motion.h2>
          <motion.p variants={itemVariants}>
            Welcome to [Your Company Name] ("we," "us," or "our"). These Terms and Conditions govern your use of our website
            [Your Website URL] and any purchases made through it. By accessing or using our services, you agree to be bound by
            these terms.
          </motion.p>

          <motion.h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4" variants={itemVariants}>
            2. Acceptance of Terms
          </motion.h2>
          <motion.p variants={itemVariants}>
            By using our website, placing an order, or creating an account, you confirm that you are at least 18 years old (or
            have parental consent if under 18) and agree to these terms. If you do not agree, please do not use our services.
          </motion.p>

          <motion.h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4" variants={itemVariants}>
            3. Orders
          </motion.h2>
          <motion.p variants={itemVariants}>
            All orders are subject to acceptance and availability. We reserve the right to refuse or cancel an order for any
            reason, including pricing errors or stock unavailability. You will be notified if an order cannot be fulfilled, and
            any payments will be refunded.
          </motion.p>

          <motion.h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4" variants={itemVariants}>
            4. Pricing and Payments
          </motion.h2>
          <motion.p variants={itemVariants}>
            All prices are listed in Indian Rupees (₹) and include applicable taxes unless otherwise stated. We accept payments
            via credit/debit cards, UPI, and PayPal. Payment must be completed before an order is processed. We reserve the right
            to adjust prices without prior notice, but confirmed orders will be honored at the agreed price.
          </motion.p>

          <motion.h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4" variants={itemVariants}>
            5. Shipping and Delivery
          </motion.h2>
          <motion.p variants={itemVariants}>
            We ship to addresses within [Your Shipping Regions, e.g., India]. Shipping costs and estimated delivery times are
            provided at checkout. Delivery times are estimates and may vary due to external factors (e.g., courier delays). We are
            not responsible for delays beyond our control.
          </motion.p>

          <motion.h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4" variants={itemVariants}>
            6. Returns and Refunds
          </motion.h2>
          <motion.p variants={itemVariants}>
            We offer returns within [Your Return Period, e.g., 7 days] of delivery for unused, undamaged items in original
            packaging. To initiate a return, contact us at [Your Contact Email]. Refunds will be processed within [Your Refund
            Processing Time, e.g., 5-10 business days] after we receive the returned item. Shipping costs are non-refundable
            unless the item is defective.
          </motion.p>

          <motion.h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4" variants={itemVariants}>
            7. Intellectual Property
          </motion.h2>
          <motion.p variants={itemVariants}>
            All content on our website, including images, logos, product descriptions, and designs, is owned by [Your Company
            Name] or our licensors. You may not reproduce, distribute, or use our content without prior written permission.
          </motion.p>

          <motion.h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4" variants={itemVariants}>
            8. User Conduct
          </motion.h2>
          <motion.p variants={itemVariants}>
            You agree not to:
          </motion.p>
          <motion.ul className="list-disc pl-6 mb-4" variants={itemVariants}>
            <motion.li variants={itemVariants}>Use our website for unlawful purposes.</motion.li>
            <motion.li variants={itemVariants}>Attempt to access unauthorized areas of our systems.</motion.li>
            <motion.li variants={itemVariants}>Post false, misleading, or harmful content.</motion.li>
            <motion.li variants={itemVariants}>Interfere with the website’s functionality.</motion.li>
          </motion.ul>

          <motion.h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4" variants={itemVariants}>
            9. Limitation of Liability
          </motion.h2>
          <motion.p variants={itemVariants}>
            To the fullest extent permitted by law, [Your Company Name] is not liable for any indirect, incidental, or
            consequential damages arising from your use of our website or products. Our liability is limited to the amount paid
            for the product in question.
          </motion.p>

          <motion.h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4" variants={itemVariants}>
            10. Termination
          </motion.h2>
          <motion.p variants={itemVariants}>
            We may suspend or terminate your access to our website if you violate these terms or engage in conduct we deem
            harmful. You may close your account at any time by contacting us.
          </motion.p>

          <motion.h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4" variants={itemVariants}>
            11. Governing Law
          </motion.h2>
          <motion.p variants={itemVariants}>
            These terms are governed by the laws of [Your Jurisdiction, e.g., India]. Any disputes will be resolved in the courts
            of [Your City, e.g., Mumbai].
          </motion.p>

          <motion.h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4" variants={itemVariants}>
            12. Contact Us
          </motion.h2>
          <motion.p variants={itemVariants}>
            For questions about these Terms and Conditions, contact us at:
          </motion.p>
          <motion.ul className="list-none pl-0 mb-4" variants={itemVariants}>
            <motion.li variants={itemVariants}>Email: [Your Contact Email]</motion.li>
            <motion.li variants={itemVariants}>Address: [Your Company Address]</motion.li>
            <motion.li variants={itemVariants}>Phone: [Your Contact Phone Number]</motion.li>
          </motion.ul>

          <motion.h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4" variants={itemVariants}>
            13. Changes to These Terms
          </motion.h2>
          <motion.p variants={itemVariants}>
            We may update these Terms and Conditions periodically. Changes will be posted on this page with an updated effective
            date. Please review these terms regularly.
          </motion.p>
          <motion.p variants={itemVariants}>
            Effective Date: June 22, 2025
          </motion.p>
        </motion.div>
      </motion.section>
    </div>
  );
}

export default TermsCondition;