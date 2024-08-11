// src/App.js
import React, { useState } from 'react';
import Banner from './components/Banner';
import Dashboard from './components/DashBoard'; // Ensure the import path is correct
import './index.css';

const App = () => {
    const [bannerData, setBannerData] = useState({
        visible: true,
        description: '',
        timer: 0,
        link: ''
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-500 to-purple-300"> {/* Gradient background */}
            <h1 className="text-4xl font-bold mb-8 text-white">Banner Management</h1> {/* Optional: Change text color for better contrast */}
            <Banner 
                visible={bannerData.visible} 
                description={bannerData.description} 
                timer={bannerData.timer} 
                link={bannerData.link} 
            />
            <Dashboard setBannerData={setBannerData} />
        </div>
    );
};

export default App;
