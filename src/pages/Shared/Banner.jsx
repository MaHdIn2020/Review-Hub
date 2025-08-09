import React from 'react';
import { motion } from "motion/react"
const Banner = () => {
    const slides = [
    {
      id: 1,
      title: "Find Trusted Service Providers",
      description: "Read authentic reviews from real customers",
      image: "https://i.ibb.co/1GCHzJ5g/pexels-markus-winkler-1430818-4065400.jpg",
      cta: "Browse Services"
    },
    {
      id: 2,
      title: "Share Your Experiences",
      description: "Help others by rating services you've used",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80",
      cta: "Write a Review"
    },
    {
      id: 3,
      title: "Connect with Top Professionals",
      description: "Discover highest rated providers in your area",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      cta: "Explore Now"
    }
  ];
    return (
<div className="w-full">

      <div className="carousel w-full h-[70vh] rounded-box">
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            id={`slide${index + 1}`} 
            className="carousel-item relative w-full"
          >

            <div 
              className="w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-4xl">
                  <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="text-4xl md:text-5xl font-bold mb-4">
                    {slide.title}
                  </motion.h1>
                  <p className="text-xl md:text-2xl mb-8">
                    {slide.description}
                  </p>
                  <button className="btn btn-primary px-8 text-lg">
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a 
                href={`#slide${index === 0 ? slides.length : index}`} 
                className="btn btn-circle"
              >
                ❮
              </a> 
              <a 
                href={`#slide${index === slides.length - 1 ? 1 : index + 2}`} 
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
};

export default Banner;