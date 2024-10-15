import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.203.0/http/file_server.ts";
import { searchProvider } from "../routes/search.ts";

const PORT = 8000;

// Define the request handler
const handler = async (req: Request): Promise<Response> => {
  try {
    const url = new URL(req.url);
    const pathname = url.pathname;

    if (pathname.startsWith("/search")) {
      const query = url.searchParams.get("query");
      const page = parseInt(url.searchParams.get("page") || "1");
      const location = url.searchParams.get("location") || "";
      return await searchProvider(query, page, location);
    }

    // Serve static files for everything else
    return await serveDir(req, { fsRoot: "public", urlRoot: "" });
  } catch (error) {
    console.error("Error handling request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

// Start the server
console.log(`Server running on http://localhost:${PORT}/`);
await serve(handler, { port: PORT });
