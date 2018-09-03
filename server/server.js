import express from "express";
const mongoose = require("mongoose");

import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import bodyParser from "body-parser";
import cors from "cors";
import { execute, subscribe } from "graphql";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { schema } from "./src/schema";
import keys from "./config/keys";

//Mongoose Connection
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
require("./models/Article");

const PORT = 4002;
const server = express();

server.use("*", cors({ origin: "http://localhost:3000" }));

server.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema
  })
);

server.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql",
    subscriptionsEndpoint: `ws://localhost:4002/subscriptions`
  })
);

// We wrap the express server so that we can attach the WebSocket for subscriptions
const ws = createServer(server);

ws.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`);

  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema
    },
    {
      server: ws,
      path: "/subscriptions"
    }
  );
});
