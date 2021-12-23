import React from "react";
import '../styles/footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <ul>
                    <h2>Company</h2>
                    <li>
                        <a href="#">About</a>
                    </li>
                </ul>
                <ul>
                    <h2>Support</h2>
                    <li>
                        <a href="#">About</a>
                    </li>
                </ul>
                <ul>
                    <h2>Services</h2>
                    <li>
                        <a href="#">About</a>
                    </li>
                </ul>
                <hr />
                <div className="mt-5">
                    <p className="main-hero-para text-center w-100">
                        Copyright @ 2021. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;