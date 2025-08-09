import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/Shared/Navbar';
import Footer from '../pages/Shared/Footer';
import TitleUpdater from '../pages/Shared/TitleUpdater';

const RootLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <TitleUpdater></TitleUpdater>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;