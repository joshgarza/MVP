const express = require("express");
const awsServerlessExpress = require("aws-serverless-express");
const router = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const allowedOrigins = [
    "http://coaching-app-frontend.s3-website-us-west-2.amazonaws.com",
    "http://192.168.1.133:3000",
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
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

app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    // const modifiedResponse = {
    //   statusCode: res.statusCode,
    //   headers: res.getHeaders(),
    //   isBase64Encoded: false,
    //   body: body instanceof Buffer ? body.toString() : body,
    // };
    originalSend.call(res, JSON.stringify(body));
  };
  next();
});

app.use("/api", router);

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};
