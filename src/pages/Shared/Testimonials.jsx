import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Small Business Owner",
    content: "This platform helped me find reliable cleaning services that transformed my office space. The verified reviews saved me hours of research!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Homeowner",
    content: "Found the perfect HVAC technician through detailed service comparisons. The price transparency helped me budget accurately.",
    rating: 4
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Marketing Director",
    content: "Our company uses this to vet all our service providers. The community feedback has been invaluable for our operations.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Trusted by Thousands</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear what our community says about their service experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ type: "spring" }}
              className="card bg-base-100 shadow-lg"
            >
              <div className="card-body">
                <FaQuoteLeft className="text-3xl text-primary opacity-20 mb-4" />
                <p className="italic mb-6">{testimonial.content}</p>
                <div className="flex items-center mt-auto">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-12">
                      <span>{testimonial.name.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <div className="flex mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials