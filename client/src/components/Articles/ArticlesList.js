import React,{Component} from 'react';
import { graphql } from 'react-apollo';
import { articlesListQuery, articleSubscription } from '../../graphql'

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
         console.log('A NEW ARTICLE IS HEEEERE')
         console.log('HERE IT IIIIIIS ==> ',subscriptionData)
         const newArticle = subscriptionData.data.articleAdded;
         if (!prev.articleFeed.articles.find((article) => article.id === newArticle.id)) {            
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
   }
   componentDidMount(){
    window.scrollTo(0, 0);
   }

   futo(){

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
          // { articles.map( (article) =>   
            (<ArticleCard key={article.id} article={article} />))
          }
          </div>
          <button  style={{width:'200px'}} className="btn btn-primary btn-sm" onClick={loadOlderArticles}>
            Load Older Messages
          </button>
      </div>
      
    );


  }
}              



 export default (graphql(articlesListQuery, {
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
             const newArticleFeed = fetchMoreResult.articleFeed;
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
 })(ArticlesList ));
