import React, { Component } from "react";
import {BrowserRouter, Route} from "react-router-dom";
import { gql, graphql, compose } from 'react-apollo';
import validator from 'validator';
import { connect } from 'react-redux'
import _ from 'lodash'
import * as actions from '../../actions'

import { FiSend } from 'react-icons/fi'
import { FiEye } from 'react-icons/fi'
import { FiEdit } from 'react-icons/fi'
import { FiEdit3 } from 'react-icons/fi'
import { FiCheckSquare } from 'react-icons/fi'
import { articlesListQuery } from './ArticlesList'
import Article from './Article'

const style = {
  toolButton: {
    backgroundColor: "#f35c52",
    color: "white",
    marginLeft: '20px',
  },
  buttonsGroup: {
    marginTop:'40px',
    display:'flex',
    flexDirection:'row-reverse',
    justifyContent:'space-between',
  },
  toolButtonDIsplay: {
    backgroundColor: "#f35c52",
    color: "white",
    marginLeft: '100px',
    marginTop: '40px'
  }
}

class ArticleWorkspace extends Component {

     constructor(){
       super();
       this.state = {
           title: '',
           isPreview:false,
           isNew:false, //<-- this is to know if the user opened an article from preview or is creating  a new article
           isExistingArticleDiplay:false, // <--this one is to know if it's the user opened an old article for read or for edit
       }
       this.handleTitleChange=this.handleTitleChange.bind(this)
     }

  componentWillMount(){
    console.log('props in workspace : ',this.props)

    let { pathname } = this.props.history.location
    
    if(validator.contains(pathname,'/myarticle') && !this.props.selectedArticle.id ){
      this.props.history.push('/home')
    }
  }   
  componentDidMount() {
    // console.log('blaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    let { pathname } = this.props.history.location
    // console.log(this.props)
    // if(validator.contains(pathname,'/myarticle') && !this.props.selectedArticle.id ){
    //   this.props.history.push('/home')
    // }

    if (validator.contains(pathname, '/preview')) {
      this.setState({ isPreview: true })
    }
    if (validator.contains(pathname, '/newarticle')) {
      this.setState({ isNew: true })
      let title = JSON.parse(window.localStorage.getItem('articleTitle'))
      if (title) {
        this.setState({ title })
      }

    }else{
      this.setState({ title:this.props.selectedArticle.title })
    }
    if (validator.contains(pathname, '/display')) {
      this.setState({ isExistingArticleDiplay: true })
    }

  }

  togglePreview() {
    this.setState({ isPreview: !this.state.isPreview })
  }

  handleTitleChange(e) {
    let title = e.target.value
    if(this.state.isNew){
      window.localStorage.setItem('articleTitle', JSON.stringify(title));
    }else{
      let {id,description} = this.props.selectedArticle;
      this.props.editArticle({id, title: e.target.value, description});
    }
    this.setState({ title });
  }

  _handleAction() {
    console.log(this.props)
     if (!this.state.isNew) {
       this._editArticle();
     } else {
       this._submitArticle();
     }
  }

  _submitArticle = () => {
    var { submitArticleMutation, history } = this.props;
    let { title } = this.state;
    let description = window.localStorage.getItem('articleContent');
    submitArticleMutation({
      variables: { title, description },
      // ====> refetchQueries: [ { query: articlesListQuery }], to tell appolo to 
      // the Articles List once the article is added ,, ==> bad UX , replaced with 
      //OptimisticUI and store updating

      //this is optimisticUI managed by appolo client 
      //it's about adding an article to the store before it gets added 
      //to the server date with a negative ID to distinguish between the 
      //fake article and the one added to the server date  
      //So The optimisticResponse predicts the responce from the server.
       optimisticResponse: {
         addArticle: {
           title,
           description,
           id: Math.round(Math.random() * -1000000),
           __typename: 'Article',
         },
       },
      //As its a new entity Apollo doesn't automatically know what to do with it.
      // this one replace refetchQueries , so no need to refresh the page or 
      // send new request to the server t get all the list of articles
      //once mutated , the aticle is added to the store
      update: (store, { data: { addArticle } }) => {
        // Read the data from the cache for this query.
        const data = store.readQuery({ query: articlesListQuery });
        // Add our channel from the mutation to the end.
        data.articles.push(addArticle);
        // Write the data back to the cache.
        store.writeQuery({ query: articlesListQuery, data });
      },
    }).then(() => {
      window.localStorage.removeItem('articleContent');
      window.localStorage.removeItem('articleTitle');
      history.push('/home')
    })


  }
  _editArticle = () => {
    var { editArticleMutation, history } = this.props;
    let { id, title, description } = this.props.editedArticle
    editArticleMutation({
      variables: { id, title, description },
      update: (store, { data: { editArticle } }) => {
        const data = store.readQuery({ query: articlesListQuery });
        var index = _.findIndex(data.articles, {id});
        data.articles.splice(index, 1, editArticle);
        store.writeQuery({ query: articlesListQuery, data });
      },
    }).then(() => {
      window.localStorage.removeItem('articleContent');
      window.localStorage.removeItem('articleTitle');
      history.push('/home')
    })
  }
    
