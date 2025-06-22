import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebaseConfig";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

// Embedded JSON data
const bannerData = {
  banners: [
    {
      id: "banner-001",
      category: "Irya",
      image_url: "https://res.cloudinary.com/dplnd4t4j/image/upload/v1750610945/BannerIrya_oghzl8.jpg",
    },
    {
      id: "banner-002",
      category: "Earrings",
      image_url: "https://res.cloudinary.com/dplnd4t4j/image/upload/v1750610945/BannerEarrings_xlth7l.jpg",
    },
    {
      id: "banner-003",
      category: "Bangels",
      image_url: "https://res.cloudinary.com/dplnd4t4j/image/upload/v1750610945/BannerBangle_a1cnxq.jpg",
    },
    {
      id: "banner-004",
      category: "Loka",
      image_url: "https://res.cloudinary.com/dplnd4t4j/image/upload/v1750610945/BannerLoka_l52kgp.jpg",
    },
    {
      id: "banner-005",
      category: "Chokers",
      image_url: "https://res.cloudinary.com/dplnd4t4j/image/upload/v1750610945/BannerChoker_na2ssr.jpg",
    },
    {
      id: "banner-006",
      category: "Necklaces",
      image_url: "https://res.cloudinary.com/dplnd4t4j/image/upload/v1750610945/BannerNecklace_tujtfk.jpg",
    },
    {
      id: "banner-007",
      category: "Nakshatra",
      image_url: "https://res.cloudinary.com/dplnd4t4j/image/upload/v1750610945/BannerNakshatra_c8eslj.jpg",
    },
    {
      id: "banner-008",
      category: "Hasli",
      image_url: "https://res.cloudinary.com/dplnd4t4j/image/upload/v1750610945/BannerHasli_iudl6p.jpg",
    },
  ],
};

// Fallback image for broken URLs
const FALLBACK_IMAGE = "https://via.placeholder.com/1200x600?text=Image+Not+Found";

// Static titles and subtitles for display
const bannerDetails = {
  Irya: { title: "Irya Elegance", subtitle: "Discover unique designs that captivate" },
  Earrings: { title: "Sparkle with Earrings", subtitle: "Elevate your style with every pair" },
  Bangels: { title: "Bold Bangles", subtitle: "Make a statement with every gesture" },
  Loka: { title: "Loka Luxury", subtitle: "Embrace timeless elegance" },
  Chokers: { title: "Chic Chokers", subtitle: "Bold and beautiful designs" },
  Necklaces: { title: "Timeless Necklaces", subtitle: "Adorn your neck with sophistication" },
  Nakshatra: { title: "Nakshatra Glow", subtitle: "Shine with celestial charm" },
  Hasli: { title: "Hasli Heritage", subtitle: "Celebrate tradition with style" },
};

// Enrich banners with title and subtitle
const banners = bannerData.banners.map((banner) => ({
  ...banner,
  title: bannerDetails[banner.category]?.title || `Explore ${banner.category}`,
  subtitle: bannerDetails[banner.category]?.subtitle || "Discover our latest designs",
}));
console.log("Banners:", banners);

