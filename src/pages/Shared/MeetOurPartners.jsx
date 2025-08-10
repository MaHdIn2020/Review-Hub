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
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
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
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-gray-900 dark:text-gray-100">
            Meet Our Trusted Partners
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
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
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-xl transition-shadow duration-300"
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
              <h3 className="text-xl font-semibold text-center mb-4 text-gray-900 dark:text-gray-100">
                {partner.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center flex-grow">{partner.description}</p>
            </motion.article>
          ))}
        </div>

        {/* Replaced Button with Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-xl mb-10 font-medium text-gray-900 dark:text-gray-100">
            Together, we’ve built a network of innovation and trust.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <h4 className="text-4xl font-bold text-primary">25+</h4>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Active Partnerships</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-primary">10</h4>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Years of Collaboration</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-primary">15+</h4>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Industries Served</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MeetOurPartners;
