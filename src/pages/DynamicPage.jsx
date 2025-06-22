import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductPreview from "../components/ProductPreview";

function DynamicPage() {
  const { items, name } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [modalState, setModalState] = useState({
    isOpen: false,
    product: null,
    variant: { size: "S", color: "Gold" },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const variantOptions = useMemo(() => ({
    size: ["S", "M", "L", "XL"],
    color: ["Gold", "Silver", "Rose Gold"],
  }), []);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://ecommerce-jewellery-15db6-default-rtdb.firebaseio.com/products/${items}/${name}.json`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch products for: ${name}`);
      }
      const data = await response.json();
      const fetchedProducts = data ? Object.values(data) : [];
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [items, name]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleVariantChange = (index, type, value) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [index]: { ...prev[index], [type]: value },
    }));
  };

  const handleAddToCart = (product, index) => {
    const variant = selectedVariants[index] || { size: "S", color: "Gold" };
    addToCart({
      id: `${product.name}-${index}`,
      name: product.name,
      price: product.price,
      image: product.image_url,
      variant,
      quantity: 1,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex items-center space-x-2 animate-pulse">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-200"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 font-semibold animate-pulse">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold capitalize transition-all duration-500 ease-in-out transform hover:scale-105">
          {`${name.replace("-", " ")} in ${items}`}
        </h1>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer transition-transform duration-300 hover:scale-110"
                onClick={() => setModalState({ isOpen: true, product, variant: selectedVariants[index] })}
              />
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-blue-600 font-bold mb-4">₹{product.price.toFixed(2)}</p>
              <div className="flex space-x-2 mb-4">
                <select
                  value={selectedVariants[index]?.size || "S"}
                  onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                  className="border rounded p-2 transition-all duration-200 focus:ring-2 focus:ring-blue-400"
                >
                  {variantOptions.size.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedVariants[index]?.color || "Gold"}
                  onChange={(e) => handleVariantChange(index, "color", e.target.value)}
                  className="border rounded p-2 transition-all duration-200 focus:ring-2 focus:ring-blue-400"
                >
                  {variantOptions.color.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => handleAddToCart(product, index)}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-700 hover:scale-105 active:scale-95"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
      {modalState.isOpen && (
        <ProductPreview
          product={modalState.product}
          variant={modalState.variant}
          onClose={() => setModalState({ isOpen: false, product: null, variant: { size: "S", color: "Gold" } })}
          onVariantChange={(type, value) =>
            setModalState((prev) => ({
              ...prev,
              variant: { ...prev.variant, [type]: value },
            }))
          }
          onAddToCart={() => {
            handleAddToCart(modalState.product, Date.now());
            setModalState({ isOpen: false, product: null, variant: { size: "S", color: "Gold" } });
          }}
        />
      )}
    </div>
  );
}

export default DynamicPage;