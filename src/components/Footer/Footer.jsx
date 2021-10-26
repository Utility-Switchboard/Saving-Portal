import React from 'react';
import './Footer.css';

function Footer() {

    return (
        <>
            <div className="footer-container" id="footer-container">
                <nav className="footer">
                    <a href="." className="footer-logo">
                        <img src="https://924601.smushcdn.com/2398792/wp-content/themes/twentytwentyone/assets/images/usb-logo-white.png?lossy=1&strip=1&webp=1" alt="Logo" width="200" loading="lazy"/>
                        <p>	&#169; Copyright {new Date().getFullYear()} - All rights reserved</p>
                    </a>
                </nav>
            </div>
        </>
    )
}

export default Footer;
