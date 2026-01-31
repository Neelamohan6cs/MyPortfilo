import { ReactTyped as Typed } from "react-typed";
import About from "./About";
import Education from "./Education";
import Experience from "./Experience";

import Contact from "./Contact";
import Portfilo from "./Portfilo";

export default function Header() {
    return (
        <div>
            <div className="wrapper">
                <div className="sidebar">
                    <div className="sidebar-header">
                        <img src="img/profile.jpeg" alt="Image"/>
                    </div>
                    <div className="sidebar-content">
                        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                            <a href="#" className="navbar-brand">Navigation</a>
                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <ul className="nav navbar-nav">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#header">Home<i className="fa fa-home"></i></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#about">About<i className="fa fa-address-card"></i></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#experience">Experience<i className="fa fa-star"></i></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#service">Service<i className="fa fa-tasks"></i></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#portfolio">Portfolio<i className="fa fa-file-archive"></i></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#contact">Contact<i className="fa fa-envelope"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div className="sidebar-footer">
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div className="content">
                
                    <div className="header" id="header">
                        <div className="content-inner">
                            <p>I'm</p>
                            <h1>NEELAMOHAN R</h1>
                            <h2></h2>
                            <h2>
                                <Typed
                                    strings={[
                                    "Web Designer",
                                    "Web Developer",
                                    "Front End Developer",
                                    "Apps Developer",
                                    "Graphic Designer",
                                    ]}
                                    typeSpeed={60}
                                    backSpeed={40}
                                    backDelay={1500}
                                    loop
                                />
                                </h2>

                        </div>
                    </div>
                    
                    <div className="large-btn">
                        <div className="content-inner">
                            <a className="btn" href="#"><i className="fa fa-download"></i>Resume</a>
                            <a className="btn" href="#"><i className="fa fa-hands-helping"></i>Hire Me</a>
                        </div>
                    </div>
                    <>
                     <About/>
                     <Education/>
                
                     <Portfilo/>
                     <Experience/>
                   
                     <Contact/>
                
                    </>
                
                </div>
            </div>
        </div>
    );
}