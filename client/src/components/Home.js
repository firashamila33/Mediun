import React, {Component} from 'react';
import ArticlesList from './Articles/ArticlesList'

class Home extends Component {
  
    render() {
         return(
                <div style={{paddingTop:'160px'}}>
                     <section className="site-section pt-5" style={{paddingBottom:'75px'}}>
                        <div className="container">
                        <div className="row">
                                <div className="col-md-6">
                                    <h2 className="mb-4">Recent Articles</h2>
                                </div>
                            </div>
                            <div className="row">
                                <div  className="col-md-3 col-log-3">
                                    <a  className="a-block d-flex align-items-center height-md"
                                            style={{backgroundImage: "url('images/img_4.jpg')",height:'300',width:'250',margin:'0px'}}>
                                        <div className="text">
                                            <div className="post-meta">
                                                
                                                <span style={{fontWeight:'normal'}} className="mr-2">March 15, 2018 </span>  
                                            </div>
                                            <p style={{fontSize:'20px',fontWeight:'bold'}}>There’s a Cool New Way for Men to Wear Socks and Sandals</p>
                                        </div>
                                    </a>
                                </div>
                                <div  className="col-md-3 col-log-3">
                                    <a  className="a-block d-flex align-items-center height-md"
                                            style={{backgroundImage: "url('images/img_4.jpg')",height:'300',width:'250',margin:'0px',padding:'10px'}}>
                                        <div className="text">
                                            <div className="post-meta">
                                                
                                                <span className="mr-2">March 15, 2018 </span>  
                                            </div>
                                            <p style={{fontSize:'20px',fontWeight:'bold'}}>There’s a Cool New Way for Men to Wear Socks and Sandals</p>
                                        </div>
                                    </a>
                                </div>
                                <div  className="col-md-3 col-log-3">
                                    <a  className="a-block d-flex align-items-center height-md"
                                            style={{backgroundImage: "url('images/img_4.jpg')",height:'300',width:'250',margin:'0px',padding:'10px'}}>
                                        <div className="text">
                                            <div className="post-meta">
                                                
                                                <span className="mr-2">March 15, 2018 </span>  
                                            </div>
                                            <p style={{fontSize:'20px',fontWeight:'bold'}}>There’s a Cool New Way for Men to Wear Socks and Sandals</p>
                                        </div>
                                    </a>
                                </div>
                                <div  className="col-md-3 col-log-3">
                                    <a  className="a-block d-flex align-items-center height-md"
                                            style={{backgroundImage: "url('images/img_4.jpg')",height:'300',width:'250',margin:'0px',padding:'10px'}}>
                                        <div className="text">
                                            <div className="post-meta">
                                                
                                                <span className="mr-2">March 15, 2018 </span>  
                                            </div>
                                            <p style={{fontSize:'20px',fontWeight:'bold'}}>There’s a Cool New Way for Men to Wear Socks and Sandals</p>
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
                                    <h2 className="mb-4">Enjoy Reading</h2>
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



export default Home;