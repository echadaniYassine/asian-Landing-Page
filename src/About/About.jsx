import React, { useEffect, useRef } from 'react';
import about from '../assets/Group 17.png';
import './About.css'; // Import your CSS file

export const About = () => {
  

  return (
    <>
      <div id='about' className="image-text-container">
        <div className="image-container">
          <img src={about} alt="About Image" />
        </div>
        <div className="text-container">
          <p className='txtabout'>
            <h1>ASIAN TASTE</h1>
            Store Sushi is your go-to destination for fresh and delicious sushi. We offer a wide variety of sushi rolls, sashimi, nigiri, and other Japanese delicacies, expertly prepared by our skilled chefs.
            <br /><br />
            Whether you're craving classic California rolls or adventurous specialty rolls, our store provides the perfect selection to satisfy your sushi cravings.
            <br /><br />
            Visit us in-store or order online for convenient pickup or delivery, and experience the exquisite taste of authentic sushi at Store Sushi.
          </p>
        </div>
      </div>
</>
  );
};

export default About;
