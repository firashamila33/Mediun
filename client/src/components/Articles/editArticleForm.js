import React, { Component } from "react";
import { graphql, compose } from 'react-apollo';
import validator from 'validator';
import { connect } from 'react-redux'
import moment from 'moment'

import _ from 'lodash'
import * as actions from '../../actions'

import { FiEye } from 'react-icons/fi'
import { FiEdit } from 'react-icons/fi'
import { FiEdit3 } from 'react-icons/fi'
import { FiCheckSquare } from 'react-icons/fi'
import RichEditor from '../RichEditor'
import { EDIT_MUTATION, articlesListQuery } from '../../graphql'

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
      isPreview: false,// << true: is previewing the Article after editing
      isDisplay: false, // <-- true:  is opening a article only for display 
      loading: true,
    }
    this.handleTitleChange = this.handleTitleChange.bind(this)
  }
  componentWillMount(){
    let { pathname } = this.props.history.location
    if (validator.contains(pathname, '/workspace/myarticle') && !this.props.selectedArticle._id) {
      this.props.history.push('/home')
    }
  }

  componentDidMount() {
    let { selectedArticle } = this.props
    let { pathname } = this.props.history.location

        if (validator.contains(pathname, '/display')) {
      this.setState({ isDisplay: true, title: selectedArticle.title })
    }
  }

  togglePreview() {
    this.setState({ isPreview: !this.state.isPreview })
  }

  _handleEditViewBtnActions() {
    let { isPreview } = this.state
    let path = '/workspace/myarticle/edit' ;
    if (!isPreview) { path += '/preview' };
    this.setState({ isPreview: !this.state.isPreview })
    this.props.history.push(path);
  }

  handleTitleChange(e) {
    let title = e.target.value
    let { editedArticle, editArticle } = this.props    
    let { _id, description } = editedArticle;
    editArticle({ _id, title: e.target.value, description });
    this.setState({ title });
  }

  _editArticle = () => {
    var { editArticleMutation, history, selectArticle, editArticle } = this.props;
    let { _id, title, description } = this.props.editedArticle
    editArticleMutation({
      variables: { _id, title, description },
      optimisticResponse: {
        editArticle: {
          title,
          description,
          _id: Math.round(Math.random() * -1000000),
          createdAt: moment().unix(),
          __typename: 'Article',
        },
      },
      update: (store, { data: { editArticle } }) => {
        const data = store.readQuery({ query: articlesListQuery });
        console.log(editArticle)
        if (data.articleFeed.articles.find((art) => art._id === editArticle._id)) {
          _.remove(data.articleFeed.articles, function (a) {
            // eslint-disable-next-line
            return a._id == editArticle._id;
          });
          data.articleFeed.articles.unshift(editArticle);
        }
        store.writeQuery({ query: articlesListQuery, data });

      },
    }).then(() => {
      editArticle({})
      selectArticle({})
      history.push('/home')
    })
  }

  render() {
    let { isDisplay, isPreview, title,isNew,isReadOnly } = this.state;
    let { editArticle, selectedArticle, history } = this.props;
    console.log('isDisplay : ',isDisplay)
    console.log('isNew : ',isNew)
    console.log('isReadOnly : ',isReadOnly)
    return (
      <section className="site-section pt-5" style={{ marginTop: '140px' }}>
        <div className="container">
          <div className="blog-entries">
            <div className="col-md-12 col-lg-12 main-content" style={{ top: '50px' }}>
              <h1
                style={{ color: "#f35c52", opacity: `${!isPreview && !isDisplay ? '0' : '1'}`, marginBottom: '0px', transition: ' .3s' }}>{title ? title : 'Your Title Here'}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ marginRight: '430px' }} >
                  <label style={{ color: "#f35c52", opacity: `${isPreview || isDisplay ? '0' : '1'}`, transition: ' .3s' }} >Article Title</label>
                  <input type="text" className="form-control"
                    style={{ width: '530px', opacity: `${isPreview || isDisplay ? '0' : '1'}`, transition: ' .3s' }}
                    value={title}
                    onChange={this.handleTitleChange} />
                </div>
                {!isDisplay &&
                  <div style={style.buttonsGroup}>
                    <button style={style.toolButton} className="btn pull-right" onClick={() => { this._editArticle() }}>
                      <FiCheckSquare size={'20'} />
                    </button>

                    <button style={style.toolButton} className="btn pull-right"
                      onClick={() => { 
                        this._handleEditViewBtnActions();
                      }}
                    >
                      {isPreview ? <FiEdit size={'20'} /> : <FiEye size={'20'} />}
                    </button>
                  </div>
                }
                {isDisplay &&
                  <div >
                    <button style={style.toolButtonDIsplay} className="btn pull-right"
                      onClick={() => {
                        editArticle(selectedArticle);
                        this.setState({ isDisplay: false })
                        history.push('/workspace/myarticle/edit');
                      }}>
                      <FiEdit3 size={'20'} />
                    </button>
                  </div>
                }
              </div>
                  </div>
          </div>
          <div className="form-group">
            <label style={{ color: "#f35c52", opacity: `${isPreview || isDisplay ? '0' : '1'}`, transition: ' .3s' }}>Description</label>
            <RichEditor isReadOnly={isDisplay || isPreview}   isDisplay={this.state.isDisplay}/>
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
    graphql(EDIT_MUTATION, { name: "editArticleMutation" })
  )(ArticleWorkspace)
);
