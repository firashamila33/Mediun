import React,{ Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions' 
import { withRouter } from 'react-router-dom'
import { gql, graphql } from 'react-apollo';
import {articlesListQuery} from './ArticlesList'
import _ from 'lodash'
import {FiTrash} from 'react-icons/fi'
import {FiEye} from 'react-icons/fi'


class ArticleCard extends Component {
    constructor(){
        super()
        this.state={
            hover:false
        }
        this.hoverOff=this.hoverOff.bind(this);
        this.hoverOn=this.hoverOn.bind(this);
        
        
    }
    hoverOn(){
        this.setState({ hover: true });
    }
    hoverOff(){
        this.setState({ hover: false });
    }

    _deleteArticle(){
        let { deleteArticleMutation, article } = this.props
        console.log("deleeeeee")
        console.log(this.props)
        deleteArticleMutation({
            variables: {id: article.id},
             update: (store, { data: { deleteArticle } }) =>{
                 const data = store.readQuery({ query: articlesListQuery });
                 _.remove(data.articles, function(a) {
                     return a.id == deleteArticle.id;
                 });
                 store.writeQuery({ query: articlesListQuery, data })
             }
        }).then(()=>{
            console.log('deleeeeteeeeed')
        })
    }


    
    render(){
        let { article, selectArticle }=this.props;
        return(
            <a key={article.id} className="col-md-4 cardipost" 
                onMouseEnter={this.hoverOn} 
                onMouseLeave={this.hoverOff}
                >
                <div className="blog-entry "style={{marginTop:'20px'}}>
                    <img src={`${process.env.PUBLIC_URL}/images/img_11.jpg`} alt="aa"/>
                    <div className="blog-content-body">
                        <div className="post-meta" style={{marginBottom:'0px'}}>     
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                <span className="mr-2" style={{color:"#f35c52"}}>March 15, 2018 </span> 
                                <div style={{display:'flex', flexDirection:'row'}}>
                                    <a style={{backgroundColor:'Transparent'}} onClick={()=> {
                                            selectArticle(article);
                                            this.props.history.push('/myarticle/display')  
                                        }}> 
                                        <FiEye size={'20'} color={`${this.state.hover ? 'blue': 'grey'}`}/> 
                                    </a> 
                                    <a style={{marginLeft:'15px'}} onClick={this._deleteArticle.bind(this)}> 
                                        <FiTrash size={'20'} color={`${this.state.hover ? 'red': 'grey'}`}/> 
                                    </a> 
                                </div>
                                
                            </div>
                            
                        </div>
                        <h4>{ article.title }</h4>

                    </div>
                </div>
            </a>
            
        )
    }
}

const DELETE_MUTATION = gql`
  mutation deleteArticle($id: ID!) {
    deleteArticle(id: $id) {
      id
    }
  }
`;


export default withRouter(connect(null,actions)(
      graphql(DELETE_MUTATION, {name: 'deleteArticleMutation'})
  (ArticleCard)
));

// export default withRouter(connect(null,actions)(ArticleCard));

                