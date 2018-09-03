import { gql } from "react-apollo";

export const DELETE_MUTATION = gql`
  mutation deleteArticle($_id: ID!) {
    deleteArticle(_id: $_id) {
      _id
    }
  }
`;

export const SUBMIT_MUTATION = gql`
  mutation addArticle($title: String!, $description: String!) {
    addArticle(title: $title, description: $description) {
      _id
      title
      description
      createdAt
    }
  }
`;

export const EDIT_MUTATION = gql`
  mutation editArticle($_id: ID!, $title: String!, $description: String!) {
    editArticle(_id: $_id, title: $title, description: $description) {
      _id
      title
      description
      createdAt
    }
  }
`;

export const articlesListQuery = gql`
  query ArticlesListQuery($cursor: String) {
    articleFeed(cursor: $cursor) @connection(key: "articleFeed") {
      cursor
      articles {
        _id
        title
        description
        createdAt
      }
    }
  }
`;

export const articleSubscription = gql`
  subscription articleAdded {
    articleAdded {
      _id
      title
      description
      createdAt
    }
  }
`;

export const articleDeleteSubscription = gql`
  subscription articleDeleted {
    articleDeleted {
      _id
    }
  }
`;
export const articleEditSubscription = gql`
  subscription articleEdited {
    articleEdited {
      _id
      title
      description
      createdAt
    }
  }
`;
