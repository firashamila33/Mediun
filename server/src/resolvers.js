import _ from 'lodash'
import articles from './articlesData'
let nextId = 6;

export const resolvers = {
  Query: {
    articles: () => {
      return articles;
    },
  },
  Mutation: {
    addArticle: (root, args) => {
      const newArticle = { id: nextId++, title: args.title,description: args.description };
      articles.push(newArticle);
      console.log(articles)
      return newArticle;
    },
    editArticle: (root, args) => {
      let {id,description,title} = args ;
      const editedArticle = { id, title,description };
      var index = _.findIndex(articles, {id});
      articles.splice(index, 1, editedArticle);
      return editedArticle;
    },
    deleteArticle: (root, args) => {
      _.remove(articles, function(article) {
        return article.id == args.id;
      });
      return {id:args.id,title:'chay',description:'wallah chay'}; 
    },
  },
  
};
