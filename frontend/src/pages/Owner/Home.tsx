import React from 'react';
import '../../index.css';
import { useNavigate } from 'react-router-dom';
import background from '../../assets/images/banner3.jpg';
import bookIcon from '../../assets/images/book-sports-venues.png';
import playIcon from '../../assets/images/play-with-players.png';
import skillIcon from '../../assets/images/skill-up-game.png';
import personImage from '../../assets/images/badminton-girl.png';
import OwnerNavbar from '../../components/owner/Header/OwnerNavbar';
import Footer from '../../components/user/Footer/footer';

const Homepage = () => {

    const navigate = useNavigate();

    const handleAddVenueClick = () => {
      navigate('/owner/venueupload');
    };


  return (
    <>
    <OwnerNavbar/>
    <div className="min-h-screen bg-gray-100">
      <div className="relative">
        <img
          src={background}
          alt="Background"
          className="w-full h-[600px] object-fit"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-white text-4xl font-bold">Play sports, book venues</h1>
            <p className="text-white text-lg mt-2">World's Biggest sports community</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-8 text-center">Your one-stop platform for sports</h2>
        <div className="bg-white shadow-md rounded-lg p-8 bg-green-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center ">
            <div className="flex flex-col space-y-8">
              <div className="flex items-center space-x-4">
                <img src={bookIcon} alt="Book venues" className="w-12 h-12" />
                <h3 className="text-lg font-semibold">Register your sports venues </h3>
              </div>
              <div className="flex items-center space-x-4">
                <img src={playIcon} alt="Play with players" className="w-12 h-12" />
                <h3 className="text-lg font-semibold">Connect with the players</h3>
              </div>
              <div className="flex items-center space-x-4">
                <img src={skillIcon} alt="Skill up" className="w-12 h-12" />
                <h3 className="text-lg font-semibold">Skill-up  games</h3>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src={personImage}
                alt="Person with a racket"
                className="h-full"
              />
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button   onClick={handleAddVenueClick} className="w-24 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300">
              Add Venue
              
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Homepage;
