import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaClock, FaThumbsUp } from 'react-icons/fa';

const commitments = [
  {
    id: 1,
    icon: <FaShieldAlt className="text-primary text-4xl mb-4" />,
    title: "Trusted & Verified",
    description:
      "We ensure every service provider listed is verified to guarantee trustworthy and high-quality experiences.",
  },
  {
    id: 2,
    icon: <FaClock className="text-primary text-4xl mb-4" />,
    title: "24/7 Support",
    description:
      "Our dedicated support team is available around the clock to assist you whenever you need.",
  },
  {
    id: 3,
    icon: <FaThumbsUp className="text-primary text-4xl mb-4" />,
    title: "Customer Satisfaction",
    description:
      "We prioritize your satisfaction by collecting honest reviews and continuously improving our platform.",
  },
];

const OurCommitment = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold mb-12 text-gray-900 dark:text-gray-100"
        >
          Why Choose ReviewHub
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {commitments.map(({ id, icon, title, description }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: id * 0.2 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md"
            >
              <div>{icon}</div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{title}</h3>
              <p className="text-gray-700 dark:text-gray-200">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurCommitment;
