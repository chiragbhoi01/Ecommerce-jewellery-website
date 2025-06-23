import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { db } from "../firebaseConfig";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { Timestamp } from "firebase/firestore"; // Import Timestamp for submission

// Embedded JSON data
const bannerData = {
  banners: [
    {
      id: "banner-001",
      category: "categories/bangles",
      image_url: "https://res.cloudinary.com/dplnd4t4j/image/upload/v1750610945/BannerBangle_a1cnxq.jpg",
    },
    {
      id: "banner-002",
      category: "categories/earrings",
      image_url: "https://res.cloudinary.com/dplnd4t4j/image/upload/v1750610945/BannerEarrings_xlth7l.jpg",
    },
    {
      id: "banner-003",
      category: "categories/bangles",
      image_url: "https://res.cloudinary.com/dplnd4t4j/image/upload/v1750610945/BannerBangle_a1cnxq.jpg",
    },
    {
      id: "banner-004",
      category: "collections/loka",
      image_url: "https://res.cloudinary.com/dplnd4t4j/image/upload/v1750610945/BannerLoka_l52kgp.jpg",
    },
    {
      id: "banner-005",
      category: "categories/chokers",
      image_url: "https://res.cloudinary.com/dplnd4t4j/image/upload/v1750610945/BannerChoker_na2ssr.jpg",
    },
    {
      id: "banner-006",
      category: "collections/hasli",
      image_url: "https://res.cloudinary.com/dplnd4t4j/image/upload/v1750610945/BannerHasli_iudl6p.jpg",
    },
    {
      id: "banner-007",
      category: "collections/nakshatra",
      image_url: "https://res.cloudinary.com/dplnd4t4j/image/upload/v1750610945/BannerNakshatra_c8eslj.jpg",
    },
    {
      id: "banner-008",
      category: "collections/hasli",
      image_url: "https://res.cloudinary.com/dplnd4t4j/image/upload/v1750610945/BannerHasli_iudl6p.jpg",
    },
  ],
};

// Fallback image for broken URLs
const FALLBACK_IMAGE = "https://via.placeholder.com/1200x600?text=Image+Not+Found";

// Enrich banners with path and display name
const banners = bannerData.banners.map((banner) => {
  const categorySegments = banner.category.split("/");
  const displayName = categorySegments[categorySegments.length - 1].replace(/^\w/, (c) => c.toUpperCase());
  return {
    ...banner,
    path: `/${banner.category}`,
    displayName,
  };
});

