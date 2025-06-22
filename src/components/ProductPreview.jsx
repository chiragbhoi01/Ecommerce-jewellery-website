import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductPreview = ({
  product,
  variant = { size: "S", color: "Gold" },
  onClose,
  onVariantChange,
  onAddToCart,
}) => {
  // Animation variants for modal and content
  const modalVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const contentVariants = {
    initial: { scale: 0.85, y: 50, opacity: 0 },
    animate: { scale: 1, y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { scale: 0.85, y: 50, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          variants={modalVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            variants={contentVariants}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              aria-label="Close preview"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.3 } }}
              src={product?.image_url}
              alt={product?.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{product?.name}</h3>
            <p className="text-gray-600 mb-4 text-sm">{product?.description}</p>
            <p className="text-lg font-bold text-blue-600 mb-4">₹{product?.price?.toFixed(2)}</p>
            <div className="space-y-4 mb-6">
              <div>
                <label
                  htmlFor="size-preview"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Size
                </label>
                <select
                  id="size-preview"
                  value={variant.size}
                  onChange={(e) => onVariantChange("size", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                >
                  {["S", "M", "L", "XL"].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="color-preview"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Color
                </label>
                <select
                  id="color-preview"
                  value={variant.color}
                  onChange={(e) => onVariantChange("color", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                >
                  {["Gold", "Silver", "Rose Gold"].map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onAddToCart}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.4 2.4M17 13l2.4 2.4M9 18h6"
                />
              </svg>
              <span>Add to Cart</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductPreview;