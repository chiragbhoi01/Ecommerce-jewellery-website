import React from "react";
import { motion } from "framer-motion";

const ProductPreview = ({ product, variant, onClose, onVariantChange, onAddToCart }) => {
  if (!product) return null;
  const variantOptions = product.variantOptions || {
    size: ["S", "M", "L", "XL"],
    color: ["Gold", "Silver", "Rose Gold"],
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
      role="dialog"
      aria-label="Product preview modal"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={product.image_url}
          alt={`${product.name} in ${variant.color}`}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-indigo-600 font-bold mb-4">₹{product.price.toFixed(2)}</p>
        <div className="flex flex-col space-y-2 mb-4">
          <div>
            <label htmlFor="modal-size" className="sr-only">
              Select size
            </label>
            <select
              id="modal-size"
              value={variant.size}
              onChange={(e) => onVariantChange("size", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              aria-label="Select size"
            >
              {variantOptions.size.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="modal-color" className="sr-only">
              Select color
            </label>
            <select
              id="modal-color"
              value={variant.color}
              onChange={(e) => onVariantChange("color", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              aria-label="Select color"
            >
              {variantOptions.color.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onAddToCart}
            className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
            aria-label="Close modal"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductPreview;