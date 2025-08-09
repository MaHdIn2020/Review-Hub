import { motion } from 'framer-motion';
import { FaHandshake } from 'react-icons/fa';

const partners = [
  {
    id: 1,
    name: "TechSolutions Inc.",
    logo: "https://placehold.co/150x80?text=TechSolutions",
    description:
      "Our technology infrastructure partner providing cloud services and security solutions.",
  },
  {
    id: 2,
    name: "DesignHub Creative",
    logo: "https://placehold.co/150x80?text=DesignHub",
    description: "Creative agency responsible for our brand identity and UI/UX design.",
  },
  {
    id: 3,
    name: "Global Payments",
    logo: "https://placehold.co/150x80?text=GlobalPay",
    description: "Secure payment processing and financial transaction management.",
  },
  {
    id: 4,
    name: "LogiChain",
    logo: "https://placehold.co/150x80?text=LogiChain",
    description: "Supply chain and logistics management solutions provider.",
  },
];

const MeetOurPartners = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-3 mb-4 text-primary justify-center text-lg font-semibold">
            <FaHandshake className="text-3xl" />
            <span>Strategic Collaborations</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Meet Our Trusted Partners
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg">
            We collaborate with industry leaders who share our commitment to excellence and innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {partners.map((partner, index) => (
            <motion.article
              key={partner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-xl transition-shadow duration-300"
              role="group"
              aria-label={`Partner: ${partner.name}`}
            >
              <div className="flex justify-center mb-8 h-20">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="object-contain max-h-full"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4 text-gray-900">
                {partner.name}
              </h3>
              <p className="text-gray-600 text-center flex-grow">{partner.description}</p>
              <div className="mt-6 text-center">
                <button
                  type="button"
                  className="btn btn-sm btn-outline btn-primary px-6 py-2"
                  aria-label={`View partnership details with ${partner.name}`}
                >
                  View Partnership
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-xl mb-6 font-medium">
            Interested in becoming a partner? Let's work together to achieve greatness.
          </p>
          <button
            type="button"
            className="btn btn-primary px-12 py-3 text-lg font-semibold"
            aria-label="Contact us to become a partner"
          >
            Contact Us
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default MeetOurPartners;
