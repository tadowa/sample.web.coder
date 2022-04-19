import { serve } from "https://deno.land/std@0.92.0/http/mod.ts";

const server = serve({ hostname: "0.0.0.0", port: 3000 });

for await (const request of server) {

  if (request.method === "GET" && request.url === "/") {

    const file = await Deno.open("./public/index.html");
    request.respond({
      status: 200,
      body: file,
    }).then(() => Deno.close(file.rid));

  }
  else if (request.method === "GET" && (/\.js$/.test(request.url))) {

    request.respond({
      status: 200,
      headers: new Headers({
        "content-type": "text/javascript",
      }),
      body: await Deno.readFile("." + request.url),
    });

  }
  else if (request.method === "GET" && (/\.css$/.test(request.url))) {

    request.respond({
      status: 200,
      headers: new Headers({
        "content-type": "text/css",
      }),
      body: await Deno.readFile("." + request.url),
    });

  }
  else {

    request.respond({
      status: 404,
      body: "not found",
    });

  }

}
