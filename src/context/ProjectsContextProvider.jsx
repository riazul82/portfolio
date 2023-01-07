import React, { createContext, useEffect, useState } from 'react';

import { fs } from '../firebase';
import { collection, query, onSnapshot } from "firebase/firestore";

export const ProjectsContext = createContext();

const ProjectsContextProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const q = query(collection(fs, "projects"));
        onSnapshot(q, (querySnapshot) => {
            const allProjects = [];
            querySnapshot.forEach((doc) => {
                allProjects.push({...doc.data(), id: doc.id});
            });
            setProjects(allProjects);
        });
    }, []);

    console.log(projects);

    return (
        <ProjectsContext.Provider value={projects}>
            {children}
        </ProjectsContext.Provider>
    );
}

export default ProjectsContextProvider;