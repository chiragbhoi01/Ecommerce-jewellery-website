
import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { Link } from "react-router";


// Cart Item Component
const CartItem = ({ id, name, price, quantity, image, variant, onRemove, onQuantityChange }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex items-center bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow duration-300"
  >
    <img src={image} alt={name} className="w-20 h-20 rounded-md object-cover mr-4" />
    <div className="flex-grow">
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-gray-600 text-sm">
        {variant?.size}, {variant?.color}
      </p>
      <p className="text-gray-600">₹{price.toFixed(2)} each</p>
    </div>
    <div className="flex items-center space-x-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onQuantityChange(id, quantity - 1)}
        className="text-gray-600 hover:text-blue-600 disabled:text-gray-300"
        aria-label={`Decrease quantity of ${name}`}
        disabled={quantity <= 1}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
        </svg>
      </motion.button>
      <span className="text-gray-800 w-8 text-center">{quantity}</span>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onQuantityChange(id, quantity + 1)}
        className="text-gray-600 hover:text-blue-600"
        aria-label={`Increase quantity of ${name}`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onRemove(id)}
        className="text-red-600 hover:text-red-800"
        aria-label={`Remove ${name} from cart`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </motion.button>
    </div>
  </motion.div>
);

// Cart Component
const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  // Calculate total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {
    // Placeholder for checkout logic
    console.log("Proceeding to checkout with items:", cart);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Your Cart</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Review your selected items, including sizes and colors, and proceed to checkout when ready.
          </p>
        </motion.section>

        {/* Cart Items Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {cart.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              {cart.map((item, index) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  image={item.image}
                  variant={item.variant || { size: "N/A", color: "N/A" }}
                  onRemove={() => removeFromCart(item.id)}
                  onQuantityChange={(id, newQuantity) => updateQuantity(id, newQuantity)}
                />
              ))}
              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-semibold text-gray-800">
                  <span>Total:</span>
                  <span>₹{total}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCheckout}
                  className="mt-4 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  aria-label="Proceed to checkout"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                 <Link to="/checkout"> <span>Proceed to Checkout</span></Link>
                </motion.button>
              </div>
            </div>
          )}
        </motion.section>
      </main>
      
    </div>
  );
};

export default Cart;
