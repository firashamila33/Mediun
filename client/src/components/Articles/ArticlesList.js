import React from 'react';
import {
    gql,
    graphql,
} from 'react-apollo';

import ArticleCard from './ArticleCard'



const ArticlesList = ({ data: {loading, error, articles }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="row">
      { articles.map( (article) => 
        (<ArticleCard key={article.id} article={article} />))
      }
    </div>
  );
};

export const articlesListQuery = gql`
  query ArticlesListQuery {
    articles {
      id
      title
      description
    }
  }
`;

export default graphql(articlesListQuery, {
  options: { pollInterval: 5000 },
})(ArticlesList);