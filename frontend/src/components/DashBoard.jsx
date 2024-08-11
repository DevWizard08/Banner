// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ setBannerData }) => {
    const [bannerVisible, setBannerVisible] = useState(true);
    const [description, setDescription] = useState('');
    const [timer, setTimer] = useState(0);
    const [link, setLink] = useState('');

    useEffect(() => {
        const fetchBannerData = async () => {
            try {
                const response = await axios.get('https://banner-ozdm.onrender.com/api/banner');
                const { visible, description, timer, link } = response.data;
                setBannerVisible(visible);
                setDescription(description);
                setTimer(timer);
                setLink(link);
            } catch (error) {
                console.error('Error fetching banner data:', error);
            }
        };

        fetchBannerData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedBanner = { visible: bannerVisible, description, timer, link };
        try {
            await axios.post('https://banner-ozdm.onrender.com/api/banner', updatedBanner);
            setBannerData(updatedBanner); // Update the banner data in the parent component
            alert('Banner updated successfully!');
        } catch (error) {
            console.error('Error updating banner:', error);
            alert('Failed to update banner.');
        }
    };

    return (
        <div className="border border-black p-4 rounded-lg">
            <form onSubmit={handleSubmit} className="flex flex-col items-start space-y-4">
                <h2 className="text-2xl font-semibold">Update Banner</h2>
                <div className="flex items-center">
                    <label className="block mr-2">Visible:</label>
                    <input
                        type="checkbox"
                        checked={bannerVisible}
                        onChange={(e) => setBannerVisible(e.target.checked)}
                        className="ml-2"
                    />
                </div>
                <div className="w-full">
                    <label className="block">
                        Description:
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        />
                    </label>
                </div>
                <div className="w-full">
                    <label className="block">
                        Timer (seconds):
                        <input
                            type="number"
                            value={timer}
                            onChange={(e) => setTimer(Number(e.target.value))}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        />
                    </label>
                </div>
                <div className="w-full">
                    <label className="block">
                        Link:
                        <input
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        />
                    </label>
                </div>
                <button 
                    type="submit" 
                    className="w-full py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                    Update Banner
                </button>
            </form>
        </div>
    );
};

export default Dashboard;
