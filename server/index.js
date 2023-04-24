const express = require("express");
const awsServerlessExpress = require("aws-serverless-express");
const router = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "http://coaching-app-frontend.s3-website-us-west-2.amazonaws.com"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use("/api", router);

const binaryMimeTypes = [
  "application/javascript",
  "application/json",
  "application/octet-stream",
  "application/xml",
  "font/eot",
  "font/opentype",
  "font/otf",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "text/comma-separated-values",
  "text/css",
  "text/html",
  "text/javascript",
  "text/plain",
  "text/text",
  "text/xml",
];

const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);

exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};
