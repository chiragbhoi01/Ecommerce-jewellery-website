# Miss Gypsy - Jewelry E-commerce Website

Miss Gypsy is a modern, sleek e-commerce platform tailored for showcasing elegant jewelry collections. Built with React.js, the website offers seamless navigation, smooth animations, and real-time data integration using Firebase Firestore. Explore timeless jewelry pieces, share reviews, and reach out effortlessly through the contact form.

---

## 🚀 **Live Demo**

🔗 **[Visit Miss Gypsy](https://chirag-shopmissgypsy.vercel.app)**

---

## 🛠️ **Features**

* **📄 Single Page Application**: Built with React.js and React Router for a smooth user experience.
* **🛒 Home Page**:

  * Hero banner slider featuring categories like Irya, Earrings, Bangles, and more.
  * Showcases featured collections and customer reviews stored in Firebase.
* **📬 Contact Page**:

  * Form submissions saved to Firebase with real-time validation and feedback.
* **📜 Privacy & Terms**: Static legal pages for user transparency and trust.
* **💳 Checkout & Payment**:

  * Basic checkout flow supporting INR (₹).
* **🛍️ Cart Management**:

  * Context-based cart functionality (currently placeholder).
* **🖼️ Dynamic Product Pages**:

  * Category-specific pages like `/products/necklaces`.
* **📱 Responsive Design**: Optimized for all devices.
* **✨ Engaging Animations**: Framer Motion ensures smooth transitions and hover effects.
* **🌐 Real-Time Database**: Integrated with Firebase Firestore for storing reviews and form submissions.

---

## 🧰 **Tech Stack**

* **Frontend**: React.js, Tailwind CSS, React Router, Framer Motion
* **Backend**: Firebase Firestore
* **Icons**: React Icons
* **Deployment**: Vercel

---

## 🧑‍💻 **How to Use**

### Clone the repository:

```bash
git clone https://github.com/chiragbhoi01/Ecommerce-jewellery-website.git
cd Ecommerce-jewellery-website
```

### Install dependencies:

```bash
npm install
```

Key dependencies:

```json
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
```

### Set up Firebase:

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable Firestore in **Production Mode**.
3. Copy your Firebase config to `src/firebase.js`:

```javascript
import { initializeApp } from "firebase/app";
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
```

4. Update Firestore security rules:

```javascript
rules_version = '2';
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
```

### Run the development server:

```bash
npm run dev
```

Open the app in your browser at `http://localhost:5173`.

### Deploy to Vercel:

1. Push the code to a GitHub repository.
2. Connect the repository to Vercel:

   * **Framework Preset**: Vite
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`

Access your deployed app at `https://your-deployment-url.vercel.app`.

---

## 📁 **Project Structure**

```plaintext
miss-gypsy/
│
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   └── Footer.jsx     # Footer with navigation links
│   ├── context/
│   │   └── CartContext.jsx # Context for cart management
│   ├── pages/             # Application pages
│   │   ├── Home.jsx       # Home page
│   │   ├── Contact.jsx    # Contact page
│   │   ├── Privacy.jsx    # Privacy policy page
│   │   ├── Terms.jsx      # Terms & Conditions page
│   │   ├── Checkout.jsx   # Checkout page
│   │   ├── Payment.jsx    # Payment page
│   │   ├── Cart.jsx       # Cart page (placeholder)
│   │   ├── DynamicPage.jsx # Dynamic product listing
│   │   ├── LoginForm.jsx  # Login page
│   │   ├── RegisterForm.jsx # Register page
│   │   └── About.jsx      # About page
│   ├── firebase.js        # Firebase configuration
│   ├── App.jsx            # Main application file
│   ├── index.css          # Tailwind CSS styles
│   └── main.jsx           # Entry point
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite configuration
├── package.json           # Project metadata and dependencies
└── README.md              # Project overview (this file)
```

---

## 📌 **Known Issues**

* Typo in `Home.jsx`: "Bangels" instead of "Bangles" in banner data.

  * Fix: Update `category: "Bangles"` in `bannerDetails` and related categories.

---

## 📌 **Future Enhancements**

* 🛍️ Implement full cart functionality with item management.
* 🔐 Add Firebase Authentication for user accounts.
* 📧 Enable newsletter signup with Firebase or SendGrid.
* 📊 Add product filtering and search capabilities.
* 📬 Set up email notifications for contact form submissions.
* 🌗 Add dark/light mode toggle.
* 📝 Introduce a blog section for jewelry trends and updates.

---

## 🙋‍♂️ **Author**

**Chirag Bhoi**

* 📍 Udaipur, Rajasthan
* 📧 [mr.chiragbhoi2003@gmail.com](mailto:mr.chiragbhoi2003@gmail.com)
* 🔗 [LinkedIn](https://www.linkedin.com/in/chiragbhoi01)
* 🔗 [GitHub](https://github.com/chiragbhoi01)
* 🌐 [Portfolio](https://chiragbhoimarshal.netlify.app)

Built with ❤️ by Chirag Bhoi for **Miss Gypsy**.
