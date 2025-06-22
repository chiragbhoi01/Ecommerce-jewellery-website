import React, { useState, useCallback, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaSignInAlt, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

// Define static navigation items
const staticNavItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

// Define dropdown items
const dropdownItems = {
  Collections: [
    { to: "/collections/hasli", label: "Hasli" },
    { to: "/collections/loka", label: "Loka" },
  ],
  Categories: [
    { to: "/categories/bangles", label: "Bangles" },
    { to: "/categories/chokers", label: "Chokers" },
  ],
};

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { cart } = useCart();
  const { user, logout } = useUser() || { user: null, logout: () => {} }; // Fallback for undefined useUser

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  // Define action items
  const actionItems = useMemo(
    () =>
      user
        ? [{ to: "/logout", label: "Logout", icon: <FaSignOutAlt className="mr-2" />, action: logout }]
        : [
            { to: "/login", label: "Login", icon: <FaSignInAlt className="mr-2" /> },
            { to: "/register", label: "Register", icon: <FaUser className="mr-2" /> },
          ],
    [user, logout]
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsUserDropdownOpen((prev) => !prev);
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center font-bold text-xl text-gray-800 hover:text-indigo-600 transition-colors duration-200"
            aria-label="Miss Gypsy Home"
          >
            Miss Gypsy
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-x-6 items-center" aria-label="Main navigation">
            {staticNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-gray-600 hover:text-indigo-700 focus:text-indigo-700 transition-colors duration-200 text-base font-medium ${
                    isActive ? "text-indigo-700" : ""
                  }`
                }
                aria-label={item.label}
              >
                {item.label}
              </NavLink>
            ))}
            {Object.entries(dropdownItems).map(([title, items]) => (
              <div key={title} className="relative group">
                <span className="text-gray-600 hover:text-indigo-700 focus:text-indigo-700 cursor-pointer text-base font-medium transition-colors duration-200">
                  {title}
                </span>
                <div className="absolute left-0 mt-8 bg-white shadow-xl rounded-xl opacity-0 group-hover:opacity-100 group-focus:opacity-100 transform scale-y-95 group-hover:scale-y-100 transition-all duration-300">
                  {items.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className="block px-5 py-2.5 text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 focus:bg-indigo-50 text-sm font-medium transition-colors duration-200"
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
            <div
              className="relative group"
              onMouseEnter={() => setIsUserDropdownOpen(true)}
              onMouseLeave={() => setIsUserDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-2 text-gray-600 hover:text-indigo-700 focus:text-indigo-700 transition-colors duration-200 text-base font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-1"
                aria-haspopup="true"
                aria-expanded={isUserDropdownOpen}
                onKeyDown={handleKeyDown}
              >
                <FaUser className="w-5 h-5" />
                <span className="hidden lg:inline">{user ? user.name || "User" : "Account"}</span>
              </button>
              <div
                className={`absolute right-0 mt-8 w-48 bg-white shadow-xl rounded-xl opacity-0 transition-all duration-300 transform scale-y-95 ${
                  isUserDropdownOpen ? "opacity-100 group-hover:opacity-100 group-focus:opacity-100 scale-y-100" : ""
                }`}
              >
                <ul className="flex flex-col">
                  {actionItems.map((item) => (
                    <li key={item.to} className="hover:bg-indigo-50">
                      {item.action ? (
                        <button
                          onClick={() => {
                            item.action();
                            setIsUserDropdownOpen(false);
                          }}
                          className="block w-full text-left px-5 py-2.5 text-gray-700 hover:text-indigo-700 focus:bg-indigo-50 text-sm font-medium transition-colors duration-200"
                          aria-label={item.label}
                        >
                          {item.icon}
                          {item.label}
                        </button>
                      ) : (
                        <NavLink
                          to={item.to}
                          className="block px-5 py-2.5 text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 focus:bg-indigo-50 text-sm font-medium transition-colors duration-200"
                          aria-label={item.label}
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          {item.icon}
                          {item.label}
                        </NavLink>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <NavLink
              to="/cart"
              className="flex items-center gap-1 text-gray-600 hover:text-indigo-700 focus:text-indigo-700 transition-colors duration-200 text-base font-medium"
            >
              <FaShoppingCart className="w-5 h-5" />
              Cart ({cart.length})
            </NavLink>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-2xl text-gray-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-1"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav
            className="md:hidden bg-white border-t border-gray-200 py-4 transition-all duration-300 ease-in-out"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col gap-y-3 px-4">
              {staticNavItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `block text-gray-600 hover:text-indigo-700 focus:text-indigo-700 transition-colors duration-200 text-base font-medium ${
                        isActive ? "text-indigo-700" : ""
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                    aria-label={item.label}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              {Object.entries(dropdownItems).flatMap(([_, items]) => items).map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className="block text-gray-600 hover:text-indigo-700 focus:text-indigo-700 transition-colors duration-200 text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label={item.label}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <div className="flex items-center gap-2 text-gray-600 text-base font-medium">
                  <FaUser className="w-5 h-5" />
                  <span>{user ? user.name || "User" : "Account"}</span>
                </div>
              </li>
              {actionItems.map((item) => (
                <li key={item.to}>
                  {item.action ? (
                    <button
                      onClick={() => {
                        item.action();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left text-gray-600 hover:text-indigo-700 focus:text-indigo-700 transition-colors duration-200 text-base font-medium pl-7"
                      aria-label={item.label}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ) : (
                    <NavLink
                      to={item.to}
                      className="block text-gray-600 hover:text-indigo-700 focus:text-indigo-700 transition-colors duration-200 text-base font-medium pl-7"
                      onClick={() => setIsMenuOpen(false)}
                      aria-label={item.label}
                    >
                      {item.icon}
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
              <li>
                <NavLink
                  to="/cart"
                  className="flex items-center gap-1 text-gray-600 hover:text-indigo-700 focus:text-indigo-700 transition-colors duration-200 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaShoppingCart className="w-5 h-5" />
                  Cart ({cart.length})
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;