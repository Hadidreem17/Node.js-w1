const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const PORT = 3000;
const BASE = __dirname;

async function sendFile(res, filePath, contentType) {
  try {
    const data = await fs.readFile(filePath);
    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);
    res.end(data);
  } catch (err) {
    if (err && err.code === "ENOENT") {
      res.statusCode = 404;
      res.end("Not Found");
    } else {
      console.error(err);
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  }
}

const server = http.createServer(async (req, res) => {

  if (req.url === "/" || req.url === "/index.html") {
    return sendFile(res, path.join(BASE, "index.html"), "text/html; charset=utf-8");
  }

  if (req.url === "/index.js") {
    return sendFile(res, path.join(BASE, "index.js"), "application/javascript; charset=utf-8");
  }

 
  res.statusCode = 404;
  res.end("Not Found");
});

server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
