import React, { useState, useEffect } from 'react';

import { BiSearch } from 'react-icons/bi';

import { Link } from 'react-router-dom';
import { data } from '../data';
import Video from '../components/Video';
import AppLayout from '../Layouts/AppLayout';

const Videos = () => {
    const [projects, setProjects] = useState('');

    const [selectedItem, setSelectedItem] = useState('all');
    const [searchText, setSearchText] = useState('');
    const [searchTimer, setSearchTimer] = useState();

    useEffect(() => {
        setProjects(data.filter((item) => item.tutorial.available || item.demo.available));
    }, []);

    const handleSearchText = (e) => {
        clearTimeout(searchTimer);
        setSearchTimer(
            setTimeout(() => {
                setSearchText(e.target.value);
            }, 900)
        );
    }

    const handleSelectedItem = (e) => {
        setSelectedItem(e.target.value);
    }

    const filterSearchItems = (item) => {
        let mainTxt = ''.concat(item.title, item.desc, item.type, item.tags.join(''), item.category.join('')).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        let srchTxt = searchText.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        
        if (searchText === '' || mainTxt.includes(srchTxt)) {
            return true;
        } else {
            return false;
        }
    }

    let filteredProjects = [];

    const handleFilter = () => {
        filteredProjects = projects && projects.filter((item) => {
            if (selectedItem === 'all' && filterSearchItems(item)) {
                return item;
            } else if (item.demo.available && selectedItem === 'demos' && filterSearchItems(item)) {
                return item;
            } else if (item.tutorial.available && selectedItem === 'tutorials' && filterSearchItems(item)) {
                return item;
            } else {
                return null;
            }
        });
    }

    return (
        <AppLayout>
            {projects && handleFilter()}
            <div className="videos">
                <div className="topbar">
                    <div className="searchBox">
                        <div className="searchIcon">
                            <BiSearch style={{color: '#fff', fontSize: '1.1rem'}} />
                        </div>
                        <div className="searchInput">
                            <input type="text" onChange={handleSearchText} placeholder="Search..." />
                        </div>
                    </div>

                    <div className="itemCountBox searchCountBox">
                        <p className="itemCountMsg">
                            <span style={{color: '#ccc'}}>Projects count: </span>
                            <span>{filteredProjects.length} of {projects.length} items | </span> 
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
                    {(filteredProjects.length === 0) ? 
                    <p style={{color: '#fff', fontSize: '1.1rem'}}>No Item Found!</p> :
                    filteredProjects.map((item, index) => {
                        return <Link to={item.title.split(' ').join('-').toLowerCase()} state={{item, projects}} key={index}>
                            <Video item={item} />
                        </Link>
                    })}
                </div>
            </div>
        </AppLayout>
    );
}

export default Videos;