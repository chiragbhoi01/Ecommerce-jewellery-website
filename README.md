Miss Gypsy - Jewelry E-commerce Website
👩‍💼 Miss Gypsy is a sleek jewelry e-commerce platform built with React.js, featuring a responsive design, smooth animations, and real-time data integration with Firebase Firestore. Browse elegant jewelry collections, submit reviews, and contact us with ease.
🚀 Live Demo
🔗 Visit Miss Gypsy
🛠️ Features

📄 Single Page Application with React.js and React Router
🛒 Home Page: Hero banner slider (Irya, Earrings, Bangles, etc.), featured collections, and customer reviews stored in Firebase
📬 Contact Page: Form submissions saved to Firebase with validation and success/error feedback
📜 Privacy & Terms: Static legal pages for user trust
💳 Checkout & Payment: Basic checkout flow with INR (₹) support
🛍️ Cart: Context-based cart management (placeholder)
🖼️ Dynamic Product Pages: Category-specific views (e.g., /products/necklaces)
📱 Fully responsive across all devices
✨ Framer Motion animations for engaging transitions and hover effects
🌐 Real-time Firebase Firestore for reviews and contact form submissions

🧰 Tech Stack

React.js
Tailwind CSS
Framer Motion
React Router
Firebase Firestore
React Icons
JavaScript (ES6+)
Vercel for deployment

🧑‍💻 How to Use

Clone the repository:
git clone https://github.com/chiragbhoi01/Ecommerce-jewellery-website.git
cd miss-gypsy


Install dependencies:
npm install

Key dependencies:
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.0",
    "framer-motion": "^10.12.16",
    "firebase": "^10.0.0",
    "react-icons": "^5.0.0",
    "@tailwindcss/typography": "^0.5.9",
    "tailwindcss": "^3.3.0"
  }
}


Set up Firebase:

Create a Firebase project at Firebase Console.
Enable Firestore in “Production Mode.”
Copy your Firebase config to src/firebase.js:import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };


Update Firestore security rules in Firebase Console:rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reviews/{reviewId} {
      allow read: if true;
      allow write: if true;
    }
    match /contacts/{contactId} {
      allow read: if true;
      allow write: if true;
    }
  }
}




Run the development server:
npm run dev

Open http://localhost:5173 in your browser.

Deploy to Vercel:

Push to a GitHub repository.
Connect to Vercel:
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist


Access at https://chirag-shopmissgypsy.vercel.app.



📁 Project Structure
miss-gypsy/
│
├── public/                # Static assets
├── src/
│   ├── components/
│   │   └── Footer.jsx     # Footer with navigation
│   ├── context/
│   │   └── CartContext.jsx # Cart context
│   ├── pages/
│   │   ├── Home.jsx       # Home page with slider and reviews
│   │   ├── Contact.jsx    # Contact form and info
│   │   ├── Privacy.jsx    # Privacy Policy
│   │   ├── Terms.jsx      # Terms & Conditions
│   │   ├── Checkout.jsx   # Checkout page
│   │   ├── Payment.jsx    # Payment page
│   │   ├── Cart.jsx       # Cart page (placeholder)
│   │   ├── DynamicPage.jsx # Dynamic product pages
│   │   ├── LoginForm.jsx  # Login (placeholder)
│   │   ├── RegisterForm.jsx # Register (placeholder)
│   │   └── About.jsx      # About (placeholder)
│   ├── firebase.js        # Firebase configuration
│   ├── App.jsx            # Main app with routing
│   ├── index.css          # Tailwind CSS
│   └── main.jsx           # Entry point
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
├── package.json
└── README.md              # Project overview

📌 Known Issues

Typo: Home.jsx uses "Bangels" instead of "Bangles" in banner data. To fix:category: "Bangles"

Update bannerDetails and categories accordingly.

📌 Future Enhancements

🛍️ Implement full cart functionality with item management
🔐 Add Firebase Authentication for user-specific reviews and cart
📧 Enable newsletter signup with Firebase or SendGrid
📊 Add product filtering and search on dynamic pages
📬 Set up email notifications for contact form submissions
🌗 Add dark/light mode toggle
📝 Add blog section for jewelry trends and updates

🙋‍♂️ Author
Chirag Bhoi📍 Udaipur, Rajasthan📧 [mr.chiragbhoi2003@gmail.com](mailto:mr.chiragbhoi2003@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/chiragbhoi01)  
🔗 [GitHub](https://github.com/chiragbhoi01)  
🌐 [Portfolio](https://chiragbhoimarshal.netlify.app/)

Built with ❤️ by Chirag Bhoi for Miss Gypsy