import { gql } from 'react-apollo'

export const DELETE_MUTATION = gql`
mutation deleteArticle($id: ID!) {
  deleteArticle(id: $id) {
    id
  }
}
`;

export const SUBMIT_MUTATION = gql`
  mutation addArticle($title: String!,$description: String!) {
    addArticle(title: $title,description: $description) {
      id
      title
      description
      createdAt
    }
  }
`;

export const EDIT_MUTATION = gql`
  mutation editArticle($id: ID!, $title: String!,$description: String!) {
    editArticle(id: $id, title: $title, description: $description) {
      id
      title
      description
      createdAt
    }
  }
`;

 export const articlesListQuery = gql`
   query ArticlesListQuery($cursor: String ) {
     articleFeed(cursor: $cursor) @connection(key: "articleFeed"){
       cursor
       articles  {
         id
         title
         description
         createdAt
       }
     }
   }
 `;

// export const articlesListQuery = gql`
//   query ArticlesListQuery {
//     articles {
//       id
//       title
//       description
//       createdAt
//     }
//   }
// `;

export const articleSubscription = gql`
  subscription articleAdded{
    articleAdded{
      id
      title
      description
      createdAt
    }
  }
`;
