import React from 'react';
import { Link } from 'react-router-dom';

const Project = ({ project, projects }) => {
    const {id, title, desc, status, date, tags, thumbUrl, gitHubLink, previewLink} = project;

    return (
        <div className="projectContent">
            <div className="projectImage">
                <img src={thumbUrl} alt="project" />
            </div>

            <div className="projectStatus">
                <p style={
                    (status === 'completed' && {backgroundColor: "seagreen"}) || 
                    (status === 'running' && {backgroundColor: "crimson"}) ||
                    (status === 'updating' && {backgroundColor: "#c0bd0c"})} 
                    className="status">{status === 'completed' ? status : status + '...'}</p>
            </div>

            <div className="projectOverview">
                <p className="projectTitle">
                    <Link to={id} state={{project, projects}} className="projectTitleLink">{title}</Link>
                </p>
                <p className="projectDesc">{(desc.length <= 60) ? desc : desc.slice(0, 60).concat('...')}</p>
                <p className="projectDate">{date}</p>
                <p className="tags">
                    {tags.map((elem, index) => {
                        return <span className={`${elem.toLowerCase()}`} key={index}>{elem}</span>
                    })}
                </p>
            </div>

            <div className="projectLinks">
                <div className="projectDetailsLink">
                    <Link to={id} state={{project, projects}} className="detailsLink">Details</Link>
                </div>
                <div className="projectSourcLink">
                    <a href={gitHubLink} target="_blank" rel="noreferrer" className="sourceLink">Source Code</a>
                </div>
                <div className="projectPreviewLink">
                    <a href={previewLink} target="_blank" rel="noreferrer" className="previewLink">Preview</a>
                </div>
            </div>
        </div>
    );
}

export default Project;