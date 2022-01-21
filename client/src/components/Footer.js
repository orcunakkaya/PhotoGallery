import React from 'react'

function Footer() {
    return (
        <div className='container-fluid bg-dark text-light footer'>
                <div className='footer-logo'>
                    <a href='https://github.com/orcunakkaya/PhotoGallery' target="_blank" rel="noreferrer">
                        <i className="fab fa-github"></i>
                    </a>
                    <span className='text-center'>All rights reserved.</span>
                </div>
                <div className='footer-link'>
                    <span>About</span>
                    <span>Privacy</span>
                    <span>Security</span>
                    <span>Docs</span>
                    <span>Pricing</span>
                    <span>Contact</span>
                    <span>Support</span>
                    <span>Community</span>
                </div>
        </div>
    )
}

export default Footer
