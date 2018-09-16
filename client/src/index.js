import React from "react";
import ReactDOM from "react-dom";
import {
  SubscriptionClient,
  addGraphQLSubscriptions
} from "subscriptions-transport-ws";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import App from "./App";
import keys from "./config/keys";

import reducers from "./Reducers";

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from "react-apollo";

const networkInterface = createNetworkInterface({
  uri: `${keys.redirectDomain}/grapĥql`,
  credentials: "same-origin"
});
//GraphQL subscriptions (websocket) endpoint
const wsClient = new SubscriptionClient(keys.subscriptionEndpoint, {
  reconnect: true
});
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);
//to store all objects in appolo caching store with __typname and id
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
  dataIdFromObject
});

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.querySelector("#root")
);
