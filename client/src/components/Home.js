import React, {Component} from 'react';
import ArticlesList from './Articles/ArticlesList'

class Home extends Component {
  
    render() {
         return(
                <div>
                     <section className="site-section pt-5">
                        <div className="container">
                        <div className="row">
                                <div className="col-md-6">
                                    <h2 className="mb-4">Recent Press Articles</h2>
                                </div>
                            </div>
                            <div className="row">
                                <div  className="col-md-6 col-lg-4">
                                    <a className="a-block d-flex align-items-center height-md"
                                            style={{backgroundImage: "url('images/img_4.jpg')"}}>
                                        <div className="text">
                                            <div className="post-meta">
                                                <span className="category">Food</span>
                                                <span className="mr-2">March 15, 2018 </span>  
                                            </div>
                                            <h3>There’s a Cool New Way for Men to Wear Socks and Sandals</h3>
                                        </div>
                                    </a>
                                </div>
                                <div  className="col-md-6 col-lg-4">
                                    <a className="a-block d-flex align-items-center height-md"
                                            style={{backgroundImage: "url('images/img_4.jpg')"}}>
                                        <div className="text">
                                            <div className="post-meta">
                                                <span className="category">Food</span>
                                                <span className="mr-2">March 15, 2018 </span>  
                                            </div>
                                            <h3>There’s a Cool New Way for Men to Wear Socks and Sandals</h3>
                                        </div>
                                    </a>
                                </div>
                                <div  className="col-md-6 col-lg-4">
                                    <a className="a-block d-flex align-items-center height-md"
                                            style={{backgroundImage: "url('images/img_4.jpg')"}}>
                                        <div className="text">
                                            <div className="post-meta">
                                                <span className="category">Food</span>
                                                <span className="mr-2">March 15, 2018 </span>  
                                            </div>
                                            <h3>There’s a Cool New Way for Men to Wear Socks and Sandals</h3>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section> 
                    <section className="site-section py-sm">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <h2 className="mb-4">Enjoy Press Articles</h2>
                                </div>
                            </div>
                            <div className="row blog-entries">
                                <div className="col-md-12  main-content">
                                    
                                        <ArticlesList/>                                   

                                    {/* <div className="row">
                                        <div className="col-md-12 text-center">
                                            <nav aria-label="Page navigation" className="text-center">
                                                <ul className="pagination">
                                                    <li className="page-item" ><a style={{color:"#f35c52"}} className="page-link"
                                                                                onClick={this.handlePrevious}>Prev</a></li>
                                                    {this.renderPageNumber()}
                                                    <li className="page-item" style={{color:"#f35c52"}}><a className="page-link"
                                                                                onClick={this.handleNext}>Next</a></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div> */}

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
        )
    }
}

// function mapStateToProps({loginToken}) {
//     return {loginToken};
// }

// const getAllArticle = gql`
// query AllPressArticle($enabled: Boolean) {
//   allPressArticles(enabled: $enabled) {
//     id
//     title
//     description
//     createdAt
//   }
// }
// `;

export default Home;