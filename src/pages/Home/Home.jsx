import React from 'react';
import Banner from '../Shared/Banner';
import Services from './Services';
import MeetOurPartners from '../Shared/MeetOurPartners';
import Testimonials from '../Shared/testimonials';
import CountupStats from '../Shared/CountupStats';

const Home = () => {
    const servicesPromise = fetch('https://review-hub-server-xi.vercel.app/services?limit=6').then(res=>res.json())
    return (
        <div>
            <Banner></Banner>
            <Services servicesPromise={servicesPromise}></Services>
            <MeetOurPartners></MeetOurPartners>
            <CountupStats></CountupStats>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;