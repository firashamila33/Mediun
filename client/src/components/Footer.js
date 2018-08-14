import React from 'react';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-md-4">
                        <h3>Paragraph</h3>
                        <p>
                            <img src={`${process.env.PUBLIC_URL}images/img_1.jpg`} alt="1" className="img-fluid"/>
                        </p>

                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, accusantium optio unde
                            perferendis eum illum voluptatibus dolore tempora, consequatur minus asperiores temporibus
                            reprehenderit.</p>
                    </div>
                    <div className="col-md-6 ml-auto">
                        <div className="row">
                            <div className="col-md-7">
                                <h3>Latest Post</h3>
                                <div className="post-entry-sidebar">
                                    <ul>
                                        <li>
                                            <a href="">
                                                <img src={`${process.env.PUBLIC_URL}images/img_6.jpg`} alt="2"
                                                     className="mr-4"/>
                                                <div className="text">
                                                    <h4>There’s a Cool New Way for Men to Wear Socks and Sandals</h4>
                                                    <div className="post-meta">
                                                        <span className="mr-2">March 15, 2018 </span> &bullet;
                                                        <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="">
                                                <img src={`${process.env.PUBLIC_URL}images/img_3.jpg`} alt="3"
                                                     className="mr-4"/>
                                                <div className="text">
                                                    <h4>There’s a Cool New Way for Men to Wear Socks and Sandals</h4>
                                                    <div className="post-meta">
                                                        <span className="mr-2">March 15, 2018 </span> &bullet;
                                                        <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="">
                                                <img src={`${process.env.PUBLIC_URL}images/img_4.jpg`} alt="4"
                                                     className="mr-4"/>
                                                <div className="text">
                                                    <h4>There’s a Cool New Way for Men to Wear Socks and Sandals</h4>
                                                    <div className="post-meta">
                                                        <span className="mr-2">March 15, 2018 </span> &bullet;
                                                        <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-1"></div>

                            <div className="col-md-4">

                                <div className="mb-5">
                                    <h3>Quick Links</h3>
                                    <ul className="list-unstyled">
                                        <li><a href="">About Us</a></li>
                                        <li><a href="">Travel</a></li>
                                        <li><a href="">Adventure</a></li>
                                        <li><a href="">Courses</a></li>
                                        <li><a href="">Categories</a></li>
                                    </ul>
                                </div>

                                <div className="mb-5">
                                    <h3>Social</h3>
                                    <ul className="list-unstyled footer-social">
                                        <li><a href=""><span className="fa fa-twitter"></span> Twitter</a></li>
                                        <li><a href=""><span className="fa fa-facebook"></span> Facebook</a></li>
                                        <li><a href=""><span className="fa fa-instagram"></span> Instagram</a></li>
                                        <li><a href=""><span className="fa fa-vimeo"></span> Vimeo</a></li>
                                        <li><a href=""><span className="fa fa-youtube-play"></span> Youtube</a></li>
                                        <li><a href=""><span className="fa fa-snapchat"></span> Snapshot</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>


    )
};

export default Footer;