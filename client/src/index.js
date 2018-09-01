import React from "react";
import ReactDOM from "react-dom";
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
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

const wsClient = new SubscriptionClient(`ws://localhost:4002/subscriptions`, {
  reconnect: true,
});
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);

function dataIdFromObject(result) {
  if (result.__typename) {
    if (result._id !== undefined) {
      return `${result.__typename}:${result._id}`;
    }
  }
  return null;
}

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject,
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