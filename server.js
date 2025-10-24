// server.js (CommonJS)
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");
const http = require("http");

const app = express();
const PORT = Number(process.env.PORT || 3000);   // public entry
const PS_TARGET = "http://127.0.0.1:9000";       // your PS server

// --- PROXIES (put BEFORE SPA fallback) ---
// HTTP API (~~ endpoints)
const psHttpProxy = createProxyMiddleware({
  target: PS_TARGET,
  changeOrigin: false,
  ws: true,
  xfwd: true,
  logLevel: "debug",
});
app.use("/~~", psHttpProxy);

// WebSockets (/showdown/* + sockjs fallbacks)
const psWsProxy = createProxyMiddleware({
  target: PS_TARGET,
  changeOrigin: false,
  ws: true,
  xfwd: true,
  logLevel: "debug",
});
app.use("/showdown", psWsProxy);              // matches /showdown/, /showdown/websocket, /showdown/sockjs/...
app.use("/sockjs", psWsProxy);                // some builds hit /sockjs/* (extra safety)

// --- STATIC CLIENT ---
app.use(express.static(path.join(__dirname, "client", "dist")));

// SPA fallback LAST
app.get("*", (_req, res) =>
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
);

// Start HTTP server and hook WS upgrade explicitly (rock-solid)
const server = http.createServer(app);
server.on("upgrade", (req, socket, head) => {
  if (req.url.startsWith("/showdown") || req.url.startsWith("/sockjs")) {
    psWsProxy.upgrade(req, socket, head);
  } else {
    socket.destroy();
  }
});

server.listen(PORT, () => {
  console.log(`Proxy+static listening on ${PORT}, proxying PS at ${PS_TARGET}`);
});
