import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// 1) Serve your built client
app.use(express.static(path.join(__dirname, "client", "dist")));

// 2) Proxy PS HTTP API (keep /~~... intact)
app.use("/~~", createProxyMiddleware({
  target: "http://127.0.0.1:9000",
  changeOrigin: false,
  ws: true,
}));

// 3) Proxy PS WebSockets for battles
app.use("/showdown", createProxyMiddleware({
  target: "http://127.0.0.1:9000",
  changeOrigin: false,
  ws: true,
}));

// 4) SPA fallback
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Web+proxy listening on ${PORT}`);
});
