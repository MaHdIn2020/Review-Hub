import React, { use, useEffect, useState } from 'react';
import ServiceCard from '../Shared/ServiceCard';
import { motion } from 'framer-motion';
const Services = ({servicesPromise}) => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        servicesPromise.then(data => setServices(data));
    }, [servicesPromise]);
    return (
        <div className='mt-6'>
            <div className="text-center mb-12 px-4">
      {/* Heading with staggered letter animation */}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold mb-4"
      >
        Discover Our <span className="text-primary">Premium</span> Services
      </motion.h2>
      
      {/* Description with fade-in animation */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="max-w-2xl mx-auto text-lg text-gray-600"
      >
        Experience excellence with our carefully curated selection of services. 
        Each offering is designed to deliver exceptional value and quality to 
        meet your specific needs.
      </motion.p>
    </div>
    <div id='services' className='grid grid-cols-3 gap-3'>
            {
                services.map (service => <ServiceCard key={service._id} service={service}></ServiceCard>)
            }
    </div>
    </div>
    );
};

export default Services;