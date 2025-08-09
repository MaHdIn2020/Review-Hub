import { motion } from 'framer-motion';
import { FaHandshake } from 'react-icons/fa';

const partners = [
  {
    id: 1,
    name: "TechSolutions Inc.",
    logo: "https://placehold.co/150x80?text=TechSolutions",
    description: "Our technology infrastructure partner providing cloud services and security solutions."
  },
  {
    id: 2,
    name: "DesignHub Creative",
    logo: "https://placehold.co/150x80?text=DesignHub",
    description: "Creative agency responsible for our brand identity and UI/UX design."
  },
  {
    id: 3,
    name: "Global Payments",
    logo: "https://placehold.co/150x80?text=GlobalPay",
    description: "Secure payment processing and financial transaction management."
  },
  {
    id: 4,
    name: "LogiChain",
    logo: "https://placehold.co/150x80?text=LogiChain",
    description: "Supply chain and logistics management solutions provider."
  }
];

const MeetOurPartners = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 text-primary">
            <FaHandshake className="text-2xl" />
            <span className="font-semibold">Strategic Collaborations</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Partners</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            We're proud to collaborate with industry leaders who share our commitment to excellence.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex justify-center mb-6 h-20">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="object-contain max-h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">{partner.name}</h3>
                <p className="text-gray-600 text-center mb-4 flex-grow">{partner.description}</p>
                <div className="text-center">
                  <button className="btn btn-sm btn-outline">View Partnership</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg mb-6">Want to become a partner?</p>
          <button className="btn btn-primary px-8">Contact Us</button>
        </motion.div>
      </div>
    </section>
  );
};

export default MeetOurPartners;