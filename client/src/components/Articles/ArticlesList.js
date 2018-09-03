import React,{Component} from 'react';
import { graphql } from 'react-apollo';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import { articlesListQuery, articleSubscription, articleDeleteSubscription, articleEditSubscription } from '../../graphql'
import * as actions from '../../actions'
import ArticleCard from './ArticleCard'
import 'react-notifications/lib/notifications.css';



class ArticlesList extends Component{
  constructor() {
    super();
    this.state = {
      loadinFeed: false
    }
  }

  componentWillMount() {
    //GraphQL subscriptions
    this.props.data.subscribeToMore({
      document: articleSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const { articleAdded } = subscriptionData.data;
        if (!prev.articleFeed.articles.find((article) => article._id === articleAdded._id)) {
          NotificationManager.info(articleAdded.title, 'New Article, Click to open ', 5000, () => {
            this.props.selectArticle(articleAdded);
            this.props.history.push('/workspace/myarticle/display')
          }, true)
          return Object.assign({}, prev, {
            __typename: prev.__typename,
            articleFeed: {
              __typename: prev.articleFeed.__typename,
              articles: [articleAdded, ...prev.articleFeed.articles],
            }
          });
        } else {
          return prev;
        }
      }
    })
    this.props.data.subscribeToMore({
      document: articleDeleteSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const { articleDeleted } = subscriptionData.data;
        if (prev.articleFeed.articles.find((article) => article._id === articleDeleted._id)) {
          var articles = _.filter(prev.articleFeed.articles, function (a) { return a._id !== articleDeleted._id; });
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
    this.props.data.subscribeToMore({
      document: articleEditSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const { articleEdited } = subscriptionData.data;
        // eslint-disable-next-line
        if (prev.articleFeed.articles.find((article) => { article._id === articleEdited._id || article.title === articleEdited.title })) {
          var { articles } = prev.articleFeed
          var newArticleFeed = articles.filter(a =>
            a._id !== articleEdited._id
          ).unshift(articleEdited);

          return Object.assign({}, prev, {
            __typename: prev.__typename,
            articleFeed: {
              __typename: prev.articleFeed.__typename,
              articles: newArticleFeed,
            }
          });
        } else {
          return prev;
        }
      }
    })

  }
  render(){
    let {data: {loading, error, articleFeed }, loadOlderArticles} = this.props;
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    if (!articleFeed )  {
      return <p>No data To Display , chech your database ... !!!</p>;
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
      // initialising the first cursor so the server fetchs the newest articles
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
              // eslint-disable-next-line
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
