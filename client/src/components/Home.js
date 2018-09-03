import React, { Component } from "react";
import ArticlesList from "./Articles/ArticlesList";

class Home extends Component {
  render() {
    return (
      <div style={{ paddingTop: "160px" }}>
        <section className="site-section py-sm">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h2 className="mb-4">Mediun ... Enjoy Reading </h2>
              </div>
            </div>
            <div className="row blog-entries">
              <div className="col-md-12  main-content">
                <ArticlesList />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
