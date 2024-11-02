// Splash.js
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import splashImage from '../../public/assets/images/logo.jpg'; // Ensure the path is correct
import infoImage from '../../public/assets/images/img1.jpeg' ;// Add an info image if needed


class Splash extends React.Component {
    render() {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-between">
                {/* Top Header with Splash Image */}
                <header className="bg-gray-800 p-4 flex items-center justify-center">
                    <img src={splashImage} alt="Logo" className="h-16 w-16" />
                    <p className="text-4xl font-bold ml-4">PulsePlay</p>
                </header>

                {/* Main Content Area */}
                <div className="flex flex-col md:flex-row items-center justify-center flex-grow px-8 py-12">
                    {/* Left Section: Slogan and Info Image */}
                    <div className="flex-1 text-center md:text-left mb-8 md:mb-0">
                        <p className="text-2xl font-semibold mb-4">Discover, Play, and Share your favorite music</p>
                        <img src={infoImage} alt="Info" className="max-w-xs mx-auto md:mx-0 rounded-lg shadow-lg" />
                    </div>

                    {/* Right Section: Descriptive Text and "Get Started" Button */}
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-lg mb-6">
                            Explore a vast library of songs, create personalized playlists, sign up, and share your musical journey with friends. Whether you're into the latest hits or classic tunes, our app has something for everyone.
                        </p>
                        <Link to="/login" className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg shadow-md transition duration-300">
                            Get Started
                        </Link>
                    </div>
                </div>

                {/* Footer Section: Authentication Forms (optional for now) */}
                <footer className="bg-gray-800 p-4 text-center">
                    {/* Optional: Add footer content here */}
                </footer>
            </div>
        );
    }
}

export default Splash;