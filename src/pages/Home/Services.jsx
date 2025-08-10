import React, { useEffect, useState } from 'react';
import ServiceCard from '../Shared/ServiceCard';
import { motion } from 'framer-motion';

const Services = ({ servicesPromise }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    servicesPromise.then(data => setServices(data));
  }, [servicesPromise]);

  return (
    <div className="mt-6 bg-white dark:bg-gray-900 rounded-lg shadow-md py-8">
      <div className="text-center mb-8 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100"
        >
          Discover Our <span className="text-primary">Premium</span> Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-2xl mx-auto text-base md:text-lg text-gray-600 dark:text-gray-300"
        >
          Experience excellence with our carefully curated selection of services.
          Each offering is designed to deliver exceptional value and quality to
          meet your specific needs.
        </motion.p>
      </div>

      <div
        id="services"
        className="grid gap-6 justify-center sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
      >
        {services.map(service => (
          <div key={service._id} className="flex justify-center">
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
