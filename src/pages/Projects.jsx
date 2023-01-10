import React, { useState, useContext, useEffect } from 'react';

// components
import Project from '../components/Project';
import Pagination from '../components/Pagination';

// layouts
import AppLayout from '../Layouts/AppLayout';

// contexts
import { ProjectsContext } from '../context/ProjectsContextProvider';

// icons
import { BiSearch } from 'react-icons/bi';

const Projects = () => {
    const projects = useContext(ProjectsContext);

    const [filteredProjects, setFilteredProjects] = useState([]);
    const [selectedItem, setSelectedItem] = useState('all');
    const [sortType, setSortType] = useState('bigger');
    const [searchText, setSearchText] = useState('');
    const [searchTimer, setSearchTimer] = useState();
    const [loader, setLoader] = useState(false);
    const [loaderMessage, setLoaderMessage] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage, setProjectsPerPage] = useState(10);

    useEffect(() => {
        let filteredProjectItems = [];

        const filterSearchItems = (item) => {
            let mainTxt = ''.concat(item.title, item.desc, item.type, item.tags.join(''), item.category.join('')).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            let srchTxt = searchText.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
            if (searchText === '' || mainTxt.includes(srchTxt)) {
                return true;
            } else {
                return false;
            }
        }
    
        filteredProjectItems = projects.filter((item) => {
            if (selectedItem === 'all' && filterSearchItems(item)) {
                return item;
            } else if (item.category.includes(selectedItem) && filterSearchItems(item)) {
                return item;
            } else {
                return null;
            }
        });

        if (sortType === 'latest') {
            filteredProjectItems.sort((a, b) => {
                let t1 = new Date(a.date).getTime();
                let t2 = new Date(b.date).getTime();
                return t2 - t1;
            });
        } else if (sortType === 'oldest') {
            filteredProjectItems.sort((a, b) => {
                let t1 = new Date(a.date).getTime();
                let t2 = new Date(b.date).getTime();
                return t1 - t2;
            });
        } else if (sortType === 'ascending') {
            filteredProjectItems.sort((a, b) => {
                let x = a.title.toLowerCase();
                let y = b.title.toLowerCase();
                if (x < y) return -1;
                if (x > y) return 1;
                return 0;
            });
        } else if (sortType === 'descending') {
            filteredProjectItems.sort((a, b) => {
                let x = a.title.toLowerCase();
                let y = b.title.toLowerCase();
                if (x > y) return -1;
                if (x < y) return 1;
                return 0;
            });
        } else if (sortType === 'bigger') {
            filteredProjectItems.sort((a, b) => {
                return b.size - a.size;
            });
        } else if (sortType === 'smaller') {
            filteredProjectItems.sort((a, b) => {
                return a.size - b.size;
            });
        }
    
        setFilteredProjects([...filteredProjectItems]);
    }, [projects, searchText, selectedItem, sortType]);

    const handleSearchText = (e) => {
        clearTimeout(searchTimer);
        setLoader(true);
        setLoaderMessage('Searching...');
        setSearchTimer(
            setTimeout(() => {
                setSearchText(e.target.value);
                setLoader(false);
            }, 600)
        );
    }

    const handleSelectedItem = (e) => {
        setSelectedItem(e.target.value);
    }

    const handleSortType = (e) => {
        setSortType(e.target.value);
    }

    const getPaginationData = (currentPage, itemsPerPage) => {
        setCurrentPage(parseInt(currentPage));
        setProjectsPerPage(parseInt(itemsPerPage));
    }

    // indexes for pagination
    let lastIndex = currentPage * projectsPerPage;
    let firstIndex = lastIndex - projectsPerPage;
    
    return (
        <AppLayout>
            <div className="projectsWrapper">
                <div className="topbar">
                    <div className="searchBox">
                        <div className="searchIconBox">
                            <BiSearch style={{color: '#fff', fontSize: '1.3rem'}} />
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
                            <option value="latest">Latest</option>
                            <option value="oldest">Oldest</option>
                            <option value="ascending">Ascending</option>
                            <option value="descending">Descending</option>
                            <option value="bigger">Bigger</option>
                            <option value="smaller">Smaller</option>
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
                        filteredProjects.slice(firstIndex, lastIndex).map((project) => {
                            return <Project key={project.id} project={project} projects={projects} />
                        }))
                    }
                </div>
                <Pagination itemsLength={filteredProjects.length} getPaginationData={getPaginationData} />
            </div>
        </AppLayout>
    );
}

export default Projects;