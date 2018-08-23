import React, {Component} from 'react';
import { gql, graphql } from 'react-apollo';
import {convertFromRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {Link} from 'react-router-dom'
import {FiSend} from 'react-icons/fi'
import {FiEdit} from 'react-icons/fi'
import {articlesListQuery} from './ArticlesList'


class ArticlePreview extends Component {
    state = {
        article: []
    };


    componentDidMount(){
        if(this.props.location.state.preview_Edit){
            console.log("heeeeeee, it passed to preeeeview")
        }
        var el = document.getElementById("firas");
        if(!this.props.location.state.preview_Edit){
            el.innerHTML = this.props.location.state.article.description+"";
        }else{
            el.innerHTML = stateToHTML(convertFromRaw(JSON.parse(window.localStorage.getItem('articleContent'))));
        }

    }

    _submitArticle = () => {
        var  {mutate}=this.props;
        let title = this.props.location.state.article.title;
        let description = stateToHTML(convertFromRaw(JSON.parse(window.localStorage.getItem('articleContent'))))
        
        console.log("ToSubmit----------------------------ToSubmit----------------------------------------------------ToSubmit")
        console.log(title,description)
        console.log("ToSubmit----------------------------ToSubmit----------------------------------------------------ToSubmit")
        
        console.log(this.props);
        
        mutate({ 
            variables: { title, description },
            refetchQueries: [ { query: articlesListQuery }],
          }).then(()=>{
            window.localStorage.removeItem('articleContent');
            this.props.history.push('/home')
          })
        
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
                                {/* <div className="post-meta">
                                    <span className="mr-2">March 15, 2018 </span> 
                                    <span className="mr-2"><button className="btn btn-light pull-right"  >Update</button></span>
                                    <span className="mr-2"><button className="btn btn-light pull-right" >Delete</button></span>
                                </div> */}
                                <div style={{marginTop:'40px',display:'flex',flexDirection:'row-reverse'}}>
                                    <Link to={'/newarticle'} style={{backgroundColor:"#f35c52", color:"white",marginLeft:'20px'}} className="btn pull-right" >
                                        <FiEdit size={'20'}/>
                                    </Link>
                                    <button style={{backgroundColor:"#f35c52", color:"white",marginLeft:'20px'}} className="btn pull-right" onClick={()=>this._submitArticle()}>
                                        <FiSend size={'20'}/>
                                    </button>
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

const addArticleMutation = gql`
  mutation addArticle($title: String!,$description: String!) {
    addArticle(title: $title,description: $description) {
      id
      title
      description
    }
  }
`;

const ArticlePreviewAdd = graphql(
    addArticleMutation,
)(ArticlePreview)

export default ArticlePreviewAdd;