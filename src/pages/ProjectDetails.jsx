import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

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
import reactSpf from '../img/thumb/react-spf.jpg';
import segClock from '../img/thumb/seg-clock.jpg';
import timer from '../img/thumb/countdown.jpg';
import upcomming from '../img/thumb/upcomming.jpg';

import Footer from '../components/Footer';

const ProjectDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {item, projects} = location.state;
    const {id, type, title, desc, status, fonts, date, tags, plugins, icons, imageSrc, localStorage, database, authentication, responsive, preview, source, tutorial, demo} = item;
    
    const index = projects.indexOf(item);
    const prevIndex = (index + projects.length - 1) % projects.length;
    const nextIndex = (index + 1) % projects.length;

    return (
        <>
            <div className="detailsContent">
                <div className="detailsHeader">
                    <h1>{title}</h1>
                    <p>{desc}</p>
                </div>
                <div className="detailsBtns">
                    <button>Download Code</button>
                    <a href={preview} target="_blank" rel="noreferrer">Preview</a>
                    <a href={source} target="_blank" rel="noreferrer">Github</a>
                    {(tutorial.available) ?                     
                    <a href={tutorial.link} target="_blank" rel="noreferrer">Tutorial</a> :
                    null}
                    {(demo.available) ?        
                    <a href={demo.link} target="_blank" rel="noreferrer">Demo</a> :
                    null}
                </div>
                <div className="detailsImageBox">
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
                        (id === 20) ? reactSpf :
                        (id === 21) ? segClock :
                        (id === 22) ? timer :
                        upcomming
                    } alt={`test${id}`} />
                </div>
                <div className="detailsMoreImages">
                    <div className="detailsMoreImgBox">
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
                            (id === 20) ? reactSpf :
                            (id === 21) ? segClock :
                            (id === 22) ? timer :
                            upcomming
                        } alt={`test${id}`} />
                    </div>
                    <div className="detailsMoreImgBox"></div>
                    <div className="detailsMoreImgBox"></div>
                    <div className="detailsMoreImgBox"></div>
                    <div className="detailsMoreImgBox"></div>
                    <div className="detailsMoreImgBox"></div>
                    <div className="detailsMoreImgBox"></div>
                </div>
                <table className="detailsInfo">
                    <thead>
                        <tr>
                            <th>#Attribute</th>
                            <th>#Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="detailsTableRow">
                            <td className="detailsAttr">Type: </td>
                            <td className="detailsValue">{type}</td>
                        </tr>
                        <tr className="detailsTableRow">
                            <td className="detailsAttr">Created on: </td>
                            <td className="detailsValue">{date}</td>
                        </tr>
                        <tr className="detailsTableRow">
                            <td className="detailsAttr">Status: </td>
                            <td className="detailsValue">{status}</td>
                        </tr>
                        <tr className="detailsTableRow">
                            <td className="detailsAttr">Fonts: </td>
                            <td className="detailsValue">
                                {(fonts === null) ? <span className="detailsValue">no</span> : fonts.map((item, index) => {
                                    return <span key={index} className="detailsValue">{(index !== fonts.length - 1) ? item + ', ' : item}</span>
                                })}
                            </td>
                        </tr>
                        <tr className="detailsTableRow">
                            <td className="detailsAttr">Icons: </td>
                            <td className="detailsValue">
                                {(icons === null) ? 'no' : icons.map((icon, index) => {
                                    return <a key={index} href={icon.link} title={icon.link} rel="noreferrer" target="_blank">{(icons.length - 1 !== index) ? icon.name + ', ' : icon.name}</a>
                                })}
                            </td>
                        </tr>
                        <tr className="detailsTableRow">
                            <td className="detailsAttr">Plugins: </td>
                            <td className="detailsValue">{
                                (plugins === null) ? 'no' :
                                plugins.map((plugin, index) => {
                                    return <a key={index} href={plugin.link} title={plugin.link} target="_blank" rel="noreferrer">{(plugins.length - 1 !== index) ? plugin.name + ', ' : plugin.name}</a>
                                })
                            }</td>
                        </tr>
                        <tr className="detailsTableRow">
                            <td className="detailsAttr">Images from: </td>
                            <td className="detailsValue">{
                                (imageSrc === null) ? 'no' :
                                imageSrc.map((src, index) => {
                                    return <a key={index} href={src.link} title={src.link} target="_blank" rel="noreferrer">{(imageSrc.length - 1 !== index) ? src.site + ', ' : src.site}</a>
                                })
                            }</td>
                        </tr>
                        <tr className="detailsTableRow">
                            <td className="detailsAttr">Responsive: </td>
                            <td className="detailsValue">{(responsive) ? 'yes' : 'no'}</td>
                        </tr>
                        <tr className="detailsTableRow">
                            <td className="detailsAttr">Tags: </td>
                            <td className="detailsValue tags">{
                                tags.map((elem, index) => {
                                    return <span key={index} className={elem}>{elem}</span>
                                })
                            }</td>
                        </tr>
                        <tr className="detailsTableRow">
                            <td className="detailsAttr">Local Storage: </td>
                            <td className="detailsValue">{(localStorage) ? 'yes' : 'no'}</td>
                        </tr>
                        <tr className="detailsTableRow">
                            <td className="detailsAttr">Database: </td>
                            <td className="detailsValue">{
                                (!database.status) ? 'no' :
                                database.dbname.map((elem, index) => {
                                    return <span key={index}>{elem}</span>
                                })
                            }</td>
                        </tr>
                        <tr className="detailsTableRow">
                            <td className="detailsAttr">Authentication: </td>
                            <td className="detailsValue">{
                                (!authentication.status) ? 'no' :
                                authentication.authName.map((elem, index) => {
                                    return <span key={index}>{elem}</span>
                                })
                            }</td>
                        </tr>
                    </tbody>
                </table>

                <div className="backToProjectsBtn">
                    <button onClick={() => {navigate('/projects')}}>Back to Projects</button>
                </div>

                <div className="projectSwitchNextAndPrevBtn">
                    <Link to={`/projects/${projects[prevIndex].title.split(' ').join('-').toLowerCase()}`} state={{item: projects[prevIndex], projects}} className="switchLink">Prev</Link>
                    <Link to={`/projects/${projects[nextIndex].title.split(' ').join('-').toLowerCase()}`} state={{item: projects[nextIndex], projects}} className="switchLink">Next</Link>
                </div>

                <div className="projectSwitchCountBox">
                    <p className="projectSwitchCount">Switch: {(index < 9) ? '0' + (index + 1) : (index + 1)}/{projects.length}</p>
                </div>

                <div className="detailsAllProjectsBox">
                    <div className="detailsAllProjects">
                        {projects.map((item) => {
                            return <Link key={item.id} to={`/projects/${item.title.split(' ').join('-').toLowerCase()}`} state={{item, projects}} className="detailsAllProjectsBoxLink">{
                                <div className={(item.id === id) ? 'detailsSwitchBoxProject activeSwitchBoxProject' : 'detailsSwitchBoxProject'}>
                                    <div className="switchBoxImageContent">
                                        <img src={
                                            (item.id === 1) ? eGroceryShop :
                                            (item.id === 2) ? fruitShop :
                                            (item.id === 3) ? portfolio :
                                            (item.id === 4) ? landingPage :
                                            (item.id === 5) ? interior :
                                            (item.id === 6) ? shoppingCart :
                                            (item.id === 7) ? digitalClock :
                                            (item.id === 8) ? parallax :
                                            (item.id === 9) ? accordion :
                                            (item.id === 10) ? transparentLogin :
                                            (item.id === 11) ? toggleBar :
                                            (item.id === 12) ? animatedLoginSignup :
                                            (item.id === 13) ? transparentLoginSignup :
                                            (item.id === 14) ? imageGallery :
                                            (item.id === 15) ? scrollSpy :
                                            (item.id === 16) ? reactClock :
                                            (item.id === 17) ? textAnalyzer :
                                            (item.id === 18) ? colorSwitcher :
                                            (item.id === 19) ? crudApp :
                                            (item.id === 20) ? reactSpf :
                                            (item.id === 21) ? segClock :
                                            (item.id === 22) ? timer :
                                            upcomming
                                        } alt={`test${id}`} />
                                    </div>
                                    <div className="switchBoxDetailsContent">
                                        <p className="switchBoxDetailsContentTitle">{(item.title.length > 22) ? item.title.slice(0, 22).concat('...') : item.title}</p>
                                        <p className="switchBoxDetailsContentDesc">{(item.desc.length > 40) ? item.desc.slice(0, 40).concat('...') : item.desc}</p>
                                    </div>
                                </div>
                            }</Link>
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProjectDetails;