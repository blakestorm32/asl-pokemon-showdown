import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Serve your built client (adjust "dist" if different)
app.use(express.static(path.join(__dirname, "client", "dist")));

// Preflight
app.options("/~~*", (req, res) => {
  res.header("Access-Control-Allow-Origin", `https://${req.headers.host}`);
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "*");
  res.sendStatus(204);
});

// HTTP API proxy to local PS (default PS listens on 8000)
app.use("/~~", createProxyMiddleware({
  target: "http://127.0.0.1:8000",
  changeOrigin: false,
  ws: true,
  onProxyRes(proxyRes, req, res) {
    // same-origin anyway, but keep if you want explicit header
    res.setHeader("Access-Control-Allow-Origin", `https://${req.headers.host}`);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  },
}));

// WebSocket proxy for battles
app.use("/showdown", createProxyMiddleware({
  target: "http://127.0.0.1:8000",
  changeOrigin: false,
  ws: true,
}));

// Fallback to index.html for SPA routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Proxy+static listening on ${PORT}`);
});
