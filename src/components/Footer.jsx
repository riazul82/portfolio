import React from 'react';
import { BsFacebook, BsGithub, BsLinkedin } from 'react-icons/bs';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footerText">
                <p className="createdBy">Created by <a href="https://github.com/riazul82" target="_blank" rel="noreferrer">riazul82</a></p>
                <p className="copyright">Copyright &copy;2022, all rights reserved.</p>
            </div>
            <div className="footerLinks">
                <a href="https://www.facebook.com/mdriazul.islam.9235199/" title="Facebook" target="_blank" rel="noreferrer">
                    <BsFacebook className="footerIcons" />
                </a>
                <a href="https://github.com/riazul82" title="Github" target="_blank" rel="noreferrer">
                    <BsGithub className="footerIcons" />
                </a>
                <a href="https://www.linkedin.com/in/md-riazul-islam-86653321b/" title="LinkedIn" target="_blank" rel="noreferrer">
                    <BsLinkedin className="footerIcons" />             
                </a>
            </div>
        </div>
    );
}

export default Footer;