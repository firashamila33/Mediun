const articles = [{
  id: 1,
  title: 'soccer',
  description: 'HELLOOOO soccer',
}, {
  id: 2,
  title: 'baseball',
  description: 'HELLOOOO baseball',
}];
let nextId = 3;

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
      return newArticle;
    },
  },
};
