import React from 'react';
import './Homecomp.css';
import image3 from '../../images/image3.png';

function Homecomp() {
  const handleScroll = () => {
    const cardsSection = document.querySelector('.cards-section');
    if (cardsSection) {
      window.scrollTo({
        top: cardsSection.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <div className="background">
        <div className="content">
          <h1 className="heading">Dive into a World of Ideas</h1>
          <p className="para">
            "Start your journey today and unlock a world of insightful content tailored just for you. Engage with a vibrant community of like-minded individuals,
            and stay updated with the latest trends and ideas. Your voice matters here—create an account and be part of something bigger!"
          </p>
          <button className="cta-button" onClick={handleScroll}>Get Started</button>
        </div>
      </div>

      {/* Cards Section */}
      <div className="cards-section">
        <div className="content-section">
            <div className='headingofcontainer'>Explore, Engage, and Enlighten</div>
            <div className='sometext'>Discover a vast library of insightful articles spanning a wide range of topics that cater to your interests.</div>
            </div>
        <div className="image-section"><img src={image3} alt="Example" /></div>
      </div>
    </>
  );
}

export default Homecomp;
