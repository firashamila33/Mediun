import React, {Component} from 'react';
import {connect} from 'react-redux';

class SingleArticle extends Component {
    state = {
        article: []
    };


    componentDidMount(){
        var el = document.getElementById("firas");
        el.innerHTML = this.props.location.state.article.description+"";   
    }

    render() {
        const {title} = this.props.location.state.article;               
        return (
            <div>
                <section className="site-section py-lg">
                    <div className="container">
                        <div className="row blog-entries">
                            <div className="col-md-12 col-lg-12 main-content">
                                <h1 className="mb-4" style={{color:"#f35c52"}}>{title}</h1>
                                <div className="post-meta">
                                    <span className="mr-2">March 15, 2018 </span>
                                    <span className="mr-2"><button className="btn btn-light"  >Update</button></span>
                                    <span className="mr-2"><button className="btn btn-light" >Delete</button></span>
                                </div>
                                <div id="firas" className="post-content-body">
                                    
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
            ;
    }
}

export default connect()(SingleArticle);