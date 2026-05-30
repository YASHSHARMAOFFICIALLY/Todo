import { serve } from "bun";
import index from "./index.html";

// No more proxy — frontend just serves static files
// API calls go directly from browser to backend (CORS handles it)
const server = serve({
  port: Number(process.env.PORT || 3001),
  routes: {
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`Frontend running at ${server.url}`);
