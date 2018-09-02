import React,{ Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions' 
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo';
import {articlesListQuery} from '../../graphql'
import _ from 'lodash'
import {FiTrash} from 'react-icons/fi'
import {FiEye} from 'react-icons/fi'
import moment from 'moment'
import extractArticleMedia from '../../helpers/extractArticleMedia'
import { DELETE_MUTATION } from '../../graphql'

class ArticleCard extends Component {
    constructor() {
        super()
        this.state = {
            hover: false
        }
        this.hoverOff = this.hoverOff.bind(this);
        this.hoverOn = this.hoverOn.bind(this);
    }
    hoverOn() {
        this.setState({ hover: true });
    }
    hoverOff() {
        this.setState({ hover: false });
    }

    _deleteArticle() {
        let { deleteArticleMutation, article } = this.props
        deleteArticleMutation({
            variables: { _id: article._id },
            update: (store, { data: { deleteArticle } }) => {
                const data = store.readQuery({ query: articlesListQuery });
                _.remove(data.articleFeed.articles, function (a) {
                    return a._id == deleteArticle._id;
                });
                store.writeQuery({ query: articlesListQuery, data })
            }
        }).then(() => {
            console.log('deleeeeteeeeed')
        })
    }

    render(){
        let { article, selectArticle }=this.props;
        const media = extractArticleMedia(article.description)
        
        
        return(
            <div key={article._id} className="col-md-4 cardipost"
                onMouseEnter={this.hoverOn}
                onMouseLeave={this.hoverOff}
            >
                <div className="blog-entry " style={{ marginTop: '20px' }}>
                    {!media && <img src={`${process.env.PUBLIC_URL}/images/default_article.png`}  alt="" />}

                    {media && media.video &&
                        <iframe width="350px" height="234"
                        src={media.emeddedYoutubeLink}>
                        
                        </iframe>
                    }
                    {media && media.image &&
                        <img src={media.imageLink} style={{width: '350px', height: '234px'}} alt="aa" />
                    }


                    <div className="blog-content-body">
                        <div className="post-meta" style={{ marginBottom: '0px' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <span className="mr-2" style={{ color: "#f35c52" }}>{article.createdAt ? moment.unix(article.createdAt).format('LLL') : '-------'}</span>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <a style={{ backgroundColor: 'Transparent' }} onClick={() => {
                                        selectArticle(article);
                                        this.props.history.push('/workspace/myarticle/display')
                                    }}>
                                        <FiEye size={'20'} color={`${this.state.hover ? 'blue' : 'grey'}`} />
                                    </a>
                                    <a style={{ marginLeft: '15px' }} onClick={this._deleteArticle.bind(this)}>
                                        <FiTrash size={'20'} color={`${this.state.hover ? 'red' : 'grey'}`} />
                                    </a>
                                </div>

                            </div>

                        </div>
                        <h4>{article.title}</h4>

                    </div>
                </div>
            </div>
            
        )
    }
}

export default withRouter(
  connect(
    null,
    actions
  )(graphql(DELETE_MUTATION, { name: "deleteArticleMutation" })(ArticleCard))
);



   