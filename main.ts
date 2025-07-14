// server.ts
const state = {
  content: "",
};

Deno.serve(async (request) => {
  const url = new URL(request.url);
  const path = url.pathname;

  // Gestion des fichiers statiques (CSS)
  if (path === "/main_page.css") {
    try {
      const cssContent = await Deno.readTextFile("main_page.css");
      return new Response(cssContent, {
        headers: { "Content-Type": "text/css" },
      });
    } catch (_error) {
      return new Response("CSS not found", { status: 404 });
    }
  }

  // GET - Page principale
  if (path === "/" || path === "/main_page.html") {
    let html = await Deno.readTextFile("main_page.html");
    html = html.replace("{{content}}", state.content);

    return new Response(html, {
      headers: { "Content-Type": "text/html" },
    });
  }

  // Page non trouvée
  return new Response("Page not found", { status: 404 });
});
