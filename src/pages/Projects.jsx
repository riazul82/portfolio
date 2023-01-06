import React, { useState, useEffect } from 'react';

import { BiSearch } from 'react-icons/bi';

import { data } from '../data';
import Project from '../components/Project';
import Pagination from '../components/Pagination';
import AppLayout from '../Layouts/AppLayout';

const Projects = () => {
    const [selectedItem, setSelectedItem] = useState('all');
    const [sortType, setSortType] = useState('');
    const [searchText, setSearchText] = useState('');
    const [projects, setProjects] = useState(data);
    const [searchTimer, setSearchTimer] = useState();
    const [loader, setLoader] = useState(false);
    const [loaderMessage, setLoaderMessage] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage, setProjectsPerPage] = useState(10);

    useEffect(() => {
        setProjects(data);
    }, []);

    const handleSearchText = (e) => {
        clearTimeout(searchTimer);
        setLoader(true);
        setLoaderMessage('Searching...');
        setSearchTimer(
            setTimeout(() => {
                setSearchText(e.target.value);
                setLoader(false);
            }, 900)
        );
    }

    const handleSelectedItem = (e) => {
        setSelectedItem(e.target.value);
    }

    const handleSortType = (e) => {
        setSortType(e.target.value);
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

    const getPaginationData = (currentPage, itemsPerPage) => {
        setCurrentPage(parseInt(currentPage));
        setProjectsPerPage(parseInt(itemsPerPage));
    }

    let filteredProjects = [];
    let lastIndex = currentPage * projectsPerPage;
    let firstIndex = lastIndex - projectsPerPage;

    const handleFilter = () => {
        filteredProjects = projects.filter((item) => {
            if (selectedItem === 'all' && filterSearchItems(item)) {
                return item;
            } else if (item.category.includes(selectedItem) && filterSearchItems(item)) {
                return item;
            } else {
                return null;
            }
        });
    }
    
    return (
        <AppLayout>
        {!loader && handleFilter()}
        <div className="projectsWrapper">
            <div className="topbar">
                <div className="searchBox">
                    <div className="searchIcon">
                        <BiSearch style={{color: '#fff', fontSize: '1.1rem'}} />
                    </div>
                    <div className="searchInput">
                        <input type="text" onChange={handleSearchText} placeholder="Search..." />
                    </div>
                </div>

                <div className="itemCountBox">
                    <p className="itemCountMsg">
                        <span>{filteredProjects.length} of {projects.length} items | </span> 
                        <span>{selectedItem}</span>
                    </p>
                </div>

                

                <div className="sortItems">
                    <select id="sortProjects" value={sortType} onChange={handleSortType}>
                        <option value="sort">Sort by:</option>
                        <option value="sort-latest">Latest</option>
                        <option value="sort-oldest">Oldest</option>
                        <option value="sort-ascending">Ascending</option>
                        <option value="sort-descending">Descending</option>
                        <option value="sort-bigger">Bigger</option>
                        <option value="sort-smaller">Smaller</option>
                    </select>
                </div>

                <div className="filterProjects">
                    <select id="slctProjects" value={selectedItem} onChange={handleSelectedItem}>
                        <option value="all">All</option>
                        <option value="html-css">HTML & CSS</option>
                        <option value="javascript">JavaScript</option>
                        <option value="react">React</option>
                        <option value="mern">MERN Stack</option>
                        <option value="mini-projects">Mini Projects</option>
                        <option value="javascript-mini">JavaScript Mini</option>
                        <option value="react-mini">React Mini</option>
                        <option value="fullstack-mini">Fullstack Mini</option>
                        <option value="single-page">Single Page</option>
                        <option value="multi-page">Multi Page</option>
                        <option value="frontend-web">Forntend Web</option>
                        <option value="fullstack-web">Fullstack Web</option>
                    </select>
                </div>
            </div>


            <div className="projectContainer">
                {loader && <p style={{color: '#fff', fontSize: '1.1rem'}}>{loaderMessage}</p>}
                {
                    !loader && ((filteredProjects.length === 0) ?
                    <p style={{color: '#fff', fontSize: '1.1rem'}}>No Item Found!</p> :
                    filteredProjects.slice(firstIndex, lastIndex).map((item) => {
                        return <Project key={item.id} item={item} projects={projects} />
                    }))
                }
            </div>
            <Pagination itemsLength={filteredProjects.length} getPaginationData={getPaginationData} />
        </div>
        </AppLayout>
    );
}

export default Projects;