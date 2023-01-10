import React from 'react';

const Video = ({item}) => {
    const { id, title, thumbUrl } = item;

    return (
        <div key={id} className="video">
            <div className="videoThumb">
                <img src={thumbUrl} alt="thumb" />
            </div>
            <div className="videoTitle">
                <p>{title}</p>
            </div>
        </div>
    );
}

export default Video;