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
        console.log("aniiiiiiii")
        deleteArticleMutation({
            variables: { id: article.id },
            update: (store, { data: { deleteArticle } }) => {
                console.log("aniiiiiiii 222")
                console.log('STORE: ',store);
                console.log('deleteArticle  : ',deleteArticle)
                const data = store.readQuery({ query: articlesListQuery });
                console.log(data)
                _.remove(data.articleFeed.articles, function (a) {
                    return a.id == deleteArticle.id;
                });
                store.writeQuery({ query: articlesListQuery, data })
            }
        }).then(() => {
            console.log('deleeeeteeeeed')
        })
    }

    render(){
        let { article, selectArticle }=this.props;

        let {description} = article;
        // GETTING VIDEO URL
        let containsVideo = false
        let videoIndicator = `{"type":"draft-js-video-plugin-video","mutability":"IMMUTABLE","data":{"src":"`
        let indexOfVideoIndicator = description.indexOf(videoIndicator)
        var videosub = '';
        let emeddedYoutubeLink = '';
        let videoLink = ''

        if (indexOfVideoIndicator > -1) {
            
            videosub = description.substring(description.indexOf(videoIndicator)+videoIndicator.length);
            videoLink = videosub.substring(0,videosub.indexOf(`"`))
            console.log(videoLink)    
            if(extractYoutubeVideoID(videoLink)){
                containsVideo = true;
                emeddedYoutubeLink = `https://www.youtube.com/embed/${extractYoutubeVideoID(videoLink)}`
            }
        }
        // GETTING IMAGE URL
        let containsImage = false
        let imageIndicator = `{"type":"IMAGE","mutability":"IMMUTABLE","data":{"src":"`
        let indexOfimageIndicator = description.indexOf(imageIndicator)
        var imagesub = '';
        let imageLink = ''

        if (indexOfimageIndicator > -1) {            
            imagesub = description.substring(description.indexOf(imageIndicator)+imageIndicator.length);
            imageLink = imagesub.substring(0,imagesub.indexOf(`"`))
            containsImage = true
        }
         

        return(
            <a key={article.id} className="col-md-4 cardipost"
                onMouseEnter={this.hoverOn}
                onMouseLeave={this.hoverOff}
            >
                <div className="blog-entry " style={{ marginTop: '20px' }}>
                    {containsVideo && (indexOfVideoIndicator > indexOfimageIndicator) &&
                    <iframe width="350px" height="234"
                     src={emeddedYoutubeLink}>
                     
                    </iframe>
                    }
                    {containsImage && (indexOfimageIndicator > indexOfVideoIndicator) &&
                        <img src={imageLink} style={{width: '350px', height: '234px'}} alt="aa" />
                    }

                    {!containsVideo && !containsImage && <img src={`${process.env.PUBLIC_URL}/images/default_article.png`}  alt="aa" />}

                    <div className="blog-content-body">
                        <div className="post-meta" style={{ marginBottom: '0px' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <span className="mr-2" style={{ color: "#f35c52" }}>{article.createdAt ? moment.unix(article.createdAt).format('LLL') : '-------'}</span>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <a style={{ backgroundColor: 'Transparent' }} onClick={() => {
                                        selectArticle(article);
                                        this.props.history.push('/myarticle/display')
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
            </a>
            
        )
    }
}

export default withRouter(
  connect(
    null,
    actions
  )(graphql(DELETE_MUTATION, { name: "deleteArticleMutation" })(ArticleCard))
);



function extractYoutubeVideoID(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if ( match && match[7].length == 11 ){
        return match[7];
    }else{
        return ''
    }
}

                