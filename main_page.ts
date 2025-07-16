import { serveDir } from "jsr:@std/http/file-server";
Deno.serve((req) => {
  console.log(req.headers.get("User-Agent"))
  return serveDir(req);
});
