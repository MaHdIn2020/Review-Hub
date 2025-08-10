import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Small Business Owner",
    content:
      "This platform helped me find reliable cleaning services that transformed my office space. The verified reviews saved me hours of research!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Homeowner",
    content:
      "Found the perfect HVAC technician through detailed service comparisons. The price transparency helped me budget accurately.",
    rating: 4,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Marketing Director",
    content:
      "Our company uses this to vet all our service providers. The community feedback has been invaluable for our operations.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-gray-100">
            Trusted by Thousands
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-100">
            Hear what our community says about their service experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial) => (
            <motion.article
              key={testimonial.id}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 80, damping: 15 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col text-gray-900 dark:text-gray-100"
              role="group"
              aria-label={`Testimonial from ${testimonial.name}`}
            >
              <FaQuoteLeft className="text-primary text-4xl opacity-20 mb-6" />
              <p className="italic text-gray-700 dark:text-gray-100 mb-8 flex-grow">{testimonial.content}</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="avatar placeholder">
                  <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-100">{testimonial.role}</p>
                  <div className="flex mt-1" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
