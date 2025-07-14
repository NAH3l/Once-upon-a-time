function handler(_req: Request): Response {
  return new Response("Hello, World!");
}

// To start the server on the default port, call `Deno.serve` with the handler.
Deno.serve(handler);