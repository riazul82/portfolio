import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import AppLayout from '../Layouts/AppLayout';

const ProjectDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {project, projects} = location.state;
    const {id, title, type, desc, status, date, fonts, plugins, tags, icons, responsive, thumbUrl, githubLink, previewLink, youtubeLink, youtubeVideoType} = project;
    
    const index = projects.indexOf(project);
    const prevIndex = (index + projects.length - 1) % projects.length;
    const nextIndex = (index + 1) % projects.length;

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
                    {youtubeVideoType === 'tutorial' && <a href={youtubeLink} target="_blank" rel="noreferrer">Tutorial</a>}
                    {youtubeVideoType === 'demo' && <a href={youtubeLink} target="_blank" rel="noreferrer">Demo</a>}
                </div>
                <div className="detailsImageBox">
                    <img src={thumbUrl} alt={'project'} />
                </div>
                <div className="detailsMoreImages">
                    <div className="detailsMoreImgBox">
                        <img src={thumbUrl} alt={'project'} />
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
                    <button onClick={() => {navigate('/projects')}}>Back to Projects</button>
                    <button onClick={() => {navigate('/videos')}}>Go to Videos</button>
                </div>

                <div className="projectSwitchNextAndPrevBtn">
                    <Link to={`/projects/${projects[prevIndex].id}`} state={{project: projects[prevIndex], projects}} className="switchLink">Prev</Link>
                    <Link to={`/projects/${projects[nextIndex].id}`} state={{project: projects[nextIndex], projects}} className="switchLink">Next</Link>
                </div>

                <div className="projectSwitchCountBox">
                    <p className="projectSwitchCount">Switch: {(index < 9) ? '0' + (index + 1) : (index + 1)}/{projects.length}</p>
                </div>

                <div className="detailsAllProjectsBox">
                    <div className="detailsAllProjects">
                        {projects.map((project) => {
                            return <Link key={project.id} to={`/projects/${project.id}`} state={{project, projects}} className="detailsAllProjectsBoxLink">{
                                <div className={(project.id === id) ? 'detailsSwitchBoxProject activeSwitchBoxProject' : 'detailsSwitchBoxProject'}>
                                    <div className="switchBoxImageContent">
                                        <img src={project.thumbUrl} alt="project" />
                                    </div>
                                    <div className="switchBoxDetailsContent">
                                        <p className="switchBoxDetailsContentTitle">{(project.title.length > 22) ? project.title.slice(0, 22).concat('...') : project.title}</p>
                                        <p className="switchBoxDetailsContentDesc">{(project.desc.length > 40) ? project.desc.slice(0, 40).concat('...') : project.desc}</p>
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

export default ProjectDetails;