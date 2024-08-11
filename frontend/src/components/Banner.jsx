// src/components/Banner.js
import React, { useEffect, useState } from 'react';

const Banner = ({ visible, description, timer, link }) => {
    const [timeLeft, setTimeLeft] = useState(timer);
    const [isVisible, setIsVisible] = useState(visible);

    useEffect(() => {
        setTimeLeft(timer);
        setIsVisible(visible);
    }, [timer, visible]);

    useEffect(() => {
        let countdown;
        if (isVisible && timeLeft > 0) {
            countdown = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setIsVisible(false); // Hide the banner when the timer reaches 0
                        clearInterval(countdown); // Clear the interval
                        return 0; // Set time left to 0
                    }
                    return prev - 1; // Decrement time left by 1
                });
            }, 1000);
        }

        return () => clearInterval(countdown); // Cleanup on unmount
    }, [isVisible, timeLeft]);

    if (!isVisible) return null; // Return null if the banner is not visible

    return (
        <div className={`border border-black p-4 rounded-lg`}>
            <h2 className="text-3xl font-bold">{description}</h2>
            <p className="mt-2 text-2xl">Time remaining: {timeLeft} seconds</p>
            {link && ( // Render the link only if it exists
                <a 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:underline text-lg"
                >
                    Visit Link
                </a>
            )}
        </div>
    );
};

export default Banner;
