import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import App from "./App";

import reducers from "./Reducers";

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from "react-apollo";


const networkInterface = createNetworkInterface({ 
  uri: 'http://localhost:4002/graphql',
  credentials: 'same-origin',
});


const client = new ApolloClient({
  networkInterface
});

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
     
  </ApolloProvider>,

  document.getElementById("root")
);