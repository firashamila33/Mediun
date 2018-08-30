import { PubSub, withFilter } from 'graphql-subscriptions'
import _ from 'lodash'
import moment from 'moment'
import articles from './articlesFakeData'
let nextId = 20;

const pubsub = new PubSub();


export const resolvers = {
  Query: {
    articles: () => {
      return articles;
    },
    articleFeed: (channel, { cursor }) => {
      if (!cursor || parseInt(cursor)===-1) {
        cursor =
          articles[articles.length - 1].createdAt;
      }

      cursor = parseInt(cursor);
      const limit = 3;

      const newestArticleIndex = articles.findIndex(
        article => article.createdAt === cursor
      );
      const newCursor =
        articles[newestArticleIndex - limit].createdAt;

      const articleFeed = {
        articles: articles.slice(
          newestArticleIndex - limit,
          newestArticleIndex
        ),
        cursor: newCursor,
      };

      return articleFeed;
    },
  },
  Mutation: {
    addArticle: (root, args) => {
      let { title, description} = args;
      const newArticle = { id: nextId++, title,description, createdAt: moment().unix()  };
      if (!title ) throw new Error('Title mising');
      if (!description) throw new Error('Description mising');

      articles.push(newArticle);
      
      pubsub.publish('articleAdded', {
        articleAdded: newArticle,
      });
      return newArticle;
    },
    editArticle: (root, args) => {
      let {id,description,title} = args ;
      const editedArticle = { id, title, description, createdAt: moment().unix() };
      var index = _.findIndex(articles, {id});
      articles.splice(index, 1, editedArticle);
      console.log('id to  ediiit : ',id)
      console.log('I found it heeeer ==> : ',index)
      console.log(editedArticle);
      return editedArticle;
    },
    deleteArticle: (root, args) => {
      _.remove(articles, function(article) {
        return article.id == args.id;
      });
      return {id:args.id,title:'chay',description:'wallah chay'}; 
    },
  },
  Subscription: {
    articleAdded: {
      subscribe: withFilter(() => pubsub.asyncIterator('articleAdded'), (payload, variables) => {
        return true;
      }),
    },
  },
  
};
