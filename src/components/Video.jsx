import React from 'react';

import eGroceryShop from '../img/thumb/e-grocery-shop.jpg';
import fruitShop from '../img/thumb/online-fruit-shop.jpg';
import portfolio from '../img/thumb/personal-portfolio.jpg';
import landingPage from '../img/thumb/landing-page.jpg';
import interior from '../img/thumb/interior-website.jpg';
import shoppingCart from '../img/thumb/add-to-cart-system.jpg';
import digitalClock from '../img/thumb/digital-clock.jpg';
import parallax from '../img/thumb/parallax-effect.jpg';
import accordion from '../img/thumb/accordion.jpg';
import transparentLogin from '../img/thumb/transparent-login.jpg';
import toggleBar from '../img/thumb/toggle-bar.jpg';
import animatedLoginSignup from '../img/thumb/animated-login-signup.jpg';
import transparentLoginSignup from '../img/thumb/transparent-login-signup.jpg';
import imageGallery from '../img/thumb/image-gallery.jpg';
import scrollSpy from '../img/thumb/scrollspy.jpg';
import reactClock from '../img/thumb/react-clock.jpg';
import textAnalyzer from '../img/thumb/text-analyzer.jpg';
import colorSwitcher from '../img/thumb/color-switcher.jpg';
import crudApp from '../img/thumb/crud-app.jpg';
import segClock from '../img/thumb/seg-clock.jpg';
import upcomming from '../img/thumb/upcomming.jpg';

const Video = ({item}) => {
    const { id, title } = item;

    return (
        <div key={id} className="video">
            <div className="videoThumb">
                <img src={
                    (id === 1) ? eGroceryShop :
                    (id === 2) ? fruitShop :
                    (id === 3) ? portfolio :
                    (id === 4) ? landingPage :
                    (id === 5) ? interior :
                    (id === 6) ? shoppingCart :
                    (id === 7) ? digitalClock :
                    (id === 8) ? parallax :
                    (id === 9) ? accordion :
                    (id === 10) ? transparentLogin :
                    (id === 11) ? toggleBar :
                    (id === 12) ? animatedLoginSignup :
                    (id === 13) ? transparentLoginSignup :
                    (id === 14) ? imageGallery :
                    (id === 15) ? scrollSpy :
                    (id === 16) ? reactClock :
                    (id === 17) ? textAnalyzer :
                    (id === 18) ? colorSwitcher :
                    (id === 19) ? crudApp :
                    (id === 21) ? segClock :
                    upcomming
                } alt={`test${id}`} />
            </div>
            <div className="videoDesc">
                <p>{title}</p>
            </div>
        </div>
    );
}

export default Video;