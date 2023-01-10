import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

// components
import Video from '../components/Video';

// layouts
import AppLayout from '../Layouts/AppLayout';

// contexts
import { ProjectsContext } from '../context/ProjectsContextProvider';

// icons
import { BiSearch } from 'react-icons/bi';

const Videos = () => {
    const projects = useContext(ProjectsContext);
    
    const [videos, setVideos] = useState([]);
    const [filteredVideos, setFilteredVideos] = useState([]);
    const [selectedItem, setSelectedItem] = useState('all');
    const [searchText, setSearchText] = useState('');
    const [searchTimer, setSearchTimer] = useState();

    useEffect(() => {
        const videoItems = projects.filter((item) => item.youtubeVideoType === 'tutorial' || item.youtubeVideoType === 'demo'); 
        setVideos(videoItems);

        const filterSearchItems = (item) => {
            let mainTxt = ''.concat(item.title, item.desc, item.type, item.tags.join(''), item.category.join('')).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            let srchTxt = searchText.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            
            if (searchText === '' || mainTxt.includes(srchTxt)) {
                return true;
            } else {
                return false;
            }
        }
    
        let filteredVideoItems = [];
    
        filteredVideoItems = videoItems && videoItems.filter((item) => {
            if (selectedItem === 'all' && filterSearchItems(item)) {
                return item;
            } else if (item.youtubeVideoType === 'demo' && selectedItem === 'demos' && filterSearchItems(item)) {
                return item;
            } else if (item.youtubeVideoType === 'tutorial' && selectedItem === 'tutorials' && filterSearchItems(item)) {
                return item;
            } else {
                return null;
            }
        });

        setFilteredVideos(filteredVideoItems);

    }, [projects, searchText, selectedItem]);

    const handleSearchText = (e) => {
        clearTimeout(searchTimer);
        setSearchTimer(
            setTimeout(() => {
                setSearchText(e.target.value);
            }, 600)
        );
    }

    const handleSelectedItem = (e) => {
        setSelectedItem(e.target.value);
    }

    return (
        <AppLayout>
            <div className="videos">
                <div className="topbar">
                    <div className="searchBox">
                        <div className="searchIconBox">
                            <BiSearch style={{color: '#fff', fontSize: '1.3rem'}} />
                        </div>
                        <div className="searchInput">
                            <input type="text" onChange={handleSearchText} placeholder="Search..." />
                        </div>
                    </div>

                    <div className="itemCountBox searchCountBox">
                        <p className="itemCountMsg">
                            <span style={{color: '#ccc'}}>Video count: </span>
                            <span>{filteredVideos.length} of {videos.length} items | </span> 
                            <span>{selectedItem}</span>
                        </p>
                    </div>
                    
                    <div className="filterProjects">
                        <select id="slctProjects" value={selectedItem} onChange={handleSelectedItem}>
                            <option value="all">All</option>
                            <option value="demos">Demos</option>
                            <option value="tutorials">Tutorials</option>
                        </select>
                    </div>
                </div>

                <div className="videosWrap">
                    {(filteredVideos.length === 0) ? 
                    <p style={{color: '#fff', fontSize: '1.1rem'}}>No Item Found!</p> :
                    filteredVideos.map((video) => {
                        return <Link to={video.id} key={video.id} state={{video, videos}}>
                            <Video item={video} />
                        </Link>
                    })}
                </div>
            </div>
        </AppLayout>
    );
}

export default Videos;