import React, { Component } from "react";
import {BrowserRouter, Route} from "react-router-dom";
import { graphql, compose } from 'react-apollo';
import validator from 'validator';
import { connect } from 'react-redux'
import moment from 'moment'

import _ from 'lodash'
import * as actions from '../../actions'

import { FiSend } from 'react-icons/fi'
import { FiEye } from 'react-icons/fi'
import { FiEdit } from 'react-icons/fi'
import { FiEdit3 } from 'react-icons/fi'
import { FiCheckSquare } from 'react-icons/fi'
import Article from './Article'
import { SUBMIT_MUTATION, EDIT_MUTATION, articlesListQuery } from '../../graphql'

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

  constructor() {
    super();
    this.state = {
      title: '',
      isPreview: false,
      isNew: false, //<-- this is to know if the user opened an article from preview or is creating  a new article
      isExistingArticleDiplay: false, // <--this one is to know if it's the user opened an old article for read or for edit
      loading: true,
    }
    this.handleTitleChange = this.handleTitleChange.bind(this)
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    let { editedArticle, selectedArticle, editArticle } = this.props
    let { pathname } = this.props.history.location
    if (validator.contains(pathname, '/myarticle') && !this.props.selectedArticle._id) {
      this.props.history.push('/home')
    }

    if (validator.contains(pathname, '/preview')) {
      this.setState({ isPreview: true })
    }
    if (validator.contains(pathname, '/newarticle')) {
      this.setState({ isNew: true })
      let title = JSON.parse(window.localStorage.getItem('articleTitle'))
      if (title) {
        this.setState({ title })
      }

    } 
    if(validator.equals(pathname, '/myarticle/edit/preview') || validator.equals(pathname, '/myarticle/edit')){
        this.setState({ title: editedArticle.title })
    }
   
    if (validator.contains(pathname, '/display')) {
      editArticle(selectedArticle)
      this.setState({ isExistingArticleDiplay: true, title: selectedArticle.title })
    }
  }

  togglePreview() {
    this.setState({ isPreview: !this.state.isPreview })
  }

  handleTitleChange(e) {
    let title = e.target.value
    let { editedArticle, editArticle } = this.props
    if (this.state.isNew) {
      window.localStorage.setItem('articleTitle', JSON.stringify(title));
    } else {
      let { _id, description } = editedArticle;
      editArticle({ _id, title: e.target.value, description });
    }
    

    this.setState({ title });
  }

  _handleAction() {
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
      optimisticResponse: {
        addArticle: {
          title,
          description,
          _id: Math.round(Math.random() * -1000000),
          createdAt: moment().unix(),
          __typename: 'Article',
        },
      },
      update: (store, { data: { addArticle } }) => {
        const data = store.readQuery({ query: articlesListQuery });
        
        if (!data.articleFeed.articles.find((art) => art._id === addArticle._id)) {
          data.articleFeed.articles.unshift(addArticle);
        }
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
    let { _id, title, description } = this.props.editedArticle
    editArticleMutation({
      variables: { _id, title, description },
      update: (store, { data: { editArticle } }) => {
        const data = store.readQuery({ query: articlesListQuery });
        var index = _.findIndex(data.articles, { _id,description });
        if(index !== -1){
          data.articleFeed.articles.splice(index, 1, editArticle);

          _.remove(data.articleFeed.articles, function (a) {
            return a._id == editArticle._id;
          });
          data.articleFeed.articles.unshift(editArticle);
          
        }
        store.writeQuery({ query: articlesListQuery, data });
      },
    }).then(() => {
      history.push('/home')
    })
  }

  render() {
    let { isExistingArticleDiplay, isPreview, isNew, title } = this.state;
    let { selectedArticle, editArticle, history } = this.props;
    return (
      <section className="site-section pt-5" style={{ marginTop: '140px' }}>
        <div className="container">
          <div className="blog-entries">
            <div className="col-md-12 col-lg-12 main-content" style={{ top: '50px' }}>
              <h1
                style={{ color: "#f35c52", opacity: `${!isPreview && !isExistingArticleDiplay ? '0' : '1'}`, marginBottom: '0px', transition: ' .3s' }}>{title ? title : 'Your Title Here'}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ marginRight: '430px' }} >
                  <label style={{ color: "#f35c52", opacity: `${isPreview || isExistingArticleDiplay ? '0' : '1'}`, transition: ' .3s' }} >Article Title</label>
                  <input type="text" className="form-control"
                    style={{ width: '530px', opacity: `${isPreview || isExistingArticleDiplay ? '0' : '1'}`, transition: ' .3s' }}
                    value={title}
                    onChange={this.handleTitleChange} />
                </div>
                {!isExistingArticleDiplay &&
                  <div style={style.buttonsGroup}>
                    <button style={style.toolButton} className="btn pull-right" onClick={() => { this._handleAction() }}>
                      {isNew ? <FiSend size={'20'} /> : <FiCheckSquare size={'20'} />}
                    </button>

                    <button style={style.toolButton} className="btn pull-right"
                      onClick={() => {
                        let path = '';
                        if (isNew) { path = '/newarticle/edit'; } else { path = '/myarticle/edit' };
                        if (!isPreview) { path += '/preview' };
                        history.push(path);
                        this.togglePreview;
                      }}
                    >
                      {isPreview ? <FiEdit size={'20'} /> : <FiEye size={'20'} />}
                    </button>
                  </div>
                }
                {isExistingArticleDiplay &&
                  <div >
                    <button style={style.toolButtonDIsplay} className="btn pull-right"
                      onClick={() => {
                        editArticle(selectedArticle);
                        history.push('/myarticle/edit');
                      }}>
                      <FiEdit3 size={'20'} />
                    </button>
                  </div>
                }
              </div>²
                  </div>
          </div>

          <div className="form-group">
            <label style={{ color: "#f35c52", opacity: `${isPreview || isExistingArticleDiplay ? '0' : '1'}`, transition: ' .3s' }}>Description</label>
            <BrowserRouter>
              <div>
                <Route exact path="/newarticle/edit/preview" render={() => <Article isReadOnly={true} isNew={true} />} />
                <Route exact path="/newarticle/edit" render={() => <Article isReadOnly={false} isNew={true} />} />
                <Route exact path="/myarticle/edit/preview" render={() => <Article isReadOnly={true} isEditedArticle={true} />} />
                <Route exact path="/myarticle/edit" render={() => <Article isReadOnly={false} isEditedArticle={true} />} />
                <Route exact path="/myarticle/display" render={() => <Article isReadOnly={true} isDisplay={true} />} />
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




export default connect(
  mapStateToProps,
  actions
)(
  compose(
    graphql(SUBMIT_MUTATION, { name: "submitArticleMutation" }),
    graphql(EDIT_MUTATION, { name: "editArticleMutation" })
  )(ArticleWorkspace)
);
