import React from "react";

const Footer = () => {
  return (
    <footer className="site-footer" style={{ marginTop: "40px" }}>
      <div className="container">
        <div className="mb-5">
          <h3>Contact Me</h3>
          <ul className="footer-social">
            <li>
              <a href="https://github.com/firashamila33" target="_blank">
                <span className="fa fa-github" /> Github
              </a>
            </li>
            <li>
              <a href="https://web.facebook.com/firas.ap" target="_blank">
                <span className="fa fa-facebook-official" /> Facebook
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-12">
          This was made with <i className="fa fa-heart-o" aria-hidden="true" />{" "}
          by{" "}
          <a href="https://github.com/firashamila33" target="_blank">
            Firas Hamila
          </a>
        </div>
        <div style={{fontSize:'13px'}}className="col-md-12">Template made By Colorlib</div>
      </div>
    </footer>
  );
};

export default Footer;
