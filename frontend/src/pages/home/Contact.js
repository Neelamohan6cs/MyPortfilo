export default function Contact(){
    return(
        <div className="contact" id="contact">
                    <div className="content-inner">
                        <div className="content-header">
                            <h2>Contact</h2>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <div className="contact-info">
                                    <p><i className="fa fa-user"></i>NEELAMOHAN</p>
                                    <p><i className="fa fa-tag"></i>Web Designer & Developer</p>
                                    <p><i className="fa fa-envelope"></i><a href="mailto:neelamohan6cs@gmail.com">neelamohan6cs@gmail.com</a></p>
                                    <p><i className="fa fa-phone"></i><a href="tel:+91 95 0020 5859">+91 95 0020 5859</a></p>
                                    <p><i className="fa fa-map-marker"></i>3/73A, South Street ,Naranamangalam, Perambalur</p>
                                    <div className="social">
                                        <a className="btn" href=""><i className="fab fa-twitter"></i></a>
                                        <a className="btn" href=""><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn" href=""><i className="fab fa-linkedin-in"></i></a>
                                        <a className="btn" href=""><i className="fab fa-instagram"></i></a>
                                        <a className="btn" href=""><i className="fab fa-youtube"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form">
                                    <form>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <input type="text" className="form-control" placeholder="Your Name" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <input type="email" className="form-control" placeholder="Your Email" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Subject" />
                                        </div>
                                        <div className="form-group">
                                            <textarea className="form-control" rows="5" placeholder="Message"></textarea>
                                        </div>
                                        <div><button className="btn" type="submit">Send Message</button></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
    );
}