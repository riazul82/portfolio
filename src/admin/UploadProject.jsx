import React, { useEffect, useState } from 'react';
import AppLayout from '../Layouts/AppLayout';

// firebase
import { fs, storage } from '../firebase';
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// icons
import { MdUpload } from 'react-icons/md';

// toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadProject = () => {
    const [selectedImg, setSelectedImg] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [previewImg, setPreviewImg] = useState(null);
    const [previewImages, setPreviewImages] = useState([]);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [project, setProject] = useState({
        type: 'website',
        category: '',
        title: '',
        desc: '',
        date: '',
        status: 'completed',
        fonts: '',
        tags: '',
        icons: '',
        plugins: '',
        previewLink: '',
        githubLink: '',
        youtubeLink: '',
        youtubeEmbedLink: '',
        youtubeVideoType: 'no-video',
        responsive: 'yes',
        thumbUrl: '',
        images: []
    });

    useEffect(() => {
        let objUrls = [];

        if (selectedImages.length) {
            for (let i = 0; i < selectedImages.length; i ++) {
                const objUrl = URL.createObjectURL(selectedImages[i]);
                console.log(objUrl);
                objUrls.push(objUrl);
            }
            setPreviewImages(objUrls);
        }

        if (selectedImg === null || selectedImg === undefined) {
            return;
        }

        const objUrl = URL.createObjectURL(selectedImg);
        setPreviewImg(objUrl);

        return (() => {
            URL.revokeObjectURL(objUrl);
            for (let i = 0; i < selectedImages.length; i ++) {
                URL.revokeObjectURL(objUrls[i]);
            }
        });

    }, [selectedImg, selectedImages]);

    // upload project data to firestore
    const addDataToFireStore = async (project) => {
        try {
            await addDoc(collection(fs, "projects"), project);
        } catch (error) {
            console.log(error);
        }
    }

    // submit project data
    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedImg === null) {
            toast.error('Please select an image!');
            return;
        }

        setBtnDisabled(true);

        if (project.fonts !== '') {
            project.fonts = project.fonts.split(' ');
        }

        if (project.plugins !== '') {
            project.plugins = project.plugins.split(' ');
        }

        if (project.tags !== '') {
            project.tags = project.tags.split(' ');
        }

        if (project.icons !== '') {
            project.icons = project.icons.split(' ');
        }
        
        const storageRef = ref(storage, `images/projects/${selectedImg.name}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedImg);

        // upload image to storage
        uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        console.log('Upload in progress');
                }
            },  (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.log('Unauthorized user');
                        break;
                    case 'storage/canceled':
                        console.log('Upload canceled');
                        break;
                
                    case 'storage/unknown':
                        console.log('Unknown error!');
                        break;

                    default:
                        console.log(`Couldn't upload image!`);
                }

                setProject({
                    type: 'website',
                    category: '',
                    title: '',
                    desc: '',
                    date: '',
                    status: 'completed',
                    fonts: '',
                    tags: '',
                    icons: '',
                    plugins: '',
                    previewLink: '',
                    githubLink: '',
                    youtubeLink: '',
                    youtubeEmbedLink: '',
                    youtubeVideoType: 'no-video',
                    responsive: 'yes',
                    thumbUrl: '',
                    images: []
                });
                setBtnDisabled(false);
                setSelectedImg(null);
                setPreviewImg(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    project.thumbUrl = downloadURL;
                    addDataToFireStore(project);
                    setProject({
                        type: 'website',
                        category: '',
                        title: '',
                        desc: '',
                        date: '',
                        status: 'completed',
                        fonts: '',
                        tags: '',
                        icons: '',
                        plugins: '',
                        previewLink: '',
                        githubLink: '',
                        youtubeLink: '',
                        youtubeEmbedLink: '',
                        youtubeVideoType: 'no-video',
                        responsive: 'yes',
                        thumbUrl: '',
                        images: []
                    });
                    setBtnDisabled(false);
                    setSelectedImg(null);
                    setPreviewImg(null);
                });
            }
        );

        toast.promise(uploadTask, {
            pending: 'Uploading...',
            success: 'project uploaded!',
            error: 'An error occured!'
        });
    }

    // handle input change
    const handleChange = (e) => {
        let checkBoxInput = document.querySelectorAll('.checkboxInput');
        project.category = [];

        for (let i = 0; i < checkBoxInput.length; i ++) {
            if (checkBoxInput[i].checked) {
                project.category.push(checkBoxInput[i].value);
            }
        }

        setProject({...project, category: project.category});

        let name = e.target.name;

        if (name === 'title' || name === 'desc' || name === 'date' || name === 'fonts' || name === 'tags' || name === 'icons' || name === 'plugins') {
            setProject({...project, [e.target.name]: (e.target.value).split(/\s+/).join(' ')});
        } else {
            setProject({...project, [e.target.name]: (e.target.value).split(/\s+/).join('')});    
        }
    }

    const handleImageInput = (e) => {
        // fix select file cancelation problem
        if (e.target.files[0] !== undefined) {
            setSelectedImg(e.target.files[0]);
        }
    }

    const handleMultipleImageInput = (e) => {
        if (e.target.files.length) {
            let images = [];
            for (let i = 0; i < e.target.files.length; i ++) {
                images.push(e.target.files[i]);
            }
            setSelectedImages(images);
        }
    }

    return (
        <AppLayout>
            <div className="uploadProject">
                <div className="title">
                    <h1>Upload Project</h1>
                </div>

                <form onSubmit={handleSubmit} className="projectUploadForm">
                    <div className="projectInputBox">
                        <label htmlFor="type">Type</label>
                        <select name="type" id="type" value={project.type} onChange={handleChange} required>
                            <option value="website">Website</option>
                            <option value="mobile">Mobile</option>
                            <option value="desktop">Desktop</option>
                        </select>
                    </div>

                    <div className="chooseProjectCategories">
                        <div className="title">
                            <p>Choose category </p>
                        </div>
                        <div className="checkboxInputField">
                            <input type="checkbox" id="html-css" className="checkboxInput" onChange={handleChange} name="html-css" value="html-css" />
                            <label htmlFor="html-css">Html-CSS</label>
                        </div>
                        <div className="checkboxInputField">
                            <input type="checkbox" id="javascript" className="checkboxInput" onChange={handleChange} name="javascript" value="javascript" />
                            <label htmlFor="javascript">JavaScript</label>
                        </div>
                        <div className="checkboxInputField">
                            <input type="checkbox" id="react" className="checkboxInput" onChange={handleChange} name="react" value="react" />
                            <label htmlFor="react">React</label>
                        </div>
                        <div className="checkboxInputField">
                            <input type="checkbox" id="mern" className="checkboxInput" onChange={handleChange} name="mern" value="mern" />
                            <label htmlFor="mern">MERN Stack</label>
                        </div>
                        <div className="checkboxInputField">
                            <input type="checkbox" id="mini-projects" className="checkboxInput" onChange={handleChange} name="mini-projects" value="mini-projects" />
                            <label htmlFor="mini-projects">Mini Projects</label>
                        </div>
                        <div className="checkboxInputField">
                            <input type="checkbox" id="javascript-mini" className="checkboxInput" onChange={handleChange} name="javascript-mini" value="javascript-mini" />
                            <label htmlFor="javascript-mini">JavaScript Mini</label>
                        </div>
                        <div className="checkboxInputField">
                            <input type="checkbox" id="react-mini" className="checkboxInput" onChange={handleChange} name="react-mini" value="react-mini" />
                            <label htmlFor="react-mini">React Mini</label>
                        </div>
                        <div className="checkboxInputField">
                            <input type="checkbox" id="fullstack-mini" className="checkboxInput" onChange={handleChange} name="fullstack-mini" value="fullstack-mini" />
                            <label htmlFor="fullstack-mini">Fullstack Mini</label>
                        </div>
                        <div className="checkboxInputField">
                            <input type="checkbox" id="single-page" className="checkboxInput" onChange={handleChange} name="single-page" value="single-page" />
                            <label htmlFor="single-page">Single Page</label>
                        </div>
                        <div className="checkboxInputField">
                            <input type="checkbox" id="multi-page" className="checkboxInput" onChange={handleChange} name="multi-page" value="multi-page" />
                            <label htmlFor="multi-page">Multi Page</label>
                        </div>
                        <div className="checkboxInputField">
                            <input type="checkbox" id="frontend-web" className="checkboxInput" onChange={handleChange} name="frontend-web" value="frontend-web" />
                            <label htmlFor="frontend-web">Forntend Web</label>
                        </div>
                        <div className="checkboxInputField">
                            <input type="checkbox" id="fullstack-web" className="checkboxInput" onChange={handleChange} name="fullstack-web" value="fullstack-web" />
                            <label htmlFor="fullstack-web">Fullstack Web</label>
                        </div>
                    </div>

                    <input type="text" name="title" value={project.title} onChange={handleChange} placeholder="Project Title" required />
                    <input type="text" name="date" value={project.date} onChange={handleChange} placeholder="Date format - Month DD, YYYY HH:MM:SS" required />
                    
                    <div className="projectInputBox">
                        <label htmlFor="status">Status</label>
                        <select name="status" id="status" value={project.status} onChange={handleChange} required>
                            <option value="completed">Completed</option>
                            <option value="running">Running</option>
                            <option value="updating">Updating</option>
                        </select>
                    </div>
                
                    <input type="text" name="fonts" value={project.fonts} onChange={handleChange} placeholder="Font names" />
                    <input type="text" name="tags" value={project.tags} onChange={handleChange} placeholder="Tags" required />
                    <input type="text" name="icons" value={project.icons} onChange={handleChange} placeholder="Icons" />
                    <input type="text" name="plugins" value={project.plugins} onChange={handleChange} placeholder="Plugins" />
                    <input type="text" name="previewLink" value={project.previewLink} onChange={handleChange} placeholder="Preview Link" required />
                    <input type="text" name="githubLink" value={project.githubLink} onChange={handleChange} placeholder="Source Code Link" required />
                    <input type="text" name="youtubeLink" value={project.youtubeLink} onChange={handleChange} placeholder="Youtube Link" />
                    <input type="text" name="youtubeEmbedLink" value={project.youtubeEmbedLink} onChange={handleChange} placeholder="Youtube Embed Link" />

                    <div className="projectInputBox">
                        <label htmlFor="youtubeVideoType">Youtube Video Type</label>
                        <select name="youtubeVideoType" id="youtubeVideoType" value={project.youtubeVideoType} onChange={handleChange} required>
                            <option value="no-video">No video</option>
                            <option value="tutorial">Tutorial</option>
                            <option value="demo">Demo</option>
                            <option value="others">Others</option>
                        </select>
                    </div>

                    <div className="projectInputBox">
                        <label htmlFor="responsive">Responsive</label>
                        <select name="responsive" id="responsive" value={project.responsive} onChange={handleChange} required>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    <div className="descriptionBox">
                        <textarea name="desc" value={project.desc} onChange={handleChange} placeholder="Project description"></textarea>
                    </div>

                    <div className="imagePreviewBox">
                        {previewImg === null ? <p>Image preview</p> :
                            <img src={previewImg} alt="preview" />}
                    </div>

                    <div className="uploadProjectImageInputField">
                        <div className="imageUploadInputLabel">
                            <label htmlFor="projectImgInput">
                                <MdUpload className="uploadIcon" />
                                <span>Upload Project Thumb</span>
                            </label>
                        </div>
                        <input type="file" id="projectImgInput" onChange={handleImageInput} required />
                    </div>
                    
                    <div className="multipleImagePreviewBox">
                        {!previewImages.length ? <p>Images preview</p> :
                            previewImages.map((img, index) => {
                                return <img key={index} src={img} alt="preview" />
                            })
                        }
                    </div>

                    <div className="uploadProjectImageInputField">
                        <div className="imageUploadInputLabel">
                            <label htmlFor="projectMultipleImgInput">
                                <MdUpload className="uploadIcon" />
                                <span>Upload Project Images</span>
                            </label>
                        </div>
                        <input type="file" id="projectMultipleImgInput" onChange={handleMultipleImageInput} multiple />
                    </div>

                    <button type="submit" disabled={btnDisabled}>Add project</button>
                </form>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </AppLayout>
    );
}

export default UploadProject;