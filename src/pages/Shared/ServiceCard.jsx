import React from 'react';
import { Link} from 'react-router';
import { FaStar } from 'react-icons/fa';

const ServiceCard = ({ service }) => {
  return (
    <div className="">
  <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img className='w-full h-48 object-cover rounded-t-lg transition-transform duration-500 hover:scale-105'
      src={service.image}
      alt="service" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {service.title}
          {service.rating && (
            <div className="badge badge-secondary ml-2">
              <FaStar className="mr-1" />
              {service.rating}
            </div>
      )}
    </h2>
    <p >{service.description}</p>
    <div className="card-actions justify-end py-4">
      <p className='font-bold text-xl'>Price: ${service.price}</p>
      <Link to={`/services/${service._id}`}><button className="btn btn-primary">See Details</button></Link>
    </div>
  </div>
</div>
    </div>
    
  );
};

export default ServiceCard;