// Featured items (Loka, Bangles, Hasli, Chokers)
const featuredCategories = ["collections/loka", "categories/bangles", "collections/hasli", "categories/chokers"];
const featuredItems = featuredCategories
  .map((cat) => {
    const banner = banners.find((b) => b.category === cat);
    return banner ? { ...banner, id: `featured-${banner.id}` } : null;
  })
  .filter(Boolean);

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
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const reviewsRef = useRef(null);
  const REVIEW_LIMIT = 5;

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
        setReviews(fetchedReviews.slice(0, REVIEW_LIMIT));
        setIsLoadingReviews(false);
      },
      (error) => {
        console.error("Error fetching reviews:", error);
        setErrors({ fetch: "Failed to load reviews. Please try again later." });
        setIsLoadingReviews(false);
      }
    );
    return () => unsubscribe();
  }, []);

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
      const newReview = {
        name: formData.name.trim() || "Anonymous",
        rating: formData.rating,
        comment: formData.comment.trim(),
        timestamp: Timestamp.now(), // Use Firestore Timestamp
      };
      const docRef = await addDoc(collection(db, "reviews"), newReview);
      setReviews((prev) => [
        { id: docRef.id, ...newReview },
        ...prev.slice(0, REVIEW_LIMIT - 1),
      ]);
      setFormData({ name: "", rating: 0, comment: "" });
      setErrors({});
    } catch (error) {
      console.error("Error submitting review:", error);
      setErrors({ submit: "Failed to submit review. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scroll to reviews section
  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    try {
      // Handle Firestore Timestamp
      if (timestamp.toDate && typeof timestamp.toDate === "function") {
        return new Date(timestamp.toDate()).toLocaleDateString();
      }
      // Handle string or number
      const date = new Date(timestamp);
      return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString();
    } catch (error) {
      console.error("Error formatting timestamp:", error);
      return "N/A";
    }
  };

  // Animation variants
  const slideVariants = {
    initial: { opacity: 0, x: 50, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, scale: 0.95, transition: { duration: 0.8, ease: "easeIn" } },
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
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[80vh] overflow-hidden" role="region" aria-label="Hero banner">
        <AnimatePresence mode="wait">
          {banners.map((banner, index) =>
            index === currentSlide ? (
              <motion.div
                key={banner.id}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0"
              >
                <NavLink
                  to={banner.path}
                  aria-label={`View ${banner.displayName} collection`}
                  className="block w-full h-full"
                >
                  <img
                    src={banner.image_url}
                    alt={`Explore ${banner.displayName} jewelry collection`}
                    className="w-full h-full object-cover hover:bg-black/20 transition-opacity duration-300"
                    loading="lazy"
                    onError={(e) => {
                      console.error(`Failed to load banner image: ${banner.image_url}`);
                      e.target.src = FALLBACK_IMAGE;
                    }}
                  />
                </NavLink>
                <motion.button
                  onClick={scrollToReviews}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-sm sm:text-base px-4 sm:px-6 py-1.5 sm:py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 min-w-[120px]"
                  aria-label="View customer reviews"
                >
                  View Reviews
                </motion.button>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </section>

      {/* Featured Items Section */}
      <section
        className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        role="region"
        aria-label="Featured items"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center tracking-tight"
        >
          Featured Collections
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              custom={index}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <NavLink
                to={item.path}
                aria-label={`View ${item.displayName} collection`}
                className="block"
              >
                <img
                  src={item.image_url}
                  alt={`Explore ${item.displayName} jewelry collection`}
                  className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    console.error(`Failed to load featured image: ${item.image_url}`);
                    e.target.src = FALLBACK_IMAGE;
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <motion.h3
                    className="text-white text-lg sm:text-xl font-semibold"
                    whileHover={{ y: -5 }}
                  >
                    {item.displayName}
                  </motion.h3>
                </div>
              </NavLink>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section
        ref={reviewsRef}
        className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white"
        role="region"
        aria-label="Customer reviews"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center tracking-tight"
        >
          Customer Reviews
        </motion.h2>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Review Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Share Your Feedback</h3>
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
                  className={`mt-1 block w-full border rounded-md p-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>
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
                      className={`text-xl sm:text-2xl ${formData.rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                      aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                    >
                      <FaStar />
                    </motion.button>
                  ))}
                </div>
                {errors.rating && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.rating}</p>
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
                  className={`mt-1 block w-full border rounded-md p-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 ${
                    errors.comment ? "border-red-500" : "border-gray-300"
                  }`}
                  rows="3 sm:rows-4"
                  aria-invalid={!!errors.comment}
                  aria-describedby={errors.comment ? "comment-error" : undefined}
                />
                {errors.comment && (
                  <p id="comment-error" className="text-red-500 text-xs sm:text-sm mt-1">{errors.comment}</p>
                )}
              </div>
              {errors.submit && (
                <p className="text-red-500 text-xs sm:text-sm">{errors.submit}</p>
              )}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-600 text-white py-1.5 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base"
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
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">What Our Customers Say</h3>
            {isLoadingReviews ? (
              <p className="text-gray-600 text-sm sm:text-base">Loading reviews...</p>
            ) : errors.fetch ? (
              <p className="text-red-500 text-sm sm:text-base">{errors.fetch}</p>
            ) : reviews.length === 0 ? (
              <p className="text-gray-600 text-sm sm:text-base">No reviews yet. Be the first to share your feedback!</p>
            ) : (
              <motion.ul className="space-y-4" role="list">
                {reviews.map((review, index) => (
                  <motion.li
                    key={review.id}
                    variants={reviewVariants}
                    initial="initial"
                    animate="animate"
                    custom={index}
                    className="bg-gray-50 p-4 rounded-lg shadow-md"
                    role="listitem"
                  >
                    <div className="flex items-center mb-2">
                      <span className="font-medium text-gray-800 text-sm sm:text-base">{review.name}</span>
                      <div className="flex ml-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={`text-xs sm:text-sm ${review.rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm">{review.comment}</p>
                    <p className="text-gray-400 text-xs mt-2">{formatTimestamp(review.timestamp)}</p>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;