  render() {
    let { isExistingArticleDiplay, isPreview, isNew, title } = this.state;
    let { selectedArticle, editArticle, history } = this.props;
    return (
       <section className="site-section pt-5" style={{marginTop:'140px'}}>
         <div className="container">
                <div className="blog-entries">
                    <div className="col-md-12 col-lg-12 main-content" style={{top:'50px'}}> 
                        <h1 
                        style={{color:"#f35c52",opacity:`${!isPreview && !isExistingArticleDiplay ? '0' : '1' }`,marginBottom:'0px',transition:' .3s'}}>{title ? title : 'Your Title Here'}</h1>
                    </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div style={{display:'flex',flexDirection:'row'}}>
                        <div style={{marginRight:'430px'}} >
                          <label  style={{color:"#f35c52",opacity:`${isPreview || isExistingArticleDiplay ? '0' : '1' }`,transition:' .3s'}} >Article Title</label>
                          <input type="text" className="form-control"
                            style={{width:'530px',opacity:`${isPreview || isExistingArticleDiplay ? '0' : '1' }`,transition:' .3s'}}
                            value={title}
                            onChange={ this.handleTitleChange }/>
                        </div>
                      {!isExistingArticleDiplay &&
                        <div style={style.buttonsGroup}>
                          <button style={style.toolButton} className="btn pull-right" onClick={()=>{this._handleAction()}}>
                              {isNew ? <FiSend size={'20'}/> : <FiCheckSquare size={'20'}/>}
                          </button>          
                                          
                          <button style={style.toolButton} className="btn pull-right" 
                          onClick={()=>{
                            let path = '';
                            if(isNew){path='/newarticle/edit';}else{ path='/myarticle/edit'};
                            if(!isPreview){path+='/preview'};
                            history.push(path);
                            this.togglePreview;
                          }}
                          >
                            {isPreview ? <FiEdit size={'20'}/> : <FiEye size={'20'}/>}
                          </button>
                        </div>
                       }
                       {isExistingArticleDiplay &&
                          <div >
                            <button style={style.toolButtonDIsplay} className="btn pull-right" 
                              onClick={()=>{
                                editArticle(selectedArticle);
                                history.push('/myarticle/edit');
                                }}>
                              <FiEdit3 size={'20'}/> 
                            </button> 
                          </div>
                       } 
                    </div>
                  </div>
                </div>  
                <div className="form-group">
                    <label style={{color:"#f35c52",opacity:`${isPreview || isExistingArticleDiplay ? '0' : '1' }`,transition:' .3s'}}>Description</label>
                    <BrowserRouter>
                        <div>
                            <Route exact path="/newarticle/edit/preview" render={() => <Article isReadOnly={true} isNew={true}/>}/>
                            <Route exact path="/newarticle/edit" render={() => <Article isReadOnly={false} isNew={true} />}/>
                            <Route exact path="/myarticle/edit/preview" render={() => <Article isReadOnly={true} isEditedArticle={true}/>}/>
                            <Route exact path="/myarticle/edit" render={() => <Article isReadOnly={false} isEditedArticle={true} />}/>
                            <Route exact path="/myarticle/display" render={() => <Article  isReadOnly={true} isDisplay={true} />}/>
                        </div>
                    </BrowserRouter>          
                </div>           
  
         </div>
       </section>
    );
  }
}

function mapStateToProps({selectedArticle, editedArticle}){
  return {selectedArticle, editedArticle}
}

const SUBMIT_MUTATION = gql`
  mutation addArticle($title: String!,$description: String!) {
    addArticle(title: $title,description: $description) {
      id
      title
      description
    }
  }
`;

const EDIT_MUTATION = gql`
  mutation editArticle($id: ID!, $title: String!,$description: String!) {
    editArticle(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;



export default connect(mapStateToProps,actions)(
                    compose(
                      graphql(SUBMIT_MUTATION, {name: 'submitArticleMutation'}),
                      graphql(EDIT_MUTATION, {name: 'editArticleMutation'})
                    )
                  (ArticleWorkspace)
              );
