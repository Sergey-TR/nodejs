const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");

const users = [
  {
    id: 1,
    name: "Andrey",
  },
  {
    id: 2,
    name: "Kolya",
  },
];

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === "/user") {
      const user = users.find((user) => user.id === +parsedUrl.query.id);

      if (user) {
        res.writeHead(200, "OK", {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(user));
      } else {
        res.writeHead(400, "Not Found");
        res.end();
      }
    } else {
      const filePath = path.join(__dirname, "./index.html");
      const readStream = fs.createReadStream(filePath);

      readStream.pipe(res);
    }
  } else if (req.method === "POST") {
    let data = "";

    req.on("data", (chunk) => (data = chunk.toString()));
    req.on("end", () => {
      console.log(data);
      const parsedData = JSON.parse(data);
      const resData = JSON.stringify({
        ...parsedData,
        serverProp: 1,
        isUser: true,
      });

      res.writeHead(200, "OK", {
        "Content-Type": "application/json",
      });
      res.end(resData);
    });
  } else {
    res.writeHead(405, "Method not Allowed");
    res.end("Method not Allowed");
  }
});

server.listen(5000);