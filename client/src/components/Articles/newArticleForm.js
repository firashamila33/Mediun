import React, { Component } from "react";
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux'
import moment from 'moment'

import * as actions from '../../actions'

import { FiSend } from 'react-icons/fi'
import { FiEye } from 'react-icons/fi'
import { FiEdit } from 'react-icons/fi'
import RichEditor from '../RichEditor'
import { SUBMIT_MUTATION, articlesListQuery } from '../../graphql'

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
      loading: true,
    }
    this.handleTitleChange = this.handleTitleChange.bind(this)
  }

  componentDidMount() {
    let title = JSON.parse(window.localStorage.getItem('articleTitle'))
    if (title) {
    this.setState({ title })
    }
  }

  togglePreview() {
    this.setState({ isPreview: !this.state.isPreview })
  }

  _handleEditViewBtnActions() {
    let { isPreview } = this.state
    let path  = '/workspace/newarticle/edit';
    if (!isPreview) { path += '/preview' };
    this.setState({ isPreview: !this.state.isPreview })
    this.props.history.push(path);
  }

  handleTitleChange(e) {
    let title = e.target.value
    window.localStorage.setItem('articleTitle', JSON.stringify(title));
    this.setState({ title });
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
  

  render() {
    let { isPreview, title } = this.state;
    return (
      <section className="site-section pt-5" style={{ marginTop: '140px' }}>
        <div className="container">
          <div className="blog-entries">
            <div className="col-md-12 col-lg-12 main-content" style={{ top: '50px' }}>
              <h1
                style={{ color: "#f35c52", opacity: `${!isPreview ? '0' : '1'}`, marginBottom: '0px', transition: ' .3s' }}>{title ? title : 'Your Title Here'}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ marginRight: '430px' }} >
                  <label style={{ color: "#f35c52", opacity: `${isPreview ? '0' : '1'}`, transition: ' .3s' }} >Article Title</label>
                  <input type="text" className="form-control"
                    style={{ width: '530px', opacity: `${isPreview ? '0' : '1'}`, transition: ' .3s' }}
                    value={title}
                    onChange={this.handleTitleChange} />
                </div>
                <div style={style.buttonsGroup}>
                <button style={style.toolButton} className="btn pull-right" onClick={() => { this._submitArticle() }}>
                    <FiSend size={'20'} />
                </button>

                <button style={style.toolButton} className="btn pull-right"
                    onClick={() => { 
                    this._handleEditViewBtnActions();
                    }}
                >
                    {isPreview ? <FiEdit size={'20'} /> : <FiEye size={'20'} />}
                </button>
                </div>
                
              </div>
                  </div>
          </div>
          <div className="form-group">
            <label style={{ color: "#f35c52", opacity: `${isPreview ? '0' : '1'}`, transition: ' .3s' }}>Description</label>
            <RichEditor isReadOnly={isPreview} isNew={true} />
          </div>
        </div>
      </section>
    );
  }
}

export default connect(
  null,
  actions
)(
  compose(
    graphql(SUBMIT_MUTATION, { name: "submitArticleMutation" }),
  )(ArticleWorkspace)
);
