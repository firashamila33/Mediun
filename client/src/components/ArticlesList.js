import React, {Component} from 'react';
import gql from "graphql-tag";
import _ from "lodash";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {client} from "./App";

class ArticlesList extends Component {
    _fetch = async () => {
        const result = await client.query({
            query: getAllArticle,
            variables: {enabled: true}
        });
        const {allPressArticles} = result.data;
        this.setState({allPressArticles});
    };

    constructor() {
        super();
        this.state = {
            allPressArticles: [],
            currentPage: 1,
            articlePerPage: 5,
            active: ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
    }

    componentWillMount() {
        this._fetch();
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id),
            active: 'active'
        });
    }

    handleNext(event) {
        const number = Math.ceil(this.state.allPressArticles.length / this.state.articlePerPage);
        this.setState({
            currentPage: (this.state.currentPage + 1) <= number ? this.state.currentPage + 1 : number,
            active: 'active'
        });
    }

    handlePrevious(event) {
        this.setState({
            currentPage: (this.state.currentPage - 1) >= 1 ? this.state.currentPage - 1 : 1,
            active: 'active'
        });
    }

    renderPageNumber() {
        const {allPressArticles, articlePerPage} = this.state;

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(allPressArticles.length / articlePerPage); i++) {
            pageNumbers.push(i);
        }

        return pageNumbers.map(number => {
            let classes = classnames('page-item', this.state.currentPage === number ? 'active' : '');
            return (
                <li  key={number} className={classes}><a style={{color:"#f35c52"}} id={number} onClick={this.handleClick}
                                                        className="page-link">{number}</a></li>
            );
        });
    }

    renderArticlesList() {
        if (this.props.loginToken == null) {
            this.props.history.push('/login');
        } else {
            const {allPressArticles, currentPage, articlePerPage} = this.state;

            const indexOfLastProduct = currentPage * articlePerPage;
            const indexOfFirstProduct = indexOfLastProduct - articlePerPage;
            const currentProducts = allPressArticles.slice(indexOfFirstProduct, indexOfLastProduct);

            return currentProducts.map(({id, title, description, createdAt}) => (
                <div key={id} className="col-md-6">
                    <Link to={{
                        pathname: '/singleArticle',
                        state: {
                            article: {
                                id: id,
                                title: title,
                                description: description
                            }
                        }
                    }} className="blog-entry ">
                        <img src={`${process.env.PUBLIC_URL}/images/img_11.jpg`} alt="aa"/>
                        <div className="blog-content-body">
                            <div className="post-meta">
                                <h4>{title}</h4>
                                <span className="mr-2" style={{color:"#f35c52"}}>{new Date(createdAt).toDateString()}</span>
                            </div>
                        </div>
                    </Link>
                </div>
            ));
        }
    }

    renderRecentArticles() {
        if (this.props.loginToken == null) {
            this.props.history.push('/login');
        } else {
            const sorted = _.sortBy(this.state.allPressArticles, this.state.allPressArticles.createdAt);
            const recentArticles = [sorted[0], sorted[1], sorted[2]];
            return recentArticles.map(({id, title, description, createdAt}) => (
                <div key={id} className="col-md-6 col-lg-4">
                    <Link to={{
                        pathname: '/singleArticle',
                        state: {
                            article: {
                                id: id,
                                title: title,
                                description: description
                            }
                        }
                    }} className="a-block d-flex align-items-center height-md"
                          style={{backgroundImage: "url('images/img_4.jpg')"}}>
                        <div className="text">
                            <div className="post-meta">
                                <span className="mr-2" >{new Date(createdAt).toDateString()}</span>
                            </div>
                            <h3>{title}</h3>
                        </div>
                    </Link>
                </div>));
        }
    }


    render() {
        return this.state.allPressArticles.length ?
            <div>
                <section className="site-section pt-5">
                    <div className="container">
                    <div className="row">
                            <div className="col-md-6">
                                <h2 className="mb-4">Recent Press Articles</h2>
                            </div>
                        </div>
                        <div className="row">
                            {this.renderRecentArticles()}
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
                                <div className="row">
                                    {this.renderArticlesList()}
                                </div>

                                <div className="row">
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
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
            : <span>Loading...</span>;
    }
}

function mapStateToProps({loginToken}) {
    return {loginToken};
}

const getAllArticle = gql`
query AllPressArticle($enabled: Boolean) {
  allPressArticles(enabled: $enabled) {
    id
    title
    description
    createdAt
  }
}
`;

export default connect(mapStateToProps, null)(ArticlesList);