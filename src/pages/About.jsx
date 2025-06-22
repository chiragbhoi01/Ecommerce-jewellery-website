
import React, { useMemo } from "react";
import { motion } from "framer-motion";


// Team Member Component
const TeamMember = ({ name, role, image }) => (
  <motion.div
    whileHover={{ scale: 1.05, rotate: 2 }}
    whileTap={{ scale: 0.95 }}
    className="bg-white rounded-lg shadow-md p-6 text-center"
  >
    <img src={image} alt={name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
    <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
    <p className="text-gray-600">{role}</p>
  </motion.div>
);

// About Us Component
export default function About() {
  // Memoize team members to prevent unnecessary re-renders
  const teamMembers = useMemo(
    () => [
      {
        name: "Luna Hart",
        role: "Founder & Creative Director",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      },
      {
        name: "Zara Quinn",
        role: "Lead Designer",
        image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      },
      {
        name: "Mila Rose",
        role: "Marketing Manager",
        image: "https://images.unsplash.com/photo-1524504383359-3e8e7274461d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      },
    ],
    []
  );

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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">About Miss Gypsy</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Miss Gypsy is a lifestyle brand inspired by the free spirit of wanderlust. We craft unique fashion and accessories that empower you to embrace your inner adventurer with confidence and style.
          </p>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">Our Mission</h3>
          <p className="text-gray-600 max-w-4xl mx-auto text-center">
            To inspire and empower individuals to live boldly and authentically through sustainable, high-quality products that tell a story of adventure and freedom.
          </p>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Meet Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
              />
            ))}
          </div>
        </motion.section>
      </main>
     
    </div>
  );
};

;
