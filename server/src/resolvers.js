import { PubSub, withFilter } from 'graphql-subscriptions'
import _ from 'lodash'
import moment from 'moment'
import mongoose,{ Schema } from 'mongoose'
import articles from './articlesFakeData'
require('../models/Article');

const Article = mongoose.model("articles");
const pubsub = new PubSub();

export const resolvers = {
  Query: {
    articles: () => {
      return articles;
    },
    articleFeed: async (channel, { cursor }) => {
      const feedSize = 3;
      if (!cursor || parseInt(cursor) === -1) {
        const newestArticle = await Article.find().sort({ createdAt: -1 }).limit(1)
        cursor = newestArticle[0].createdAt;
        console.log('CURSOOOR 1 : ',cursor)
      } else {
        cursor = parseInt(cursor);
      }
      const articlesResult = await Article.find({ createdAt: { $lte: cursor } }).sort({ createdAt: -1 }).limit(feedSize + 1)
      const newCursor = articlesResult[articlesResult.length-1].createdAt
      const articleFeed = {
        articles: articlesResult.slice(0,3),
        cursor: newCursor,
      };

      return articleFeed;
    },
  },
  Mutation: {
    addArticle: async (root, args) => {
      let { title, description} = args;
      if (!title ) throw new Error('Title mising');
      if (!description) throw new Error('Description mising');

      const toSaveArticle = new Article({
        title,
        description,
        createdAt: moment().unix(),
      })
      
      var savedArticle = {}
      try{
        savedArticle = await toSaveArticle.save();
      } catch (err) {
        console.log('ERROR :',err)
      }
      pubsub.publish('articleAdded', {
        articleAdded: savedArticle,
      });
      return savedArticle;
    },
    editArticle: (root, args) => {
      let {_id,description,title} = args ;
      const editedArticle = { _id, title, description, createdAt: moment().unix() };
      Article.findByIdAndUpdate(_id, editedArticle, {new: true}, function(err, model) {
        if(err){
          console.log(`Erro Updating document with Id : ${_id} : `,err)
          return null
        }
        console.log('RESULT : ',model)
        return model
      })
      return editedArticle;
    },
    deleteArticle: async (root, args) => {
      var deletedArticle = {};
      try{
        deletedArticle = await Article.deleteOne({'_id':args._id});
        if(deletedArticle.ok===1){
          pubsub.publish('articleDeleted',{
            articleDeleted:{_id:args._id}
          })
          return {_id:args._id}
        }
      } catch (err) {
        console.log('ERROR :',err)
      }  
      
      return null
      
    },
  },
  Subscription: {
    articleAdded: {
      subscribe: withFilter(() => pubsub.asyncIterator('articleAdded'), (payload, variables) => {
        return true;
      }),
    },
    articleDeleted: {
      subscribe: withFilter(() => pubsub.asyncIterator('articleDeleted'), (payload, variables) => {
        return true;
      }),
    },
  },
  
  
};
