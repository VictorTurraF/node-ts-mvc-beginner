import http from "http";
import { Kernel } from "./core/kernel";

// instantiate an app
const app = Kernel.create();

const server = http.createServer((request, response) => {
  let body = "";

  console.log(request.headers)

  // Collect the data chunks from the request
  request.on('data', chunk => {
    body += chunk;
  });

  // Process the complete request body
  request.on('end', () => {
    const requestBody = JSON.parse(body)

    const controllerResponse = app.handle({
      httpVerb: request.method || "GET",
      urlPath: request.url || "/",
      body: requestBody,
    });

    // Send the response
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(controllerResponse));
  });

});

const port = 3000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
