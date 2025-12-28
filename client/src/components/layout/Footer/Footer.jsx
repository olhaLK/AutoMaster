import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer__section footer__map">
                    <p className="footer__title">Find us</p>

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d553.041655463915!2d30.381068343130405!3d50.413015281596195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cbc19d18ea33%3A0xd62b361117e5d14f!2sVD%20Auto%20City!5e1!3m2!1sen!2sua!4v1765706390951!5m2!1sen!2sua"
                        className="footer__map-iframe"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                    />
                </div>

                <div className="footer-section">
                    <p className="footer-title">AutoMaster</p>
                    <p>© 2025 AutoMaster. All rights reserved.</p>
                </div>

                <div className="footer-section">
                    <p className="footer-title">Contact</p>
                    <p>+380 12 345 6789</p>
                </div>

                <div className="footer-section">
                    <p className="footer-title">Social</p>
                    <div className="footer-socials">
                        <span>Facebook</span>
                        <span>Twitter</span>
                        <span>Instagram</span>
                    </div>
                </div>

                <div className="footer-section">
                    <p className="footer-title">Legal</p>
                    <p>Privacy Policy</p>
                    <p>Terms of Service</p>
                </div>

                <div className="footer-section">
                    <p className="footer-title">Dealerships</p>
                    <ul>
                        <li>Kyiv — some str. 14</li>
                        <li>Odesa — another str. 32</li>
                        <li>Lviv — different str. 5</li>
                    </ul>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
