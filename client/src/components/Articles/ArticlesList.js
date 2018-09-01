import React,{Component} from 'react';
import { graphql } from 'react-apollo';
import { articlesListQuery, articleSubscription, articleDeleteSubscription } from '../../graphql'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import * as actions from '../../actions'
import 'react-notifications/lib/notifications.css';

import ArticleCard from './ArticleCard'


class ArticlesList extends Component{
  constructor(){
    super();
    this.state={
      loadinFeed:false
    }
  }

   componentWillMount() {
     this.props.data.subscribeToMore({
       document: articleSubscription,
       updateQuery: (prev, {subscriptionData}) => {
         if (!subscriptionData.data) {
           return prev;
         }
         const newArticle = subscriptionData.data.articleAdded;
         if (!prev.articleFeed.articles.find((article) => article._id === newArticle._id)) {  
          NotificationManager.info(newArticle.title,'New Article, Click to open ',5000,()=>{
            this.props.selectArticle(newArticle);
            this.props.history.push('/myarticle/display')
          },true)         
           return Object.assign({}, prev, {        
            __typename: prev.__typename,
            articleFeed: {   
              __typename: prev.articleFeed.__typename,
                 articles: [newArticle,...prev.articleFeed.articles],   
            }
           });
         } else {
           return prev;
         }
       }
     })
     this.props.data.subscribeToMore({
      document: articleDeleteSubscription,
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const deletedArticle = subscriptionData.data.articleDeleted;
        if (prev.articleFeed.articles.find((article) => article._id === deletedArticle._id)) {  
        var articles = _.filter(prev.articleFeed.articles, function(a) { return a._id !== deletedArticle._id; });
        return Object.assign({}, prev, {        
          __typename: prev.__typename,
          articleFeed: {   
            __typename: prev.articleFeed.__typename,
               articles,   
          }
         });
        } else {
          return prev;
        }
      }
    })
   }
   componentDidMount(){
    window.scrollTo(0, 0);
   }

  render(){
    let {data: {loading, error, articleFeed }, loadOlderArticles} = this.props;

    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }

    return (
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-between'}}>
          <div className="row">
          { articleFeed.articles.map( (article) => 
            (<ArticleCard key={article._id} article={article} />))
          }
          </div>
          <button  style={{width:'200px'}} className="btn btn-primary btn-sm" onClick={loadOlderArticles}>
            Load Older Messages
          </button>
          <NotificationContainer/>   
      </div>
      
    );


  }
}              



export default withRouter(connect(
  null,
  actions
)(graphql(articlesListQuery, {
  options: (props) => ({
    variables: {
      cursor: '-1',
    },
  }),

  props: (props) => {
    return {
      data: props.data,
      loadOlderArticles: () => {
        return props.data.fetchMore({
          variables: {
            cursor: props.data.articleFeed.cursor,
          },
          
          updateQuery(previousResult, { fetchMoreResult }) {
            const prevArticleFeed = previousResult.articleFeed;
            const newArticleFeed = fetchMoreResult.articleFeed
            
            if(newArticleFeed.cursor === prevArticleFeed.cursor){
              return ({
                articleFeed: {
                  __typename: previousResult.articleFeed.__typename,
                  articles: [...prevArticleFeed.articles],
                  cursor: newArticleFeed.cursor
                }
              })
            }

            const newArticlesData = {
              articleFeed: {
                __typename: previousResult.articleFeed.__typename,
                articles: [
                  ...prevArticleFeed.articles,
                  ...newArticleFeed.articles,
                ],
                cursor: newArticleFeed.cursor
              }
            }
            return newArticlesData;
          }
        });
      }
    };
  }
})(ArticlesList)));
