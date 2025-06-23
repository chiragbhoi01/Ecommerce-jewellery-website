import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Contact from "./pages/Contact";
import DynamicPage from "./pages/DynamicPage";
import Cart from "./pages/Cart";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Checkout from "./pages/Checkout";
import TermsCondition from "./pages/TermsCondition";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <Header />
      </UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/:items/:name" element={<DynamicPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/termsconditions" element={<TermsCondition />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
