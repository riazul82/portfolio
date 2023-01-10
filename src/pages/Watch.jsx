import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import AppLayout from '../Layouts/AppLayout';

const Watch = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {video, videos} = location.state;
    const {id, title, type, desc, status, date, fonts, plugins, tags, icons, responsive, githubLink, previewLink, youtubeLink, youtubeVideoType, youtubeEmbedLink} = video;
    
    const index = videos.indexOf(video);
    const prevIndex = (index + videos.length - 1) % videos.length;
    const nextIndex = (index + 1) % videos.length;

    return (
        <AppLayout>
            <div className="detailsContent">
                <div className="detailsHeader">
                    <h1>{title}</h1>
                    <p>{desc}</p>
                </div>
                <div className="detailsBtns">
                    <button>Download Code</button>
                    <a href={previewLink} target="_blank" rel="noreferrer">Preview</a>
                    <a href={githubLink} target="_blank" rel="noreferrer">Github</a>
                    {youtubeVideoType === 'tutorial' && <a href={youtubeLink} target="_blank" rel="noreferrer">Watch on Youtube</a>}
                    {youtubeVideoType === 'demo' && <a href={youtubeLink} target="_blank" rel="noreferrer">Watch on Youtube</a>}
                </div>
                <div className="WatchBox">
                    <iframe width="100%" height="100%" src={youtubeEmbedLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
                            <td className="detailsAttr">Type</td>
                            <td className="detailsValue">{type}</td>
                        </tr>

                        <tr className="detailsTableRow">
                            <td className="detailsAttr">Created on</td>
                            <td className="detailsValue">{date}</td>
                        </tr>

                        <tr className="detailsTableRow">
                            <td className="detailsAttr">Status</td>
                            <td className="detailsValue">{status}</td>
                        </tr>

                        {fonts && <tr className="detailsTableRow">
                            <td className="detailsAttr">Fonts</td>
                            <td className="detailsValue">
                                {fonts.map((item, index) => {
                                    return <span key={index} className="detailsValue">{(index !== fonts.length - 1) ? item + ', ' : item}</span>
                                })}
                            </td>
                        </tr>}

                        {icons && <tr className="detailsTableRow">
                            <td className="detailsAttr">Icons</td>
                            <td className="detailsValue">
                                {icons.map((icon, index) => {
                                    return <span key={index}>{(icons.length - 1 !== index) ? icon + ', ' : icon}</span>
                                })}
                            </td>
                        </tr>}

                        {plugins && <tr className="detailsTableRow">
                            <td className="detailsAttr">Plugins</td>
                            <td className="detailsValue">
                                {plugins.map((plugin, index) => {
                                    return <span key={index}>{plugin}</span>
                                })}
                            </td>
                        </tr>}

                        <tr className="detailsTableRow">
                            <td className="detailsAttr">Responsive</td>
                            <td className="detailsValue">{responsive}</td>
                        </tr>

                        <tr className="detailsTableRow">
                            <td className="detailsAttr">Tags</td>
                            <td className="detailsValue tags">
                                {tags.map((elem, index) => {
                                    return <span key={index} className={elem}>{elem}</span>
                                })}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="projectDetailsRedirectBtns">
                    <button onClick={() => {navigate('/projects/videos')}}>Back to videos</button>
                    <button onClick={() => {navigate('/projects')}}>Back to Projects</button>
                </div>

                <div className="projectSwitchNextAndPrevBtn">
                    <Link to={`/projects/videos/${videos[prevIndex].id}`} state={{video: videos[prevIndex], videos}} className="switchLink">Prev</Link>
                    <Link to={`/projects/videos/${videos[nextIndex].id}`} state={{video: videos[nextIndex], videos}} className="switchLink">Next</Link>
                </div>

                <div className="projectSwitchCountBox">
                    <p className="projectSwitchCount">Switch: {(index < 9) ? '0' + (index + 1) : (index + 1)}/{videos.length}</p>
                </div>

                <div className="detailsAllProjectsBox">
                    <div className="detailsAllProjects">
                        {videos.map((video) => {
                            return <Link to={`/projects/videos/${video.id}`} key={video.id} state={{video, videos}} className="detailsAllProjectsBoxLink">{
                                <div className={(video.id === id) ? 'detailsSwitchBoxProject activeSwitchBoxProject' : 'detailsSwitchBoxProject'}>
                                    <div className="switchBoxImageContent">
                                        <img src={video.thumbUrl} alt="video" />
                                    </div>
                                    <div className="switchBoxDetailsContent">
                                        <p className="switchBoxDetailsContentTitle">{(video.title.length > 22) ? video.title.slice(0, 22).concat('...') : video.title}</p>
                                        <p className="switchBoxDetailsContentDesc">{(video.desc.length > 40) ? video.desc.slice(0, 40).concat('...') : video.desc}</p>
                                    </div>
                                </div>
                            }</Link>
                        })}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

export default Watch;