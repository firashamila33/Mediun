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
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
require("./models/Article");

const server = express();

server.use("*", cors({ origin: keys.redirectDomain }));

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
    subscriptionsEndpoint: keys.subscriptionsEndpoint
  })
);

// We wrap the express server so that we can attach the WebSocket for subscriptions
const ws = createServer(server);

if (process.env.NODE_ENV === "production") {
  server.use(express.static("client/build"));
  const path = require("path");
  console.log(`${__dirname}/../client/build/index.html`);
  server.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

const PORT = process.env.PORT || 4002;
ws.listen(PORT, () => {
  console.log(`GraphQL Server is now running on ${PORT}`);

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
