const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const root = __dirname;
const port = Number(process.env.PORT || 8091);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

http
  .createServer((req, res) => {
    const requestPath = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
    const safePath = requestPath === "/" ? "/index.html" : requestPath;
    const filePath = path.normalize(path.join(root, safePath));

    if (!filePath.startsWith(root)) {
      res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Not found");
        return;
      }

      res.writeHead(200, {
        "Content-Type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      });
      res.end(content);
    });
  })
  .listen(port, "127.0.0.1", () => {
    const url = `http://localhost:${port}/`;
    console.log(`Website running: ${url}`);
    console.log("Keep this window open while checking the website.");
    exec(`start "" "${url}"`);
  });
