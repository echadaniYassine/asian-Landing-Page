import React, { useState, useContext } from "react";
import axios from "axios"; // Import Axios for POST requests
import './footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';


export default function Footer() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Define the Formspree endpoint
        const formEndpoint = "https://formspree.io/f/xldekvpq"; // Replace with your Formspree form endpoint

        // Send form data to Formspree using Axios
        axios
            .post(formEndpoint, formData)
            .then((response) => {
                console.log(response.data);
                setIsSubmitted(true); // Indicate that the form was submitted
                setFormData({ name: "", email: "", message: "" }); // Clear form data
            })
            .catch((error) => {
                console.error(error);
                setError("There was an error submitting the form. Please try again.");
                setIsSubmitted(false);
            });
    };

    return (
        <div id="contact" className="contact-container">
            <div className="contact-left">
                <h1 className="contact-title">Asian <span>Contact</span></h1>
                <p className="contact-description">
                    Indulge in Asia's exquisite flavors, where tradition meets modern innovation,
                    transporting you straight to the heart of Japan.                </p>
                <div className="contact-icons">
                    <div className="contact-icon">
                        <FaEnvelope style={{ color: "#5f7e21",  marginRight:"10px"}} />
                        <span>Email : asiantaste713@gmail.com</span>
                    </div>
                    <div className="contact-icon">
                        <FaPhone style={{ color: "#5f7e21",  marginRight:"10px"}} />
                        <span>Phone : 0642420823 / 0522980679</span>
                    </div>
                    <div className="contact-icon">
                        <FaMapMarkerAlt style={{ color:"#5f7e21", marginRight:"10px" }} />
                        <span>23 rue Tal Zaatar, Rue du Louvre, Casablanca</span>
                    </div>
                </div>
                <div className="social-media">
                    <a href="https://www.facebook.com/profile.php?id=61554955762961" target="_blank" rel="noopener noreferrer">
                        <FaFacebookF className="social-icon" />
                    </a>
                    <a href="https://www.instagram.com/asiantastecasablanca?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="social-icon" />
                    </a>
                    <a href="https://wa.me/+212642420823" target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp className="social-icon" />
                    </a>
                </div>
            </div>

            <div className="contact-right">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="who Asian contacting with today"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Let`s touch on email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="What are you craving today?"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Contact Me
                    </button>
                </form>
                {isSubmitted && <p>Message sent successfully!</p>}
                {error && <p className="error">{error}</p>}
            </div>

        </div>
    );
}