// Generate categories from banners
const categories = banners.map((banner, index) => ({
  id: `category-${index + 1}`,
  title: banner.category,
  type: banner.category.toLowerCase() === "irya" ? "necklaces" : banner.category.toLowerCase(),
  path: `/products/${banner.category.toLowerCase() === "irya" ? "necklaces" : banner.category.toLowerCase()}`,
  image: banner.image_url,
  alt: `Explore ${banner.category} jewelry collection`,
}));
console.log("Categories:", categories);

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    comment: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-slide effect for banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch reviews from Firestore
  useEffect(() => {
    const q = query(collection(db, "reviews"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedReviews = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(fetchedReviews);
      },
      (error) => {
        console.error("Error fetching reviews:", error);
      }
    );
    return () => unsubscribe();
  }, []);

  // Manual slide navigation
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle rating selection
  const handleRating = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
    setErrors((prev) => ({ ...prev, rating: "" }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required (or use 'Anonymous')";
    if (formData.rating < 1 || formData.rating > 5) newErrors.rating = "Please select a rating (1–5 stars)";
    if (!formData.comment.trim()) newErrors.comment = "Comment is required";
    else if (formData.comment.length > 500) newErrors.comment = "Comment must be under 500 characters";
    return newErrors;
  };

  // Handle review submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "reviews"), {
        name: formData.name.trim() || "Anonymous",
        rating: formData.rating,
        comment: formData.comment.trim(),
        timestamp: new Date(),
      });
      setFormData({ name: "", rating: 0, comment: "" });
      setErrors({});
    } catch (error) {
      console.error("Error submitting review:", error);
      setErrors({ submit: "Failed to submit review. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const slideVariants = {
    initial: { opacity: 0, x: 50, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, scale: 0.95, transition: { duration: 0.8, ease: "easeIn" } },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 + i * 0.1, duration: 0.5 },
    }),
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.9 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, delay: i * 0.1, type: "spring", stiffness: 120 },
    }),
  };

  const dotVariants = {
    initial: { opacity: 0.5, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.3, opacity: 1 },
  };

  const reviewVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1 },
    }),
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Banner with Slider */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden" role="region" aria-label="Hero banner">
        <AnimatePresence mode="wait">
          {banners.map((banner, index) => (
            index === currentSlide && (
              <motion.div
                key={banner.id}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0"
              >
                <img
                  src={banner.image_url}
                  alt={`Explore ${banner.category} jewelry collection`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    console.error(`Failed to load banner image: ${banner.image_url}`);
                    e.target.src = FALLBACK_IMAGE;
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                  <motion.div className="text-center text-white px-4 sm:px-6">
                    <motion.h1
                      variants={textVariants}
                      initial="initial"
                      animate="animate"
                      custom={0}
                      className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight"
                    >
                      {banner.title}
                    </motion.h1>
                    <motion.p
                      variants={textVariants}
                      initial="initial"
                      animate="animate"
                      custom={1}
                      className="text-base sm:text-lg md:text-xl mb-6"
                    >
                      {banner.subtitle}
                    </motion.p>
                    <motion.div
                      variants={textVariants}
                      initial="initial"
                      animate="animate"
                      custom={2}
                    >
                      <NavLink
                        to={`/products/${banner.category.toLowerCase() === "irya" ? "necklaces" : banner.category.toLowerCase()}`}
                        className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base"
                        aria-label={`Shop ${banner.category === "Bangels" ? "Bangles" : banner.category} collection`}
                      >
                        Shop Now
                      </NavLink>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
        {banners.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-3 rounded-lg hover:bg-opacity-90"
              aria-label="Previous slide"
            >
              <FaArrowLeft className="text-gray-800" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, rotate: -5, boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-3 rounded-lg hover:bg-opacity-90"
              aria-label="Next slide"
            >
              <FaArrowRight className="text-gray-800" />
            </motion.button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {banners.map((_, index) => (
                <motion.button
                  key={index}
                  variants={dotVariants}
                  initial="initial"
                  animate={index === currentSlide ? "animate" : "initial"}
                  whileHover="hover"
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === currentSlide ? "true" : "false"}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Featured Collections */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="region" aria-label="Featured collections">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-800 mb-8 text-center tracking-tight"
        >
          Featured Collections
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              custom={index}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <NavLink
                to={category.path}
                aria-label={`View ${category.title === "Bangels" ? "Bangles" : category.title} collection`}
              >
                <motion.img
                  src={category.image}
                  alt={category.alt}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  whileHover={{ scale: 1.05 }}
                  loading="lazy"
                  onError={(e) => {
                    console.error(`Failed to load category image: ${category.image}`);
                    e.target.src = FALLBACK_IMAGE;
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <motion.h3
                    className="text-white text-xl font-semibold"
                    whileHover={{ y: -5 }}
                  >
                    {category.title === "Bangels" ? "Bangles" : category.title}
                  </motion.h3>
                </div>
              </NavLink>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white" role="region" aria-label="Customer reviews">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-800 mb-8 text-center tracking-tight"
        >
          Customer Reviews
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Review Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Share Your Feedback</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name (optional)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Anonymous"
                  className={`mt-1 block w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <div className="flex space-x-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      onClick={() => handleRating(star)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`text-2xl ${formData.rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                      aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                    >
                      <FaStar />
                    </motion.button>
                  ))}
                </div>
                {errors.rating && (
                  <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
                )}
              </div>
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                  Comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  placeholder="Tell us about your experience..."
                  className={`mt-1 block w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 ${
                    errors.comment ? "border-red-500" : "border-gray-300"
                  }`}
                  rows="4"
                  aria-invalid={!!errors.comment}
                  aria-describedby={errors.comment ? "comment-error" : undefined}
                />
                {errors.comment && (
                  <p id="comment-error" className="text-red-500 text-sm mt-1">{errors.comment}</p>
                )}
              </div>
              {errors.submit && (
                <p className="text-red-500 text-sm">{errors.submit}</p>
              )}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                disabled={isSubmitting}
                aria-label="Submit review"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </motion.button>
            </form>
          </motion.div>
          {/* Review Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">What Our Customers Say</h3>
            {reviews.length === 0 ? (
              <p className="text-gray-600">No reviews yet. Be the first to share your feedback!</p>
            ) : (
              reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  variants={reviewVariants}
                  initial="initial"
                  animate="animate"
                  custom={index}
                  className="bg-gray-50 p-4 rounded-lg shadow-md"
                >
                  <div className="flex items-center mb-2">
                    <span className="font-medium text-gray-800">{review.name}</span>
                    <div className="flex ml-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`text-sm ${review.rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                  <p className="text-gray-400 text-xs mt-2">
                    {new Date(review.timestamp.toDate()).toLocaleDateString()}
                  </p>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-blue-600 py-12" role="region" aria-label="Newsletter signup">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">Join Our Newsletter</h2>
          <p className="mb-6 text-sm md:text-base">Stay updated with the latest trends and exclusive offers.</p>
          <div className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-xs"
              aria-label="Email for newsletter"
              disabled
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ scale: [1, 1.02, 1], transition: { duration: 1.5, repeat: Infinity } }}
              className="bg-white text-blue-600 px-4 py-2 rounded-r-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Subscribe to newsletter"
              disabled
            >
              Subscribe
            </motion.button>
          </div>
          <p className="mt-4 text-xs">*Newsletter signup is disabled for demo purposes.</p>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;